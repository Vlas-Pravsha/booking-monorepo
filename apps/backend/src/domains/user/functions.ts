import { randomUUID } from "node:crypto";

import type { LoginInput, RegisterInput } from "../../contracts/zod/auth";
import { ApiError } from "../../core/api-error";
import { prisma } from "../../database/client";
import { hashPassword, verifyPassword } from "../../lib/auth/password";
import { hashToken } from "../../lib/auth/token-hash";
import {
  issueAccessToken,
  issueRefreshToken,
  verifyRefreshToken,
} from "../../lib/auth/tokens";
import type { RequestMeta } from "../../lib/http/request-meta";
import {
  findSessionById,
  findUserByEmailForAuth,
  findUserByIdForAuth,
} from "./reads";
import {
  createSession,
  createUser,
  revokeSession,
  rotateSession,
  touchLastLogin,
} from "./writes";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

type AuthUser = NonNullable<Awaited<ReturnType<typeof findUserByIdForAuth>>>;

const createSessionExpiry = (): Date => {
  const expiresAt = Date.now() + DAY_IN_MS * 30;
  return new Date(expiresAt);
};

const toPublicUser = (user: AuthUser) => ({
  createdAt: user.createdAt,
  email: user.email,
  firstName: user.firstName,
  id: user.id,
  lastLoginAt: user.lastLoginAt,
  lastName: user.lastName,
  status: user.status,
  updatedAt: user.updatedAt,
});

const requireActiveUser = (user: AuthUser): void => {
  if (user.status !== "ACTIVE") {
    throw ApiError.forbidden("User is not active");
  }
};

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

const ensureEmailAvailable = async (normalizedEmail: string): Promise<void> => {
  const existingUser = await findUserByEmailForAuth(prisma, normalizedEmail);

  if (existingUser) {
    throw ApiError.conflict("User with this email already exists");
  }
};

const requireAuthUserById = async (
  userId: string,
  error: ApiError
): Promise<AuthUser> => {
  const authUser = await findUserByIdForAuth(prisma, userId);

  if (!authUser) {
    throw error;
  }

  return authUser;
};

const authenticateUser = async (input: LoginInput): Promise<AuthUser> => {
  const normalizedEmail = normalizeEmail(input.email);
  const authUser = await findUserByEmailForAuth(prisma, normalizedEmail);

  if (!authUser) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  requireActiveUser(authUser);

  const isPasswordValid = await verifyPassword(
    authUser.passwordHash,
    input.password
  );

  if (!isPasswordValid) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  return authUser;
};

const createSessionForUser = async (authUser: AuthUser, meta: RequestMeta) => {
  const sessionId = randomUUID();

  const refreshToken = await issueRefreshToken({
    sessionId,
    userId: authUser.id,
  });

  const accessToken = await issueAccessToken({
    email: authUser.email,
    sessionId,
    userId: authUser.id,
  });

  await createSession(prisma, {
    expiresAt: createSessionExpiry(),
    id: sessionId,
    ipAddress: meta.ipAddress,
    refreshTokenHash: hashToken(refreshToken),
    userAgent: meta.userAgent,
    userId: authUser.id,
  });

  await touchLastLogin(prisma, authUser.id);

  return {
    accessToken,
    refreshToken,
  };
};

type SessionRecord = NonNullable<Awaited<ReturnType<typeof findSessionById>>>;

const validateRefreshSession = async (refreshToken: string) => {
  const refreshPayload = await verifyRefreshToken(refreshToken);
  const session = await findSessionById(prisma, refreshPayload.sessionId);

  if (!session || session.userId !== refreshPayload.userId) {
    throw ApiError.unauthorized("Invalid session");
  }

  if (session.revokedAt || session.expiresAt <= new Date()) {
    throw ApiError.unauthorized("Session expired or revoked");
  }

  if (session.refreshTokenHash !== hashToken(refreshToken)) {
    throw ApiError.unauthorized("Invalid session token");
  }

  return { refreshPayload, session };
};

const rotateSessionTokens = async (
  session: SessionRecord,
  authUser: AuthUser,
  meta: RequestMeta
) => {
  const nextRefreshToken = await issueRefreshToken({
    sessionId: session.id,
    userId: authUser.id,
  });

  const nextAccessToken = await issueAccessToken({
    email: authUser.email,
    sessionId: session.id,
    userId: authUser.id,
  });

  await rotateSession(prisma, {
    expiresAt: createSessionExpiry(),
    id: session.id,
    ipAddress: meta.ipAddress,
    refreshTokenHash: hashToken(nextRefreshToken),
    userAgent: meta.userAgent,
  });

  return {
    nextAccessToken,
    nextRefreshToken,
  };
};

export const registerUser = async (input: RegisterInput, meta: RequestMeta) => {
  const normalizedEmail = normalizeEmail(input.email);

  await ensureEmailAvailable(normalizedEmail);

  const passwordHash = await hashPassword(input.password);

  const createdUser = await createUser(prisma, {
    email: normalizedEmail,
    firstName: input.firstName,
    lastName: input.lastName,
    passwordHash,
  });

  const authUser = await requireAuthUserById(
    createdUser.id,
    ApiError.internal("Failed to load created user")
  );

  const { accessToken, refreshToken } = await createSessionForUser(
    authUser,
    meta
  );

  return {
    accessToken,
    refreshToken,
    user: toPublicUser(authUser),
  };
};

export const loginUser = async (input: LoginInput, meta: RequestMeta) => {
  const authUser = await authenticateUser(input);

  const { accessToken, refreshToken } = await createSessionForUser(
    authUser,
    meta
  );

  return {
    accessToken,
    refreshToken,
    user: toPublicUser(authUser),
  };
};

export const refreshSession = async (
  refreshToken: string,
  meta: RequestMeta
) => {
  const { refreshPayload, session } =
    await validateRefreshSession(refreshToken);
  const authUser = await requireAuthUserById(
    refreshPayload.userId,
    ApiError.unauthorized("User not found")
  );

  requireActiveUser(authUser);

  const { nextAccessToken, nextRefreshToken } = await rotateSessionTokens(
    session,
    authUser,
    meta
  );

  return {
    accessToken: nextAccessToken,
    refreshToken: nextRefreshToken,
    user: toPublicUser(authUser),
  };
};

export const logoutWithRefreshToken = async (
  refreshToken: string
): Promise<void> => {
  try {
    const refreshPayload = await verifyRefreshToken(refreshToken);
    await revokeSession(prisma, refreshPayload.sessionId);
  } catch {
    // Logout must be idempotent for clients.
  }
};

export const getCurrentUser = async (userId: string) => {
  const authUser = await findUserByIdForAuth(prisma, userId);

  if (!authUser) {
    throw ApiError.notFound("User not found");
  }

  return {
    user: toPublicUser(authUser),
  };
};

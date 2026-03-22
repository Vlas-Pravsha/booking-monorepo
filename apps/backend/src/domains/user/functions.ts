import type { LoginInput, RegisterInput } from "../../contracts/zod/auth";
import { ApiError } from "../../core/api-error";
import type { AppPrismaClient } from "../../core/types";
import { hashPassword, verifyPassword } from "../../lib/auth/password";
import { hashToken } from "../../lib/auth/token-hash";
import { verifyRefreshToken } from "../../lib/auth/tokens";
import type { RequestMeta } from "../../lib/http/request-meta";
import { toPublicUser } from "./mappers";
import {
  findSessionById,
  findUserByEmailForAuth,
  findUserByIdForAuth,
} from "./read";
import type { AuthUser } from "./read";
import {
  createAuthUser,
  createSessionForUser,
  revokeSessionByRefreshTokenId,
  rotateSessionTokens,
} from "./write";

const requireActiveUser = (user: AuthUser): void => {
  if (user.status !== "ACTIVE") {
    throw ApiError.forbidden("User is not active");
  }
};

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

const ensureEmailAvailable = async (
  prisma: AppPrismaClient,
  normalizedEmail: string
): Promise<void> => {
  const existingUser = await findUserByEmailForAuth(prisma, normalizedEmail);

  if (existingUser) {
    throw ApiError.conflict("User with this email already exists");
  }
};

const requireAuthUserById = async (
  prisma: AppPrismaClient,
  userId: string,
  error: ApiError
): Promise<AuthUser> => {
  const authUser = await findUserByIdForAuth(prisma, userId);

  if (!authUser) {
    throw error;
  }

  return authUser;
};

const authenticateUser = async (
  prisma: AppPrismaClient,
  input: LoginInput
): Promise<AuthUser> => {
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

const validateRefreshSession = async (
  prisma: AppPrismaClient,
  refreshToken: string
) => {
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

export const registerUser = async (
  prisma: AppPrismaClient,
  input: RegisterInput,
  meta: RequestMeta
) => {
  const normalizedEmail = normalizeEmail(input.email);

  await ensureEmailAvailable(prisma, normalizedEmail);

  const passwordHash = await hashPassword(input.password);
  const authUser = await createAuthUser({
    email: normalizedEmail,
    firstName: input.firstName ?? null,
    lastName: input.lastName ?? null,
    passwordHash,
    prisma,
  });

  const { accessToken, refreshToken } = await createSessionForUser(
    prisma,
    authUser,
    meta
  );

  return {
    accessToken,
    refreshToken,
    user: toPublicUser(authUser),
  };
};

export const loginUser = async (
  prisma: AppPrismaClient,
  input: LoginInput,
  meta: RequestMeta
) => {
  const authUser = await authenticateUser(prisma, input);

  const { accessToken, refreshToken } = await createSessionForUser(
    prisma,
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
  prisma: AppPrismaClient,
  refreshToken: string,
  meta: RequestMeta
) => {
  const { refreshPayload, session } = await validateRefreshSession(
    prisma,
    refreshToken
  );
  const authUser = await requireAuthUserById(
    prisma,
    refreshPayload.userId,
    ApiError.unauthorized("User not found")
  );

  requireActiveUser(authUser);

  const { nextAccessToken, nextRefreshToken } = await rotateSessionTokens(
    prisma,
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
  prisma: AppPrismaClient,
  refreshToken: string
): Promise<void> => {
  try {
    const refreshPayload = await verifyRefreshToken(refreshToken);
    await revokeSessionByRefreshTokenId(prisma, refreshPayload.sessionId);
  } catch {
    // Logout must be idempotent for clients.
  }
};

export const getCurrentUser = async (
  prisma: AppPrismaClient,
  userId: string
) => {
  const authUser = await findUserByIdForAuth(prisma, userId);

  if (!authUser) {
    throw ApiError.notFound("User not found");
  }

  return {
    user: toPublicUser(authUser),
  };
};

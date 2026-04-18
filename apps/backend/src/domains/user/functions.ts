import { randomBytes } from "node:crypto";

import { addMinutes, formatISO, isPast } from "date-fns";

import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "../../contracts/zod/auth";
import { ApiError } from "../../core/errors/api-error";
import type { AppPrismaClient } from "../../core/types";
import { hashPassword, verifyPassword } from "../../lib/auth/password";
import { hashToken } from "../../lib/auth/token-hash";
import { verifyRefreshToken } from "../../lib/auth/tokens";
import { env } from "../../lib/env";
import type { RequestMeta } from "../../lib/http/request-meta";
import { sendPasswordResetNotification } from "../../lib/notifications/password-reset";
import type { UserRecord } from "./queries";
import {
  findPasswordResetTokenByHash,
  findSessionById,
  findUserByEmail,
  findUserById,
} from "./read";
import {
  createPasswordResetToken,
  createSession,
  createUser,
  invalidatePasswordResetTokens,
  rotateSession,
  revokeSession,
  revokeUserSessions,
  updatePasswordHash,
} from "./write";

const toPublicUser = (user: UserRecord) => ({
  createdAt: formatISO(user.createdAt),
  email: user.email,
  firstName: user.firstName,
  id: user.id,
  lastLoginAt: user.lastLoginAt ? formatISO(user.lastLoginAt) : null,
  lastName: user.lastName,
  status: user.status,
  updatedAt: formatISO(user.updatedAt),
});

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const requireActiveUser = (user: UserRecord): void => {
  if (user.status !== "ACTIVE") {
    throw ApiError.forbidden("User is not active");
  }
};

const authenticateUser = async (
  prisma: AppPrismaClient,
  input: LoginInput
): Promise<UserRecord> => {
  const user = await findUserByEmail(prisma, normalizeEmail(input.email));

  if (!user) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  requireActiveUser(user);

  const passwordValid = await verifyPassword(user.passwordHash, input.password);

  if (!passwordValid) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  return user;
};

const validateSession = async (
  prisma: AppPrismaClient,
  refreshToken: string
) => {
  const payload = await verifyRefreshToken(refreshToken);
  const session = await findSessionById(prisma, payload.sessionId);

  if (!session || session.userId !== payload.userId) {
    throw ApiError.unauthorized("Invalid session");
  }

  if (session.revokedAt || isPast(session.expiresAt)) {
    throw ApiError.unauthorized("Session expired or revoked");
  }

  if (session.refreshTokenHash !== hashToken(refreshToken)) {
    throw ApiError.unauthorized("Invalid session token");
  }

  return { payload, session };
};

export const registerUser = async (
  prisma: AppPrismaClient,
  input: RegisterInput,
  meta: RequestMeta
) => {
  const email = normalizeEmail(input.email);
  const existing = await findUserByEmail(prisma, email);

  if (existing) {
    throw ApiError.conflict("User with this email already exists");
  }

  const passwordHash = await hashPassword(input.password);
  const user = await createUser(prisma, {
    email,
    firstName: input.firstName ?? null,
    lastName: input.lastName ?? null,
    passwordHash,
  });

  const { accessToken, refreshToken } = await createSession(prisma, user, meta);

  return { accessToken, refreshToken, user: toPublicUser(user) };
};

export const loginUser = async (
  prisma: AppPrismaClient,
  input: LoginInput,
  meta: RequestMeta
) => {
  const user = await authenticateUser(prisma, input);
  const { accessToken, refreshToken } = await createSession(prisma, user, meta);

  return { accessToken, refreshToken, user: toPublicUser(user) };
};

export const refreshSession = async (
  prisma: AppPrismaClient,
  refreshToken: string,
  meta: RequestMeta
) => {
  const { payload, session } = await validateSession(prisma, refreshToken);
  const user = await findUserById(prisma, payload.userId);

  if (!user) {
    throw ApiError.unauthorized("User not found");
  }

  requireActiveUser(user);

  const { accessToken: nextAccessToken, refreshToken: nextRefreshToken } =
    await rotateSession(prisma, session, user, meta);

  return {
    accessToken: nextAccessToken,
    refreshToken: nextRefreshToken,
    user: toPublicUser(user),
  };
};

export const logoutWithRefreshToken = async (
  prisma: AppPrismaClient,
  refreshToken: string
): Promise<void> => {
  try {
    const payload = await verifyRefreshToken(refreshToken);
    await revokeSession(prisma, payload.sessionId);
  } catch {
    // Logout is idempotent — ignore invalid tokens.
  }
};

export const getCurrentUser = async (
  prisma: AppPrismaClient,
  userId: string
) => {
  const user = await findUserById(prisma, userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return { user: toPublicUser(user) };
};

export const requestPasswordRecovery = async (
  prisma: AppPrismaClient,
  input: ForgotPasswordInput
) => {
  const email = normalizeEmail(input.email);
  const user = await findUserByEmail(prisma, email);

  if (user?.status === "ACTIVE") {
    const rawToken = randomBytes(32).toString("hex");
    const expiresAt = addMinutes(
      new Date(),
      env.PASSWORD_RESET_TOKEN_TTL_MINUTES
    );
    const now = new Date();
    const resetUrl = new URL(
      `/reset-password?token=${encodeURIComponent(rawToken)}`,
      env.APP_BASE_URL
    ).toString();

    await invalidatePasswordResetTokens(prisma, user.id, now);
    await createPasswordResetToken(prisma, {
      expiresAt,
      tokenHash: hashToken(rawToken),
      userId: user.id,
    });
    await sendPasswordResetNotification({
      email: user.email,
      expiresAt,
      resetUrl,
    });
  }

  return { success: true as const };
};

export const resetPasswordRecovery = async (
  prisma: AppPrismaClient,
  input: ResetPasswordInput
) => {
  const token = await findPasswordResetTokenByHash(
    prisma,
    hashToken(input.token)
  );

  if (
    !token ||
    token.usedAt ||
    isPast(token.expiresAt) ||
    token.user.status !== "ACTIVE"
  ) {
    throw ApiError.badRequest("Invalid or expired password reset token");
  }

  const passwordHash = await hashPassword(input.password);
  const now = new Date();

  await prisma.$transaction(async (tx) => {
    await updatePasswordHash(tx, token.userId, passwordHash);
    await invalidatePasswordResetTokens(tx, token.userId, now);
    await revokeUserSessions(tx, token.userId, now);
  });

  return { success: true as const };
};

import { randomBytes } from "node:crypto";

import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "../../contracts/zod/auth";
import { ApiError } from "../../core/api-error";
import type { AppPrismaClient } from "../../core/types";
import { hashPassword, verifyPassword } from "../../lib/auth/password";
import { hashToken } from "../../lib/auth/token-hash";
import { verifyRefreshToken } from "../../lib/auth/tokens";
import { env } from "../../lib/env";
import type { RequestMeta } from "../../lib/http/request-meta";
import { sendPasswordResetNotification } from "../../lib/notifications/password-reset";
import { toPublicUser } from "./mappers";
import {
  findPasswordResetTokenByHash,
  findSessionById,
  findUserByEmailForAuth,
  findUserByIdForAuth,
} from "./read";
import type { AuthUser } from "./read";
import {
  createPasswordResetTokenRecord,
  createAuthUser,
  createSessionForUser,
  invalidateActivePasswordResetTokensForUser,
  revokeActiveSessionsForUser,
  revokeSessionByRefreshTokenId,
  rotateSessionTokens,
  updateUserPasswordHash,
} from "./write";

const requireActiveUser = (user: AuthUser): void => {
  if (user.status !== "ACTIVE") {
    throw ApiError.forbidden("User is not active");
  }
};

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

const createPasswordResetExpiry = (): Date =>
  new Date(Date.now() + env.PASSWORD_RESET_TOKEN_TTL_MINUTES * 60 * 1000);

const createPasswordResetUrl = (token: string): string =>
  new URL(
    `/reset-password?token=${encodeURIComponent(token)}`,
    env.APP_BASE_URL
  ).toString();

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

export const requestPasswordRecovery = async (
  prisma: AppPrismaClient,
  input: ForgotPasswordInput
) => {
  const normalizedEmail = normalizeEmail(input.email);
  const authUser = await findUserByEmailForAuth(prisma, normalizedEmail);

  if (authUser && authUser.status === "ACTIVE") {
    const rawToken = randomBytes(32).toString("hex");
    const expiresAt = createPasswordResetExpiry();
    const requestedAt = new Date();

    await invalidateActivePasswordResetTokensForUser(
      prisma,
      authUser.id,
      requestedAt
    );
    await createPasswordResetTokenRecord(prisma, {
      expiresAt,
      tokenHash: hashToken(rawToken),
      userId: authUser.id,
    });
    await sendPasswordResetNotification({
      email: authUser.email,
      expiresAt,
      resetUrl: createPasswordResetUrl(rawToken),
    });
  }

  return {
    success: true as const,
  };
};

export const resetPasswordRecovery = async (
  prisma: AppPrismaClient,
  input: ResetPasswordInput
) => {
  const passwordResetToken = await findPasswordResetTokenByHash(
    prisma,
    hashToken(input.token)
  );

  if (
    !passwordResetToken ||
    passwordResetToken.usedAt ||
    passwordResetToken.expiresAt <= new Date() ||
    passwordResetToken.user.status !== "ACTIVE"
  ) {
    throw ApiError.badRequest("Invalid or expired password reset token");
  }

  const passwordHash = await hashPassword(input.password);
  const completedAt = new Date();

  await prisma.$transaction(async (transaction) => {
    await updateUserPasswordHash(
      transaction,
      passwordResetToken.userId,
      passwordHash
    );
    await invalidateActivePasswordResetTokensForUser(
      transaction,
      passwordResetToken.userId,
      completedAt
    );
    await revokeActiveSessionsForUser(
      transaction,
      passwordResetToken.userId,
      completedAt
    );
  });

  return {
    success: true as const,
  };
};

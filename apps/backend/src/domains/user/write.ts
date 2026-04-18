import { randomUUID } from "node:crypto";

import { addDays } from "date-fns";

import type { PrismaExecutor } from "../../core/types";
import { hashToken } from "../../lib/auth/token-hash";
import { issueAccessToken, issueRefreshToken } from "../../lib/auth/tokens";
import { env } from "../../lib/env";
import type { RequestMeta } from "../../lib/http/request-meta";
import { userSelect } from "./queries";
import type { UserRecord } from "./queries";

const sessionExpiry = (): Date =>
  addDays(new Date(), env.REFRESH_TOKEN_TTL_DAYS);

export const createUser = (
  prisma: PrismaExecutor,
  input: {
    email: string;
    firstName: string | null;
    lastName: string | null;
    passwordHash: string;
  }
): Promise<UserRecord> =>
  prisma.user.create({ data: input, select: userSelect });

export const createSession = async (
  prisma: PrismaExecutor,
  user: UserRecord,
  meta: RequestMeta
) => {
  const sessionId = randomUUID();

  const [refreshToken, accessToken] = await Promise.all([
    issueRefreshToken({ sessionId, userId: user.id }),
    issueAccessToken({ email: user.email, sessionId, userId: user.id }),
  ]);

  await prisma.authSession.create({
    data: {
      expiresAt: sessionExpiry(),
      id: sessionId,
      ipAddress: meta.ipAddress,
      refreshTokenHash: hashToken(refreshToken),
      userAgent: meta.userAgent,
      userId: user.id,
    },
  });

  await prisma.user.update({
    data: { lastLoginAt: new Date() },
    where: { id: user.id },
  });

  return { accessToken, refreshToken };
};

export const rotateSession = async (
  prisma: PrismaExecutor,
  session: { id: string },
  user: UserRecord,
  meta: RequestMeta
) => {
  const [nextRefreshToken, nextAccessToken] = await Promise.all([
    issueRefreshToken({ sessionId: session.id, userId: user.id }),
    issueAccessToken({
      email: user.email,
      sessionId: session.id,
      userId: user.id,
    }),
  ]);

  await prisma.authSession.update({
    data: {
      expiresAt: sessionExpiry(),
      ipAddress: meta.ipAddress,
      refreshTokenHash: hashToken(nextRefreshToken),
      revokedAt: null,
      userAgent: meta.userAgent,
    },
    where: { id: session.id },
  });

  return { accessToken: nextAccessToken, refreshToken: nextRefreshToken };
};

export const revokeSession = (
  prisma: PrismaExecutor,
  sessionId: string
): Promise<unknown> =>
  prisma.authSession.updateMany({
    data: { revokedAt: new Date() },
    where: { id: sessionId, revokedAt: null },
  });

export const createPasswordResetToken = (
  prisma: PrismaExecutor,
  input: { expiresAt: Date; tokenHash: string; userId: string }
) => prisma.passwordResetToken.create({ data: input });

export const invalidatePasswordResetTokens = (
  prisma: PrismaExecutor,
  userId: string,
  usedAt: Date
) =>
  prisma.passwordResetToken.updateMany({
    data: { usedAt },
    where: { usedAt: null, userId },
  });

export const revokeUserSessions = (
  prisma: PrismaExecutor,
  userId: string,
  revokedAt: Date
) =>
  prisma.authSession.updateMany({
    data: { revokedAt },
    where: { revokedAt: null, userId },
  });

export const updatePasswordHash = (
  prisma: PrismaExecutor,
  userId: string,
  passwordHash: string
) =>
  prisma.user.update({
    data: { passwordHash },
    where: { id: userId },
  });

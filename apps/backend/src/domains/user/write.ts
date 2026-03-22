import { randomUUID } from "node:crypto";

import { prisma } from "../../database/client";
import { userAuthorizationSelect } from "../../database/selects/user";
import { hashToken } from "../../lib/auth/token-hash";
import { issueAccessToken, issueRefreshToken } from "../../lib/auth/tokens";
import type { RequestMeta } from "../../lib/http/request-meta";
import type { AuthUser } from "./read";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const createSessionExpiry = (): Date => {
  const expiresAt = Date.now() + DAY_IN_MS * 30;
  return new Date(expiresAt);
};

export const createAuthUser = (input: {
  email: string;
  firstName: string | null;
  lastName: string | null;
  passwordHash: string;
}): Promise<AuthUser> =>
  prisma.user.create({
    data: {
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      passwordHash: input.passwordHash,
    },
    select: userAuthorizationSelect,
  });

export const createSessionForUser = async (
  authUser: AuthUser,
  meta: RequestMeta
) => {
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

  await prisma.authSession.create({
    data: {
      expiresAt: createSessionExpiry(),
      id: sessionId,
      ipAddress: meta.ipAddress,
      refreshTokenHash: hashToken(refreshToken),
      userAgent: meta.userAgent,
      userId: authUser.id,
    },
  });

  await prisma.user.update({
    data: {
      lastLoginAt: new Date(),
    },
    where: {
      id: authUser.id,
    },
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const rotateSessionTokens = async (
  session: { id: string },
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

  await prisma.authSession.update({
    data: {
      expiresAt: createSessionExpiry(),
      ipAddress: meta.ipAddress,
      refreshTokenHash: hashToken(nextRefreshToken),
      revokedAt: null,
      userAgent: meta.userAgent,
    },
    where: {
      id: session.id,
    },
  });

  return {
    nextAccessToken,
    nextRefreshToken,
  };
};

export const revokeSessionByRefreshTokenId = async (
  sessionId: string
): Promise<void> => {
  await prisma.authSession.updateMany({
    data: {
      revokedAt: new Date(),
    },
    where: {
      id: sessionId,
      revokedAt: null,
    },
  });
};

import type { DatabaseExecutor } from "../../database/types";

interface CreateUserInput {
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
}

interface CreateSessionInput {
  id: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  userAgent: string | null;
  ipAddress: string | null;
}

interface RotateSessionInput {
  id: string;
  refreshTokenHash: string;
  expiresAt: Date;
  userAgent: string | null;
  ipAddress: string | null;
}

export const createUser = (db: DatabaseExecutor, input: CreateUserInput) =>
  db.user.create({
    data: {
      email: input.email,
      firstName: input.firstName ?? null,
      lastName: input.lastName ?? null,
      passwordHash: input.passwordHash,
    },
  });

export const touchLastLogin = (db: DatabaseExecutor, userId: string) =>
  db.user.update({
    data: {
      lastLoginAt: new Date(),
    },
    where: { id: userId },
  });

export const createSession = (
  db: DatabaseExecutor,
  input: CreateSessionInput
) =>
  db.authSession.create({
    data: {
      expiresAt: input.expiresAt,
      id: input.id,
      ipAddress: input.ipAddress,
      refreshTokenHash: input.refreshTokenHash,
      userAgent: input.userAgent,
      userId: input.userId,
    },
  });

export const rotateSession = (
  db: DatabaseExecutor,
  input: RotateSessionInput
) =>
  db.authSession.update({
    data: {
      expiresAt: input.expiresAt,
      ipAddress: input.ipAddress,
      refreshTokenHash: input.refreshTokenHash,
      revokedAt: null,
      userAgent: input.userAgent,
    },
    where: {
      id: input.id,
    },
  });

export const revokeSession = (db: DatabaseExecutor, sessionId: string) =>
  db.authSession.updateMany({
    data: {
      revokedAt: new Date(),
    },
    where: {
      id: sessionId,
      revokedAt: null,
    },
  });

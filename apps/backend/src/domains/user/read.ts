import type { AppPrismaClient } from "../../core/types";
import { userAuthorizationSelect } from "../../database/selects/user";
import type { UserAuthorizationRecord } from "../../database/selects/user";
import type { Prisma } from "../../generated/prisma/client.js";

export type AuthUser = UserAuthorizationRecord;
export type AuthSessionRecord =
  Prisma.AuthSessionGetPayload<Prisma.AuthSessionDefaultArgs>;

export const findUserByEmailForAuth = (
  prisma: AppPrismaClient,
  email: string
): Promise<AuthUser | null> =>
  prisma.user.findUnique({
    select: userAuthorizationSelect,
    where: { email },
  });

export const findUserByIdForAuth = (
  prisma: AppPrismaClient,
  userId: string
): Promise<AuthUser | null> =>
  prisma.user.findUnique({
    select: userAuthorizationSelect,
    where: { id: userId },
  });

export const findSessionById = (
  prisma: AppPrismaClient,
  sessionId: string
): Promise<AuthSessionRecord | null> =>
  prisma.authSession.findUnique({
    where: { id: sessionId },
  });

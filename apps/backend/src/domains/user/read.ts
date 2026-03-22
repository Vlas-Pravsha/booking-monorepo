import type { Prisma } from "@prisma/client";

import { prisma } from "../../database/client";
import { userAuthorizationSelect } from "../../database/selects/user";
import type { UserAuthorizationRecord } from "../../database/selects/user";

export type AuthUser = UserAuthorizationRecord;
export type AuthSessionRecord =
  Prisma.AuthSessionGetPayload<Prisma.AuthSessionDefaultArgs>;

export const findUserByEmailForAuth = (
  email: string
): Promise<AuthUser | null> =>
  prisma.user.findUnique({
    select: userAuthorizationSelect,
    where: { email },
  });

export const findUserByIdForAuth = (userId: string): Promise<AuthUser | null> =>
  prisma.user.findUnique({
    select: userAuthorizationSelect,
    where: { id: userId },
  });

export const findSessionById = (
  sessionId: string
): Promise<AuthSessionRecord | null> =>
  prisma.authSession.findUnique({
    where: { id: sessionId },
  });

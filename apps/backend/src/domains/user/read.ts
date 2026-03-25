import type { PrismaExecutor } from "../../core/types";
import { userAuthorizationSelect } from "../../database/selects/user";
import type { UserAuthorizationRecord } from "../../database/selects/user";
import type { Prisma } from "../../generated/prisma/client.js";

export type AuthUser = UserAuthorizationRecord;
export type AuthSessionRecord =
  Prisma.AuthSessionGetPayload<Prisma.AuthSessionDefaultArgs>;
export type PasswordResetTokenRecord = Prisma.PasswordResetTokenGetPayload<{
  include: {
    user: {
      select: typeof userAuthorizationSelect;
    };
  };
}>;

export const findUserByEmailForAuth = (
  prisma: PrismaExecutor,
  email: string
): Promise<AuthUser | null> =>
  prisma.user.findUnique({
    select: userAuthorizationSelect,
    where: { email },
  });

export const findUserByIdForAuth = (
  prisma: PrismaExecutor,
  userId: string
): Promise<AuthUser | null> =>
  prisma.user.findUnique({
    select: userAuthorizationSelect,
    where: { id: userId },
  });

export const findSessionById = (
  prisma: PrismaExecutor,
  sessionId: string
): Promise<AuthSessionRecord | null> =>
  prisma.authSession.findUnique({
    where: { id: sessionId },
  });

export const findPasswordResetTokenByHash = (
  prisma: PrismaExecutor,
  tokenHash: string
): Promise<PasswordResetTokenRecord | null> =>
  prisma.passwordResetToken.findUnique({
    include: {
      user: {
        select: userAuthorizationSelect,
      },
    },
    where: { tokenHash },
  });

import type { PrismaExecutor } from "../../core/types";
import type { Prisma } from "../../generated/prisma/client.js";
import { userSelect } from "./queries";
import type { UserRecord as TUserRecord } from "./queries";

export type UserRecord = TUserRecord;

export type AuthSessionRecord =
  Prisma.AuthSessionGetPayload<Prisma.AuthSessionDefaultArgs>;

export type PasswordResetTokenRecord = Prisma.PasswordResetTokenGetPayload<{
  include: {
    user: { select: typeof userSelect };
  };
}>;

export const findUserByEmail = (
  prisma: PrismaExecutor,
  email: string
): Promise<UserRecord | null> =>
  prisma.user.findUnique({ select: userSelect, where: { email } });

export const findUserById = (
  prisma: PrismaExecutor,
  userId: string
): Promise<UserRecord | null> =>
  prisma.user.findUnique({ select: userSelect, where: { id: userId } });

export const findSessionById = (
  prisma: PrismaExecutor,
  sessionId: string
): Promise<AuthSessionRecord | null> =>
  prisma.authSession.findUnique({ where: { id: sessionId } });

export const findPasswordResetTokenByHash = (
  prisma: PrismaExecutor,
  tokenHash: string
): Promise<PasswordResetTokenRecord | null> =>
  prisma.passwordResetToken.findUnique({
    include: { user: { select: userSelect } },
    where: { tokenHash },
  });

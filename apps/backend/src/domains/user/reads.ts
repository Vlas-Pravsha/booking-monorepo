import type { AuthSession } from "@prisma/client";

import { userAuthorizationSelect } from "../../database/schemas/user";
import type { DatabaseExecutor } from "../../database/types";

export const findUserByEmailForAuth = (db: DatabaseExecutor, email: string) =>
  db.user.findUnique({
    select: userAuthorizationSelect,
    where: { email },
  });

export const findUserByIdForAuth = (db: DatabaseExecutor, userId: string) =>
  db.user.findUnique({
    select: userAuthorizationSelect,
    where: { id: userId },
  });

export const findSessionById = (
  db: DatabaseExecutor,
  sessionId: string
): Promise<AuthSession | null> =>
  db.authSession.findUnique({
    where: { id: sessionId },
  });

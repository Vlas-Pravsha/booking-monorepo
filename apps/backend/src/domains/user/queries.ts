import type { Prisma } from "../../generated/prisma/client.js";

export const userSelect = {
  createdAt: true,
  email: true,
  firstName: true,
  id: true,
  lastLoginAt: true,
  lastName: true,
  passwordHash: true,
  status: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export type UserRecord = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

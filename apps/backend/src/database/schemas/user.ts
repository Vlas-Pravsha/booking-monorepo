import type { Prisma } from "@prisma/client";

export const userAuthorizationSelect = {
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

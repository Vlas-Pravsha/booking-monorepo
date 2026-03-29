import type { AuthUser } from "./read";

export const toPublicUser = (user: AuthUser) => ({
  createdAt: user.createdAt.toISOString(),
  email: user.email,
  firstName: user.firstName,
  id: user.id,
  lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
  lastName: user.lastName,
  status: user.status,
  updatedAt: user.updatedAt.toISOString(),
});

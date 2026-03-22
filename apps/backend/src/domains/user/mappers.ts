import type { AuthUser } from "./read";

export const toPublicUser = (user: AuthUser) => ({
  createdAt: user.createdAt,
  email: user.email,
  firstName: user.firstName,
  id: user.id,
  lastLoginAt: user.lastLoginAt,
  lastName: user.lastName,
  status: user.status,
  updatedAt: user.updatedAt,
});

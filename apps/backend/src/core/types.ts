import type { PrismaClient } from "../generated/prisma/client.js";

export interface AuthIdentity {
  userId: string;
  email: string;
  sessionId: string;
}

export type AppPrismaClient = PrismaClient;

export interface RequestContextVariables {
  auth: AuthIdentity;
  prisma: AppPrismaClient;
  requestId: string;
}

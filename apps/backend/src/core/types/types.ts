import type { Prisma, PrismaClient } from "../../generated/prisma/client";

export interface AuthIdentity {
  userId: string;
  email: string;
  sessionId: string;
}

export type AppPrismaClient = PrismaClient;
export type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export interface RequestContextVariables {
  auth: AuthIdentity;
  prisma: AppPrismaClient;
  requestId: string;
}

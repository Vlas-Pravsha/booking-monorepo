import type { Prisma, PrismaClient } from "@prisma/client";

export type DatabaseExecutor = PrismaClient | Prisma.TransactionClient;

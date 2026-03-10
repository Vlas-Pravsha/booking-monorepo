import { PrismaClient } from "@prisma/client";

import { env } from "../lib/env";

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

const createPrismaClient = (): PrismaClient =>
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

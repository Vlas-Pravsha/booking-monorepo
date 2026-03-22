import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";
import type { MiddlewareHandler } from "hono";

import type { RequestContextVariables } from "../core/types";
import { PrismaClient } from "../generated/prisma/client.js";
import { env } from "./env";

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

const createPrismaClient = (): PrismaClient => {
  const adapter = new PrismaBetterSqlite3(
    { url: env.DATABASE_URL },
    { timestampFormat: "unixepoch-ms" }
  );

  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const withPrisma: MiddlewareHandler<{
  Variables: RequestContextVariables;
}> = async (c, next) => {
  if (!c.get("prisma")) {
    c.set("prisma", prisma);
  }

  await next();
};

import type { AppPrismaClient } from "../../core/types";
import { Prisma } from "../../generated/prisma/client.js";

const DATABASE_HEALTH_TIMEOUT_MS = 300;

export const checkDatabaseHealth = async (prisma: AppPrismaClient) => {
  const startedAt = Date.now();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    await Promise.race([
      prisma.$queryRaw(Prisma.sql`SELECT 1`),
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(
            new Error(
              `Database health check timed out after ${DATABASE_HEALTH_TIMEOUT_MS}ms`
            )
          );
        }, DATABASE_HEALTH_TIMEOUT_MS);
      }),
    ]);

    return {
      latencyMs: Date.now() - startedAt,
      status: "ok",
    };
  } catch {
    return {
      latencyMs: Date.now() - startedAt,
      status: "error",
    };
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};

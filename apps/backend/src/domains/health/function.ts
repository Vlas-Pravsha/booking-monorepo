import { formatISO } from "date-fns";

import type { AppPrismaClient } from "../../core/types";
import { checkDatabaseHealth } from "./read";

const HEALTHY_RESPONSE = { status: "ok" } as const;

type ReadinessStatusCode = 200 | 503;

export const getLivenessHealth = () => HEALTHY_RESPONSE;

export const getReadinessHealth = async (prisma: AppPrismaClient) => {
  const db = await checkDatabaseHealth(prisma);
  const statusCode: ReadinessStatusCode = db.status === "ok" ? 200 : 503;

  return {
    body: {
      services: { db },
      status: db.status,
      timestamp: formatISO(new Date()),
    },
    statusCode,
  };
};

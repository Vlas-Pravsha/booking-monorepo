import { Hono } from "hono";

import type { RequestContextVariables } from "../core/types";
import {
  getLivenessHealth,
  getReadinessHealth,
} from "../domains/health/function";

export const healthRoutes = new Hono<{
  Variables: RequestContextVariables;
}>();

healthRoutes.use("*", async (c, next) => {
  c.header("Cache-Control", "no-store");

  await next();
});

healthRoutes.get("/health", (c) => c.json(getLivenessHealth()));

healthRoutes.get("/healthz", (c) => c.json(getLivenessHealth()));

healthRoutes.get("/ready", async (c) => {
  const prisma = c.get("prisma");
  const result = await getReadinessHealth(prisma);

  return c.json(result.body, result.statusCode);
});

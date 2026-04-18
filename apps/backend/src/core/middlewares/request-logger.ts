import type { MiddlewareHandler } from "hono";

import { logger } from "../logger/logger";
import type { RequestContextVariables } from "../types";

const HEALTH_CHECK_PATHS = new Set(["/health", "/healthz", "/ready"]);

export const requestLoggerMiddleware: MiddlewareHandler<{
  Variables: RequestContextVariables;
}> = async (c, next) => {
  const startedAt = Date.now();

  await next();

  if (HEALTH_CHECK_PATHS.has(c.req.path)) {
    return;
  }

  logger.info(
    {
      durationMs: Date.now() - startedAt,
      method: c.req.method,
      path: c.req.path,
      requestId: c.get("requestId"),
      statusCode: c.res.status,
    },
    "request.completed"
  );
};

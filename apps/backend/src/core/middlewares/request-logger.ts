import type { MiddlewareHandler } from "hono";

import { logger } from "../logger";
import type { RequestContextVariables } from "../types";

export const requestLoggerMiddleware: MiddlewareHandler<{
  Variables: RequestContextVariables;
}> = async (c, next) => {
  const startedAt = Date.now();

  await next();

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

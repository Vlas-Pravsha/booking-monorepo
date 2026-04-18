import { randomUUID } from "node:crypto";

import type { MiddlewareHandler } from "hono";

import type { RequestContextVariables } from "../types";

export const requestIdMiddleware: MiddlewareHandler<{
  Variables: RequestContextVariables;
}> = async (c, next) => {
  const requestId = c.req.header("x-request-id") ?? randomUUID();

  c.set("requestId", requestId);
  c.header("x-request-id", requestId);

  await next();
};

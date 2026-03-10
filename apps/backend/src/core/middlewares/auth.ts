import type { MiddlewareHandler } from "hono";

import { verifyAccessToken } from "../../lib/auth/tokens";
import { ApiError } from "../api-error";
import type { RequestContextVariables } from "../types";

const parseBearerToken = (headerValue: string | undefined): string | null => {
  if (!headerValue) {
    return null;
  }

  const [scheme, token] = headerValue.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
};

export const authenticate: MiddlewareHandler<{
  Variables: RequestContextVariables;
}> = async (c, next) => {
  const token = parseBearerToken(c.req.header("authorization"));

  if (!token) {
    throw ApiError.unauthorized("Missing bearer token");
  }

  const payload = await verifyAccessToken(token);

  c.set("auth", {
    email: payload.email,
    sessionId: payload.sessionId,
    userId: payload.userId,
  });

  await next();
};

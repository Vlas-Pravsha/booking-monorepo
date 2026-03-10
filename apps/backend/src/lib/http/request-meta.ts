import type { Context } from "hono";

export interface RequestMeta {
  ipAddress: string | null;
  userAgent: string | null;
}

export const readRequestMeta = (c: Context): RequestMeta => {
  const forwardedFor = c.req.header("x-forwarded-for");

  return {
    ipAddress: forwardedFor?.split(",")[0]?.trim() ?? null,
    userAgent: c.req.header("user-agent") ?? null,
  };
};

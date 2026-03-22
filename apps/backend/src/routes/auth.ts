import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import {
  loginInputSchema,
  refreshTokenInputSchema,
  registerInputSchema,
} from "../contracts/zod/auth";
import { authenticate } from "../core/middlewares/auth";
import type { RequestContextVariables } from "../core/types";
import {
  getCurrentUser,
  loginUser,
  logoutWithRefreshToken,
  refreshSession,
  registerUser,
} from "../domains/user/functions";
import { readRequestMeta } from "../lib/http/request-meta";

export const authRoutes = new Hono<{
  Variables: RequestContextVariables;
}>();

authRoutes.post(
  "/register",
  zValidator("json", registerInputSchema),
  async (c) => {
    const prisma = c.get("prisma");
    const payload = c.req.valid("json");
    const meta = readRequestMeta(c);
    const result = await registerUser(prisma, payload, meta);

    return c.json(
      {
        data: result,
      },
      201
    );
  }
);

authRoutes.post("/login", zValidator("json", loginInputSchema), async (c) => {
  const prisma = c.get("prisma");
  const payload = c.req.valid("json");
  const meta = readRequestMeta(c);
  const result = await loginUser(prisma, payload, meta);

  return c.json({
    data: result,
  });
});

authRoutes.post(
  "/refresh",
  zValidator("json", refreshTokenInputSchema),
  async (c) => {
    const prisma = c.get("prisma");
    const payload = c.req.valid("json");
    const meta = readRequestMeta(c);
    const result = await refreshSession(prisma, payload.refreshToken, meta);

    return c.json({
      data: result,
    });
  }
);

authRoutes.post(
  "/logout",
  zValidator("json", refreshTokenInputSchema),
  async (c) => {
    const prisma = c.get("prisma");
    const payload = c.req.valid("json");

    await logoutWithRefreshToken(prisma, payload.refreshToken);

    return c.json({
      data: {
        success: true,
      },
    });
  }
);

authRoutes.get("/me", authenticate, async (c) => {
  const prisma = c.get("prisma");
  const auth = c.get("auth");
  const result = await getCurrentUser(prisma, auth.userId);

  return c.json({
    data: result,
  });
});

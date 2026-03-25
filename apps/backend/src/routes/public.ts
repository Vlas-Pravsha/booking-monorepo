import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { contactRequestInputSchema } from "../contracts/zod/public";
import type { RequestContextVariables } from "../core/types";
import { createMarketingContactRequest } from "../domains/contact/functions";
import { readRequestMeta } from "../lib/http/request-meta";

export const publicRoutes = new Hono<{
  Variables: RequestContextVariables;
}>();

publicRoutes.post(
  "/contact-requests",
  zValidator("json", contactRequestInputSchema),
  async (c) => {
    const prisma = c.get("prisma");
    const payload = c.req.valid("json");
    const meta = readRequestMeta(c);
    const result = await createMarketingContactRequest(prisma, payload, meta);

    return c.json({ data: result }, 201);
  }
);

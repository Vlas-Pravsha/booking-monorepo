import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import {
  restaurantDomainParamsSchema,
  restaurantUpsertInputSchema,
} from "../contracts/zod/restaurant";
import { authenticate } from "../core/middlewares/auth";
import type { RequestContextVariables } from "../core/types";
import {
  getRestaurantByDomain,
  getRestaurantForOwner,
  upsertRestaurantForOwner,
} from "../domains/restaurant/functions";

export const restaurantRoutes = new Hono<{
  Variables: RequestContextVariables;
}>();

restaurantRoutes.get(
  "/domain/:domain",
  zValidator("param", restaurantDomainParamsSchema),
  async (c) => {
    const prisma = c.get("prisma");
    const { domain } = c.req.valid("param");
    const result = await getRestaurantByDomain(prisma, domain);

    return c.json({
      data: result,
    });
  }
);

restaurantRoutes.get("/me", authenticate, async (c) => {
  const prisma = c.get("prisma");
  const auth = c.get("auth");
  const result = await getRestaurantForOwner(prisma, auth.userId);

  return c.json({
    data: result,
  });
});

restaurantRoutes.put(
  "/me",
  authenticate,
  zValidator("json", restaurantUpsertInputSchema),
  async (c) => {
    const prisma = c.get("prisma");
    const auth = c.get("auth");
    const payload = c.req.valid("json");
    const result = await upsertRestaurantForOwner(prisma, auth.userId, payload);

    return c.json({
      data: result,
    });
  }
);

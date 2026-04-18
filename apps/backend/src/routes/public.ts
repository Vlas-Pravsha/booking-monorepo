import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import {
  contactRequestInputSchema,
  publicRestaurantDomainParamsSchema,
  reservationAvailabilityQuerySchema,
  reservationCreateInputSchema,
} from "../contracts/zod/public";
import type { RequestContextVariables } from "../core/types";
import {
  createPublicReservation,
  getPublicReservationAvailability,
} from "../domains/booking/functions";
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

publicRoutes.get(
  "/restaurants/:domain/reservations/availability",
  zValidator("param", publicRestaurantDomainParamsSchema),
  zValidator("query", reservationAvailabilityQuerySchema),
  async (c) => {
    const prisma = c.get("prisma");
    const { domain } = c.req.valid("param");
    const payload = c.req.valid("query");
    const result = await getPublicReservationAvailability(
      prisma,
      domain,
      payload
    );

    return c.json({ data: result });
  }
);

publicRoutes.post(
  "/restaurants/:domain/reservations",
  zValidator("param", publicRestaurantDomainParamsSchema),
  zValidator("json", reservationCreateInputSchema),
  async (c) => {
    const prisma = c.get("prisma");
    const { domain } = c.req.valid("param");
    const payload = c.req.valid("json");
    const result = await createPublicReservation(prisma, domain, payload);

    return c.json({ data: result }, 201);
  }
);

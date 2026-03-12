import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import {
  bookingStatusUpdateInputSchema,
  customerUpdateInputSchema,
  entityIdParamsSchema,
  tableStatusOverrideUpdateInputSchema,
} from "../contracts";
import { authenticate } from "../core/middlewares/auth";
import type { RequestContextVariables } from "../core/types";
import {
  getAdminBookings,
  getAdminCustomers,
  getAdminTables,
  updateAdminBookingStatus,
  updateAdminCustomer,
  updateAdminTableStatusOverride,
} from "../domains/admin/functions";

export const adminRoutes = new Hono<{
  Variables: RequestContextVariables;
}>();

adminRoutes.use("*", authenticate);

adminRoutes.get("/bookings", async (c) => {
  const auth = c.get("auth");
  const result = await getAdminBookings(auth.userId);

  return c.json({
    data: result,
  });
});

adminRoutes.patch(
  "/bookings/:id/status",
  zValidator("param", entityIdParamsSchema),
  zValidator("json", bookingStatusUpdateInputSchema),
  async (c) => {
    const auth = c.get("auth");
    const { id } = c.req.valid("param");
    const payload = c.req.valid("json");
    const result = await updateAdminBookingStatus(auth.userId, id, payload);

    return c.json({
      data: result,
    });
  }
);

adminRoutes.get("/customers", async (c) => {
  const auth = c.get("auth");
  const result = await getAdminCustomers(auth.userId);

  return c.json({
    data: result,
  });
});

adminRoutes.patch(
  "/customers/:id",
  zValidator("param", entityIdParamsSchema),
  zValidator("json", customerUpdateInputSchema),
  async (c) => {
    const auth = c.get("auth");
    const { id } = c.req.valid("param");
    const payload = c.req.valid("json");
    const result = await updateAdminCustomer(auth.userId, id, payload);

    return c.json({
      data: result,
    });
  }
);

adminRoutes.get("/tables", async (c) => {
  const auth = c.get("auth");
  const result = await getAdminTables(auth.userId);

  return c.json({
    data: result,
  });
});

adminRoutes.patch(
  "/tables/:id/status",
  zValidator("param", entityIdParamsSchema),
  zValidator("json", tableStatusOverrideUpdateInputSchema),
  async (c) => {
    const auth = c.get("auth");
    const { id } = c.req.valid("param");
    const payload = c.req.valid("json");
    const result = await updateAdminTableStatusOverride(
      auth.userId,
      id,
      payload
    );

    return c.json({
      data: result,
    });
  }
);

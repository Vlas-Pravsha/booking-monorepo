import { Hono } from "hono";

import type { RequestContextVariables } from "../core/types";
import { adminRoutes } from "./admin";
import { authRoutes } from "./auth";
import { restaurantRoutes } from "./restaurants";

export const apiRoutes = new Hono<{
  Variables: RequestContextVariables;
}>();

apiRoutes.route("/admin", adminRoutes);
apiRoutes.route("/auth", authRoutes);
apiRoutes.route("/restaurants", restaurantRoutes);

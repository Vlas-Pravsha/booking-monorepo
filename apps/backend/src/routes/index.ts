import { Hono } from "hono";

import type { RequestContextVariables } from "../core/types";
import { authRoutes } from "./auth";

export const apiRoutes = new Hono<{
  Variables: RequestContextVariables;
}>();

apiRoutes.route("/auth", authRoutes);

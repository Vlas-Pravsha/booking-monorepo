import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";

import { errorHandler } from "./core/middlewares/error-handler";
import { requestIdMiddleware } from "./core/middlewares/request-id";
import { requestLoggerMiddleware } from "./core/middlewares/request-logger";
import type { RequestContextVariables } from "./core/types";
import { apiRoutes } from "./routes";

const app = new Hono<{
  Variables: RequestContextVariables;
}>();

app.use("*", requestIdMiddleware);
app.use("*", requestLoggerMiddleware);
app.use("*", secureHeaders());
app.use(
  "*",
  cors({
    allowHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    origin: "*",
  })
);

app.get("/", (c) =>
  c.json({
    service: "booking-backend working",
    status: "ok",
  })
);

app.route("/api", apiRoutes);

app.notFound((c) =>
  c.json(
    {
      error: {
        code: "NOT_FOUND",
        message: "Route not found",
        requestId: c.get("requestId"),
      },
    },
    404
  )
);

app.onError(errorHandler);

export default app;

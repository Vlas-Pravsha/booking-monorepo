import "dotenv/config";
import { serve } from "@hono/node-server";

import { logger } from "./core/logger";
import app from "./index";
import { env } from "./lib/env";

serve({
  fetch: app.fetch,
  port: env.PORT,
});

logger.info({ port: env.PORT }, "Backend server started");

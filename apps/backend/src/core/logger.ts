import pino from "pino";

import { env } from "../lib/env";

export const logger = pino({
  base: undefined,
  level: env.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport:
    env.NODE_ENV === "development"
      ? {
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:standard",
          },
          target: "pino-pretty",
        }
      : undefined,
});

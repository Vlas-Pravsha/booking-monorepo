// oxlint-disable typescript/no-explicit-any
import type { ErrorHandler } from "hono";

import { ApiError, isApiError } from "../api-error";
import { logger } from "../logger";
import type { RequestContextVariables } from "../types";

export const errorHandler: ErrorHandler<{
  Variables: RequestContextVariables;
}> = (error, c) => {
  const requestId = c.get("requestId");

  if (isApiError(error)) {
    logger.warn(
      {
        code: error.code,
        details: error.details,
        requestId,
        statusCode: error.statusCode,
      },
      error.message
    );

    return c.json(
      {
        error: {
          code: error.code,
          details: error.details,
          message: error.message,
          requestId,
        },
      },
      error.statusCode as any
    );
  }

  logger.error(
    {
      error,
      requestId,
    },
    "Unexpected error"
  );

  const fallbackError = ApiError.internal("Internal server error");

  return c.json(
    {
      error: {
        code: fallbackError.code,
        message: fallbackError.message,
        requestId,
      },
    },
    fallbackError.statusCode as any
  );
};

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  public constructor(
    statusCode: number,
    code: string,
    message: string,
    details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  public static badRequest(message: string, details?: unknown): ApiError {
    return new ApiError(400, "BAD_REQUEST", message, details);
  }

  public static unauthorized(message: string, details?: unknown): ApiError {
    return new ApiError(401, "UNAUTHORIZED", message, details);
  }

  public static forbidden(message: string, details?: unknown): ApiError {
    return new ApiError(403, "FORBIDDEN", message, details);
  }

  public static notFound(message: string, details?: unknown): ApiError {
    return new ApiError(404, "NOT_FOUND", message, details);
  }

  public static conflict(message: string, details?: unknown): ApiError {
    return new ApiError(409, "CONFLICT", message, details);
  }

  public static internal(message: string, details?: unknown): ApiError {
    return new ApiError(500, "INTERNAL_SERVER_ERROR", message, details);
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError;

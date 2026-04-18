interface ApiErrorOptions {
  code?: string;
  details?: unknown;
  requestId?: string;
  status?: number;
}

export class ApiError extends Error {
  public readonly code?: string;
  public readonly details?: unknown;
  public readonly requestId?: string;
  public readonly status?: number;

  constructor(message: string, options: ApiErrorOptions = {}) {
    super(message);
    this.name = "ApiError";
    this.code = options.code;
    this.details = options.details;
    this.requestId = options.requestId;
    this.status = options.status;
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError;

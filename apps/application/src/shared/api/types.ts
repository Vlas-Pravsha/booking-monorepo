export interface ApiResult<T> {
  data: T;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
}

export interface ApiErrorPayload {
  code?: string;
  details?: unknown;
  message: string;
  requestId?: string;
}

export interface ApiErrorResponse {
  error: ApiErrorPayload;
}

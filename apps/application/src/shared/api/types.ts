export type { ApiResult } from "@booking/contracts/shared";

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

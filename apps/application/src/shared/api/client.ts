import { env } from "@/shared/config";

import { ApiError } from "./errors";
import type { ApiErrorResponse } from "./types";

const DEFAULT_DELAY_MS = 300;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export interface MockRequestOptions {
  delayMs?: number;
}

export interface ApiRequestOptions extends Omit<
  RequestInit,
  "body" | "headers"
> {
  body?: BodyInit | object | undefined;
  headers?: HeadersInit;
}

const parseResponseBody = async (
  response: Response
): Promise<unknown | undefined> => {
  const text = await response.text();

  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

const resolveUrl = (path: string): string => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, env.NEXT_PUBLIC_API_URL).toString();
};

const shouldSerializeBody = (body: ApiRequestOptions["body"]): body is object =>
  typeof body === "object" &&
  body !== null &&
  !(body instanceof ArrayBuffer) &&
  !(body instanceof Blob) &&
  !(body instanceof FormData) &&
  !(body instanceof URLSearchParams);

export const apiRequest = async <T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> => {
  const headers = new Headers(options.headers);
  const body = shouldSerializeBody(options.body)
    ? JSON.stringify(options.body)
    : options.body;

  if (shouldSerializeBody(options.body) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(resolveUrl(path), {
    ...options,
    body,
    headers,
  });

  const payload = (await parseResponseBody(response)) as
    | ApiErrorResponse
    | T
    | undefined;

  if (!response.ok) {
    const errorPayload =
      typeof payload === "object" && payload && "error" in payload
        ? payload.error
        : undefined;

    throw new ApiError(errorPayload?.message ?? "Request failed", {
      code: errorPayload?.code,
      details: errorPayload?.details,
      requestId: errorPayload?.requestId,
      status: response.status,
    });
  }

  return payload as T;
};

export const mockRequest = async <T>(
  data: T,
  options: MockRequestOptions = {}
): Promise<T> => {
  await sleep(options.delayMs ?? DEFAULT_DELAY_MS);
  return structuredClone(data);
};

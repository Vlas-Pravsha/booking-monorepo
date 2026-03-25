"use client";

import { useMutation } from "@tanstack/react-query";

import { apiRequest } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

export interface ContactRequestPayload {
  email: string;
  message: string;
  name: string;
  phone: string;
}

export const contactRequestApi = {
  send: (
    payload: ContactRequestPayload
  ): Promise<{ success: true; submittedAt: string }> =>
    apiRequest<ApiResult<{ success: true; submittedAt: string }>>(
      "/api/public/contact-requests",
      {
        body: payload,
        method: "POST",
      }
    ).then((response) => response.data),
};

export const useSendContactRequest = () =>
  useMutation({
    mutationFn: (payload: ContactRequestPayload) =>
      contactRequestApi.send(payload),
  });

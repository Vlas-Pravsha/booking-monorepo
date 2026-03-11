"use client";

import { useMutation } from "@tanstack/react-query";

import { mockRequest } from "@/shared/api";

export interface ContactRequestPayload {
  email: string;
  message: string;
  name: string;
  phone: string;
}

export const contactRequestApi = {
  send: (
    _payload: ContactRequestPayload
  ): Promise<{ success: true; submittedAt: string }> =>
    mockRequest(
      {
        submittedAt: new Date().toISOString(),
        success: true as const,
      },
      {
        delayMs: 1500,
      }
    ),
};

export const useSendContactRequest = () =>
  useMutation({
    mutationFn: (payload: ContactRequestPayload) =>
      contactRequestApi.send(payload),
  });

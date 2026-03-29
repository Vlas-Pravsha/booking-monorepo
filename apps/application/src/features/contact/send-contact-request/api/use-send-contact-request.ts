"use client";

import {
  contactRequestInputSchema,
  contactRequestResultSchema,
} from "@booking/contracts/public";
import type {
  ContactRequestPayload,
  ContactRequestResult,
} from "@booking/contracts/public";
import { useMutation } from "@tanstack/react-query";

import { apiRequest } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

export const contactRequestApi = {
  send: (payload: ContactRequestPayload): Promise<ContactRequestResult> =>
    apiRequest<ApiResult<ContactRequestResult>>(
      "/api/public/contact-requests",
      {
        body: contactRequestInputSchema.parse(payload),
        method: "POST",
      }
    ).then((response) => contactRequestResultSchema.parse(response.data)),
};

export const useSendContactRequest = () =>
  useMutation({
    mutationFn: (payload: ContactRequestPayload) =>
      contactRequestApi.send(payload),
  });

"use client";

import {
  bookingListResponseSchema,
  bookingStatusUpdateInputSchema,
  bookingStatusUpdateResultSchema,
} from "@booking/contracts/admin";
import type { BookingStatusUpdateResult } from "@booking/contracts/admin";
import { useQuery } from "@tanstack/react-query";

import { apiRequest, getAuthHeaders } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

import type { Booking, BookingListResponse } from "../model/types";

export const bookingQueryKeys = {
  all: ["bookings"] as const,
  availability: (
    domain: string,
    date: string | null,
    time: string | null,
    guests: number | null
  ) =>
    [
      ...bookingQueryKeys.availabilityAll(),
      domain,
      date,
      time,
      guests,
    ] as const,
  availabilityAll: () => [...bookingQueryKeys.all, "availability"] as const,
  list: (accessToken: string | null) =>
    [...bookingQueryKeys.listAll(), accessToken] as const,
  listAll: () => [...bookingQueryKeys.all, "list"] as const,
};

export const bookingApi = {
  getList: async (accessToken: string): Promise<BookingListResponse> => {
    const response = await apiRequest<ApiResult<BookingListResponse>>(
      "/api/admin/bookings",
      {
        headers: getAuthHeaders({ accessToken }),
        method: "GET",
      }
    );

    return bookingListResponseSchema.parse(response.data);
  },
  updateStatus: async (
    accessToken: string,
    bookingId: string,
    status: Booking["status"]
  ): Promise<BookingStatusUpdateResult> => {
    const response = await apiRequest<ApiResult<BookingStatusUpdateResult>>(
      `/api/admin/bookings/${encodeURIComponent(bookingId)}/status`,
      {
        body: bookingStatusUpdateInputSchema.parse({
          status,
        }),
        headers: getAuthHeaders({ accessToken }),
        method: "PATCH",
      }
    );

    return bookingStatusUpdateResultSchema.parse(response.data);
  },
};

export const useBookingsQuery = (accessToken: string | null) =>
  useQuery({
    enabled: Boolean(accessToken),
    queryFn: () => bookingApi.getList(accessToken ?? ""),
    queryKey: bookingQueryKeys.list(accessToken),
  });

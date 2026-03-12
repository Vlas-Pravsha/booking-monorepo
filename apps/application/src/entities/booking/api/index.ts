"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiRequest, getAuthHeaders } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

import type { Booking, BookingListResponse } from "../model/types";

export const bookingQueryKeys = {
  all: ["bookings"] as const,
  list: (accessToken: string | null) =>
    [...bookingQueryKeys.all, "list", accessToken] as const,
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

    return response.data;
  },
  updateStatus: async (
    accessToken: string,
    bookingId: string,
    status: Booking["status"]
  ): Promise<{ success: boolean }> => {
    const response = await apiRequest<ApiResult<{ success: boolean }>>(
      `/api/admin/bookings/${encodeURIComponent(bookingId)}/status`,
      {
        body: {
          status,
        },
        headers: getAuthHeaders({ accessToken }),
        method: "PATCH",
      }
    );

    return response.data;
  },
};

export const useBookingsQuery = (accessToken: string | null) =>
  useQuery({
    enabled: Boolean(accessToken),
    queryFn: () => bookingApi.getList(accessToken ?? ""),
    queryKey: bookingQueryKeys.list(accessToken),
  });

export const useUpdateBookingStatusMutation = (accessToken: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      status,
    }: {
      bookingId: string;
      status: Booking["status"];
    }) => bookingApi.updateStatus(accessToken ?? "", bookingId, status),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: bookingQueryKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: ["customers"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["tables"],
        }),
      ]);
    },
  });
};

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Booking } from "@/entities/booking";
import { bookingApi, bookingQueryKeys } from "@/entities/booking";
import { customerQueryKeys } from "@/entities/customer";
import { tableQueryKeys } from "@/entities/table";

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
          queryKey: bookingQueryKeys.listAll(),
        }),
        queryClient.invalidateQueries({
          queryKey: bookingQueryKeys.availabilityAll(),
        }),
        queryClient.invalidateQueries({
          queryKey: customerQueryKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: tableQueryKeys.all,
        }),
      ]);
    },
  });
};

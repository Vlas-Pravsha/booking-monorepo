"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bookingQueryKeys } from "@/entities/booking";
import { mockRequest } from "@/shared/api";

import type { BookingFormData } from "../model/schema";

export function useMakeReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_data: BookingFormData) =>
      mockRequest(
        {
          id: Math.random().toString(36).slice(7),
          success: true as const,
        },
        {
          delayMs: 1500,
        }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: bookingQueryKeys.all,
      });
    },
  });
}

"use client";

import { useMutation } from "@tanstack/react-query";

import type { BookingFormData } from "../model/schema";

export function useMakeReservation() {
  return useMutation({
    mutationFn: async (_data: BookingFormData) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return { id: Math.random().toString(36).substring(7), success: true };
    },
  });
}

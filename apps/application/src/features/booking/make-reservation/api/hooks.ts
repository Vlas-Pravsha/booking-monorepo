"use client";

import { useMutation } from "@tanstack/react-query";

import type { BookingFormData } from "../model/schema";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export function useMakeReservation() {
  return useMutation({
    mutationFn: async (_data: BookingFormData) => {
      // Simulate API call
      await delay(1500);
      return { id: Math.random().toString(36).slice(7), success: true };
    },
  });
}

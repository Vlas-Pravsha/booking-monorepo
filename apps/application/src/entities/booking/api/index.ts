"use client";

import { useQuery } from "@tanstack/react-query";

import { mockRequest } from "@/shared/api";

import { BOOKINGS } from "../model/mock";
import type { Booking } from "../model/types";

export const bookingQueryKeys = {
  all: ["bookings"] as const,
  list: () => [...bookingQueryKeys.all, "list"] as const,
};

export const bookingApi = {
  getList: (): Promise<Booking[]> =>
    mockRequest(BOOKINGS, {
      delayMs: 250,
    }),
};

export const useBookingsQuery = () =>
  useQuery({
    initialData: BOOKINGS,
    queryFn: () => bookingApi.getList(),
    queryKey: bookingQueryKeys.list(),
  });

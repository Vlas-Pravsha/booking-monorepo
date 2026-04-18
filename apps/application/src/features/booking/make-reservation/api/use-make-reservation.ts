"use client";

import {
  reservationAvailabilityResponseSchema,
  reservationCreateInputSchema,
  reservationCreateResultSchema,
} from "@booking/contracts/public";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

import { bookingQueryKeys } from "@/entities/booking";
import { apiRequest } from "@/shared/api";
import type { ApiResult } from "@/shared/api";

import type { BookingFormData } from "../model/schema";

const toReservationDateKey = (date: Date | undefined) =>
  date ? format(date, "yyyy-MM-dd") : null;

const toReservationPayload = (data: BookingFormData) =>
  reservationCreateInputSchema.parse({
    comment: data.comment,
    date: format(data.date, "yyyy-MM-dd"),
    email: data.email,
    guests: data.guests,
    name: data.name,
    phone: data.phone,
    tableId: data.tableId,
    time: data.time,
  });

export function useReservationAvailability(
  domain: string,
  date: Date | undefined,
  time: string | undefined,
  guests: number | undefined
) {
  return useQuery({
    enabled: Boolean(domain && date && time && guests),
    queryFn: async () => {
      if (!(date && time && guests)) {
        throw new Error("Reservation availability query is missing data");
      }

      const searchParams = new URLSearchParams({
        date: format(date, "yyyy-MM-dd"),
        guests: String(guests),
        time,
      });
      const response = await apiRequest<ApiResult<unknown>>(
        `/api/public/restaurants/${encodeURIComponent(domain)}/reservations/availability?${searchParams.toString()}`,
        {
          method: "GET",
        }
      );

      return reservationAvailabilityResponseSchema.parse(response.data);
    },
    queryKey: bookingQueryKeys.availability(
      domain,
      toReservationDateKey(date),
      time ?? null,
      guests ?? null
    ),
  });
}

export function useMakeReservation(domain: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await apiRequest<ApiResult<unknown>>(
        `/api/public/restaurants/${encodeURIComponent(domain)}/reservations`,
        {
          body: toReservationPayload(data),
          method: "POST",
        }
      );

      return reservationCreateResultSchema.parse(response.data);
    },
    onSuccess: async (_result, variables) => {
      await queryClient.invalidateQueries({
        queryKey: bookingQueryKeys.availability(
          domain,
          toReservationDateKey(variables.date),
          variables.time ?? null,
          variables.guests ?? null
        ),
      });
    },
  });
}

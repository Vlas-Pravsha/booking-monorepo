import type { ReservationCreateInput } from "../../contracts/zod/public";
import { ApiError } from "../../core/errors/api-error";
import type { AppPrismaClient } from "../../core/types";
import { normalizeDomain } from "../restaurant/utils";
import {
  findAvailableTableById,
  findOverlappingBookingsByRestaurant,
  findRestaurantForPublicBooking,
} from "./read";
import { addMinutes, buildReservationDateTime } from "./utils";
import { createPublicBookingRecord } from "./write";

const ensureValidReservationDate = (date: Date) => {
  if (Number.isNaN(date.getTime())) {
    throw ApiError.badRequest("Некоректна дата бронювання");
  }
};

export const getPublicReservationAvailability = async (
  prisma: AppPrismaClient,
  domain: string,
  input: { date: string; guests: number; time: string }
) => {
  const normalizedDomain = normalizeDomain(domain);
  const restaurant = await findRestaurantForPublicBooking(
    prisma,
    normalizedDomain
  );

  if (!restaurant) {
    throw ApiError.notFound("Ресторан не знайдено");
  }

  const startAt = buildReservationDateTime(input.date, input.time);
  ensureValidReservationDate(startAt);
  const endAt = addMinutes(startAt, restaurant.averageDuration);
  const overlappingBookings = await findOverlappingBookingsByRestaurant(
    prisma,
    restaurant.id,
    startAt,
    endAt
  );
  const unavailableTableIds = new Set(
    overlappingBookings.flatMap((booking) =>
      booking.tableId ? [booking.tableId] : []
    )
  );

  return {
    tables: restaurant.tables
      .filter(
        (table) =>
          table.seats >= input.guests &&
          table.statusOverride !== "maintenance" &&
          !unavailableTableIds.has(table.id)
      )
      .map(({ id, name, seats }) => ({ id, name, seats })),
  };
};

export const createPublicReservation = async (
  prisma: AppPrismaClient,
  domain: string,
  input: ReservationCreateInput
) => {
  const normalizedDomain = normalizeDomain(domain);
  const restaurant = await findRestaurantForPublicBooking(
    prisma,
    normalizedDomain
  );

  if (!restaurant) {
    throw ApiError.notFound("Ресторан не знайдено");
  }

  const startAt = buildReservationDateTime(input.date, input.time);
  ensureValidReservationDate(startAt);
  const endAt = addMinutes(startAt, restaurant.averageDuration);
  const table = await findAvailableTableById(
    prisma,
    restaurant.id,
    input.tableId,
    input.guests,
    startAt,
    endAt
  );

  if (!table) {
    throw ApiError.conflict("Обраний столик уже недоступний на цей час");
  }

  const booking = await createPublicBookingRecord(prisma, {
    endAt,
    input,
    restaurantId: restaurant.id,
    startAt,
  });

  return {
    bookingId: booking.id,
    success: true as const,
  };
};

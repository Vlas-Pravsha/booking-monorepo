import type { AppPrismaClient } from "../../core/types";
import {
  bookingSelect,
  customerSelect,
  restaurantSummarySelect,
  tableSelect,
} from "./queries";

export type {
  RestaurantSummary,
  BookingRecord,
  CustomerRecord,
  TableRecord,
} from "./queries";

export const findRestaurantByOwner = (
  prisma: AppPrismaClient,
  ownerId: string
) =>
  prisma.restaurant.findUnique({
    select: restaurantSummarySelect,
    where: { ownerId },
  });

export const findBookingsByRestaurant = (
  prisma: AppPrismaClient,
  restaurantId: string
) =>
  prisma.booking.findMany({
    orderBy: { startAt: "desc" },
    select: bookingSelect,
    where: { restaurantId },
  });

export const findCustomersByRestaurant = (
  prisma: AppPrismaClient,
  restaurantId: string
) =>
  prisma.customer.findMany({
    orderBy: [{ vip: "desc" }, { createdAt: "desc" }],
    select: customerSelect,
    where: { restaurantId },
  });

export const findTablesByRestaurant = (
  prisma: AppPrismaClient,
  restaurantId: string
) =>
  prisma.restaurantTable.findMany({
    orderBy: { position: "asc" },
    select: tableSelect,
    where: { restaurantId },
  });

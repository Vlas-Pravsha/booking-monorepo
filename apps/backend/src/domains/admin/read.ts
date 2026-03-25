import type { AppPrismaClient } from "../../core/types";
import {
  adminBookingSelect,
  adminCustomerSelect,
  adminTableSelect,
  restaurantSummarySelect,
} from "./selects";

export type { RestaurantSummary } from "./selects";

export const findRestaurantForOwner = (
  prisma: AppPrismaClient,
  ownerId: string
) =>
  prisma.restaurant.findUnique({
    select: restaurantSummarySelect,
    where: {
      ownerId,
    },
  });

export const findAdminBookingsByRestaurantId = (
  prisma: AppPrismaClient,
  restaurantId: string
) =>
  prisma.booking.findMany({
    orderBy: {
      startAt: "desc",
    },
    select: adminBookingSelect,
    where: {
      restaurantId,
    },
  });

export const findAdminCustomersByRestaurantId = (
  prisma: AppPrismaClient,
  restaurantId: string
) =>
  prisma.customer.findMany({
    orderBy: [{ vip: "desc" }, { createdAt: "desc" }],
    select: adminCustomerSelect,
    where: {
      restaurantId,
    },
  });

export const findAdminTablesByRestaurantId = (
  prisma: AppPrismaClient,
  restaurantId: string
) =>
  prisma.restaurantTable.findMany({
    orderBy: {
      position: "asc",
    },
    select: adminTableSelect,
    where: {
      restaurantId,
    },
  });

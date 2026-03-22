import type { AppPrismaClient } from "../../core/types";
import { restaurantPublicSelect } from "../../database/selects/restaurant";

export type { RestaurantPublicRecord } from "../../database/selects/restaurant";

export const findRestaurantByDomain = (
  prisma: AppPrismaClient,
  domain: string
) =>
  prisma.restaurant.findUnique({
    select: restaurantPublicSelect,
    where: {
      domain,
    },
  });

export const findRestaurantByOwnerId = (
  prisma: AppPrismaClient,
  ownerId: string
) =>
  prisma.restaurant.findUnique({
    select: restaurantPublicSelect,
    where: {
      ownerId,
    },
  });

export const findRestaurantByDomainForOwnerCheck = (
  prisma: AppPrismaClient,
  domain: string
) =>
  prisma.restaurant.findUnique({
    select: {
      domain: true,
      id: true,
      ownerId: true,
    },
    where: {
      domain,
    },
  });

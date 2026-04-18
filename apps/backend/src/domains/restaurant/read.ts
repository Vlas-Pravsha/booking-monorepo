import type { AppPrismaClient } from "../../core/types";
import { restaurantSelect } from "./queries";
import type { RestaurantRecord } from "./queries";

export type { RestaurantRecord };

export const findRestaurantByDomain = (
  prisma: AppPrismaClient,
  domain: string
): Promise<RestaurantRecord | null> =>
  prisma.restaurant.findUnique({ select: restaurantSelect, where: { domain } });

export const findRestaurantByOwnerId = (
  prisma: AppPrismaClient,
  ownerId: string
): Promise<RestaurantRecord | null> =>
  prisma.restaurant.findUnique({
    select: restaurantSelect,
    where: { ownerId },
  });

export const findRestaurantByDomainForOwnerCheck = (
  prisma: AppPrismaClient,
  domain: string
) =>
  prisma.restaurant.findUnique({
    select: { domain: true, id: true, ownerId: true },
    where: { domain },
  });

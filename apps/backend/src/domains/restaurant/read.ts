import { prisma } from "../../database/client";
import { restaurantPublicSelect } from "../../database/selects/restaurant";

export type { RestaurantPublicRecord } from "../../database/selects/restaurant";

export const findRestaurantByDomain = (domain: string) =>
  prisma.restaurant.findUnique({
    select: restaurantPublicSelect,
    where: {
      domain,
    },
  });

export const findRestaurantByOwnerId = (ownerId: string) =>
  prisma.restaurant.findUnique({
    select: restaurantPublicSelect,
    where: {
      ownerId,
    },
  });

export const findRestaurantByDomainForOwnerCheck = (domain: string) =>
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

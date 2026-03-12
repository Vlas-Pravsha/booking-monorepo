import { restaurantPublicSelect } from "../../database/schemas/restaurant";
import type { DatabaseExecutor } from "../../database/types";

export const findRestaurantByDomain = (db: DatabaseExecutor, domain: string) =>
  db.restaurant.findUnique({
    select: restaurantPublicSelect,
    where: {
      domain,
    },
  });

export const findRestaurantByOwnerId = (
  db: DatabaseExecutor,
  ownerId: string
) =>
  db.restaurant.findUnique({
    select: restaurantPublicSelect,
    where: {
      ownerId,
    },
  });

export const findRestaurantByDomainForOwnerCheck = (
  db: DatabaseExecutor,
  domain: string
) =>
  db.restaurant.findUnique({
    select: {
      domain: true,
      id: true,
      ownerId: true,
    },
    where: {
      domain,
    },
  });

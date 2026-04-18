import { ApiError } from "../../core/errors/api-error";
import type { AppPrismaClient } from "../../core/types";
import type { RestaurantSummary } from "./queries";
import { findRestaurantByOwner } from "./read";

export const requireRestaurant = async (
  prisma: AppPrismaClient,
  ownerId: string
): Promise<RestaurantSummary> => {
  const restaurant = await findRestaurantByOwner(prisma, ownerId);

  if (!restaurant) {
    throw ApiError.notFound("Restaurant not found");
  }

  return restaurant;
};

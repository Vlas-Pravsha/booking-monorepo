import type { RestaurantUpsertInput } from "../../contracts/zod/restaurant";
import { ApiError } from "../../core/errors/api-error";
import type { AppPrismaClient } from "../../core/types";
import { toPublicRestaurant } from "./mappers";
import { findRestaurantByDomain, findRestaurantByOwnerId } from "./read";
import { normalizeDomain } from "./utils";
import { upsertRestaurant } from "./write";

export const getRestaurantByDomain = async (
  prisma: AppPrismaClient,
  domain: string
) => {
  const restaurant = await findRestaurantByDomain(
    prisma,
    normalizeDomain(domain)
  );

  if (!restaurant) {
    throw ApiError.notFound("Restaurant not found");
  }

  return toPublicRestaurant(restaurant);
};

export const getRestaurantForOwner = async (
  prisma: AppPrismaClient,
  ownerId: string
) => {
  const restaurant = await findRestaurantByOwnerId(prisma, ownerId);
  return restaurant ? toPublicRestaurant(restaurant) : null;
};

export const upsertRestaurantForOwner = async (
  prisma: AppPrismaClient,
  ownerId: string,
  input: RestaurantUpsertInput
) => toPublicRestaurant(await upsertRestaurant(prisma, ownerId, input));

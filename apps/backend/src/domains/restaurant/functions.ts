import type { RestaurantUpsertInput } from "../../contracts/zod/restaurant";
import { ApiError } from "../../core/api-error";
import { toPublicRestaurant } from "./mappers";
import { findRestaurantByDomain, findRestaurantByOwnerId } from "./read";
import { normalizeDomain } from "./utils";
import { upsertRestaurantForOwner as upsertRestaurantRecord } from "./write";

export const getRestaurantByDomain = async (domain: string) => {
  const normalizedDomain = normalizeDomain(domain);
  const restaurant = await findRestaurantByDomain(normalizedDomain);

  if (!restaurant) {
    throw ApiError.notFound("Restaurant not found");
  }

  return toPublicRestaurant(restaurant);
};

export const getRestaurantForOwner = async (ownerId: string) => {
  const restaurant = await findRestaurantByOwnerId(ownerId);

  if (!restaurant) {
    return null;
  }

  return toPublicRestaurant(restaurant);
};

export const upsertRestaurantForOwner = async (
  ownerId: string,
  input: RestaurantUpsertInput
) => toPublicRestaurant(await upsertRestaurantRecord(ownerId, input));

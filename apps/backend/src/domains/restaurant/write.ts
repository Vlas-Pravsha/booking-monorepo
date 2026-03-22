import type { RestaurantUpsertInput } from "../../contracts/zod/restaurant";
import { ApiError } from "../../core/api-error";
import type { AppPrismaClient } from "../../core/types";
import { restaurantPublicSelect } from "../../database/selects/restaurant";
import type { Prisma } from "../../generated/prisma/client.js";
import { findRestaurantByDomainForOwnerCheck } from "./read";
import type { RestaurantPublicRecord } from "./read";
import { normalizeDomain } from "./utils";

const nullableString = (value: string | undefined): string | null => {
  const normalizedValue = value?.trim();
  return normalizedValue || null;
};

const buildRestaurantUpsertData = (
  input: RestaurantUpsertInput,
  normalizedDomain: string
) => {
  const { socialLinks } = input;

  return {
    address: input.address,
    averageDuration: input.averageDuration,
    closingTime: input.closingTime,
    cuisine: input.cuisine,
    description: input.description,
    domain: normalizedDomain,
    email: nullableString(input.email),
    facebook: nullableString(socialLinks.facebook),
    heroImage: nullableString(input.heroImage),
    instagram: nullableString(socialLinks.instagram),
    logo: nullableString(input.logo),
    name: input.name,
    openingTime: input.openingTime,
    phone: input.phone,
    priceRange: input.priceRange,
    shortDescription: input.shortDescription,
    showGallery: input.showGallery,
    showMenu: input.showMenu,
    showReviews: input.showReviews,
    telegram: nullableString(socialLinks.telegram),
    workHours: input.workHours,
  };
};

const replaceRestaurantRelations = async (
  tx: Prisma.TransactionClient,
  restaurantId: string,
  input: RestaurantUpsertInput
) => {
  await tx.restaurantFeature.deleteMany({
    where: {
      restaurantId,
    },
  });
  await tx.restaurantGalleryImage.deleteMany({
    where: {
      restaurantId,
    },
  });
  await tx.restaurantMenuItem.deleteMany({
    where: {
      restaurantId,
    },
  });
  await tx.restaurantReview.deleteMany({
    where: {
      restaurantId,
    },
  });
  await tx.restaurantTable.deleteMany({
    where: {
      restaurantId,
    },
  });

  if (input.features.length > 0) {
    await tx.restaurantFeature.createMany({
      data: input.features.map((label, position) => ({
        label,
        position,
        restaurantId,
      })),
    });
  }

  if (input.gallery.length > 0) {
    await tx.restaurantGalleryImage.createMany({
      data: input.gallery.map((image, position) => ({
        image,
        position,
        restaurantId,
      })),
    });
  }

  if (input.menuHighlights.length > 0) {
    await tx.restaurantMenuItem.createMany({
      data: input.menuHighlights.map((item, position) => ({
        description: item.description,
        image: nullableString(item.image),
        name: item.name,
        position,
        price: item.price,
        restaurantId,
      })),
    });
  }

  if (input.reviews.length > 0) {
    await tx.restaurantReview.createMany({
      data: input.reviews.map((review, position) => ({
        author: review.author,
        avatar: nullableString(review.avatar),
        date: review.date,
        position,
        rating: review.rating,
        restaurantId,
        text: review.text,
      })),
    });
  }

  if (input.tables.length > 0) {
    await tx.restaurantTable.createMany({
      data: input.tables.map((table, position) => ({
        name: table.name,
        position,
        restaurantId,
        seats: table.seats,
      })),
    });
  }
};

export const upsertRestaurantForOwner = async (
  prisma: AppPrismaClient,
  ownerId: string,
  input: RestaurantUpsertInput
): Promise<RestaurantPublicRecord> => {
  const normalizedDomain = normalizeDomain(input.domain);

  if (normalizedDomain.length < 2) {
    throw ApiError.badRequest("Domain must contain at least 2 characters");
  }

  const existingRestaurantWithDomain =
    await findRestaurantByDomainForOwnerCheck(prisma, normalizedDomain);

  if (
    existingRestaurantWithDomain &&
    existingRestaurantWithDomain.ownerId !== ownerId
  ) {
    throw ApiError.conflict("This domain is already in use");
  }

  const restaurant = await prisma.$transaction(async (tx) => {
    const restaurantData = buildRestaurantUpsertData(input, normalizedDomain);

    const savedRestaurant = await tx.restaurant.upsert({
      create: {
        ...restaurantData,
        ownerId,
      },
      select: {
        id: true,
      },
      update: restaurantData,
      where: {
        ownerId,
      },
    });

    await replaceRestaurantRelations(tx, savedRestaurant.id, input);

    return tx.restaurant.findUnique({
      select: restaurantPublicSelect,
      where: {
        id: savedRestaurant.id,
      },
    });
  });

  if (!restaurant) {
    throw ApiError.internal("Could not load saved restaurant");
  }

  return restaurant;
};

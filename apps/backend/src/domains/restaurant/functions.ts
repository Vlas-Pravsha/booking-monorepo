import type { Prisma } from "@prisma/client";

import type { RestaurantUpsertInput } from "../../contracts/zod/restaurant";
import { ApiError } from "../../core/api-error";
import { prisma } from "../../database/client";
import { restaurantPublicSelect } from "../../database/schemas/restaurant";
import {
  findRestaurantByDomain,
  findRestaurantByDomainForOwnerCheck,
  findRestaurantByOwnerId,
} from "./reads";

const normalizeDomain = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9-]/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-|-$/g, "");

const nullableString = (value: string | undefined): string | null => {
  const normalizedValue = value?.trim();
  return normalizedValue || null;
};

const buildPublicRestaurant = (
  restaurant: NonNullable<Awaited<ReturnType<typeof findRestaurantByDomain>>>
) => {
  const reviewCount = restaurant.reviews.length;
  const rating =
    reviewCount > 0
      ? Number(
          (
            restaurant.reviews.reduce(
              (total, review) => total + review.rating,
              0
            ) / reviewCount
          ).toFixed(1)
        )
      : 5;

  return {
    address: restaurant.address,
    averageDuration: restaurant.averageDuration,
    closingTime: restaurant.closingTime,
    createdAt: restaurant.createdAt.toISOString(),
    cuisine: restaurant.cuisine,
    description: restaurant.description,
    domain: restaurant.domain,
    email: restaurant.email ?? undefined,
    features: restaurant.features.map((feature) => feature.label),
    gallery: restaurant.gallery.map((item) => item.image),
    heroImage: restaurant.heroImage ?? undefined,
    id: restaurant.id,
    logo: restaurant.logo ?? undefined,
    menuHighlights: restaurant.menuHighlights.map((item) => ({
      description: item.description,
      id: item.id,
      image: item.image ?? undefined,
      name: item.name,
      price: item.price,
    })),
    name: restaurant.name,
    openingTime: restaurant.openingTime,
    phone: restaurant.phone,
    priceRange: restaurant.priceRange,
    rating,
    reviewCount,
    reviews: restaurant.reviews.map((review) => ({
      author: review.author,
      avatar: review.avatar ?? undefined,
      date: review.date,
      id: review.id,
      rating: review.rating,
      text: review.text,
    })),
    shortDescription: restaurant.shortDescription,
    showGallery: restaurant.showGallery,
    showMenu: restaurant.showMenu,
    showReviews: restaurant.showReviews,
    socialLinks: {
      facebook: restaurant.facebook ?? undefined,
      instagram: restaurant.instagram ?? undefined,
      telegram: restaurant.telegram ?? undefined,
    },
    tables: restaurant.tables,
    updatedAt: restaurant.updatedAt.toISOString(),
    workHours: restaurant.workHours,
  };
};

const deleteRestaurantRelations = async (
  tx: Prisma.TransactionClient,
  restaurantId: string
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
};

const createRestaurantFeatures = async (
  tx: Prisma.TransactionClient,
  restaurantId: string,
  features: RestaurantUpsertInput["features"]
) => {
  if (features.length === 0) {
    return;
  }

  await tx.restaurantFeature.createMany({
    data: features.map((label, position) => ({
      label,
      position,
      restaurantId,
    })),
  });
};

const createRestaurantGallery = async (
  tx: Prisma.TransactionClient,
  restaurantId: string,
  gallery: RestaurantUpsertInput["gallery"]
) => {
  if (gallery.length === 0) {
    return;
  }

  await tx.restaurantGalleryImage.createMany({
    data: gallery.map((image, position) => ({
      image,
      position,
      restaurantId,
    })),
  });
};

const createRestaurantMenuItems = async (
  tx: Prisma.TransactionClient,
  restaurantId: string,
  menuHighlights: RestaurantUpsertInput["menuHighlights"]
) => {
  if (menuHighlights.length === 0) {
    return;
  }

  await tx.restaurantMenuItem.createMany({
    data: menuHighlights.map((item, position) => ({
      description: item.description,
      image: nullableString(item.image),
      name: item.name,
      position,
      price: item.price,
      restaurantId,
    })),
  });
};

const createRestaurantReviews = async (
  tx: Prisma.TransactionClient,
  restaurantId: string,
  reviews: RestaurantUpsertInput["reviews"]
) => {
  if (reviews.length === 0) {
    return;
  }

  await tx.restaurantReview.createMany({
    data: reviews.map((review, position) => ({
      author: review.author,
      avatar: nullableString(review.avatar),
      date: review.date,
      position,
      rating: review.rating,
      restaurantId,
      text: review.text,
    })),
  });
};

const createRestaurantTables = async (
  tx: Prisma.TransactionClient,
  restaurantId: string,
  tables: RestaurantUpsertInput["tables"]
) => {
  if (tables.length === 0) {
    return;
  }

  await tx.restaurantTable.createMany({
    data: tables.map((table, position) => ({
      name: table.name,
      position,
      restaurantId,
      seats: table.seats,
    })),
  });
};

const replaceRestaurantRelations = async (
  tx: Prisma.TransactionClient,
  restaurantId: string,
  input: RestaurantUpsertInput
) => {
  await deleteRestaurantRelations(tx, restaurantId);
  await createRestaurantFeatures(tx, restaurantId, input.features);
  await createRestaurantGallery(tx, restaurantId, input.gallery);
  await createRestaurantMenuItems(tx, restaurantId, input.menuHighlights);
  await createRestaurantReviews(tx, restaurantId, input.reviews);
  await createRestaurantTables(tx, restaurantId, input.tables);
};

export const getRestaurantByDomain = async (domain: string) => {
  const normalizedDomain = normalizeDomain(domain);
  const restaurant = await findRestaurantByDomain(prisma, normalizedDomain);

  if (!restaurant) {
    throw ApiError.notFound("Restaurant not found");
  }

  return buildPublicRestaurant(restaurant);
};

export const getRestaurantForOwner = async (ownerId: string) => {
  const restaurant = await findRestaurantByOwnerId(prisma, ownerId);

  if (!restaurant) {
    return null;
  }

  return buildPublicRestaurant(restaurant);
};

export const upsertRestaurantForOwner = async (
  ownerId: string,
  input: RestaurantUpsertInput
) => {
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
    const baseRestaurant = await tx.restaurant.upsert({
      create: {
        address: input.address,
        averageDuration: input.averageDuration,
        closingTime: input.closingTime,
        cuisine: input.cuisine,
        description: input.description,
        domain: normalizedDomain,
        email: nullableString(input.email),
        facebook: nullableString(input.socialLinks.facebook),
        heroImage: nullableString(input.heroImage),
        instagram: nullableString(input.socialLinks.instagram),
        logo: nullableString(input.logo),
        name: input.name,
        openingTime: input.openingTime,
        ownerId,
        phone: input.phone,
        priceRange: input.priceRange,
        shortDescription: input.shortDescription,
        showGallery: input.showGallery,
        showMenu: input.showMenu,
        showReviews: input.showReviews,
        telegram: nullableString(input.socialLinks.telegram),
        workHours: input.workHours,
      },
      select: {
        id: true,
      },
      update: {
        address: input.address,
        averageDuration: input.averageDuration,
        closingTime: input.closingTime,
        cuisine: input.cuisine,
        description: input.description,
        domain: normalizedDomain,
        email: nullableString(input.email),
        facebook: nullableString(input.socialLinks.facebook),
        heroImage: nullableString(input.heroImage),
        instagram: nullableString(input.socialLinks.instagram),
        logo: nullableString(input.logo),
        name: input.name,
        openingTime: input.openingTime,
        phone: input.phone,
        priceRange: input.priceRange,
        shortDescription: input.shortDescription,
        showGallery: input.showGallery,
        showMenu: input.showMenu,
        showReviews: input.showReviews,
        telegram: nullableString(input.socialLinks.telegram),
        workHours: input.workHours,
      },
      where: {
        ownerId,
      },
    });

    await replaceRestaurantRelations(tx, baseRestaurant.id, input);

    return tx.restaurant.findUnique({
      select: restaurantPublicSelect,
      where: {
        id: baseRestaurant.id,
      },
    });
  });

  if (!restaurant) {
    throw ApiError.internal("Failed to load saved restaurant");
  }

  return buildPublicRestaurant(restaurant);
};

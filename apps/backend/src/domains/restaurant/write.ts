import { format } from "date-fns";
import { uk } from "date-fns/locale";

import type { RestaurantUpsertInput } from "../../contracts/zod/restaurant";
import { ApiError } from "../../core/errors/api-error";
import type { AppPrismaClient } from "../../core/types";
import type { Prisma } from "../../generated/prisma/client.js";
import { restaurantSelect } from "./queries";
import type { RestaurantRecord } from "./queries";
import { findRestaurantByDomainForOwnerCheck } from "./read";
import { normalizeDomain } from "./utils";

const toNullableString = (value: string | undefined): string | null => {
  const trimmed = value?.trim();
  return trimmed || null;
};

const todayLabel = () => format(new Date(), "dd.MM.yyyy", { locale: uk });

const buildRestaurantData = (input: RestaurantUpsertInput, domain: string) => ({
  address: input.address,
  averageDuration: input.averageDuration,
  closingTime: input.closingTime,
  cuisine: input.cuisine,
  description: input.description,
  domain,
  email: toNullableString(input.email),
  facebook: toNullableString(input.socialLinks.facebook),
  heroImage: toNullableString(input.heroImage),
  instagram: toNullableString(input.socialLinks.instagram),
  logo: toNullableString(input.logo),
  name: input.name,
  openingTime: input.openingTime,
  phone: input.phone,
  priceRange: input.priceRange,
  shortDescription: input.shortDescription,
  showGallery: input.showGallery,
  showMenu: input.showMenu,
  showReviews: input.showReviews,
  telegram: toNullableString(input.socialLinks.telegram),
  workHours: input.workHours,
});

const replaceRelations = async (
  tx: Prisma.TransactionClient,
  restaurantId: string,
  input: RestaurantUpsertInput
) => {
  // Preserve existing menu-item images by position before deletion.
  const existingImages = await tx.restaurantMenuItem.findMany({
    orderBy: { position: "asc" },
    select: { image: true },
    where: { restaurantId },
  });

  await Promise.all([
    tx.restaurantFeature.deleteMany({ where: { restaurantId } }),
    tx.restaurantGalleryImage.deleteMany({ where: { restaurantId } }),
    tx.restaurantMenuItem.deleteMany({ where: { restaurantId } }),
    tx.restaurantReview.deleteMany({ where: { restaurantId } }),
    tx.restaurantTable.deleteMany({ where: { restaurantId } }),
  ]);

  const creates: Promise<unknown>[] = [];

  if (input.features.length > 0) {
    creates.push(
      tx.restaurantFeature.createMany({
        data: input.features.map((label, position) => ({
          label,
          position,
          restaurantId,
        })),
      })
    );
  }

  if (input.gallery.length > 0) {
    creates.push(
      tx.restaurantGalleryImage.createMany({
        data: input.gallery.map((image, position) => ({
          image,
          position,
          restaurantId,
        })),
      })
    );
  }

  if (input.menuHighlights.length > 0) {
    creates.push(
      tx.restaurantMenuItem.createMany({
        data: input.menuHighlights.map((item, position) => ({
          description: item.description,
          image: existingImages[position]?.image ?? null,
          name: item.name,
          position,
          price: item.price,
          restaurantId,
        })),
      })
    );
  }

  if (input.reviews.length > 0) {
    const date = todayLabel();
    creates.push(
      tx.restaurantReview.createMany({
        data: input.reviews.map((review, position) => ({
          author: review.author,
          avatar: null,
          date,
          position,
          rating: review.rating,
          restaurantId,
          text: review.text,
        })),
      })
    );
  }

  if (input.tables.length > 0) {
    creates.push(
      tx.restaurantTable.createMany({
        data: input.tables.map((table, position) => ({
          name: table.name,
          position,
          restaurantId,
          seats: table.seats,
        })),
      })
    );
  }

  await Promise.all(creates);
};

export const upsertRestaurant = async (
  prisma: AppPrismaClient,
  ownerId: string,
  input: RestaurantUpsertInput
): Promise<RestaurantRecord> => {
  const domain = normalizeDomain(input.domain);

  if (domain.length < 2) {
    throw ApiError.badRequest("Domain must contain at least 2 characters");
  }

  const conflict = await findRestaurantByDomainForOwnerCheck(prisma, domain);

  if (conflict && conflict.ownerId !== ownerId) {
    throw ApiError.conflict("This domain is already in use");
  }

  const restaurant = await prisma.$transaction(async (tx) => {
    const { id } = await tx.restaurant.upsert({
      create: { ...buildRestaurantData(input, domain), ownerId },
      select: { id: true },
      update: buildRestaurantData(input, domain),
      where: { ownerId },
    });

    await replaceRelations(tx, id, input);

    return tx.restaurant.findUnique({
      select: restaurantSelect,
      where: { id },
    });
  });

  if (!restaurant) {
    throw ApiError.internal("Could not load saved restaurant");
  }

  return restaurant;
};

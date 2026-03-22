import type { Prisma } from "@prisma/client";

export const restaurantPublicSelect = {
  address: true,
  averageDuration: true,
  closingTime: true,
  createdAt: true,
  cuisine: true,
  description: true,
  domain: true,
  email: true,
  facebook: true,
  features: {
    orderBy: {
      position: "asc",
    },
    select: {
      id: true,
      label: true,
    },
  },
  gallery: {
    orderBy: {
      position: "asc",
    },
    select: {
      id: true,
      image: true,
    },
  },
  heroImage: true,
  id: true,
  instagram: true,
  logo: true,
  menuHighlights: {
    orderBy: {
      position: "asc",
    },
    select: {
      description: true,
      id: true,
      image: true,
      name: true,
      price: true,
    },
  },
  name: true,
  openingTime: true,
  ownerId: true,
  phone: true,
  priceRange: true,
  reviews: {
    orderBy: {
      position: "asc",
    },
    select: {
      author: true,
      avatar: true,
      date: true,
      id: true,
      rating: true,
      text: true,
    },
  },
  shortDescription: true,
  showGallery: true,
  showMenu: true,
  showReviews: true,
  tables: {
    orderBy: {
      position: "asc",
    },
    select: {
      id: true,
      name: true,
      seats: true,
    },
  },
  telegram: true,
  updatedAt: true,
  workHours: true,
} satisfies Prisma.RestaurantSelect;

export type RestaurantPublicRecord = Prisma.RestaurantGetPayload<{
  select: typeof restaurantPublicSelect;
}>;

import { formatISO } from "date-fns";

import type { RestaurantRecord } from "./queries";

const reviewStats = (reviews: RestaurantRecord["reviews"]) => {
  if (reviews.length === 0) {
    return { rating: 5, reviewCount: 0 };
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);

  return {
    rating: Number((total / reviews.length).toFixed(1)),
    reviewCount: reviews.length,
  };
};

export const toPublicRestaurant = (restaurant: RestaurantRecord) => {
  const { rating, reviewCount } = reviewStats(restaurant.reviews);

  return {
    address: restaurant.address,
    averageDuration: restaurant.averageDuration,
    closingTime: restaurant.closingTime,
    createdAt: formatISO(restaurant.createdAt),
    cuisine: restaurant.cuisine,
    description: restaurant.description,
    domain: restaurant.domain,
    email: restaurant.email ?? undefined,
    features: restaurant.features.map((feature) => feature.label),
    gallery: restaurant.gallery.map((image) => image.image),
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
    updatedAt: formatISO(restaurant.updatedAt),
    workHours: restaurant.workHours,
  };
};

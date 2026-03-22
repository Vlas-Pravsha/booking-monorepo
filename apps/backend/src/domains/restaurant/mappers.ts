import type { RestaurantPublicRecord } from "./read";

const toOptionalString = (value: string | null): string | undefined =>
  value ?? undefined;

type MenuHighlightRecord = RestaurantPublicRecord["menuHighlights"][number];
type ReviewRecord = RestaurantPublicRecord["reviews"][number];

const calculateReviewStats = (reviews: RestaurantPublicRecord["reviews"]) => {
  const reviewCount = reviews.length;

  if (reviewCount === 0) {
    return {
      rating: 5,
      reviewCount,
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

  return {
    rating: Number((totalRating / reviewCount).toFixed(1)),
    reviewCount,
  };
};

const toMenuHighlight = (item: MenuHighlightRecord) => ({
  description: item.description,
  id: item.id,
  image: toOptionalString(item.image),
  name: item.name,
  price: item.price,
});

const toReview = (review: ReviewRecord) => ({
  author: review.author,
  avatar: toOptionalString(review.avatar),
  date: review.date,
  id: review.id,
  rating: review.rating,
  text: review.text,
});

const toSocialLinks = (restaurant: RestaurantPublicRecord) => ({
  facebook: toOptionalString(restaurant.facebook),
  instagram: toOptionalString(restaurant.instagram),
  telegram: toOptionalString(restaurant.telegram),
});

export const toPublicRestaurant = (restaurant: RestaurantPublicRecord) => {
  const { rating, reviewCount } = calculateReviewStats(restaurant.reviews);

  const identity = {
    domain: restaurant.domain,
    id: restaurant.id,
    name: restaurant.name,
  };

  const details = {
    address: restaurant.address,
    averageDuration: restaurant.averageDuration,
    closingTime: restaurant.closingTime,
    cuisine: restaurant.cuisine,
    description: restaurant.description,
    openingTime: restaurant.openingTime,
    phone: restaurant.phone,
    priceRange: restaurant.priceRange,
    shortDescription: restaurant.shortDescription,
    workHours: restaurant.workHours,
  };

  const timestamps = {
    createdAt: restaurant.createdAt.toISOString(),
    updatedAt: restaurant.updatedAt.toISOString(),
  };

  const content = {
    email: toOptionalString(restaurant.email),
    features: restaurant.features.map((feature) => feature.label),
    gallery: restaurant.gallery.map((item) => item.image),
    heroImage: toOptionalString(restaurant.heroImage),
    logo: toOptionalString(restaurant.logo),
    menuHighlights: restaurant.menuHighlights.map(toMenuHighlight),
    socialLinks: toSocialLinks(restaurant),
  };

  const visibility = {
    showGallery: restaurant.showGallery,
    showMenu: restaurant.showMenu,
    showReviews: restaurant.showReviews,
  };

  const activity = {
    rating,
    reviewCount,
    reviews: restaurant.reviews.map(toReview),
    tables: restaurant.tables,
  };

  return {
    ...identity,
    ...details,
    ...timestamps,
    ...content,
    ...visibility,
    ...activity,
  };
};

import { z } from "zod";

export const restaurantSocialLinksSchema = z.object({
  facebook: z.url().optional().or(z.literal("")),
  instagram: z.url().optional().or(z.literal("")),
  telegram: z.url().optional().or(z.literal("")),
});

export const restaurantMenuDraftSchema = z.object({
  description: z.string().trim().min(1).max(300),
  name: z.string().trim().min(1).max(120),
  price: z.number().int().min(0).max(100_000),
});

export const restaurantReviewDraftSchema = z.object({
  author: z.string().trim().min(1).max(120),
  rating: z.number().int().min(1).max(5),
  text: z.string().trim().min(1).max(600),
});

export const restaurantTableSchema = z.object({
  id: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1).max(64),
  seats: z.number().int().min(1).max(20),
});

export const menuItemSchema = restaurantMenuDraftSchema.extend({
  id: z.string().trim().min(1).optional(),
  image: z.string().min(1).optional(),
});

export const restaurantReviewSchema = restaurantReviewDraftSchema.extend({
  avatar: z.string().min(1).optional(),
  date: z.string().min(1).optional(),
  id: z.string().trim().min(1),
});

export const restaurantSchema = z.object({
  address: z.string().min(1),
  averageDuration: z.number().int().min(0),
  closingTime: z.string().min(1),
  createdAt: z.string().min(1).optional(),
  cuisine: z.string().min(1),
  description: z.string().min(1),
  domain: z.string().min(1),
  email: z.string().min(1).optional(),
  features: z.array(z.string().min(1)),
  gallery: z.array(z.string().min(1)),
  heroImage: z.string().min(1).optional(),
  id: z.string().trim().min(1),
  logo: z.string().min(1).optional(),
  menuHighlights: z.array(menuItemSchema),
  name: z.string().min(1),
  openingTime: z.string().min(1),
  phone: z.string().min(1),
  priceRange: z.string().min(1),
  rating: z.number().min(0),
  reviewCount: z.number().int().min(0),
  reviews: z.array(restaurantReviewSchema),
  shortDescription: z.string().min(1),
  showGallery: z.boolean(),
  showMenu: z.boolean(),
  showReviews: z.boolean(),
  socialLinks: restaurantSocialLinksSchema.optional(),
  tables: z.array(restaurantTableSchema),
  updatedAt: z.string().min(1).optional(),
  workHours: z.string().min(1),
});

export const restaurantUpsertInputSchema = z.object({
  address: z.string().trim().min(1).max(160),
  averageDuration: z.number().int().min(30).max(360),
  closingTime: z.string().regex(/^\d{2}:\d{2}$/),
  cuisine: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(2000),
  domain: z.string().trim().min(2).max(63),
  email: z.email().optional().or(z.literal("")),
  features: z.array(z.string().trim().min(1).max(64)).max(12),
  gallery: z.array(z.url()).max(12),
  heroImage: z.url().optional().or(z.literal("")),
  logo: z.url().optional().or(z.literal("")),
  menuHighlights: z.array(restaurantMenuDraftSchema).max(12),
  name: z.string().trim().min(1).max(120),
  openingTime: z.string().regex(/^\d{2}:\d{2}$/),
  phone: z.string().trim().min(1).max(32),
  priceRange: z.string().trim().min(1).max(16),
  reviews: z.array(restaurantReviewDraftSchema).max(12),
  shortDescription: z.string().trim().min(1).max(180),
  showGallery: z.boolean(),
  showMenu: z.boolean(),
  showReviews: z.boolean(),
  socialLinks: restaurantSocialLinksSchema,
  tables: z.array(restaurantTableSchema).max(64),
  workHours: z.string().trim().min(1).max(120),
});

export type RestaurantSocialLinks = z.infer<typeof restaurantSocialLinksSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type RestaurantReview = z.infer<typeof restaurantReviewSchema>;
export type RestaurantTable = z.infer<typeof restaurantTableSchema>;
export type Restaurant = z.infer<typeof restaurantSchema>;
export type RestaurantMenuDraft = z.infer<typeof restaurantMenuDraftSchema>;
export type RestaurantReviewDraft = z.infer<typeof restaurantReviewDraftSchema>;
export type RestaurantUpsertInput = z.infer<typeof restaurantUpsertInputSchema>;
export type RestaurantUpsertPayload = RestaurantUpsertInput;

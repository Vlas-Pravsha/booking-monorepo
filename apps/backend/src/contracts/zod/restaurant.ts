import { z } from "zod";

const socialLinksSchema = z.object({
  facebook: z.url().optional().or(z.literal("")),
  instagram: z.url().optional().or(z.literal("")),
  telegram: z.url().optional().or(z.literal("")),
});

const menuItemSchema = z.object({
  description: z.string().trim().min(1).max(300),
  image: z.url().optional().or(z.literal("")),
  name: z.string().trim().min(1).max(120),
  price: z.number().int().min(0).max(100_000),
});

const reviewSchema = z.object({
  author: z.string().trim().min(1).max(120),
  avatar: z.url().optional().or(z.literal("")),
  date: z.string().trim().min(1).max(64),
  rating: z.number().int().min(1).max(5),
  text: z.string().trim().min(1).max(600),
});

const tableSchema = z.object({
  name: z.string().trim().min(1).max(64),
  seats: z.number().int().min(1).max(20),
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
  menuHighlights: z.array(menuItemSchema).max(12),
  name: z.string().trim().min(1).max(120),
  openingTime: z.string().regex(/^\d{2}:\d{2}$/),
  phone: z.string().trim().min(1).max(32),
  priceRange: z.string().trim().min(1).max(16),
  reviews: z.array(reviewSchema).max(12),
  shortDescription: z.string().trim().min(1).max(180),
  showGallery: z.boolean(),
  showMenu: z.boolean(),
  showReviews: z.boolean(),
  socialLinks: socialLinksSchema,
  tables: z.array(tableSchema).max(64),
  workHours: z.string().trim().min(1).max(120),
});

export const restaurantDomainParamsSchema = z.object({
  domain: z.string().trim().min(2).max(63),
});

export type RestaurantUpsertInput = z.infer<typeof restaurantUpsertInputSchema>;

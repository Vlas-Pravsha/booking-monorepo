import { z } from "zod";

import { restaurantSummarySchema, successResponseSchema } from "./shared";

const bookingStatusValues = [
  "pending",
  "confirmed",
  "cancelled",
  "seated",
  "completed",
] as const;

const bookingSourceValues = ["website", "phone", "walk-in"] as const;

const tableStatusValues = [
  "available",
  "occupied",
  "reserved",
  "maintenance",
] as const;

const tableShapeValues = ["round", "square", "rectangle"] as const;

const tableStatusOverrideValues = ["available", "maintenance"] as const;

export const bookingStatusUpdateInputSchema = z.object({
  status: z.enum(bookingStatusValues),
});

export const customerUpdateInputSchema = z.object({
  vip: z.boolean(),
});

export const tableStatusOverrideUpdateInputSchema = z.object({
  status: z.enum(tableStatusOverrideValues),
});

export const bookingSchema = z.object({
  customerEmail: z.string().optional(),
  customerId: z.string().trim().min(1).optional(),
  customerName: z.string().min(1),
  customerPhone: z.string(),
  date: z.string().min(1),
  duration: z.number().int().min(0),
  endAt: z.string().min(1),
  guests: z.number().int().min(1),
  id: z.string().trim().min(1),
  isSample: z.boolean(),
  note: z.string(),
  source: z.enum(bookingSourceValues),
  startAt: z.string().min(1),
  status: z.enum(bookingStatusValues),
  table: z.string().min(1),
  tableId: z.string().trim().min(1).optional(),
  time: z.string().min(1),
  totalAmount: z.number().min(0),
});

export const bookingListResponseSchema = z.object({
  bookings: z.array(bookingSchema),
  hasSampleData: z.boolean(),
  restaurant: restaurantSummarySchema.nullable(),
});

export const customerSchema = z.object({
  createdAt: z.string().min(1),
  email: z.string(),
  id: z.string().trim().min(1),
  isSample: z.boolean(),
  lastVisit: z.string(),
  lastVisitAt: z.string().min(1).optional(),
  name: z.string().min(1),
  notes: z.string(),
  phone: z.string(),
  tags: z.array(z.string()),
  totalSpent: z.number().min(0),
  vip: z.boolean(),
  visits: z.number().int().min(0),
});

export const customerListResponseSchema = z.object({
  customers: z.array(customerSchema),
  hasSampleData: z.boolean(),
  restaurant: restaurantSummarySchema.nullable(),
});

export const tableSchema = z.object({
  id: z.string().trim().min(1),
  isSample: z.boolean(),
  name: z.string().min(1),
  number: z.number().int().min(0),
  position: z.object({
    x: z.number().int().min(0),
    y: z.number().int().min(0),
  }),
  seats: z.number().int().min(1),
  shape: z.enum(tableShapeValues),
  status: z.enum(tableStatusValues),
});

export const tableListResponseSchema = z.object({
  hasSampleData: z.boolean(),
  restaurant: restaurantSummarySchema.nullable(),
  tables: z.array(tableSchema),
});

export const bookingStatusUpdateResultSchema = successResponseSchema;
export const customerUpdateResultSchema = successResponseSchema;
export const tableStatusOverrideUpdateResultSchema = successResponseSchema;

export type BookingStatus = (typeof bookingStatusValues)[number];
export type BookingSource = (typeof bookingSourceValues)[number];
export type TableStatus = (typeof tableStatusValues)[number];
export type TableShape = (typeof tableShapeValues)[number];
export type TableStatusOverride = (typeof tableStatusOverrideValues)[number];

export type BookingStatusUpdateInput = z.infer<
  typeof bookingStatusUpdateInputSchema
>;
export type CustomerUpdateInput = z.infer<typeof customerUpdateInputSchema>;
export type TableStatusOverrideUpdateInput = z.infer<
  typeof tableStatusOverrideUpdateInputSchema
>;
export type Booking = z.infer<typeof bookingSchema>;
export type BookingListResponse = z.infer<typeof bookingListResponseSchema>;
export type Customer = z.infer<typeof customerSchema>;
export type CustomerListResponse = z.infer<typeof customerListResponseSchema>;
export type Table = z.infer<typeof tableSchema>;
export type TableListResponse = z.infer<typeof tableListResponseSchema>;
export type BookingStatusUpdateResult = z.infer<
  typeof bookingStatusUpdateResultSchema
>;
export type CustomerUpdateResult = z.infer<typeof customerUpdateResultSchema>;
export type TableStatusOverrideUpdateResult = z.infer<
  typeof tableStatusOverrideUpdateResultSchema
>;

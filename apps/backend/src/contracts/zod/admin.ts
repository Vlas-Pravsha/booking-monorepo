import { z } from "zod";

export const bookingStatusValues = [
  "pending",
  "confirmed",
  "cancelled",
  "seated",
  "completed",
] as const;

export const tableStatusValues = [
  "available",
  "occupied",
  "reserved",
  "maintenance",
] as const;

export const entityIdParamsSchema = z.object({
  id: z.string().trim().min(1),
});

export const bookingStatusUpdateInputSchema = z.object({
  status: z.enum(bookingStatusValues),
});

export const customerUpdateInputSchema = z.object({
  vip: z.boolean(),
});

export const tableStatusOverrideUpdateInputSchema = z.object({
  status: z.enum(["available", "maintenance"]),
});

export type BookingStatusUpdateInput = z.infer<
  typeof bookingStatusUpdateInputSchema
>;
export type CustomerUpdateInput = z.infer<typeof customerUpdateInputSchema>;
export type TableStatusOverrideUpdateInput = z.infer<
  typeof tableStatusOverrideUpdateInputSchema
>;

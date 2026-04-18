import { z } from "zod";

import { successResponseSchema } from "./shared";

const optionalContactStringSchema = z
  .string()
  .trim()
  .max(128)
  .optional()
  .or(z.literal(""));

const reservationContactSchema = z
  .object({
    email: optionalContactStringSchema.refine(
      (value) => !value || z.email().safeParse(value).success,
      "Введіть коректну пошту"
    ),
    phone: optionalContactStringSchema.refine(
      (value) => !value || value.length >= 7,
      "Введіть коректний номер телефону"
    ),
  })
  .refine(({ email, phone }) => Boolean(email || phone), {
    message: "Вкажіть телефон або пошту",
    path: ["phone"],
  });

export const contactRequestInputSchema = z.object({
  email: z.email(),
  message: z.string().trim().min(10).max(2000),
  name: z.string().trim().min(2).max(128),
  phone: z.string().trim().min(7).max(32),
});

export const publicRestaurantDomainParamsSchema = z.object({
  domain: z.string().trim().min(1).max(63),
});

export const reservationAvailabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.coerce.number().int().min(1).max(20),
  time: z.string().regex(/^\d{2}:\d{2}$/),
});

export const reservationAvailableTableSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().min(1),
  seats: z.number().int().min(1),
});

export const reservationAvailabilityResponseSchema = z.object({
  tables: z.array(reservationAvailableTableSchema),
});

export const reservationCreateInputSchema = reservationContactSchema.extend({
  comment: z.string().trim().max(1000).optional().or(z.literal("")),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.number().int().min(1).max(20),
  name: z.string().trim().min(2).max(128),
  tableId: z.string().trim().min(1),
  time: z.string().regex(/^\d{2}:\d{2}$/),
});

export const reservationCreateResultSchema = successResponseSchema.extend({
  bookingId: z.string().trim().min(1),
});

export const contactRequestResultSchema = successResponseSchema.extend({
  submittedAt: z.string().min(1),
});

export type ContactRequestInput = z.infer<typeof contactRequestInputSchema>;
export type ContactRequestPayload = ContactRequestInput;
export type ContactRequestResult = z.infer<typeof contactRequestResultSchema>;
export type ReservationAvailabilityQuery = z.infer<
  typeof reservationAvailabilityQuerySchema
>;
export type ReservationAvailableTable = z.infer<
  typeof reservationAvailableTableSchema
>;
export type ReservationAvailabilityResponse = z.infer<
  typeof reservationAvailabilityResponseSchema
>;
export type ReservationCreateInput = z.infer<
  typeof reservationCreateInputSchema
>;
export type ReservationCreatePayload = ReservationCreateInput;
export type ReservationCreateResult = z.infer<
  typeof reservationCreateResultSchema
>;

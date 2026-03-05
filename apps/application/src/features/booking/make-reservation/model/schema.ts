import { z } from "zod";

const ukrainePhoneRegex = /^\+?3?8?(0\d{9})$/;

export const BookingSchema = z.object({
  comment: z.string().trim().optional(),
  date: z.any().transform((val) => {
    if (val instanceof Date) return val;
    if (typeof val === "string" && val !== "") return new Date(val);
    return null;
  }).pipe(z.date({
    error: "Оберіть дату",
    message: "Оберіть дату",
  })),
  guests: z.any().transform((val) => {
    if (typeof val === "number") return val;
    if (typeof val === "string" && val !== "") return Number.parseInt(val, 10);
    return null;
  }).pipe(z.number({
    error: "Вкажіть кількість гостей",
    message: "Вкажіть кількість гостей",
  }).min(1, "Мінімум 1 гість").max(20, "Максимум 20 гостей")),
  name: z
    .string()
    .trim()
    .min(2, "Введіть ім’я (мін. 2 символи)")
    .max(50, "Ім’я занадто довге"),
  phone: z
    .string()
    .trim()
    .regex(ukrainePhoneRegex, "Введіть коректний номер телефону (+380...)"),
  time: z.string({
    error: "Оберіть час",
    message: "Оберіть час",
  }),
});

export type BookingFormData = z.infer<typeof BookingSchema>;

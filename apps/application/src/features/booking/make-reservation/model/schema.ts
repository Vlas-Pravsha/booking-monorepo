import { z } from "zod";

export const BookingSchema = z.object({
  comment: z.string().optional(),
  date: z.date({
    required_error: "Оберіть дату",
  }),
  guests: z.number().min(1, "Мінімум 1 гість").max(20, "Максимум 20 гостей"),
  name: z.string().min(2, "Введіть ім’я (мін. 2 символи)"),
  phone: z.string().min(10, "Введіть коректний номер телефону"),
  time: z.string({
    required_error: "Оберіть час",
  }),
});

export type BookingFormData = z.infer<typeof BookingSchema>;

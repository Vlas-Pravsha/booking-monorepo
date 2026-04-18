import { z } from "zod";

const optionalContactSchema = z.string().trim().optional().or(z.literal(""));

export const BookingSchema = z
  .object({
    comment: z.string().optional(),
    date: z.date({
      error: "Оберіть дату",
    }),
    email: optionalContactSchema.refine(
      (value) => !value || z.email().safeParse(value).success,
      "Введіть коректну пошту"
    ),
    guests: z.number().min(1, "Мінімум 1 гість").max(20, "Максимум 20 гостей"),
    name: z.string().min(2, "Введіть ім’я (мін. 2 символи)"),
    phone: optionalContactSchema.refine(
      (value) => !value || value.length >= 7,
      "Введіть коректний номер телефону"
    ),
    tableId: z.string({ error: "Оберіть столик" }).min(1, "Оберіть столик"),
    time: z.string({
      error: "Оберіть час",
    }),
  })
  .refine(({ email, phone }) => Boolean(email || phone), {
    message: "Вкажіть телефон або пошту",
    path: ["phone"],
  });

export type BookingFormData = z.infer<typeof BookingSchema>;

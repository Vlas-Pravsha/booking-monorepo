import type { Booking } from "@/entities/booking";

export type BookingFilterValue = "all" | Booking["status"];

export const BOOKING_STATUS_OPTIONS: readonly {
  label: string;
  value: BookingFilterValue;
}[] = [
  { label: "Всі статуси", value: "all" },
  { label: "Очікує", value: "pending" },
  { label: "Підтверджено", value: "confirmed" },
  { label: "За столом", value: "seated" },
  { label: "Завершено", value: "completed" },
  { label: "Скасовано", value: "cancelled" },
];

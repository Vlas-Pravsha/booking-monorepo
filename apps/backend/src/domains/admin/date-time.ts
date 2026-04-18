import { tz } from "@date-fns/tz";
import { differenceInMinutes, format } from "date-fns";
import { uk } from "date-fns/locale";

const RESTAURANT_TIME_ZONE = "Europe/Kyiv";
const dateFormatOptions = {
  in: tz(RESTAURANT_TIME_ZONE),
  locale: uk,
} as const;

export const formatDate = (date: Date) =>
  format(date, "dd.MM.yyyy", dateFormatOptions);

export const formatTime = (date: Date) =>
  format(date, "HH:mm", dateFormatOptions);

export const durationMinutes = (start: Date, end: Date) =>
  Math.max(0, differenceInMinutes(end, start));

import { tz } from "@date-fns/tz";
import { format, isDate, parseISO } from "date-fns";
import { uk } from "date-fns/locale";

const APP_TIME_ZONE = "Europe/Kyiv";
const appDateFormatOptions = { in: tz(APP_TIME_ZONE) } as const;

function toDate(value: Date | string) {
  return isDate(value) ? value : parseISO(value);
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("uk-UA", {
    currency: "UAH",
    minimumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}

export function getLocalDateKey(value: Date | string) {
  return format(toDate(value), "yyyy-MM-dd", appDateFormatOptions);
}

export function getLocalMonthKey(value: Date | string) {
  return format(toDate(value), "yyyy-MM", appDateFormatOptions);
}

export function formatBookingDatetime(startAt: string, endAt: string) {
  const start = parseISO(startAt);
  const end = parseISO(endAt);

  const date = format(start, "d MMM yyyy", { locale: uk });
  const startTime = format(start, "HH:mm");
  const endTime = format(end, "HH:mm");

  return { date, range: `${startTime} – ${endTime}` };
}

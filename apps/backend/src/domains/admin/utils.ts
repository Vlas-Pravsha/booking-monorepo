import type {
  AdminBookingRecord,
  AdminCustomerRecord,
  AdminTableRecord,
} from "./selects";

const kyivTimeZone = "Europe/Kyiv";

const localDateFormatter = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  timeZone: kyivTimeZone,
  year: "numeric",
});

const localTimeFormatter = new Intl.DateTimeFormat("uk-UA", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: kyivTimeZone,
});

const visitBookingStatuses = new Set<string>(["seated", "completed"]);

export const formatDisplayDate = (value: Date): string =>
  localDateFormatter.format(value);

export const formatDisplayTime = (value: Date): string =>
  localTimeFormatter.format(value);

export const getDurationMinutes = (startAt: Date, endAt: Date): number =>
  Math.max(0, Math.round((endAt.getTime() - startAt.getTime()) / 60_000));

export const extractTableNumber = (name: string, fallback: number): number => {
  const numericMatch = name.match(/\d+/);

  if (!numericMatch) {
    return fallback;
  }

  return Number.parseInt(numericMatch[0], 10);
};

export const deriveTableShape = (
  seats: number
): "rectangle" | "round" | "square" => {
  if (seats <= 2) {
    return "round";
  }

  if (seats <= 4) {
    return "square";
  }

  return "rectangle";
};

export const calculateTableStatus = (
  bookings: AdminTableRecord["bookings"],
  statusOverride: string | null,
  now: Date
): "available" | "maintenance" | "occupied" | "reserved" => {
  if (statusOverride === "maintenance") {
    return "maintenance";
  }

  const hasActiveSeatedBooking = bookings.some((booking) => {
    if (booking.status !== "seated") {
      return false;
    }

    return now >= booking.startAt && now < booking.endAt;
  });

  if (hasActiveSeatedBooking) {
    return "occupied";
  }

  const hasUpcomingReservation = bookings.some((booking) => {
    if (booking.status === "seated") {
      return false;
    }

    return booking.endAt >= now;
  });

  if (hasUpcomingReservation) {
    return "reserved";
  }

  return "available";
};

export const hasSampleBooking = (booking: AdminBookingRecord) =>
  booking.isSample;

export const hasSampleTableBooking = (table: AdminTableRecord) =>
  table.bookings.some((booking) => booking.isSample);

export const hasSampleCustomer = (customer: AdminCustomerRecord) =>
  customer.isSample || customer.bookings.some((booking) => booking.isSample);

export const isCompletedVisitBooking = (status: string): boolean =>
  visitBookingStatuses.has(status);

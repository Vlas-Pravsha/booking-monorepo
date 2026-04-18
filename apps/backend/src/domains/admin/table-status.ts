import { isAfter, isBefore } from "date-fns";

import type { TableRecord } from "./queries";

export type AdminTableStatus =
  | "available"
  | "maintenance"
  | "occupied"
  | "reserved";

type Booking = TableRecord["bookings"][number];

const isWithinInterval = (now: Date, booking: Booking): boolean =>
  !isBefore(now, booking.startAt) && isBefore(now, booking.endAt);

const isSeated = (booking: Booking): boolean => booking.status === "seated";

const isUpcoming = (booking: Booking, now: Date): boolean =>
  booking.status !== "seated" && !isAfter(now, booking.endAt);

export const tableShape = (seats: number): "rectangle" | "round" | "square" => {
  if (seats <= 2) {
    return "round";
  }
  if (seats <= 4) {
    return "square";
  }
  return "rectangle";
};

export const tableNumber = (name: string, fallback: number): number => {
  const match = name.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : fallback;
};

export const tableStatus = (
  bookings: TableRecord["bookings"],
  statusOverride: string | null,
  now: Date
): AdminTableStatus => {
  if (statusOverride === "maintenance") {
    return "maintenance";
  }

  if (bookings.some((b) => isSeated(b) && isWithinInterval(now, b))) {
    return "occupied";
  }
  if (bookings.some((b) => isUpcoming(b, now))) {
    return "reserved";
  }

  return "available";
};

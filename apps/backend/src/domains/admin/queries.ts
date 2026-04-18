import type { Prisma } from "../../generated/prisma/client.js";
import { getActiveBookingStatuses } from "../booking/status";

export const restaurantSummarySelect = {
  domain: true,
  id: true,
  name: true,
} satisfies Prisma.RestaurantSelect;

export const bookingSelect = {
  customer: { select: { email: true } },
  customerEmail: true,
  customerId: true,
  customerName: true,
  customerPhone: true,
  endAt: true,
  guestCount: true,
  id: true,
  isSample: true,
  note: true,
  source: true,
  startAt: true,
  status: true,
  table: { select: { id: true, name: true } },
  totalAmount: true,
} satisfies Prisma.BookingSelect;

export const customerSelect = {
  bookings: {
    orderBy: { startAt: "desc" },
    select: {
      isSample: true,
      startAt: true,
      status: true,
      totalAmount: true,
    },
  },
  createdAt: true,
  email: true,
  id: true,
  isSample: true,
  name: true,
  notes: true,
  phone: true,
  tags: {
    orderBy: { position: "asc" },
    select: { label: true },
  },
  vip: true,
} satisfies Prisma.CustomerSelect;

export const tableSelect = {
  bookings: {
    select: {
      endAt: true,
      isSample: true,
      startAt: true,
      status: true,
    },
    where: { status: { in: getActiveBookingStatuses() } },
  },
  id: true,
  name: true,
  position: true,
  seats: true,
  statusOverride: true,
} satisfies Prisma.RestaurantTableSelect;

export type RestaurantSummary = Prisma.RestaurantGetPayload<{
  select: typeof restaurantSummarySelect;
}>;

export type BookingRecord = Prisma.BookingGetPayload<{
  select: typeof bookingSelect;
}>;

export type CustomerRecord = Prisma.CustomerGetPayload<{
  select: typeof customerSelect;
}>;

export type TableRecord = Prisma.RestaurantTableGetPayload<{
  select: typeof tableSelect;
}>;

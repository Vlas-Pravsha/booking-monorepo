import type { Prisma } from "@prisma/client";

const activeBookingStatuses = ["pending", "confirmed", "seated"] as const;

export const restaurantSummarySelect = {
  domain: true,
  id: true,
  name: true,
} satisfies Prisma.RestaurantSelect;

export const adminBookingSelect = {
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
  table: {
    select: {
      id: true,
      name: true,
    },
  },
  totalAmount: true,
} satisfies Prisma.BookingSelect;

export const adminCustomerSelect = {
  bookings: {
    orderBy: {
      startAt: "desc",
    },
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
    orderBy: {
      position: "asc",
    },
    select: {
      label: true,
    },
  },
  vip: true,
} satisfies Prisma.CustomerSelect;

export const adminTableSelect = {
  bookings: {
    select: {
      endAt: true,
      isSample: true,
      startAt: true,
      status: true,
    },
    where: {
      status: {
        in: [...activeBookingStatuses],
      },
    },
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

export type AdminBookingRecord = Prisma.BookingGetPayload<{
  select: typeof adminBookingSelect;
}>;

export type AdminCustomerRecord = Prisma.CustomerGetPayload<{
  select: typeof adminCustomerSelect;
}>;

export type AdminTableRecord = Prisma.RestaurantTableGetPayload<{
  select: typeof adminTableSelect;
}>;

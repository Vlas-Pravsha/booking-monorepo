import type { Prisma } from "../../generated/prisma/client.js";

export const publicBookingRestaurantSelect = {
  averageDuration: true,
  id: true,
  tables: {
    orderBy: {
      position: "asc",
    },
    select: {
      id: true,
      name: true,
      seats: true,
      statusOverride: true,
    },
  },
} satisfies Prisma.RestaurantSelect;

export const overlappingBookingSelect = {
  tableId: true,
} satisfies Prisma.BookingSelect;

export const availableTableSelect = {
  id: true,
  name: true,
} satisfies Prisma.RestaurantTableSelect;

export type PublicBookingRestaurantRecord = Prisma.RestaurantGetPayload<{
  select: typeof publicBookingRestaurantSelect;
}>;

export type OverlappingBookingRecord = Prisma.BookingGetPayload<{
  select: typeof overlappingBookingSelect;
}>;

export type AvailableTableRecord = Prisma.RestaurantTableGetPayload<{
  select: typeof availableTableSelect;
}>;

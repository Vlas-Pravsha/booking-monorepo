import type { PrismaExecutor } from "../../core/types";
import {
  availableTableSelect,
  overlappingBookingSelect,
  publicBookingRestaurantSelect,
} from "./queries";
import type {
  AvailableTableRecord,
  OverlappingBookingRecord,
  PublicBookingRestaurantRecord,
} from "./queries";
import { getActiveBookingStatuses } from "./status";

export type {
  AvailableTableRecord,
  OverlappingBookingRecord,
  PublicBookingRestaurantRecord,
} from "./queries";

export const findRestaurantForPublicBooking = (
  prisma: PrismaExecutor,
  domain: string
): Promise<PublicBookingRestaurantRecord | null> =>
  prisma.restaurant.findUnique({
    select: publicBookingRestaurantSelect,
    where: {
      domain,
    },
  });

export const findOverlappingBookingsByRestaurant = (
  prisma: PrismaExecutor,
  restaurantId: string,
  startAt: Date,
  endAt: Date
): Promise<OverlappingBookingRecord[]> =>
  prisma.booking.findMany({
    select: overlappingBookingSelect,
    where: {
      endAt: {
        gt: startAt,
      },
      restaurantId,
      startAt: {
        lt: endAt,
      },
      status: {
        in: getActiveBookingStatuses(),
      },
      tableId: {
        not: null,
      },
    },
  });

export const findAvailableTableById = (
  prisma: PrismaExecutor,
  restaurantId: string,
  tableId: string,
  guestCount: number,
  startAt: Date,
  endAt: Date
): Promise<AvailableTableRecord | null> =>
  prisma.restaurantTable.findFirst({
    select: availableTableSelect,
    where: {
      OR: [
        {
          statusOverride: null,
        },
        {
          statusOverride: {
            not: "maintenance",
          },
        },
      ],
      bookings: {
        none: {
          endAt: {
            gt: startAt,
          },
          startAt: {
            lt: endAt,
          },
          status: {
            in: getActiveBookingStatuses(),
          },
        },
      },
      id: tableId,
      restaurantId,
      seats: {
        gte: guestCount,
      },
    },
  });

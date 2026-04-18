import type {
  BookingStatusUpdateInput,
  CustomerUpdateInput,
  TableStatusOverrideUpdateInput,
} from "../../contracts";
import type { AppPrismaClient } from "../../core/types";

export const updateBookingStatus = (
  prisma: AppPrismaClient,
  restaurantId: string,
  bookingId: string,
  status: BookingStatusUpdateInput["status"]
) =>
  prisma.booking.updateMany({
    data: { status, updatedAt: new Date() },
    where: { id: bookingId, restaurantId },
  });

export const updateCustomer = (
  prisma: AppPrismaClient,
  restaurantId: string,
  customerId: string,
  vip: CustomerUpdateInput["vip"]
) =>
  prisma.customer.updateMany({
    data: { updatedAt: new Date(), vip },
    where: { id: customerId, restaurantId },
  });

export const updateTableStatusOverride = (
  prisma: AppPrismaClient,
  restaurantId: string,
  tableId: string,
  status: TableStatusOverrideUpdateInput["status"]
) =>
  prisma.restaurantTable.updateMany({
    data: { statusOverride: status === "maintenance" ? "maintenance" : null },
    where: { id: tableId, restaurantId },
  });

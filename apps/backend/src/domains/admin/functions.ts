import type {
  BookingStatusUpdateInput,
  CustomerUpdateInput,
  TableStatusOverrideUpdateInput,
} from "../../contracts";
import { ApiError } from "../../core/errors/api-error";
import type { AppPrismaClient } from "../../core/types";
import { requireRestaurant } from "./guards";
import { toBooking, toCustomer, toTable } from "./mappers";
import {
  findBookingsByRestaurant,
  findCustomersByRestaurant,
  findRestaurantByOwner,
  findTablesByRestaurant,
} from "./read";
import {
  updateBookingStatus,
  updateCustomer,
  updateTableStatusOverride,
} from "./write";

export const getAdminBookings = async (
  prisma: AppPrismaClient,
  ownerId: string
) => {
  const restaurant = await findRestaurantByOwner(prisma, ownerId);

  if (!restaurant) {
    return { bookings: [], hasSampleData: false, restaurant: null };
  }

  const bookings = await findBookingsByRestaurant(prisma, restaurant.id);

  return {
    bookings: bookings.map(toBooking),
    hasSampleData: bookings.some((b) => b.isSample),
    restaurant,
  };
};

export const updateAdminBookingStatus = async (
  prisma: AppPrismaClient,
  ownerId: string,
  bookingId: string,
  input: BookingStatusUpdateInput
) => {
  const restaurant = await requireRestaurant(prisma, ownerId);
  const result = await updateBookingStatus(
    prisma,
    restaurant.id,
    bookingId,
    input.status
  );

  if (result.count === 0) {
    throw ApiError.notFound("Booking not found");
  }

  return { success: true };
};

export const getAdminCustomers = async (
  prisma: AppPrismaClient,
  ownerId: string
) => {
  const restaurant = await findRestaurantByOwner(prisma, ownerId);

  if (!restaurant) {
    return { customers: [], hasSampleData: false, restaurant: null };
  }

  const customers = await findCustomersByRestaurant(prisma, restaurant.id);

  return {
    customers: customers.map(toCustomer),
    hasSampleData: customers.some(
      (c) => c.isSample || c.bookings.some((b) => b.isSample)
    ),
    restaurant,
  };
};

export const updateAdminCustomer = async (
  prisma: AppPrismaClient,
  ownerId: string,
  customerId: string,
  input: CustomerUpdateInput
) => {
  const restaurant = await requireRestaurant(prisma, ownerId);
  const result = await updateCustomer(
    prisma,
    restaurant.id,
    customerId,
    input.vip
  );

  if (result.count === 0) {
    throw ApiError.notFound("Customer not found");
  }

  return { success: true };
};

export const getAdminTables = async (
  prisma: AppPrismaClient,
  ownerId: string
) => {
  const restaurant = await findRestaurantByOwner(prisma, ownerId);

  if (!restaurant) {
    return { hasSampleData: false, restaurant: null, tables: [] };
  }

  const tables = await findTablesByRestaurant(prisma, restaurant.id);
  const now = new Date();

  return {
    hasSampleData: tables.some((t) => t.bookings.some((b) => b.isSample)),
    restaurant,
    tables: tables.map((t, i) => toTable(t, i, now)),
  };
};

export const updateAdminTableStatusOverride = async (
  prisma: AppPrismaClient,
  ownerId: string,
  tableId: string,
  input: TableStatusOverrideUpdateInput
) => {
  const restaurant = await requireRestaurant(prisma, ownerId);
  const result = await updateTableStatusOverride(
    prisma,
    restaurant.id,
    tableId,
    input.status
  );

  if (result.count === 0) {
    throw ApiError.notFound("Table not found");
  }

  return { success: true };
};

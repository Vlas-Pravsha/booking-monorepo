import type {
  BookingStatusUpdateInput,
  CustomerUpdateInput,
  TableStatusOverrideUpdateInput,
} from "../../contracts";
import { ApiError } from "../../core/api-error";
import type { AppPrismaClient } from "../../core/types";
import { mapBooking, mapCustomer, mapTable } from "./mappers";
import type { RestaurantSummary } from "./read";
import {
  findAdminBookingsByRestaurantId,
  findAdminCustomersByRestaurantId,
  findAdminTablesByRestaurantId,
  findRestaurantForOwner,
} from "./read";
import {
  hasSampleBooking,
  hasSampleCustomer,
  hasSampleTableBooking,
} from "./utils";
import {
  updateAdminBookingStatusById,
  updateAdminCustomerById,
  updateAdminTableStatusOverrideById,
} from "./write";

const requireRestaurantForOwner = async (
  prisma: AppPrismaClient,
  ownerId: string
): Promise<RestaurantSummary> => {
  const restaurant = await findRestaurantForOwner(prisma, ownerId);

  if (!restaurant) {
    throw ApiError.notFound("Restaurant not found");
  }

  return restaurant;
};

export const getAdminBookings = async (
  prisma: AppPrismaClient,
  ownerId: string
) => {
  const restaurant = await findRestaurantForOwner(prisma, ownerId);

  if (!restaurant) {
    return {
      bookings: [],
      hasSampleData: false,
      restaurant: null,
    };
  }

  const bookings = await findAdminBookingsByRestaurantId(prisma, restaurant.id);

  return {
    bookings: bookings.map(mapBooking),
    hasSampleData: bookings.some(hasSampleBooking),
    restaurant,
  };
};

export const updateAdminBookingStatus = async (
  prisma: AppPrismaClient,
  ownerId: string,
  bookingId: string,
  input: BookingStatusUpdateInput
) => {
  const restaurant = await requireRestaurantForOwner(prisma, ownerId);
  const result = await updateAdminBookingStatusById(
    prisma,
    restaurant.id,
    bookingId,
    input.status
  );

  if (result.count === 0) {
    throw ApiError.notFound("Booking not found");
  }

  return {
    success: true,
  };
};

export const getAdminCustomers = async (
  prisma: AppPrismaClient,
  ownerId: string
) => {
  const restaurant = await findRestaurantForOwner(prisma, ownerId);

  if (!restaurant) {
    return {
      customers: [],
      hasSampleData: false,
      restaurant: null,
    };
  }

  const customers = await findAdminCustomersByRestaurantId(
    prisma,
    restaurant.id
  );

  return {
    customers: customers.map(mapCustomer),
    hasSampleData: customers.some(hasSampleCustomer),
    restaurant,
  };
};

export const updateAdminCustomer = async (
  prisma: AppPrismaClient,
  ownerId: string,
  customerId: string,
  input: CustomerUpdateInput
) => {
  const restaurant = await requireRestaurantForOwner(prisma, ownerId);
  const result = await updateAdminCustomerById(
    prisma,
    restaurant.id,
    customerId,
    input.vip
  );

  if (result.count === 0) {
    throw ApiError.notFound("Customer not found");
  }

  return {
    success: true,
  };
};

export const getAdminTables = async (
  prisma: AppPrismaClient,
  ownerId: string
) => {
  const restaurant = await findRestaurantForOwner(prisma, ownerId);

  if (!restaurant) {
    return {
      hasSampleData: false,
      restaurant: null,
      tables: [],
    };
  }

  const tables = await findAdminTablesByRestaurantId(prisma, restaurant.id);
  const now = new Date();

  return {
    hasSampleData: tables.some(hasSampleTableBooking),
    restaurant,
    tables: tables.map((table, index) => mapTable(table, index, now)),
  };
};

export const updateAdminTableStatusOverride = async (
  prisma: AppPrismaClient,
  ownerId: string,
  tableId: string,
  input: TableStatusOverrideUpdateInput
) => {
  const restaurant = await requireRestaurantForOwner(prisma, ownerId);
  const result = await updateAdminTableStatusOverrideById(
    prisma,
    restaurant.id,
    tableId,
    input.status
  );

  if (result.count === 0) {
    throw ApiError.notFound("Table not found");
  }

  return {
    success: true,
  };
};

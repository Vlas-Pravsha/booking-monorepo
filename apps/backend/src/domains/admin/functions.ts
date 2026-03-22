import type {
  BookingStatusUpdateInput,
  CustomerUpdateInput,
  TableStatusOverrideUpdateInput,
} from "../../contracts";
import { ApiError } from "../../core/api-error";
import type { AppPrismaClient } from "../../core/types";
import { mapBooking, mapCustomer, mapTable } from "./mappers";
import {
  adminBookingSelect,
  adminCustomerSelect,
  adminTableSelect,
  restaurantSummarySelect,
} from "./selects";
import type { RestaurantSummary } from "./selects";
import {
  hasSampleBooking,
  hasSampleCustomer,
  hasSampleTableBooking,
} from "./utils";

const findRestaurantForOwner = (
  prisma: AppPrismaClient,
  ownerId: string
): Promise<RestaurantSummary | null> =>
  prisma.restaurant.findUnique({
    select: restaurantSummarySelect,
    where: {
      ownerId,
    },
  });

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

  const bookings = await prisma.booking.findMany({
    orderBy: {
      startAt: "desc",
    },
    select: adminBookingSelect,
    where: {
      restaurantId: restaurant.id,
    },
  });

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
  const result = await prisma.booking.updateMany({
    data: {
      status: input.status,
      updatedAt: new Date(),
    },
    where: {
      id: bookingId,
      restaurantId: restaurant.id,
    },
  });

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

  const customers = await prisma.customer.findMany({
    orderBy: [{ vip: "desc" }, { createdAt: "desc" }],
    select: adminCustomerSelect,
    where: {
      restaurantId: restaurant.id,
    },
  });

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
  const result = await prisma.customer.updateMany({
    data: {
      updatedAt: new Date(),
      vip: input.vip,
    },
    where: {
      id: customerId,
      restaurantId: restaurant.id,
    },
  });

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

  const tables = await prisma.restaurantTable.findMany({
    orderBy: {
      position: "asc",
    },
    select: adminTableSelect,
    where: {
      restaurantId: restaurant.id,
    },
  });
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
  const statusOverride = input.status === "maintenance" ? "maintenance" : null;
  const result = await prisma.restaurantTable.updateMany({
    data: {
      statusOverride,
    },
    where: {
      id: tableId,
      restaurantId: restaurant.id,
    },
  });

  if (result.count === 0) {
    throw ApiError.notFound("Table not found");
  }

  return {
    success: true,
  };
};

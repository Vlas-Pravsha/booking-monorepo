import { Prisma } from "@prisma/client";

import type {
  BookingStatusUpdateInput,
  CustomerUpdateInput,
  TableStatusOverrideUpdateInput,
} from "../../contracts";
import { ApiError } from "../../core/api-error";
import { prisma } from "../../database/client";

const KYIV_TIME_ZONE = "Europe/Kyiv";
const ACTIVE_BOOKING_STATUSES = new Set(["pending", "confirmed", "seated"]);
const VISIT_BOOKING_STATUSES = new Set(["seated", "completed"]);

interface RestaurantSummary {
  id: string;
  name: string;
  domain: string;
}

interface RawBookingRow {
  id: string;
  customerId: string | null;
  tableId: string | null;
  customerName: string;
  customerPhone: string;
  guestCount: number;
  startAt: string;
  endAt: string;
  status: string;
  source: string;
  totalAmount: number;
  note: string;
  isSample: number | boolean;
  tableName: string | null;
}

interface RawCustomerRow {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  notes: string;
  vip: number | boolean;
  isSample: number | boolean;
  createdAt: string;
}

interface RawCustomerTagRow {
  customerId: string;
  label: string;
}

interface RawTableRow {
  id: string;
  name: string;
  seats: number;
  position: number;
  statusOverride: string | null;
}

const localDateFormatter = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  timeZone: KYIV_TIME_ZONE,
  year: "numeric",
});

const localTimeFormatter = new Intl.DateTimeFormat("uk-UA", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: KYIV_TIME_ZONE,
});

const toBoolean = (value: number | boolean): boolean =>
  value === true || value === 1;

const toDate = (value: string): Date => new Date(value);

const formatDisplayDate = (value: string): string =>
  localDateFormatter.format(toDate(value));

const formatDisplayTime = (value: string): string =>
  localTimeFormatter.format(toDate(value));

const getDurationMinutes = (startAt: string, endAt: string): number =>
  Math.max(
    0,
    Math.round((toDate(endAt).getTime() - toDate(startAt).getTime()) / 60_000)
  );

const extractTableNumber = (name: string, fallback: number): number => {
  const numericMatch = name.match(/\d+/);

  if (!numericMatch) {
    return fallback;
  }

  return Number.parseInt(numericMatch[0], 10);
};

const deriveTableShape = (seats: number): "rectangle" | "round" | "square" => {
  if (seats <= 2) {
    return "round";
  }

  if (seats <= 4) {
    return "square";
  }

  return "rectangle";
};

const mapBookingRow = (row: RawBookingRow) => ({
  customerId: row.customerId ?? undefined,
  customerName: row.customerName,
  customerPhone: row.customerPhone,
  date: formatDisplayDate(row.startAt),
  duration: getDurationMinutes(row.startAt, row.endAt),
  endAt: toDate(row.endAt).toISOString(),
  guests: row.guestCount,
  id: row.id,
  isSample: toBoolean(row.isSample),
  note: row.note,
  source: row.source as "phone" | "walk-in" | "website",
  startAt: toDate(row.startAt).toISOString(),
  status: row.status as
    | "cancelled"
    | "completed"
    | "confirmed"
    | "pending"
    | "seated",
  table: row.tableName ?? "Без призначеного столу",
  tableId: row.tableId ?? undefined,
  time: formatDisplayTime(row.startAt),
  totalAmount: row.totalAmount,
});

const findRestaurantForOwner = (
  ownerId: string
): Promise<RestaurantSummary | null> =>
  prisma.restaurant.findUnique({
    select: {
      domain: true,
      id: true,
      name: true,
    },
    where: {
      ownerId,
    },
  });

const requireRestaurantForOwner = async (
  ownerId: string
): Promise<RestaurantSummary> => {
  const restaurant = await findRestaurantForOwner(ownerId);

  if (!restaurant) {
    throw ApiError.notFound("Restaurant not found");
  }

  return restaurant;
};

const listBookingRows = (restaurantId: string): Promise<RawBookingRow[]> =>
  prisma.$queryRaw<RawBookingRow[]>(Prisma.sql`
    SELECT
      b.id,
      b.customerId,
      b.tableId,
      b.customerName,
      b.customerPhone,
      b.guestCount,
      b.startAt,
      b.endAt,
      b.status,
      b.source,
      b.totalAmount,
      b.note,
      b.isSample,
      rt.name AS tableName
    FROM "Booking" b
    LEFT JOIN "RestaurantTable" rt ON rt.id = b.tableId
    WHERE b.restaurantId = ${restaurantId}
    ORDER BY b.startAt DESC
  `);

const listCustomerRows = (restaurantId: string): Promise<RawCustomerRow[]> =>
  prisma.$queryRaw<RawCustomerRow[]>(Prisma.sql`
    SELECT
      c.id,
      c.name,
      c.phone,
      c.email,
      c.notes,
      c.vip,
      c.isSample,
      c.createdAt
    FROM "Customer" c
    WHERE c.restaurantId = ${restaurantId}
    ORDER BY c.vip DESC, c.createdAt DESC
  `);

const listCustomerTagRows = (
  restaurantId: string
): Promise<RawCustomerTagRow[]> =>
  prisma.$queryRaw<RawCustomerTagRow[]>(Prisma.sql`
    SELECT
      ct.customerId,
      ct.label
    FROM "CustomerTag" ct
    INNER JOIN "Customer" c ON c.id = ct.customerId
    WHERE c.restaurantId = ${restaurantId}
    ORDER BY ct.position ASC
  `);

const listTableRows = (restaurantId: string): Promise<RawTableRow[]> =>
  prisma.$queryRaw<RawTableRow[]>(Prisma.sql`
    SELECT
      id,
      name,
      seats,
      position,
      statusOverride
    FROM "RestaurantTable"
    WHERE restaurantId = ${restaurantId}
    ORDER BY position ASC
  `);

const buildCustomerTagsMap = (tagRows: RawCustomerTagRow[]) => {
  const tagsMap = new Map<string, string[]>();

  for (const row of tagRows) {
    const tags = tagsMap.get(row.customerId) ?? [];
    tags.push(row.label);
    tagsMap.set(row.customerId, tags);
  }

  return tagsMap;
};

const buildBookingMapByCustomer = (bookingRows: RawBookingRow[]) => {
  const map = new Map<string, RawBookingRow[]>();

  for (const row of bookingRows) {
    if (!row.customerId) {
      continue;
    }

    const rows = map.get(row.customerId) ?? [];
    rows.push(row);
    map.set(row.customerId, rows);
  }

  return map;
};

const deriveTableStatus = (
  tableId: string,
  statusOverride: string | null,
  bookingRows: RawBookingRow[],
  now: Date
): "available" | "maintenance" | "occupied" | "reserved" => {
  if (statusOverride === "maintenance") {
    return "maintenance";
  }

  const tableBookings = bookingRows.filter(
    (row) => row.tableId === tableId && ACTIVE_BOOKING_STATUSES.has(row.status)
  );

  const hasActiveSeatedBooking = tableBookings.some((row) => {
    if (row.status !== "seated") {
      return false;
    }

    const startAt = toDate(row.startAt);
    const endAt = toDate(row.endAt);
    return now >= startAt && now < endAt;
  });

  if (hasActiveSeatedBooking) {
    return "occupied";
  }

  const hasUpcomingReservation = tableBookings.some((row) => {
    if (row.status === "seated") {
      return false;
    }

    return toDate(row.endAt) >= now;
  });

  if (hasUpcomingReservation) {
    return "reserved";
  }

  return "available";
};

export const getAdminBookings = async (ownerId: string) => {
  const restaurant = await findRestaurantForOwner(ownerId);

  if (!restaurant) {
    return {
      bookings: [],
      hasSampleData: false,
      restaurant: null,
    };
  }

  const bookingRows = await listBookingRows(restaurant.id);

  return {
    bookings: bookingRows.map(mapBookingRow),
    hasSampleData: bookingRows.some((row) => toBoolean(row.isSample)),
    restaurant,
  };
};

export const updateAdminBookingStatus = async (
  ownerId: string,
  bookingId: string,
  input: BookingStatusUpdateInput
) => {
  const restaurant = await requireRestaurantForOwner(ownerId);
  const result = await prisma.$executeRaw(Prisma.sql`
    UPDATE "Booking"
    SET
      status = ${input.status},
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ${bookingId} AND restaurantId = ${restaurant.id}
  `);

  if (result === 0) {
    throw ApiError.notFound("Booking not found");
  }

  return {
    success: true,
  };
};

export const getAdminCustomers = async (ownerId: string) => {
  const restaurant = await findRestaurantForOwner(ownerId);

  if (!restaurant) {
    return {
      customers: [],
      hasSampleData: false,
      restaurant: null,
    };
  }

  const [customerRows, tagRows, bookingRows] = await Promise.all([
    listCustomerRows(restaurant.id),
    listCustomerTagRows(restaurant.id),
    listBookingRows(restaurant.id),
  ]);
  const tagsMap = buildCustomerTagsMap(tagRows);
  const bookingsByCustomerId = buildBookingMapByCustomer(bookingRows);

  const customers = customerRows.map((row) => {
    const customerBookings = bookingsByCustomerId.get(row.id) ?? [];
    const completedVisits = customerBookings.filter((booking) =>
      VISIT_BOOKING_STATUSES.has(booking.status)
    );
    const [latestVisit] = completedVisits
      .map((booking) => booking.startAt)
      .toSorted((left, right) => right.localeCompare(left));

    return {
      createdAt: toDate(row.createdAt).toISOString(),
      email: row.email ?? "",
      id: row.id,
      isSample: toBoolean(row.isSample),
      lastVisit: latestVisit ? formatDisplayDate(latestVisit) : "Ще не було",
      lastVisitAt: latestVisit ? toDate(latestVisit).toISOString() : undefined,
      name: row.name,
      notes: row.notes,
      phone: row.phone,
      tags: tagsMap.get(row.id) ?? [],
      totalSpent: completedVisits.reduce(
        (sum, booking) => sum + booking.totalAmount,
        0
      ),
      vip: toBoolean(row.vip),
      visits: completedVisits.length,
    };
  });

  return {
    customers,
    hasSampleData:
      customerRows.some((row) => toBoolean(row.isSample)) ||
      bookingRows.some((row) => toBoolean(row.isSample)),
    restaurant,
  };
};

export const updateAdminCustomer = async (
  ownerId: string,
  customerId: string,
  input: CustomerUpdateInput
) => {
  const restaurant = await requireRestaurantForOwner(ownerId);
  const result = await prisma.$executeRaw(Prisma.sql`
    UPDATE "Customer"
    SET
      vip = ${input.vip},
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ${customerId} AND restaurantId = ${restaurant.id}
  `);

  if (result === 0) {
    throw ApiError.notFound("Customer not found");
  }

  return {
    success: true,
  };
};

export const getAdminTables = async (ownerId: string) => {
  const restaurant = await findRestaurantForOwner(ownerId);

  if (!restaurant) {
    return {
      hasSampleData: false,
      restaurant: null,
      tables: [],
    };
  }

  const [tableRows, bookingRows] = await Promise.all([
    listTableRows(restaurant.id),
    listBookingRows(restaurant.id),
  ]);
  const now = new Date();

  const tables = tableRows.map((row, index) => ({
    id: row.id,
    isSample: false,
    name: row.name,
    number: extractTableNumber(row.name, index + 1),
    position: {
      x: row.position % 3,
      y: Math.floor(row.position / 3),
    },
    seats: row.seats,
    shape: deriveTableShape(row.seats),
    status: deriveTableStatus(row.id, row.statusOverride, bookingRows, now),
  }));

  return {
    hasSampleData: bookingRows.some((row) => toBoolean(row.isSample)),
    restaurant,
    tables,
  };
};

export const updateAdminTableStatusOverride = async (
  ownerId: string,
  tableId: string,
  input: TableStatusOverrideUpdateInput
) => {
  const restaurant = await requireRestaurantForOwner(ownerId);
  const statusOverride = input.status === "maintenance" ? "maintenance" : null;
  const result = await prisma.$executeRaw(Prisma.sql`
    UPDATE "RestaurantTable"
    SET statusOverride = ${statusOverride}
    WHERE id = ${tableId} AND restaurantId = ${restaurant.id}
  `);

  if (result === 0) {
    throw ApiError.notFound("Table not found");
  }

  return {
    success: true,
  };
};

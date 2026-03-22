import type {
  AdminBookingRecord,
  AdminCustomerRecord,
  AdminTableRecord,
} from "./selects";
import {
  calculateTableStatus,
  deriveTableShape,
  extractTableNumber,
  formatDisplayDate,
  formatDisplayTime,
  getDurationMinutes,
  isCompletedVisitBooking,
} from "./utils";

export const mapBooking = (booking: AdminBookingRecord) => ({
  customerId: booking.customerId ?? undefined,
  customerName: booking.customerName,
  customerPhone: booking.customerPhone,
  date: formatDisplayDate(booking.startAt),
  duration: getDurationMinutes(booking.startAt, booking.endAt),
  endAt: booking.endAt.toISOString(),
  guests: booking.guestCount,
  id: booking.id,
  isSample: booking.isSample,
  note: booking.note,
  source: booking.source as "phone" | "walk-in" | "website",
  startAt: booking.startAt.toISOString(),
  status: booking.status as
    | "cancelled"
    | "completed"
    | "confirmed"
    | "pending"
    | "seated",
  table: booking.table?.name ?? "Unassigned table",
  tableId: booking.table?.id,
  time: formatDisplayTime(booking.startAt),
  totalAmount: booking.totalAmount,
});

export const mapCustomer = (customer: AdminCustomerRecord) => {
  const completedVisits = customer.bookings.filter((booking) =>
    isCompletedVisitBooking(booking.status)
  );
  const [latestVisit] = completedVisits.toSorted(
    (left, right) => right.startAt.getTime() - left.startAt.getTime()
  );

  return {
    createdAt: customer.createdAt.toISOString(),
    email: customer.email ?? "",
    id: customer.id,
    isSample: customer.isSample,
    lastVisit: latestVisit
      ? formatDisplayDate(latestVisit.startAt)
      : "No visits yet",
    lastVisitAt: latestVisit?.startAt.toISOString(),
    name: customer.name,
    notes: customer.notes,
    phone: customer.phone,
    tags: customer.tags.map((tag) => tag.label),
    totalSpent: completedVisits.reduce(
      (sum, booking) => sum + booking.totalAmount,
      0
    ),
    vip: customer.vip,
    visits: completedVisits.length,
  };
};

export const mapTable = (
  table: AdminTableRecord,
  index: number,
  now: Date
) => ({
  id: table.id,
  isSample: false,
  name: table.name,
  number: extractTableNumber(table.name, index + 1),
  position: {
    x: table.position % 3,
    y: Math.floor(table.position / 3),
  },
  seats: table.seats,
  shape: deriveTableShape(table.seats),
  status: calculateTableStatus(table.bookings, table.statusOverride, now),
});

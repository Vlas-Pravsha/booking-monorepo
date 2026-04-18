import { formatISO } from "date-fns";

import { durationMinutes, formatDate, formatTime } from "./date-time";
import type { BookingRecord, CustomerRecord, TableRecord } from "./queries";
import { tableNumber, tableShape, tableStatus } from "./table-status";

export const toBooking = (booking: BookingRecord) => ({
  customerEmail: booking.customerEmail ?? booking.customer?.email ?? undefined,
  customerId: booking.customerId ?? undefined,
  customerName: booking.customerName,
  customerPhone: booking.customerPhone ?? "",
  date: formatDate(booking.startAt),
  duration: durationMinutes(booking.startAt, booking.endAt),
  endAt: formatISO(booking.endAt),
  guests: booking.guestCount,
  id: booking.id,
  isSample: booking.isSample,
  note: booking.note,
  source: booking.source as "phone" | "walk-in" | "website",
  startAt: formatISO(booking.startAt),
  status: booking.status as
    | "cancelled"
    | "completed"
    | "confirmed"
    | "pending"
    | "seated",
  table: booking.table?.name ?? "Unassigned table",
  tableId: booking.table?.id,
  time: formatTime(booking.startAt),
  totalAmount: booking.totalAmount,
});

export const toCustomer = (customer: CustomerRecord) => {
  const completedVisits = customer.bookings.filter(
    (booking) => booking.status === "seated" || booking.status === "completed"
  );
  const [latest] = completedVisits.toSorted(
    (a, b) => b.startAt.getTime() - a.startAt.getTime()
  );

  return {
    createdAt: formatISO(customer.createdAt),
    email: customer.email ?? "",
    id: customer.id,
    isSample: customer.isSample,
    lastVisit: latest ? formatDate(latest.startAt) : "Візитів ще немає",
    lastVisitAt: latest ? formatISO(latest.startAt) : undefined,
    name: customer.name,
    notes: customer.notes,
    phone: customer.phone ?? "",
    tags: customer.tags.map((tag) => tag.label),
    totalSpent: completedVisits.reduce(
      (sum, booking) => sum + booking.totalAmount,
      0
    ),
    vip: customer.vip,
    visits: completedVisits.length,
  };
};

export const toTable = (table: TableRecord, index: number, now: Date) => ({
  id: table.id,
  isSample: false,
  name: table.name,
  number: tableNumber(table.name, index + 1),
  position: { x: table.position % 3, y: Math.floor(table.position / 3) },
  seats: table.seats,
  shape: tableShape(table.seats),
  status: tableStatus(table.bookings, table.statusOverride, now),
});

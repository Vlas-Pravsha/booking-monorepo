import type { Booking } from "@/entities/booking";

import type { BookingFilterValue } from "../model/constants";

export function filterBookings(
  bookings: readonly Booking[],
  searchQuery: string,
  statusFilter: BookingFilterValue
): Booking[] {
  const normalizedQuery = searchQuery.toLowerCase();

  return bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(normalizedQuery) ||
      booking.customerPhone?.includes(searchQuery) ||
      booking.customerEmail?.toLowerCase().includes(normalizedQuery) ||
      booking.table.toLowerCase().includes(normalizedQuery);

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
}

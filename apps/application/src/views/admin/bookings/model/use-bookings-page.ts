"use client";

import * as React from "react";

import { useBookingsQuery } from "@/entities/booking";
import { useAuthAccessToken } from "@/features/auth/session";

import { filterBookings } from "../lib/filter-bookings";
import type { BookingFilterValue } from "./constants";

const EMPTY_BOOKINGS: never[] = [];

export function useBookingsPage() {
  const accessToken = useAuthAccessToken();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] =
    React.useState<BookingFilterValue>("all");
  const bookingsQuery = useBookingsQuery(accessToken);
  const bookings = bookingsQuery.data?.bookings ?? EMPTY_BOOKINGS;
  const restaurant = bookingsQuery.data?.restaurant ?? null;
  const filteredBookings = React.useMemo(
    () => filterBookings(bookings, searchQuery, statusFilter),
    [bookings, searchQuery, statusFilter]
  );
  const pendingCount = React.useMemo(
    () => bookings.filter(({ status }) => status === "pending").length,
    [bookings]
  );
  const confirmedCount = React.useMemo(
    () => bookings.filter(({ status }) => status === "confirmed").length,
    [bookings]
  );
  const cancelledCount = React.useMemo(
    () => bookings.filter(({ status }) => status === "cancelled").length,
    [bookings]
  );
  const refreshBookings = React.useCallback(() => {
    bookingsQuery.refetch();
  }, [bookingsQuery]);

  return {
    bookings,
    bookingsQuery,
    cancelledCount,
    confirmedCount,
    filteredBookings,
    isLoading: bookingsQuery.isLoading,
    isRefreshing: bookingsQuery.isFetching,
    pendingCount,
    refreshBookings,
    restaurant,
    searchQuery,
    setSearchQuery,
    setStatusFilter,
    statusFilter,
  };
}

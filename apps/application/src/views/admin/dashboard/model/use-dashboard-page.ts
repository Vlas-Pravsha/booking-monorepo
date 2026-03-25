"use client";

import * as React from "react";

import { useBookingsQuery } from "@/entities/booking";
import { useCustomersQuery } from "@/entities/customer";
import { useTablesQuery } from "@/entities/table";
import { getLocalDateKey } from "@/shared/lib/formatters";
import { useAdminAccessToken } from "@/views/admin/shared";

import {
  buildDashboardStatItems,
  buildOccupancySlots,
} from "../lib/get-dashboard-data";

const EMPTY_BOOKINGS: never[] = [];
const EMPTY_CUSTOMERS: never[] = [];
const EMPTY_TABLES: never[] = [];

export function useDashboardPage() {
  const accessToken = useAdminAccessToken();
  const bookingsQuery = useBookingsQuery(accessToken);
  const customersQuery = useCustomersQuery(accessToken);
  const tablesQuery = useTablesQuery(accessToken);
  const bookings = bookingsQuery.data?.bookings ?? EMPTY_BOOKINGS;
  const customers = customersQuery.data?.customers ?? EMPTY_CUSTOMERS;
  const tables = tablesQuery.data?.tables ?? EMPTY_TABLES;
  const hasSampleData =
    Boolean(bookingsQuery.data?.hasSampleData) ||
    Boolean(customersQuery.data?.hasSampleData) ||
    Boolean(tablesQuery.data?.hasSampleData);
  const restaurant = bookingsQuery.data?.restaurant ?? null;
  const pendingBookings = React.useMemo(
    () => bookings.filter(({ status }) => status === "pending").length,
    [bookings]
  );
  const confirmedBookings = React.useMemo(
    () => bookings.filter(({ status }) => status === "confirmed").length,
    [bookings]
  );
  const statItems = React.useMemo(
    () => buildDashboardStatItems(bookings, customers, tables),
    [bookings, customers, tables]
  );
  const occupancySlots = React.useMemo(
    () => buildOccupancySlots(bookings, tables),
    [bookings, tables]
  );
  const recentBookings = React.useMemo(() => {
    const todayKey = getLocalDateKey(new Date());
    const todayBookings = bookings.filter(
      (booking) => getLocalDateKey(booking.startAt) === todayKey
    );

    return (todayBookings.length > 0 ? todayBookings : bookings).slice(0, 5);
  }, [bookings]);
  const refreshDashboard = React.useCallback(async () => {
    await Promise.all([
      bookingsQuery.refetch(),
      customersQuery.refetch(),
      tablesQuery.refetch(),
    ]);
  }, [bookingsQuery, customersQuery, tablesQuery]);

  return {
    confirmedBookings,
    hasSampleData,
    isLoading:
      bookingsQuery.isLoading ||
      customersQuery.isLoading ||
      tablesQuery.isLoading,
    isRefreshing:
      bookingsQuery.isFetching ||
      customersQuery.isFetching ||
      tablesQuery.isFetching,
    occupancySlots,
    pendingBookings,
    recentBookings,
    refreshDashboard,
    restaurant,
    statItems,
  };
}

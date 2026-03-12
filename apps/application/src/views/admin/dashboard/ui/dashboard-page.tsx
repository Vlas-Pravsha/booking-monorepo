"use client";

import { RefreshCw } from "lucide-react";
import * as React from "react";

import { useAppSelector } from "@/app/store/hooks";
import { useBookingsQuery } from "@/entities/booking";
import { useCustomersQuery } from "@/entities/customer";
import { useTablesQuery } from "@/entities/table";
import { selectAuthSession } from "@/features/auth/session";
import { surfaceClassNames } from "@/shared/config";
import { getLocalDateKey } from "@/shared/lib/formatters";
import { Button } from "@/shared/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";
import { SurfaceCard } from "@/shared/ui/surface-card";
import {
  MissingRestaurantState,
  SampleDataNotice,
} from "@/views/admin/shared/ui/data-state-cards";

import {
  buildDashboardStatItems,
  buildOccupancySlots,
} from "../lib/get-dashboard-data";
import { OccupancySlotItem } from "./components/occupancy-slot-item";
import { RecentBookingItem } from "./components/recent-booking-item";
import { StatCard } from "./components/stat-card";

const EMPTY_BOOKINGS: never[] = [];
const EMPTY_CUSTOMERS: never[] = [];
const EMPTY_TABLES: never[] = [];

function useDashboardQueries(accessToken: string | null) {
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

  return {
    bookings,
    bookingsQuery,
    customers,
    customersQuery,
    hasSampleData,
    restaurant,
    tables,
    tablesQuery,
  };
}

function useDashboardMetrics(
  bookings: Parameters<typeof buildDashboardStatItems>[0],
  customers: Parameters<typeof buildDashboardStatItems>[1],
  tables: Parameters<typeof buildDashboardStatItems>[2]
) {
  return React.useMemo(() => {
    const todayKey = getLocalDateKey(new Date());
    const todayBookings = bookings.filter(
      (booking) => getLocalDateKey(booking.startAt) === todayKey
    );

    return {
      confirmedBookings: bookings.filter(({ status }) => status === "confirmed")
        .length,
      occupancySlots: buildOccupancySlots(bookings, tables),
      pendingBookings: bookings.filter(({ status }) => status === "pending")
        .length,
      recentBookings: (todayBookings.length > 0
        ? todayBookings
        : bookings
      ).slice(0, 5),
      statItems: buildDashboardStatItems(bookings, customers, tables),
    };
  }, [bookings, customers, tables]);
}

export function AdminDashboardPage() {
  const session = useAppSelector(selectAuthSession);
  const accessToken = session?.accessToken ?? null;
  const dashboardQueries = useDashboardQueries(accessToken);
  const dashboardMetrics = useDashboardMetrics(
    dashboardQueries.bookings,
    dashboardQueries.customers,
    dashboardQueries.tables
  );
  const isLoading =
    dashboardQueries.bookingsQuery.isLoading ||
    dashboardQueries.customersQuery.isLoading ||
    dashboardQueries.tablesQuery.isLoading;

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="rounded-3xl border border-border/60 bg-card/80 px-6 py-10 text-sm text-muted-foreground shadow-xl">
          Завантажуємо оперативні показники ресторану...
        </div>
      </DashboardShell>
    );
  }

  if (!dashboardQueries.restaurant) {
    return (
      <DashboardShell>
        <MissingRestaurantState />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Огляд дня"
        title="Дашборд"
        subtitle="Ключові метрики рахуються з живих бронювань, столів і клієнтської бази вашого закладу."
        insights={[
          {
            label: "Ресторан",
            tone: "primary",
            value: dashboardQueries.restaurant.name,
          },
          {
            label: "Очікують підтвердження",
            tone: "warning",
            value: `${dashboardMetrics.pendingBookings} заявок`,
          },
          {
            label: "Підтверджені",
            tone: "success",
            value: `${dashboardMetrics.confirmedBookings} активних`,
          },
        ]}
        action={
          <Button
            className={surfaceClassNames.actionButton}
            onClick={async () => {
              await Promise.all([
                dashboardQueries.bookingsQuery.refetch(),
                dashboardQueries.customersQuery.refetch(),
                dashboardQueries.tablesQuery.refetch(),
              ]);
            }}
            disabled={
              dashboardQueries.bookingsQuery.isFetching ||
              dashboardQueries.customersQuery.isFetching ||
              dashboardQueries.tablesQuery.isFetching
            }
          >
            <RefreshCw className="h-4 w-4" />
            Оновити дані
          </Button>
        }
      />

      {dashboardQueries.hasSampleData ? <SampleDataNotice /> : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.statItems.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SurfaceCard interactive>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold">
                Останні бронювання
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Стрічка побудована з реальних записів бази даних
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardMetrics.recentBookings.length > 0 ? (
              dashboardMetrics.recentBookings.map((booking) => (
                <RecentBookingItem key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-border/70 bg-background/65 px-6 py-12 text-center text-sm text-muted-foreground">
                Ще немає бронювань для відображення.
              </div>
            )}
          </CardContent>
        </SurfaceCard>

        <SurfaceCard interactive>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold">
                Завантаженість столиків
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Заповнення слотів обчислюється з поточного календаря бронювань
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardMetrics.occupancySlots.map((slot) => (
                <OccupancySlotItem key={slot.time} slot={slot} />
              ))}
            </div>
          </CardContent>
        </SurfaceCard>
      </div>
    </DashboardShell>
  );
}

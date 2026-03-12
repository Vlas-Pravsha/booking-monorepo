"use client";

import { ArrowLeft, ArrowRight, RefreshCw, Search } from "lucide-react";
import * as React from "react";

import { useAppSelector } from "@/app/store/hooks";
import { useBookingsQuery } from "@/entities/booking";
import { selectAuthSession } from "@/features/auth/session";
import { surfaceClassNames } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CardContent, CardHeader } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";
import { SurfaceCard } from "@/shared/ui/surface-card";
import {
  MissingRestaurantState,
  SampleDataNotice,
} from "@/views/admin/shared/ui/data-state-cards";

import { filterBookings } from "../lib/filter-bookings";
import type { BookingFilterValue } from "../model/constants";
import { BookingStatusFilter } from "./components/booking-status-filter";
import { BookingTableRow } from "./components/booking-table-row";

const EMPTY_BOOKINGS: never[] = [];

function useBookingsPageData(
  accessToken: string | null,
  searchQuery: string,
  statusFilter: BookingFilterValue
) {
  const bookingsQuery = useBookingsQuery(accessToken);
  const bookings = bookingsQuery.data?.bookings ?? EMPTY_BOOKINGS;
  const restaurant = bookingsQuery.data?.restaurant ?? null;
  const derivedData = React.useMemo(() => {
    const pendingCount = bookings.filter(
      ({ status }) => status === "pending"
    ).length;
    const confirmedCount = bookings.filter(
      ({ status }) => status === "confirmed"
    ).length;
    const cancelledCount = bookings.filter(
      ({ status }) => status === "cancelled"
    ).length;

    return {
      cancelledCount,
      confirmedCount,
      filteredBookings: filterBookings(bookings, searchQuery, statusFilter),
      pendingCount,
    };
  }, [bookings, searchQuery, statusFilter]);

  return { ...derivedData, bookings, bookingsQuery, restaurant };
}

export function AdminBookingsPage() {
  const session = useAppSelector(selectAuthSession);
  const accessToken = session?.accessToken ?? null;
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] =
    React.useState<BookingFilterValue>("all");
  const pageData = useBookingsPageData(accessToken, searchQuery, statusFilter);

  if (pageData.bookingsQuery.isLoading) {
    return (
      <DashboardShell>
        <div className="rounded-3xl border border-border/60 bg-card/80 px-6 py-10 text-sm text-muted-foreground shadow-xl">
          Завантажуємо бронювання з бази даних...
        </div>
      </DashboardShell>
    );
  }

  if (!pageData.restaurant) {
    return (
      <DashboardShell>
        <MissingRestaurantState />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Керування бронями"
        title="Бронювання"
        subtitle="Список, фільтри та статуси працюють поверх живих записів з бази даних."
        insights={[
          {
            label: "Усього заявок",
            tone: "primary",
            value: `${pageData.bookings.length} бронювань`,
          },
          {
            label: "Очікують",
            tone: "warning",
            value: `${pageData.pendingCount} без відповіді`,
          },
          {
            label: "Підтверджені",
            tone: "success",
            value: `${pageData.confirmedCount} активних · ${pageData.cancelledCount} скасовано`,
          },
        ]}
        action={
          <Button
            className={surfaceClassNames.actionButton}
            onClick={() => {
              pageData.bookingsQuery.refetch();
            }}
            disabled={pageData.bookingsQuery.isFetching}
          >
            <RefreshCw className="h-4 w-4" />
            Оновити список
          </Button>
        }
      />

      {pageData.bookingsQuery.data?.hasSampleData ? <SampleDataNotice /> : null}

      <SurfaceCard>
        <CardHeader className="pb-4">
          <div className="mb-4 space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Пошук і статуси
            </p>
            <p className="text-sm text-muted-foreground">
              Фільтруйте бронювання за гостем, телефоном, столом або статусом.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Пошук за іменем, телефоном або столом..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className={cn(surfaceClassNames.mutedInput, "pl-10")}
              />
            </div>
            <div className="flex gap-2">
              <BookingStatusFilter
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left">
                  <th className="px-4 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Гість
                  </th>
                  <th className="px-4 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Стіл
                  </th>
                  <th className="px-4 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Дата та час
                  </th>
                  <th className="px-4 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Гостей
                  </th>
                  <th className="px-4 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Джерело
                  </th>
                  <th className="px-4 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Статус
                  </th>
                  <th className="px-4 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Дії
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageData.filteredBookings.length > 0 ? (
                  pageData.filteredBookings.map((booking) => (
                    <BookingTableRow key={booking.id} booking={booking} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="rounded-xl border border-dashed border-border/70 bg-background/65 px-6 py-12 text-center text-sm text-muted-foreground"
                    >
                      Бронювань за поточним фільтром не знайдено.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Показано {pageData.filteredBookings.length} з{" "}
              {pageData.bookings.length} бронювань
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                disabled
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Попередня
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                disabled
              >
                Наступна
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </SurfaceCard>
    </DashboardShell>
  );
}

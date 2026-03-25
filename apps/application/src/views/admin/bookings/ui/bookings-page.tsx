"use client";

import { ArrowLeft, ArrowRight, Search } from "lucide-react";

import { surfaceClassNames } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CardContent, CardHeader } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";
import { SurfaceCard } from "@/shared/ui/surface-card";
import {
  AdminPageLoadingState,
  AdminRefreshButton,
  AdminTableEmptyState,
  MissingRestaurantState,
  SampleDataNotice,
} from "@/views/admin/shared";

import { useBookingsPage } from "../model/use-bookings-page";
import { BookingStatusFilter } from "./components/booking-status-filter";
import { BookingTableRow } from "./components/booking-table-row";

export function AdminBookingsPage() {
  const pageData = useBookingsPage();

  if (pageData.isLoading) {
    return (
      <DashboardShell>
        <AdminPageLoadingState message="Завантажуємо бронювання з бази даних..." />
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
          <AdminRefreshButton
            onClick={() => pageData.refreshBookings()}
            disabled={pageData.isRefreshing}
            label="Оновити список"
          />
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
                value={pageData.searchQuery}
                onChange={(event) =>
                  pageData.setSearchQuery(event.target.value)
                }
                className={cn(surfaceClassNames.mutedInput, "pl-10")}
              />
            </div>
            <div className="flex gap-2">
              <BookingStatusFilter
                value={pageData.statusFilter}
                onChange={(value) => pageData.setStatusFilter(value)}
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
                  <AdminTableEmptyState
                    colSpan={7}
                    message="Бронювань за поточним фільтром не знайдено."
                  />
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

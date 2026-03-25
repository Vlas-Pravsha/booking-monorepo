"use client";

import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";
import { SurfaceCard } from "@/shared/ui/surface-card";
import {
  AdminInlineEmptyState,
  AdminPageLoadingState,
  AdminRefreshButton,
  MissingRestaurantState,
  SampleDataNotice,
} from "@/views/admin/shared";

import { useDashboardPage } from "../model/use-dashboard-page";
import { OccupancySlotItem } from "./components/occupancy-slot-item";
import { RecentBookingItem } from "./components/recent-booking-item";
import { StatCard } from "./components/stat-card";

export function AdminDashboardPage() {
  const dashboardPage = useDashboardPage();

  if (dashboardPage.isLoading) {
    return (
      <DashboardShell>
        <AdminPageLoadingState message="Завантажуємо оперативні показники ресторану..." />
      </DashboardShell>
    );
  }

  if (!dashboardPage.restaurant) {
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
            value: dashboardPage.restaurant.name,
          },
          {
            label: "Очікують підтвердження",
            tone: "warning",
            value: `${dashboardPage.pendingBookings} заявок`,
          },
          {
            label: "Підтверджені",
            tone: "success",
            value: `${dashboardPage.confirmedBookings} активних`,
          },
        ]}
        action={
          <AdminRefreshButton
            onClick={() => dashboardPage.refreshDashboard()}
            disabled={dashboardPage.isRefreshing}
            label="Оновити дані"
          />
        }
      />

      {dashboardPage.hasSampleData ? <SampleDataNotice /> : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardPage.statItems.map((item) => (
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
            {dashboardPage.recentBookings.length > 0 ? (
              dashboardPage.recentBookings.map((booking) => (
                <RecentBookingItem key={booking.id} booking={booking} />
              ))
            ) : (
              <AdminInlineEmptyState message="Ще немає бронювань для відображення." />
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
              {dashboardPage.occupancySlots.map((slot) => (
                <OccupancySlotItem key={slot.time} slot={slot} />
              ))}
            </div>
          </CardContent>
        </SurfaceCard>
      </div>
    </DashboardShell>
  );
}

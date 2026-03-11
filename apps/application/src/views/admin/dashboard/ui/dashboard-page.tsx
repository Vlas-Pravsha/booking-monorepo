"use client";

import { ArrowUpRight, CalendarDays } from "lucide-react";
import * as React from "react";

import { useBookingsQuery } from "@/entities/booking";
import { surfaceClassNames } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";
import { SurfaceCard } from "@/shared/ui/surface-card";

import { DASHBOARD_STATS, OCCUPANCY_SLOTS } from "../model/constants";
import { OccupancySlotItem } from "./components/occupancy-slot-item";
import { RecentBookingItem } from "./components/recent-booking-item";
import { StatCard } from "./components/stat-card";

export function AdminDashboardPage() {
  const { data: bookings = [] } = useBookingsQuery();
  const recentBookings = React.useMemo(() => bookings.slice(0, 5), [bookings]);
  const pendingBookings = React.useMemo(
    () => bookings.filter(({ status }) => status === "pending").length,
    [bookings]
  );
  const confirmedBookings = React.useMemo(
    () => bookings.filter(({ status }) => status === "confirmed").length,
    [bookings]
  );

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Огляд дня"
        title="Дашборд"
        subtitle="Огляд роботи закладу за сьогодні з ключовими сигналами по бронюваннях і завантаженню залу."
        insights={[
          {
            label: "Бронювань сьогодні",
            tone: "primary",
            value: `${bookings.length} записів`,
          },
          {
            label: "Очікують підтвердження",
            tone: "warning",
            value: `${pendingBookings} заявок`,
          },
          {
            label: "Підтверджені",
            tone: "success",
            value: `${confirmedBookings} активних`,
          },
        ]}
        action={
          <Button className={surfaceClassNames.actionButton}>
            <CalendarDays className="h-4 w-4" />
            Додати бронювання
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((item) => (
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
                Список останніх 5 бронювань з актуальними статусами
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 rounded-full px-3"
            >
              Всі
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBookings.map((booking) => (
              <RecentBookingItem key={booking.id} booking={booking} />
            ))}
          </CardContent>
        </SurfaceCard>

        <SurfaceCard interactive>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold">
                Завантаженість столиків
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Розподіл бронювань по часових слотах
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 rounded-full px-3"
            >
              Детальніше
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {OCCUPANCY_SLOTS.map((slot) => (
                <OccupancySlotItem key={slot.time} slot={slot} />
              ))}
            </div>
          </CardContent>
        </SurfaceCard>
      </div>
    </DashboardShell>
  );
}

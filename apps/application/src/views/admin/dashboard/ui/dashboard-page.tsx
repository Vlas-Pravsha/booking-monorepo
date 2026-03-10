"use client";

import { ArrowUpRight, CalendarDays } from "lucide-react";
import * as React from "react";

import { BOOKINGS } from "@/entities/booking";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";

import { DASHBOARD_STATS, OCCUPANCY_SLOTS } from "../model/constants";
import { OccupancySlotItem } from "./components/occupancy-slot-item";
import { RecentBookingItem } from "./components/recent-booking-item";
import { StatCard } from "./components/stat-card";

export function AdminDashboardPage() {
  const recentBookings = React.useMemo(() => BOOKINGS.slice(0, 5), []);

  return (
    <DashboardShell>
      <PageHeader
        title="Дашборд"
        subtitle="Огляд вашого закладу за сьогодні"
        action={
          <Button className="gap-2 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-105 hover:shadow-primary/30">
            <CalendarDays className="h-4 w-4" />
            Додати бронювання
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="group border-none bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
          <CardHeader className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-lg" />
            <div className="flex items-center justify-between relative">
              <div>
                <CardTitle className="text-xl font-bold">
                  Останні бронювання
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Список останніх 5 бронювань
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-primary hover:text-primary/80"
              >
                ВСІ
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <RecentBookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="group border-none bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
          <CardHeader className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-lg" />
            <div className="flex items-center justify-between relative">
              <div>
                <CardTitle className="text-xl font-bold">
                  Завантаженість столиків
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Розподіл бронювань по часу
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-primary hover:text-primary/80"
              >
                Детальніше
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {OCCUPANCY_SLOTS.map((slot) => (
                <OccupancySlotItem key={slot.time} slot={slot} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

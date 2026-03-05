"use client";

import {
  AlertCircle,
  ArrowUpRight,
  CalendarDays,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";
import * as React from "react";

import {
  BOOKINGS,
  getStatusBadgeClass,
  getStatusLabel,
} from "@/entities/booking";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-none bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5",
        className
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        {trend && trendValue && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs mt-3 font-medium",
              trend === "up" && "text-emerald-600",
              trend === "down" && "text-red-600",
              trend === "neutral" && "text-muted-foreground"
            )}
          >
            <TrendingUp
              className={cn("h-3 w-3", trend === "down" && "rotate-180")}
            />
            <span>{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function AdminPage() {
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
        <StatCard
          title="Бронювань сьогодні"
          value="24"
          description="Загалом на сьогодні"
          icon={CalendarDays}
          trend="up"
          trendValue="+12% минулого тижня"
        />
        <StatCard
          title="Очікують підтвердження"
          value="5"
          description="Потребують дії"
          icon={Clock}
          trend="neutral"
          trendValue="Без змін"
        />
        <StatCard
          title="Гостей"
          value="156"
          description="Всього клієнтів"
          icon={Users}
          trend="up"
          trendValue="+8% минулого місяця"
        />
        <StatCard
          title="Невідвідувані"
          value="3"
          description="Без попередження"
          icon={AlertCircle}
          trend="down"
          trendValue="-2 минулого тижня"
        />
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
              {BOOKINGS.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-white/50 p-4 transition-all duration-300 hover:border-primary/20 hover:bg-white/80 hover:shadow-sm"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      {booking.customerName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.table} •{booking.date} о{booking.time}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-medium",
                      getStatusBadgeClass(booking.status)
                    )}
                  >
                    {getStatusLabel(booking.status)}
                  </Badge>
                </div>
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
              {[
                { bookings: 8, fill: 45, time: "12:00 - 14:00" },
                { bookings: 3, fill: 20, time: "14:00 - 16:00" },
                { bookings: 2, fill: 15, time: "16:00 - 18:00" },
                { bookings: 14, fill: 85, time: "18:00 - 20:00" },
                { bookings: 16, fill: 95, time: "20:00 - 22:00" },
              ].map((slot) => (
                <div key={slot.time} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">
                      {slot.time}
                    </span>
                    <span className="text-foreground font-semibold">
                      {slot.bookings} бронювань
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out",
                        slot.fill >= 80
                          ? "bg-linear-to-br from-emerald-500 to-emerald-400"
                          : (slot.fill >= 50
                            ? "bg-linear-to-br from-amber-500 to-amber-400"
                            : "bg-linear-to-br from-muted-foreground to-muted-foreground/60")
                      )}
                      style={{ width: `${slot.fill}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

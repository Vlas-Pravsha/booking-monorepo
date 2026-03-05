"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Filter,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  X,
} from "lucide-react";
import * as React from "react";

import type { Booking } from "@/entities/booking";
import {
  BOOKINGS,
  getSourceLabel,
  getStatusBadgeClass,
  getStatusLabel,
} from "@/entities/booking";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";

export function BookingsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const filteredBookings = BOOKINGS.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerPhone?.includes(searchQuery) ||
      booking.table.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardShell>
      <PageHeader
        title="Бронювання"
        subtitle="Управління бронюваннями столиків"
        action={
          <Button className="gap-2 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-105 hover:shadow-primary/30">
            <Plus className="h-4 w-4" />
            Нове бронювання
          </Button>
        }
      />

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Пошук за іменем, телефоном або столом..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    {statusFilter === "all"
                      ? "Всі статуси"
                      : getStatusLabel(statusFilter as Booking["status"])}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    Всі статуси
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Очікує
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("confirmed")}
                  >
                    Підтверджено
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("seated")}>
                    За столом
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("completed")}
                  >
                    Завершено
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("cancelled")}
                  >
                    Скасовано
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="p-4 text-sm font-medium text-muted-foreground">
                    Гість
                  </th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">
                    Стіл
                  </th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">
                    Дата та час
                  </th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">
                    Гостей
                  </th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">
                    Джерело
                  </th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">
                    Статус
                  </th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">
                    Дії
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-border/50 hover:bg-white/50 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {booking.customerName}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3" />
                          {booking.customerPhone}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{booking.table}</td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {booking.date} о{booking.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {booking.duration} хв
                      </p>
                    </td>
                    <td className="p-4 text-sm">{booking.guests}</td>
                    <td className="p-4 text-sm">
                      {getSourceLabel(booking.source)}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "font-medium",
                          getStatusBadgeClass(booking.status)
                        )}
                      >
                        {getStatusLabel(booking.status)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Деталі</DropdownMenuItem>
                          <DropdownMenuItem>Редагувати</DropdownMenuItem>
                          {booking.status === "pending" && (
                            <>
                              <DropdownMenuItem className="text-emerald-600">
                                <Check className="h-4 w-4 mr-2" />
                                Підтвердити
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <X className="h-4 w-4 mr-2" />
                                Скасувати
                              </DropdownMenuItem>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2" />
                              Позначити як "За столом"
                            </DropdownMenuItem>
                          )}
                          {booking.status === "seated" && (
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2" />
                              Завершити
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Показано {filteredBookings.length} з {BOOKINGS.length} бронювань
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Попередня
              </Button>
              <Button variant="outline" size="sm">
                Наступна
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}

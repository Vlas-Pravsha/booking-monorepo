"use client";

import { ArrowLeft, ArrowRight, Plus, Search } from "lucide-react";
import * as React from "react";

import { BOOKINGS } from "@/entities/booking";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";

import { filterBookings } from "../lib/filter-bookings";
import type { BookingFilterValue } from "../model/constants";
import { BookingStatusFilter } from "./components/booking-status-filter";
import { BookingTableRow } from "./components/booking-table-row";

export function AdminBookingsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] =
    React.useState<BookingFilterValue>("all");

  const filteredBookings = React.useMemo(
    () => filterBookings(BOOKINGS, searchQuery, statusFilter),
    [searchQuery, statusFilter]
  );

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

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
                onChange={handleSearchChange}
                className="pl-10 bg-white/50"
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
                  <BookingTableRow key={booking.id} booking={booking} />
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

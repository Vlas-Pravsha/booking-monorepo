import { AlertCircle, CalendarDays, Clock, Users } from "lucide-react";

import type { Booking } from "@/entities/booking";
import type { Customer } from "@/entities/customer";
import type { Table } from "@/entities/table";
import { getLocalDateKey } from "@/shared/lib/formatters";

import type { OccupancySlot, StatCardItem } from "../model/types";

const SLOT_RANGES = [
  { endHour: 14, startHour: 12 },
  { endHour: 16, startHour: 14 },
  { endHour: 18, startHour: 16 },
  { endHour: 20, startHour: 18 },
  { endHour: 22, startHour: 20 },
] as const;

const isTodayBooking = (booking: Booking, todayKey: string) =>
  getLocalDateKey(booking.startAt) === todayKey;

const isOverlappingSlot = (
  booking: Booking,
  slotStart: Date,
  slotEnd: Date
): boolean => {
  const bookingStart = new Date(booking.startAt);
  const bookingEnd = new Date(booking.endAt);

  return bookingStart < slotEnd && bookingEnd > slotStart;
};

export const buildDashboardStatItems = (
  bookings: Booking[],
  customers: Customer[],
  tables: Table[]
): StatCardItem[] => {
  const todayKey = getLocalDateKey(new Date());
  const todayBookings = bookings.filter((booking) =>
    isTodayBooking(booking, todayKey)
  );
  const pendingBookings = todayBookings.filter(
    ({ status }) => status === "pending"
  ).length;
  const seatedBookings = todayBookings.filter(
    ({ status }) => status === "seated"
  ).length;
  const vipCustomers = customers.filter(({ vip }) => vip).length;
  const maintenanceTables = tables.filter(
    ({ status }) => status === "maintenance"
  ).length;

  return [
    {
      description: "Реальні записи на поточний день",
      icon: CalendarDays,
      title: "Бронювань сьогодні",
      trend: todayBookings.length > 0 ? "up" : "neutral",
      trendValue:
        todayBookings.length > 0
          ? `${todayBookings.length} активних у календарі`
          : "На сьогодні записів немає",
      value: String(todayBookings.length),
    },
    {
      description: "Потребують реакції менеджера",
      icon: Clock,
      title: "Очікують підтвердження",
      trend: "neutral",
      trendValue:
        pendingBookings > 0
          ? `${pendingBookings} заявок без відповіді`
          : "Черга чиста",
      value: String(pendingBookings),
    },
    {
      description: "Гості з живої клієнтської бази",
      icon: Users,
      title: "VIP клієнтів",
      trend: vipCustomers > 0 ? "up" : "neutral",
      trendValue:
        vipCustomers > 0
          ? `${vipCustomers} позначено важливими`
          : "VIP-сегмент ще не сформований",
      value: String(vipCustomers),
    },
    {
      description: "Зал під контролем прямо зараз",
      icon: AlertCircle,
      title: "Стілів у роботі",
      trend: maintenanceTables > 0 ? "down" : "up",
      trendValue:
        maintenanceTables > 0
          ? `${maintenanceTables} на обслуговуванні`
          : `${seatedBookings} гостей уже посаджено`,
      value: String(
        tables.filter(
          ({ status }) => status === "occupied" || status === "reserved"
        ).length
      ),
    },
  ];
};

export const buildOccupancySlots = (
  bookings: Booking[],
  tables: Table[]
): OccupancySlot[] => {
  const now = new Date();
  const totalTables = Math.max(1, tables.length);

  return SLOT_RANGES.map(({ endHour, startHour }) => {
    const slotStart = new Date(now);
    slotStart.setHours(startHour, 0, 0, 0);
    const slotEnd = new Date(now);
    slotEnd.setHours(endHour, 0, 0, 0);

    const matchingBookings = bookings.filter((booking) =>
      isOverlappingSlot(booking, slotStart, slotEnd)
    );
    const uniqueBookedTables = new Set(
      matchingBookings.map(({ tableId }) => tableId).filter(Boolean)
    );
    const fill = Math.min(
      100,
      Math.round((uniqueBookedTables.size / totalTables) * 100)
    );

    return {
      bookings: matchingBookings.length,
      fill,
      time: `${String(startHour).padStart(2, "0")}:00 - ${String(endHour).padStart(2, "0")}:00`,
    };
  });
};

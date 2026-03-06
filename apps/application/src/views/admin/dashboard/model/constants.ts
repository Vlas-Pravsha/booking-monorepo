import { AlertCircle, CalendarDays, Clock, Users } from "lucide-react";

import type { OccupancySlot, StatCardItem } from "./types";

export const DASHBOARD_STATS: readonly StatCardItem[] = [
  {
    description: "Загалом на сьогодні",
    icon: CalendarDays,
    title: "Бронювань сьогодні",
    trend: "up",
    trendValue: "+12% минулого тижня",
    value: "24",
  },
  {
    description: "Потребують дії",
    icon: Clock,
    title: "Очікують підтвердження",
    trend: "neutral",
    trendValue: "Без змін",
    value: "5",
  },
  {
    description: "Всього клієнтів",
    icon: Users,
    title: "Гостей",
    trend: "up",
    trendValue: "+8% минулого місяця",
    value: "156",
  },
  {
    description: "Без попередження",
    icon: AlertCircle,
    title: "Невідвідувані",
    trend: "down",
    trendValue: "-2 минулого тижня",
    value: "3",
  },
];

export const OCCUPANCY_SLOTS: readonly OccupancySlot[] = [
  { bookings: 8, fill: 45, time: "12:00 - 14:00" },
  { bookings: 3, fill: 20, time: "14:00 - 16:00" },
  { bookings: 2, fill: 15, time: "16:00 - 18:00" },
  { bookings: 14, fill: 85, time: "18:00 - 20:00" },
  { bookings: 16, fill: 95, time: "20:00 - 22:00" },
];

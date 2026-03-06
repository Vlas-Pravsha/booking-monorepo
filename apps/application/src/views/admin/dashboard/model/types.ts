import type { ComponentType } from "react";

export interface StatCardItem {
  title: string;
  value: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export interface OccupancySlot {
  bookings: number;
  fill: number;
  time: string;
}

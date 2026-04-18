"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/shared/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        button_next: cn(
          "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.12]",
          classNames?.button_next
        ),
        button_previous: cn(
          "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.12]",
          classNames?.button_previous
        ),
        caption_label: cn(
          "text-sm font-semibold text-white",
          classNames?.caption_label
        ),
        day: cn("h-10 w-10 p-0 text-center text-sm", classNames?.day),
        disabled: cn("text-white/20", classNames?.disabled),
        month: cn("space-y-4", classNames?.month),
        month_caption: cn(
          "flex items-center justify-between px-1",
          classNames?.month_caption
        ),
        month_grid: cn("w-full border-collapse", classNames?.month_grid),
        months: cn("flex flex-col", classNames?.months),
        nav: cn("flex items-center gap-2", classNames?.nav),
        outside: cn("text-white/25", classNames?.outside),
        root: cn("w-full", classNames?.root),
        selected: cn(
          "[&>button]:border-[#f6e6d2] [&>button]:bg-[#f6e6d2] [&>button]:text-[#120f0b] [&>button]:shadow-[0_10px_30px_-18px_rgba(246,230,210,0.9)]",
          classNames?.selected
        ),
        today: cn(
          "[&>button]:border-white/30 [&>button]:bg-white/[0.08] [&>button]:text-white",
          classNames?.today
        ),
        week: cn("mt-1 grid grid-cols-7", classNames?.week),
        weekday: cn(
          "h-9 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/35",
          classNames?.weekday
        ),
        weekdays: cn("grid grid-cols-7", classNames?.weekdays),
        weeks: cn("mt-2", classNames?.weeks),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: iconClassName }) =>
          orientation === "left" ? (
            <ChevronLeft className={cn("h-4 w-4", iconClassName)} />
          ) : (
            <ChevronRight className={cn("h-4 w-4", iconClassName)} />
          ),
      }}
      {...props}
    />
  );
}

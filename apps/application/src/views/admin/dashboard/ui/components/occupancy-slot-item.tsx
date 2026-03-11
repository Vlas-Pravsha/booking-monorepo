import { cn } from "@/shared/lib/utils";

import { getFillColor } from "../../lib/get-fill-color";
import type { OccupancySlot } from "../../model/types";

interface OccupancySlotItemProps {
  slot: OccupancySlot;
}

export function OccupancySlotItem({ slot }: OccupancySlotItemProps) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-muted-foreground">{slot.time}</span>
        <span className="font-semibold text-foreground">
          {slot.bookings} бронювань
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              getFillColor(slot.fill)
            )}
            style={{ width: `${slot.fill}%` }}
          />
        </div>
        <span className="ml-3 rounded-md px-2 py-0.5 text-xs font-semibold text-muted-foreground border bg-background">
          {slot.fill}%
        </span>
      </div>
    </div>
  );
}

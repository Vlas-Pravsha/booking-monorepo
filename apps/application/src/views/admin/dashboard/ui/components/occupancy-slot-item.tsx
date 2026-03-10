import { cn } from "@/shared/lib/utils";

import { getFillColor } from "../../lib/get-fill-color";
import type { OccupancySlot } from "../../model/types";

interface OccupancySlotItemProps {
  slot: OccupancySlot;
}

export function OccupancySlotItem({ slot }: OccupancySlotItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground font-medium">{slot.time}</span>
        <span className="text-foreground font-semibold">
          {slot.bookings} бронювань
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            getFillColor(slot.fill)
          )}
          style={{ width: `${slot.fill}%` }}
        />
      </div>
    </div>
  );
}

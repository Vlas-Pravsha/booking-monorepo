import type { Booking } from "@/entities/booking";
import {
  getBookingStatusBadgeClass,
  getBookingStatusLabel,
} from "@/entities/booking";
import { surfaceClassNames } from "@/shared/config";
import { getInitials } from "@/shared/lib/formatters";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

interface RecentBookingItemProps {
  booking: Booking;
}

export function RecentBookingItem({ booking }: RecentBookingItemProps) {
  return (
    <div
      className={cn(
        surfaceClassNames.frostedRow,
        "flex items-center justify-between gap-4"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
          {getInitials(booking.customerName)}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            {booking.customerName}
          </p>
          <p className="text-xs text-muted-foreground">
            {`${booking.table} • ${booking.date} о ${booking.time}`}
          </p>
        </div>
      </div>

      <Badge
        className={cn(
          "rounded-md px-2 py-0.5 text-xs font-medium",
          getBookingStatusBadgeClass(booking.status)
        )}
      >
        {getBookingStatusLabel(booking.status)}
      </Badge>
    </div>
  );
}

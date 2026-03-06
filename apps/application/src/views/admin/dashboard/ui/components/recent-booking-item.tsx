import type { Booking } from "@/entities/booking";
import {
  getBookingStatusBadgeClass,
  getBookingStatusLabel,
} from "@/entities/booking";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

interface RecentBookingItemProps {
  booking: Booking;
}

export function RecentBookingItem({ booking }: RecentBookingItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/50 bg-white/50 p-4 transition-all duration-300 hover:border-primary/20 hover:bg-white/80 hover:shadow-sm">
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
          getBookingStatusBadgeClass(booking.status)
        )}
      >
        {getBookingStatusLabel(booking.status)}
      </Badge>
    </div>
  );
}

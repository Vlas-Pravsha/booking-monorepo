import { CalendarDays, Clock, Phone } from "lucide-react";

import type { Booking } from "@/entities/booking";
import {
  getBookingSourceLabel,
  getBookingStatusBadgeClass,
  getBookingStatusLabel,
} from "@/entities/booking";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

import { BookingActionsMenu } from "./booking-actions-menu";

interface BookingTableRowProps {
  booking: Booking;
}

export function BookingTableRow({ booking }: BookingTableRowProps) {
  return (
    <tr className="border-t border-border/50 hover:bg-white/50 transition-colors">
      <td className="p-4">
        <div>
          <p className="font-medium text-foreground">{booking.customerName}</p>
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
      <td className="p-4 text-sm">{getBookingSourceLabel(booking.source)}</td>
      <td className="p-4">
        <Badge
          variant="secondary"
          className={cn(
            "font-medium",
            getBookingStatusBadgeClass(booking.status)
          )}
        >
          {getBookingStatusLabel(booking.status)}
        </Badge>
      </td>
      <td className="p-4">
        <BookingActionsMenu status={booking.status} />
      </td>
    </tr>
  );
}

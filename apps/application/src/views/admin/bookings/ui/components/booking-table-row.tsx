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
    <tr className="group">
      <td className="rounded-l-[22px] border-y border-l border-border/70 bg-card/82 p-4 align-middle shadow-[0_18px_36px_-30px_rgba(15,23,42,0.2)] transition-all duration-300 group-hover:border-primary/15 group-hover:bg-card">
        <div>
          <p className="font-medium text-foreground">{booking.customerName}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            {booking.customerPhone}
          </p>
        </div>
      </td>
      <td className="border-y border-border/70 bg-card/82 p-4 align-middle text-sm transition-all duration-300 group-hover:border-primary/15 group-hover:bg-card">
        <span className="inline-flex rounded-full border border-border/70 bg-background/72 px-3 py-1 text-xs font-semibold text-foreground">
          {booking.table}
        </span>
      </td>
      <td className="border-y border-border/70 bg-card/82 p-4 align-middle text-sm transition-all duration-300 group-hover:border-primary/15 group-hover:bg-card">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span>{`${booking.date} о ${booking.time}`}</span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {`${booking.duration} хв`}
        </p>
      </td>
      <td className="border-y border-border/70 bg-card/82 p-4 align-middle text-sm transition-all duration-300 group-hover:border-primary/15 group-hover:bg-card">
        <span className="inline-flex rounded-full border border-border/70 bg-background/72 px-3 py-1 text-xs font-semibold text-foreground">
          {booking.guests} гостей
        </span>
      </td>
      <td className="border-y border-border/70 bg-card/82 p-4 align-middle text-sm transition-all duration-300 group-hover:border-primary/15 group-hover:bg-card">
        {getBookingSourceLabel(booking.source)}
      </td>
      <td className="border-y border-border/70 bg-card/82 p-4 align-middle transition-all duration-300 group-hover:border-primary/15 group-hover:bg-card">
        <Badge
          variant="secondary"
          className={cn(
            "rounded-full px-3 py-1 font-medium",
            getBookingStatusBadgeClass(booking.status)
          )}
        >
          {getBookingStatusLabel(booking.status)}
        </Badge>
      </td>
      <td className="rounded-r-[22px] border-y border-r border-border/70 bg-card/82 p-4 align-middle transition-all duration-300 group-hover:border-primary/15 group-hover:bg-card">
        <BookingActionsMenu status={booking.status} />
      </td>
    </tr>
  );
}

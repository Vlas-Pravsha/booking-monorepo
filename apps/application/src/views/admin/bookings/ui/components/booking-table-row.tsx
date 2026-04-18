import { CalendarDays, Clock, Mail, Phone } from "lucide-react";

import type { Booking } from "@/entities/booking";
import {
  getBookingStatusBadgeClass,
  getBookingStatusLabel,
} from "@/entities/booking";
import { formatBookingDatetime } from "@/shared/lib/formatters";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

import { BookingActionsMenu } from "./booking-actions-menu";

interface BookingTableRowProps {
  booking: Booking;
}

export function BookingTableRow({ booking }: BookingTableRowProps) {
  const contactLabel = booking.customerPhone || booking.customerEmail || "—";
  const ContactIcon = booking.customerPhone ? Phone : Mail;
  const { date, range } = formatBookingDatetime(booking.startAt, booking.endAt);

  return (
    <tr className="group">
      <td className="rounded-l-[22px] border-y border-l border-border/70 bg-card/82 p-4 align-middle shadow-[0_18px_36px_-30px_rgba(15,23,42,0.2)] transition-all duration-300 group-hover:border-primary/15 group-hover:bg-card">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-foreground">
              {booking.customerName}
            </p>
            {booking.isSample ? (
              <Badge
                variant="secondary"
                className="rounded-full border-warning/20 bg-warning/10 px-2 py-0.5 text-[0.65rem] font-semibold text-warning"
              >
                Пробні дані
              </Badge>
            ) : null}
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <ContactIcon className="h-3 w-3" />
            {contactLabel}
          </p>
        </div>
      </td>

      <td className="border-y border-border/70 bg-card/82 p-4 align-middle text-sm transition-all duration-300 group-hover:border-primary/15 group-hover:bg-card">
        <span className="inline-flex rounded-full border border-border/70 bg-background/72 px-3 py-1 text-xs font-semibold text-foreground">
          {booking.table}
        </span>
      </td>

      <td className="border-y border-border/70 bg-card/82 p-4 align-middle text-sm transition-all duration-300 group-hover:border-primary/15 group-hover:bg-card">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
          {date}
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3 shrink-0" />
          {range}
          <span className="text-muted-foreground/50">·</span>
          {booking.duration} хв
        </p>
      </td>

      <td className="border-y border-border/70 bg-card/82 p-4 align-middle text-sm transition-all duration-300 group-hover:border-primary/15 group-hover:bg-card">
        <span className="inline-flex rounded-full border border-border/70 bg-background/72 px-3 py-1 text-xs font-semibold text-foreground">
          {booking.guests} гостей
        </span>
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
        <BookingActionsMenu bookingId={booking.id} status={booking.status} />
      </td>
    </tr>
  );
}

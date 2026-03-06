import { Filter } from "lucide-react";

import { getBookingStatusLabel } from "@/entities/booking";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { BOOKING_STATUS_OPTIONS } from "../../model/constants";
import type { BookingFilterValue } from "../../model/constants";

interface BookingStatusFilterProps {
  value: BookingFilterValue;
  onChange: (value: BookingFilterValue) => void;
}

export function BookingStatusFilter({
  value,
  onChange,
}: BookingStatusFilterProps) {
  const selectedLabel =
    value === "all" ? "Всі статуси" : getBookingStatusLabel(value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          {selectedLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {BOOKING_STATUS_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

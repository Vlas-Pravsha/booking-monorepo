import { Check, MoreHorizontal, X } from "lucide-react";

import type { Booking } from "@/entities/booking";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface BookingActionsMenuProps {
  status: Booking["status"];
}

export function BookingActionsMenu({ status }: BookingActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Деталі</DropdownMenuItem>
        <DropdownMenuItem>Редагувати</DropdownMenuItem>
        {status === "pending" && (
          <>
            <DropdownMenuItem className="text-emerald-600">
              <Check className="h-4 w-4 mr-2" />
              Підтвердити
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <X className="h-4 w-4 mr-2" />
              Скасувати
            </DropdownMenuItem>
          </>
        )}
        {status === "confirmed" && (
          <DropdownMenuItem>
            <Check className="h-4 w-4 mr-2" />
            Позначити як &quot;За столом&quot;
          </DropdownMenuItem>
        )}
        {status === "seated" && (
          <DropdownMenuItem>
            <Check className="h-4 w-4 mr-2" />
            Завершити
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

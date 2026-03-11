import { Check, MoreHorizontal, X } from "lucide-react";

import type { Booking } from "@/entities/booking";
import { semanticToneStyles } from "@/shared/config";
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
            <DropdownMenuItem className={semanticToneStyles.success.text}>
              <Check className="mr-2 h-4 w-4" />
              Підтвердити
            </DropdownMenuItem>
            <DropdownMenuItem className={semanticToneStyles.danger.text}>
              <X className="mr-2 h-4 w-4" />
              Скасувати
            </DropdownMenuItem>
          </>
        )}
        {status === "confirmed" && (
          <DropdownMenuItem>
            <Check className="mr-2 h-4 w-4" />
            Позначити як &quot;За столом&quot;
          </DropdownMenuItem>
        )}
        {status === "seated" && (
          <DropdownMenuItem>
            <Check className="mr-2 h-4 w-4" />
            Завершити
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

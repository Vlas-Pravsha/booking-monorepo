import { MoreHorizontal } from "lucide-react";

import type { Customer } from "@/entities/customer";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface CustomerActionsMenuProps {
  customer: Customer;
}

export function CustomerActionsMenu({ customer }: CustomerActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Деталі</DropdownMenuItem>
        <DropdownMenuItem>Редагувати</DropdownMenuItem>
        <DropdownMenuItem>Історія бронювань</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={customer.vip ? "text-amber-600" : "text-primary"}
        >
          {customer.vip ? "Зняти VIP статус" : "Зробити VIP"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import type { Customer } from "@/entities/customer";
import { useUpdateCustomerVipMutation } from "@/entities/customer";
import { useAuthAccessToken } from "@/features/auth/session";
import { isApiError } from "@/shared/api";
import { semanticToneStyles } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface CustomerActionsMenuProps {
  customer: Customer;
}

export function CustomerActionsMenu({ customer }: CustomerActionsMenuProps) {
  const accessToken = useAuthAccessToken();
  const updateVipMutation = useUpdateCustomerVipMutation(accessToken);

  const handleToggleVip = () => {
    updateVipMutation.mutate(
      {
        customerId: customer.id,
        vip: !customer.vip,
      },
      {
        onError: (error) => {
          toast.error(
            isApiError(error)
              ? error.message
              : "Не вдалося оновити статус клієнта."
          );
        },
        onSuccess: () => {
          toast.success(
            customer.vip ? "VIP статус знято" : "Клієнта додано до VIP"
          );
        },
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={
            customer.vip
              ? semanticToneStyles.warning.text
              : semanticToneStyles.primary.text
          }
          onClick={handleToggleVip}
        >
          {customer.vip ? "Зняти VIP статус" : "Зробити VIP"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { MoreHorizontal, Wrench } from "lucide-react";
import { toast } from "sonner";

import type { Table } from "@/entities/table";
import { useUpdateTableStatusMutation } from "@/entities/table";
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

interface TableActionsMenuProps {
  table: Table;
}

export function TableActionsMenu({ table }: TableActionsMenuProps) {
  const accessToken = useAuthAccessToken();
  const updateStatusMutation = useUpdateTableStatusMutation(accessToken);
  const nextStatus =
    table.status === "maintenance" ? "available" : "maintenance";

  const handleToggleMaintenance = () => {
    updateStatusMutation.mutate(
      {
        status: nextStatus,
        tableId: table.id,
      },
      {
        onError: (error) => {
          toast.error(
            isApiError(error)
              ? error.message
              : "Не вдалося оновити технічний статус столу."
          );
        },
        onSuccess: () => {
          toast.success(
            nextStatus === "maintenance"
              ? "Стіл позначено як недоступний"
              : "Стіл повернуто в роботу"
          );
        },
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={
            nextStatus === "maintenance"
              ? semanticToneStyles.danger.text
              : semanticToneStyles.success.text
          }
          onClick={handleToggleMaintenance}
        >
          <Wrench className="mr-2 h-4 w-4" />
          {nextStatus === "maintenance"
            ? "Позначити як на обслуговуванні"
            : "Повернути в роботу"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

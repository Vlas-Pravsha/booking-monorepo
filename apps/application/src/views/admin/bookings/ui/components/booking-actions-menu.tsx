"use client";

import { Check, MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

import { useAppSelector } from "@/app/store/hooks";
import type { Booking } from "@/entities/booking";
import { useUpdateBookingStatusMutation } from "@/entities/booking";
import { selectAuthSession } from "@/features/auth/session";
import { isApiError } from "@/shared/api";
import { semanticToneStyles } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface BookingActionsMenuProps {
  bookingId: string;
  status: Booking["status"];
}

export function BookingActionsMenu({
  bookingId,
  status,
}: BookingActionsMenuProps) {
  const session = useAppSelector(selectAuthSession);
  const updateStatusMutation = useUpdateBookingStatusMutation(
    session?.accessToken ?? null
  );

  const handleStatusChange = (nextStatus: Booking["status"]) => {
    updateStatusMutation.mutate(
      {
        bookingId,
        status: nextStatus,
      },
      {
        onError: (error) => {
          toast.error(
            isApiError(error)
              ? error.message
              : "Не вдалося оновити статус бронювання."
          );
        },
        onSuccess: () => {
          toast.success("Статус бронювання оновлено");
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
        {status === "pending" ? (
          <>
            <DropdownMenuItem
              className={semanticToneStyles.success.text}
              onClick={() => handleStatusChange("confirmed")}
            >
              <Check className="mr-2 h-4 w-4" />
              Підтвердити
            </DropdownMenuItem>
            <DropdownMenuItem
              className={semanticToneStyles.danger.text}
              onClick={() => handleStatusChange("cancelled")}
            >
              <X className="mr-2 h-4 w-4" />
              Скасувати
            </DropdownMenuItem>
          </>
        ) : null}
        {status === "confirmed" ? (
          <>
            <DropdownMenuItem onClick={() => handleStatusChange("seated")}>
              <Check className="mr-2 h-4 w-4" />
              Позначити як за столом
            </DropdownMenuItem>
            <DropdownMenuItem
              className={semanticToneStyles.danger.text}
              onClick={() => handleStatusChange("cancelled")}
            >
              <X className="mr-2 h-4 w-4" />
              Скасувати
            </DropdownMenuItem>
          </>
        ) : null}
        {status === "seated" ? (
          <DropdownMenuItem onClick={() => handleStatusChange("completed")}>
            <Check className="mr-2 h-4 w-4" />
            Завершити візит
          </DropdownMenuItem>
        ) : null}
        {(status === "cancelled" || status === "completed") && (
          <DropdownMenuItem onClick={() => handleStatusChange("confirmed")}>
            <Check className="mr-2 h-4 w-4" />
            Повернути в активні
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

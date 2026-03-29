import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { ChevronLeft } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

import {
  bookingControlClass,
  bookingLabelClass,
  bookingPrimaryButtonClass,
  bookingSecondaryButtonClass,
} from "../lib/booking-form";
import type { BookingFormData } from "../model/schema";
import { BookingFieldError } from "./booking-field-error";

interface BookingContactsStepProps {
  errors: FieldErrors<BookingFormData>;
  guestsCount: number;
  isPending: boolean;
  onBack: () => void;
  register: UseFormRegister<BookingFormData>;
  selectedDate?: Date;
  selectedTime?: string;
}

export function BookingContactsStep({
  errors,
  guestsCount,
  isPending,
  onBack,
  register,
  selectedDate,
  selectedTime,
}: BookingContactsStepProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
        <p className="mb-2 text-[0.72rem] uppercase tracking-[0.22em] text-white/40">
          Ваше бронювання
        </p>
        <p className="text-base font-semibold text-white">
          {selectedDate
            ? format(selectedDate, "d MMMM", { locale: uk })
            : "Дата не вибрана"}
          , {selectedTime} · {guestsCount} гост.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className={bookingLabelClass}>
            Ім&apos;я
          </Label>
          <Input
            id="name"
            placeholder="Ваше ім'я"
            className={bookingControlClass}
            {...register("name")}
          />
          <BookingFieldError message={errors.name?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className={bookingLabelClass}>
            Телефон
          </Label>
          <Input
            id="phone"
            placeholder="+380..."
            className={bookingControlClass}
            {...register("phone")}
          />
          <BookingFieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment" className={bookingLabelClass}>
          Коментар
        </Label>
        <Textarea
          id="comment"
          placeholder="Побажання по столу, алергії або особливі умови..."
          className={cn(bookingControlClass, "min-h-28 resize-none py-4")}
          {...register("comment")}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          className={cn(bookingSecondaryButtonClass, "sm:flex-1")}
          onClick={onBack}
        >
          <ChevronLeft className="h-4 w-4" />
          Назад
        </Button>
        <Button
          type="submit"
          className={cn(bookingPrimaryButtonClass, "sm:flex-[1.5]")}
          disabled={isPending}
        >
          {isPending ? "Надсилаємо..." : "Підтвердити бронювання"}
        </Button>
      </div>
    </div>
  );
}

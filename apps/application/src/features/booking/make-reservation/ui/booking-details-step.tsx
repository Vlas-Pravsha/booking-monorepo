import type { ReservationAvailableTable } from "@booking/contracts/public";
import { format, isBefore, startOfToday } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarDays, Minus, Plus } from "lucide-react";
import type { FieldErrors, UseFormSetValue } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import {
  BOOKING_TIME_SLOTS,
  bookingControlClass,
  bookingLabelClass,
  bookingPrimaryButtonClass,
  getNextGuestsCount,
  setBookingFormValue,
} from "../lib/booking-form";
import type { BookingFormData } from "../model/schema";
import { BookingFieldError } from "./booking-field-error";

interface BookingDetailsStepProps {
  availableTables: ReservationAvailableTable[];
  errors: FieldErrors<BookingFormData>;
  guestsCount: number;
  isCalendarOpen: boolean;
  isLoadingTables: boolean;
  onCalendarOpenChange: (isOpen: boolean) => void;
  onContinue: () => void;
  selectedDate?: Date;
  selectedTableId?: string;
  selectedTime?: string;
  setValue: UseFormSetValue<BookingFormData>;
}

export function BookingDetailsStep({
  availableTables,
  errors,
  guestsCount,
  isCalendarOpen,
  isLoadingTables,
  onCalendarOpenChange,
  onContinue,
  selectedDate,
  selectedTableId,
  selectedTime,
  setValue,
}: BookingDetailsStepProps) {
  const shouldShowTables = Boolean(selectedDate && selectedTime);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className={bookingLabelClass}>Дата</Label>
          <Popover open={isCalendarOpen} onOpenChange={onCalendarOpenChange}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  bookingControlClass,
                  "flex w-full items-center justify-between text-left",
                  !selectedDate && "text-white/34"
                )}
              >
                <span className="truncate text-sm font-medium">
                  {selectedDate
                    ? format(selectedDate, "d MMMM yyyy", { locale: uk })
                    : "Оберіть дату візиту"}
                </span>
                <CalendarDays className="h-4 w-4 shrink-0 text-white/55" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={12}
              className="w-auto rounded-[1.5rem] border-white/10 bg-[#111113]/95 p-3 text-white shadow-[0_24px_80px_-36px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (!date) {
                    return;
                  }

                  setBookingFormValue(setValue, "date", date);
                  onCalendarOpenChange(false);
                }}
                disabled={(date) => isBefore(date, startOfToday())}
                classNames={{
                  day_button:
                    "h-10 w-10 rounded-xl border border-transparent text-sm font-medium text-white transition-colors hover:border-white/10 hover:bg-white/[0.08]",
                }}
              />
            </PopoverContent>
          </Popover>
          <BookingFieldError message={errors.date?.message} />
        </div>

        <div className="space-y-2">
          <Label className={bookingLabelClass}>Гостей</Label>
          <div
            className={cn(
              bookingControlClass,
              "flex items-center justify-between gap-3 px-3"
            )}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-[1rem] text-white/70 hover:bg-white/[0.08] hover:text-white"
              onClick={() =>
                setBookingFormValue(
                  setValue,
                  "guests",
                  getNextGuestsCount(guestsCount, "decrease")
                )
              }
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="flex flex-1 flex-col items-center justify-center leading-none">
              <span className="text-lg font-semibold text-white">
                {guestsCount}
              </span>
              <span className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/35">
                гостей
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-[1rem] text-white/70 hover:bg-white/[0.08] hover:text-white"
              onClick={() =>
                setBookingFormValue(
                  setValue,
                  "guests",
                  getNextGuestsCount(guestsCount, "increase")
                )
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className={bookingLabelClass}>Час</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {BOOKING_TIME_SLOTS.map((timeSlot) => {
            const isSelected = selectedTime === timeSlot;

            return (
              <button
                key={timeSlot}
                type="button"
                onClick={() => setBookingFormValue(setValue, "time", timeSlot)}
                className={cn(
                  "h-13 rounded-[1.15rem] border px-4 text-sm font-semibold transition-all duration-200",
                  isSelected
                    ? "border-[#f4e3cb]/50 bg-[#f4e3cb] text-[#15110d] shadow-[0_18px_40px_-30px_rgba(244,227,203,0.85)]"
                    : "border-white/10 bg-white/[0.04] text-white/72 hover:border-white/18 hover:bg-white/[0.08] hover:text-white"
                )}
              >
                {timeSlot}
              </button>
            );
          })}
        </div>
        <BookingFieldError message={errors.time?.message} />
      </div>

      <div className="space-y-3">
        <Label className={bookingLabelClass}>Столик</Label>
        {shouldShowTables ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {isLoadingTables ? (
              <div className="col-span-full rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/55">
                Перевіряємо вільні столики...
              </div>
            ) : null}

            {!isLoadingTables && availableTables.length === 0 ? (
              <div className="col-span-full rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/55">
                На цей час немає вільних столиків для {guestsCount} гостей.
              </div>
            ) : null}

            {isLoadingTables
              ? null
              : availableTables.map((table) => {
                  const isSelected = selectedTableId === table.id;

                  return (
                    <button
                      key={table.id}
                      type="button"
                      onClick={() =>
                        setBookingFormValue(setValue, "tableId", table.id)
                      }
                      className={cn(
                        "min-h-16 rounded-[1.15rem] border px-4 py-3 text-left transition-all duration-200",
                        isSelected
                          ? "border-[#f4e3cb]/50 bg-[#f4e3cb] text-[#15110d] shadow-[0_18px_40px_-30px_rgba(244,227,203,0.85)]"
                          : "border-white/10 bg-white/[0.04] text-white/72 hover:border-white/18 hover:bg-white/[0.08] hover:text-white"
                      )}
                    >
                      <span className="block text-sm font-semibold">
                        {table.name}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-xs",
                          isSelected ? "text-[#15110d]/62" : "text-white/40"
                        )}
                      >
                        до {table.seats} гостей
                      </span>
                    </button>
                  );
                })}
          </div>
        ) : (
          <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/45">
            Спершу оберіть дату та час, щоб побачити доступні столики.
          </div>
        )}
        <BookingFieldError message={errors.tableId?.message} />
      </div>

      <Button
        type="button"
        className={bookingPrimaryButtonClass}
        disabled={!selectedDate || !selectedTime || !selectedTableId}
        onClick={onContinue}
      >
        Далі
      </Button>
    </div>
  );
}

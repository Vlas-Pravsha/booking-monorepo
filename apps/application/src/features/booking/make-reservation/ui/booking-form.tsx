"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, startOfDay } from "date-fns";
import { uk } from "date-fns/locale";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Minus,
  Plus,
} from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import type {
  FieldPath,
  FieldPathValue,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Textarea } from "@/shared/ui/textarea";

import { useMakeReservation } from "../api/use-make-reservation";
import type { BookingFormData } from "../model/schema";
import { BookingSchema } from "../model/schema";

const TIME_SLOTS = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
] as const;

const bookingLabelClass =
  "ml-1 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/48";
const bookingControlClass =
  "h-14 rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-200 hover:border-white/18 hover:bg-white/[0.06] focus-visible:border-[#f0dcc1] focus-visible:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-[#f0dcc1]/25";
const bookingPrimaryButtonClass =
  "h-14 rounded-[1.35rem] border border-[#f4e3cb]/50 bg-[#f4e3cb] px-6 text-sm font-semibold text-[#15110d] shadow-[0_18px_40px_-24px_rgba(244,227,203,0.9)] transition-all duration-200 hover:bg-[#faeddc] hover:shadow-[0_22px_48px_-24px_rgba(244,227,203,0.95)] disabled:border-white/8 disabled:bg-white/[0.05] disabled:text-white/28 disabled:shadow-none disabled:opacity-100";
const bookingSecondaryButtonClass =
  "h-14 rounded-[1.35rem] border border-white/12 bg-transparent px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20 disabled:border-white/8 disabled:bg-white/[0.03] disabled:text-white/28 disabled:opacity-100";
const bookingFormValueOptions = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true,
} as const;
const guestCountLimits = {
  max: 20,
  min: 1,
} as const;

interface StepIndicatorProps {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  label: string;
}

function getStepIndicatorBadgeClass(
  isActive: boolean,
  isCompleted: boolean
): string {
  if (isCompleted) {
    return "border-[#f4e3cb]/50 bg-[#f4e3cb] text-[#15110d]";
  }

  if (isActive) {
    return "border-white/30 bg-white/[0.08] text-white";
  }

  return "border-white/10 bg-transparent text-white/45";
}

function setBookingFormValue<TField extends FieldPath<BookingFormData>>(
  setValue: UseFormSetValue<BookingFormData>,
  field: TField,
  value: FieldPathValue<BookingFormData, TField>
) {
  setValue(field, value, bookingFormValueOptions);
}

function getNextGuestsCount(
  currentGuestsCount: number,
  direction: "decrease" | "increase"
): number {
  if (direction === "decrease") {
    return Math.max(guestCountLimits.min, currentGuestsCount - 1);
  }

  return Math.min(guestCountLimits.max, currentGuestsCount + 1);
}

function StepIndicator({
  index,
  isActive,
  isCompleted,
  label,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
          getStepIndicatorBadgeClass(isActive, isCompleted)
        )}
      >
        {index}
      </div>
      <span
        className={cn(
          "text-sm transition-colors",
          isActive || isCompleted ? "text-white" : "text-white/38"
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function BookingForm() {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const { mutate, isPending, isSuccess } = useMakeReservation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      comment: "",
      guests: 2,
    },
    resolver: zodResolver(BookingSchema),
  });

  const selectedDate = watch("date");
  const selectedTime = watch("time");
  const guestsCount = watch("guests");

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#f4e3cb]/35 bg-[#f4e3cb]/15 backdrop-blur-md">
          <CheckCircle2 className="h-10 w-10 text-[#f4e3cb]" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-white">Готово!</h2>
        <p className="mb-8 max-w-md text-white/60">
          Ваше бронювання зафіксовано. Ми зв&apos;яжемося для підтвердження.
        </p>
        <Button
          type="button"
          onClick={() => window.location.reload()}
          className={bookingPrimaryButtonClass}
        >
          Нове бронювання
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate(data, {
          onSuccess: () => {
            toast.success("Бронювання успішно створено!");
          },
        });
      })}
      className="space-y-7"
    >
      <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/8 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
            Онлайн бронювання
          </p>
          <p className="text-sm text-white/60">
            Оберіть час, а потім залиште контакти для підтвердження.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <StepIndicator
            index={1}
            isActive={step === 1}
            isCompleted={step === 2}
            label="Дата і час"
          />
          <StepIndicator
            index={2}
            isActive={step === 2}
            isCompleted={false}
            label="Контакти"
          />
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className={bookingLabelClass}>Дата</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
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
                        ? format(selectedDate, "d MMMM yyyy", {
                            locale: uk,
                          })
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
                      setIsCalendarOpen(false);
                    }}
                    disabled={(date) => date < startOfDay(new Date())}
                    classNames={{
                      day_button:
                        "h-10 w-10 rounded-xl border border-transparent text-sm font-medium text-white transition-colors hover:border-white/10 hover:bg-white/[0.08]",
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.date ? (
                <p className="ml-1 text-xs text-red-400">
                  {errors.date.message}
                </p>
              ) : null}
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
                  onClick={() => {
                    setBookingFormValue(
                      setValue,
                      "guests",
                      getNextGuestsCount(guestsCount, "decrease")
                    );
                  }}
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
                  onClick={() => {
                    setBookingFormValue(
                      setValue,
                      "guests",
                      getNextGuestsCount(guestsCount, "increase")
                    );
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className={bookingLabelClass}>Час</Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {TIME_SLOTS.map((timeSlot) => {
                const isSelected = selectedTime === timeSlot;

                return (
                  <button
                    key={timeSlot}
                    type="button"
                    onClick={() => {
                      setBookingFormValue(setValue, "time", timeSlot);
                    }}
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
            {errors.time ? (
              <p className="ml-1 text-xs text-red-400">{errors.time.message}</p>
            ) : null}
          </div>

          <Button
            type="button"
            className={bookingPrimaryButtonClass}
            disabled={!selectedDate || !selectedTime}
            onClick={async () => {
              if (await trigger(["date", "guests", "time"])) {
                setStep(2);
              }
            }}
          >
            Далі
          </Button>
        </div>
      ) : (
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
                {...register("name")}
                placeholder="Ваше ім'я"
                className={bookingControlClass}
              />
              {errors.name ? (
                <p className="ml-1 text-xs text-red-400">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className={bookingLabelClass}>
                Телефон
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="+380..."
                className={bookingControlClass}
              />
              {errors.phone ? (
                <p className="ml-1 text-xs text-red-400">
                  {errors.phone.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment" className={bookingLabelClass}>
              Коментар
            </Label>
            <Textarea
              id="comment"
              {...register("comment")}
              placeholder="Побажання по столу, алергії або особливі умови..."
              className={cn(bookingControlClass, "min-h-28 resize-none py-4")}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              className={cn(bookingSecondaryButtonClass, "sm:flex-1")}
              onClick={() => setStep(1)}
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
      )}
    </form>
  );
}

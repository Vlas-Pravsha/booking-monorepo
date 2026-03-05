"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { CheckCircle2 } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { useMakeReservation } from "../api/hooks";
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
];

export function BookingForm() {
  const [step, setStep] = React.useState(1);
  const { mutate, isPending, isSuccess } = useMakeReservation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      guests: 2,
    },
    resolver: zodResolver(BookingSchema),
  });

  const selectedDate = watch("date");
  const selectedTime = watch("time");
  const guestsCount = watch("guests");

  const onSubmit = (data: BookingFormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Бронювання успішно створено!");
      },
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Готово!</h2>
        <p className="text-white/60 mb-8 max-w-md">
          Ваше бронювання підтверджено. Чекаємо на вас!
        </p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="rounded-xl border-white/20 text-white hover:bg-white/10"
        >
          Нове бронювання
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {step === 1 && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-white/70 uppercase tracking-wider ml-1">
                Дата
              </Label>
              <Input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setValue("date", new Date(e.target.value))}
                className="rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 backdrop-blur-sm"
              />
              {errors.date && (
                <p className="text-xs text-red-400 ml-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-white/70 uppercase tracking-wider ml-1">
                Гостей
              </Label>
              <div className="flex items-center gap-2 bg-white/5 rounded-2xl border border-white/10 p-1 backdrop-blur-sm">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() =>
                    setValue("guests", Math.max(1, guestsCount - 1))
                  }
                >
                  −
                </Button>
                <span className="flex-1 text-center font-semibold text-white">
                  {guestsCount}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() =>
                    setValue("guests", Math.min(20, guestsCount + 1))
                  }
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-medium text-white/70 uppercase tracking-wider ml-1">
              Час
            </Label>
            <div className="grid grid-cols-5 gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setValue("time", t)}
                  className={cn(
                    "py-3 text-sm font-medium rounded-xl border transition-all duration-300 backdrop-blur-sm",
                    selectedTime === t
                      ? "bg-white/20 border-white/40 text-white shadow-lg shadow-white/5"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            {errors.time && (
              <p className="text-xs text-red-400 ml-1">{errors.time.message}</p>
            )}
          </div>

          <Button
            type="button"
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-4 rounded-2xl backdrop-blur-sm transition-all duration-300"
            disabled={!selectedDate || !selectedTime}
            onClick={() => setStep(2)}
          >
            Далі
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
              Ваше бронювання
            </p>
            <p className="text-white font-medium">
              {selectedDate && format(selectedDate, "d MMMM", { locale: uk })},{" "}
              {selectedTime} ·{guestsCount} гостей
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-medium text-white/70 uppercase tracking-wider ml-1"
              >
                Ім&apos;я
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Ваше ім'я"
                className="rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 backdrop-blur-sm"
              />
              {errors.name && (
                <p className="text-xs text-red-400 ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-xs font-medium text-white/70 uppercase tracking-wider ml-1"
              >
                Телефон
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="+380..."
                className="rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 backdrop-blur-sm"
              />
              {errors.phone && (
                <p className="text-xs text-red-400 ml-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="comment"
              className="text-xs font-medium text-white/70 uppercase tracking-wider ml-1"
            >
              Коментар <span className="text-white/30">(optional)</span>
            </Label>
            <Input
              id="comment"
              {...register("comment")}
              placeholder="Побажання, алергії тощо..."
              className="rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 backdrop-blur-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 py-4 rounded-2xl border-white/20 text-white hover:bg-white/10 font-medium backdrop-blur-sm"
              onClick={() => setStep(1)}
            >
              Назад
            </Button>
            <Button
              type="submit"
              className="flex-[2] bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-4 rounded-2xl backdrop-blur-sm"
              disabled={isPending}
            >
              {isPending ? "Надсилаємо..." : "Підтвердити"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

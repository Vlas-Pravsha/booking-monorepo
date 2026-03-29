import { CheckCircle2 } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { bookingPrimaryButtonClass } from "../lib/booking-form";

export function BookingSuccessState({ onReset }: { onReset: () => void }) {
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
        onClick={onReset}
        className={bookingPrimaryButtonClass}
      >
        Нове бронювання
      </Button>
    </div>
  );
}

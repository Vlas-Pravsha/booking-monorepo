import { cn } from "@/shared/lib/utils";

import { getBookingStepIndicatorClass } from "../lib/booking-form";

interface BookingStepHeaderProps {
  step: 1 | 2;
}

interface StepIndicatorProps {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  label: string;
}

function StepIndicator({
  index,
  isActive,
  isCompleted,
  label,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={getBookingStepIndicatorClass(isActive, isCompleted)}>
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

export function BookingStepHeader({ step }: BookingStepHeaderProps) {
  return (
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
  );
}

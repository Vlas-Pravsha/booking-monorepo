import type {
  FieldPath,
  FieldPathValue,
  UseFormSetValue,
} from "react-hook-form";

import { cn } from "@/shared/lib/utils";

import type { BookingFormData } from "../model/schema";

export const BOOKING_TIME_SLOTS = [
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

export const bookingLabelClass =
  "ml-1 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/48";

export const bookingControlClass =
  "h-14 rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-200 hover:border-white/18 hover:bg-white/[0.06] focus-visible:border-[#f0dcc1] focus-visible:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-[#f0dcc1]/25";

export const bookingPrimaryButtonClass =
  "h-14 rounded-[1.35rem] border border-[#f4e3cb]/50 bg-[#f4e3cb] px-6 text-sm font-semibold text-[#15110d] shadow-[0_18px_40px_-24px_rgba(244,227,203,0.9)] transition-all duration-200 hover:bg-[#faeddc] hover:shadow-[0_22px_48px_-24px_rgba(244,227,203,0.95)] disabled:border-white/8 disabled:bg-white/[0.05] disabled:text-white/28 disabled:shadow-none disabled:opacity-100";

export const bookingSecondaryButtonClass =
  "h-14 rounded-[1.35rem] border border-white/12 bg-transparent px-6 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] disabled:border-white/8 disabled:bg-white/[0.03] disabled:text-white/28 disabled:opacity-100";

const bookingFormValueOptions = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true,
} as const;

const guestCountLimits = {
  max: 20,
  min: 1,
} as const;

function getBookingStepStateClass(isActive: boolean, isCompleted: boolean) {
  if (isCompleted) {
    return "border-[#f4e3cb]/50 bg-[#f4e3cb] text-[#15110d]";
  }

  if (isActive) {
    return "border-white/30 bg-white/[0.08] text-white";
  }

  return "border-white/10 bg-transparent text-white/45";
}

export function getBookingStepIndicatorClass(
  isActive: boolean,
  isCompleted: boolean
) {
  return cn(
    "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
    getBookingStepStateClass(isActive, isCompleted)
  );
}

export function setBookingFormValue<TField extends FieldPath<BookingFormData>>(
  setValue: UseFormSetValue<BookingFormData>,
  field: TField,
  value: FieldPathValue<BookingFormData, TField>
) {
  setValue(field, value, bookingFormValueOptions);
}

export function getNextGuestsCount(
  currentGuestsCount: number,
  direction: "decrease" | "increase"
): number {
  if (direction === "decrease") {
    return Math.max(guestCountLimits.min, currentGuestsCount - 1);
  }

  return Math.min(guestCountLimits.max, currentGuestsCount + 1);
}

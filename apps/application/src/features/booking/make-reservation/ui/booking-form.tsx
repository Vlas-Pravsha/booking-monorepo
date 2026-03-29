"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useMakeReservation } from "../api/use-make-reservation";
import { BookingSchema } from "../model/schema";
import type { BookingFormData } from "../model/schema";
import { BookingContactsStep } from "./booking-contacts-step";
import { BookingDetailsStep } from "./booking-details-step";
import { BookingStepHeader } from "./booking-step-header";
import { BookingSuccessState } from "./booking-success-state";

const defaultBookingFormValues = {
  comment: "",
  guests: 2,
} satisfies Partial<BookingFormData>;

export function BookingForm() {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const { isPending, isSuccess, mutate, reset } = useMakeReservation();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: defaultBookingFormValues,
    resolver: zodResolver(BookingSchema),
  });

  const selectedDate = watch("date");
  const selectedTime = watch("time");
  const guestsCount = watch("guests");

  const handleBookingReset = React.useCallback(() => {
    reset();
    resetForm(defaultBookingFormValues);
    setIsCalendarOpen(false);
    setStep(1);
  }, [reset, resetForm]);

  const handleContinue = React.useCallback(async () => {
    if (await trigger(["date", "guests", "time"])) {
      setStep(2);
    }
  }, [trigger]);

  const handleBookingSubmit = (data: BookingFormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Бронювання успішно створено!");
      },
    });
  };

  if (isSuccess) {
    return <BookingSuccessState onReset={handleBookingReset} />;
  }

  return (
    <form onSubmit={handleSubmit(handleBookingSubmit)} className="space-y-7">
      <BookingStepHeader step={step} />

      {step === 1 ? (
        <BookingDetailsStep
          errors={errors}
          guestsCount={guestsCount}
          isCalendarOpen={isCalendarOpen}
          onCalendarOpenChange={setIsCalendarOpen}
          onContinue={handleContinue}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setValue={setValue}
        />
      ) : (
        <BookingContactsStep
          errors={errors}
          guestsCount={guestsCount}
          isPending={isPending}
          onBack={() => setStep(1)}
          register={register}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      )}
    </form>
  );
}

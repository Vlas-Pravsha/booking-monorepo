"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { isApiError } from "@/shared/api";

import {
  useMakeReservation,
  useReservationAvailability,
} from "../api/use-make-reservation";
import { BookingSchema } from "../model/schema";
import type { BookingFormData } from "../model/schema";
import { BookingContactsStep } from "./booking-contacts-step";
import { BookingDetailsStep } from "./booking-details-step";
import { BookingStepHeader } from "./booking-step-header";
import { BookingSuccessState } from "./booking-success-state";

const defaultBookingFormValues = {
  comment: "",
  email: "",
  guests: 2,
  phone: "",
  tableId: "",
} satisfies Partial<BookingFormData>;

interface BookingFormProps {
  restaurantDomain: string;
}

export function BookingForm({ restaurantDomain }: BookingFormProps) {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const { isPending, isSuccess, mutate, reset } =
    useMakeReservation(restaurantDomain);

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
  const selectedTableId = watch("tableId");
  const availabilityQuery = useReservationAvailability(
    restaurantDomain,
    selectedDate,
    selectedTime,
    guestsCount
  );

  React.useEffect(() => {
    setValue("tableId", "", {
      shouldDirty: true,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [guestsCount, selectedDate, selectedTime, setValue]);

  const handleBookingReset = React.useCallback(() => {
    reset();
    resetForm(defaultBookingFormValues);
    setIsCalendarOpen(false);
    setStep(1);
  }, [reset, resetForm]);

  const handleContinue = React.useCallback(async () => {
    if (await trigger(["date", "guests", "time", "tableId"])) {
      setStep(2);
    }
  }, [trigger]);

  const handleBookingSubmit = (data: BookingFormData) => {
    mutate(data, {
      onError: (error) => {
        toast.error(
          isApiError(error)
            ? error.message
            : "Не вдалося створити бронювання. Спробуйте ще раз."
        );
      },
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
          availableTables={availabilityQuery.data?.tables ?? []}
          isLoadingTables={availabilityQuery.isFetching}
          selectedDate={selectedDate}
          selectedTableId={selectedTableId}
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

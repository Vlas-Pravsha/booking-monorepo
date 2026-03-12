import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";
import { BookingForm } from "@/features/booking/make-reservation";

import { RestaurantSectionHeading } from "./restaurant-section-heading";

interface RestaurantBookingInfoProps {
  restaurant: Restaurant;
}

export function RestaurantBookingInfo({
  restaurant,
}: RestaurantBookingInfoProps) {
  const bookingStats = [
    {
      label: "середній візит",
      num: `${restaurant.averageDuration} хв`,
    },
    {
      label: "столи в системі",
      num: String(restaurant.tables.length),
    },
    { label: "онлайн-доступ", num: "24/7" },
    {
      label: "гості вже довіряють",
      num: `${restaurant.reviewCount}`,
    },
  ];

  return (
    <section
      id="booking"
      className="relative overflow-hidden px-4 py-20 lg:px-6 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(246,227,203,0.14),transparent_28%),radial-gradient(circle_at_82%_55%,rgba(255,255,255,0.06),transparent_24%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.8rem] border border-[color:var(--tenant-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_32px_120px_-56px_rgba(0,0,0,0.95)] backdrop-blur-2xl lg:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(244,227,203,0.8),transparent)]" />
          <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-[#f4e3cb]/10 blur-3xl" />
          <div className="absolute -bottom-20 right-6 h-56 w-56 rounded-full bg-white/6 blur-3xl" />
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5 lg:pt-8">
              <RestaurantSectionHeading
                eyebrow="Резервація"
                title="Забронюйте свій стіл"
                description="Оберіть зручну дату та час, залиште контакти, а ми швидко підтвердимо візит без зайвих дзвінків і переписки."
                titleClassName="text-4xl leading-[0.96] lg:text-6xl"
                descriptionClassName="max-w-xl"
              />

              <div className="mt-8 flex flex-wrap gap-2">
                {["без дзвінків", "швидке підтвердження", "доступно 24/7"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/62"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {bookingStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.7rem] border border-white/10 bg-black/18 p-5 shadow-[0_20px_44px_-36px_rgba(0,0,0,0.8)] backdrop-blur-md"
                  >
                    <p className="font-display text-3xl font-semibold tracking-[-0.05em] text-white">
                      {item.num}
                    </p>
                    <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-white/38">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-[#f4e3cb]/10 blur-3xl" />
                <div className="absolute -bottom-8 -right-6 h-36 w-36 rounded-full bg-white/5 blur-3xl" />

                <div className="relative rounded-[2.25rem] border border-white/10 bg-[#0c0c0e]/88 p-6 shadow-[0_36px_80px_-48px_rgba(0,0,0,0.95)] backdrop-blur-xl lg:p-10">
                  <BookingForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

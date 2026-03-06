import * as React from "react";

import { BookingForm } from "@/features/booking/make-reservation";

export function RestaurantBookingInfo() {
  return (
    <section id="booking" className="py-20 lg:py-32 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Left Side - Info */}
          <div className="lg:col-span-5">
            <span className="text-xs text-white/40 uppercase tracking-wider">
              Резервація
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold mt-2 mb-6">
              Забронюйте
              <br />
              свій стіл
            </h2>
            <p className="text-white/50 mb-8 leading-relaxed">
              Оберіть зручну дату та час, залиште контакти — і ми підтвердимо
              ваше бронювання миттєво.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "хвилин", num: "15" },
                { label: "онлайн", num: "24/7" },
                { label: "передоплата", num: "0" },
                { label: "підтвердження", num: "100%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/3 border border-white/5 rounded-xl p-4"
                >
                  <p className="text-2xl font-bold">{item.num}</p>
                  <p className="text-xs text-white/40">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/2 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/2 rounded-full blur-3xl" />

              <div className="relative bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 lg:p-10">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

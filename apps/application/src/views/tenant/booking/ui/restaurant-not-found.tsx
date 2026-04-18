import * as React from "react";

export function RestaurantNotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070709] px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,227,203,0.14),transparent_30%),linear-gradient(180deg,#0b0a0b_0%,#070709_100%)]"
      />
      <div className="relative max-w-lg rounded-[2.2rem] border border-white/10 bg-white/[0.05] px-8 py-10 text-center shadow-[0_32px_120px_-56px_rgba(0,0,0,0.95)] backdrop-blur-xl">
        <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#f4e3cb]/75">
          Tenant site
        </p>
        <h1 className="mb-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
          Ресторан не знайдено
        </h1>
        <p className="text-sm leading-relaxed text-white/55">
          Перевірте правильність адреси домену або відкрийте сторінку закладу ще
          раз із каталогу.
        </p>
      </div>
    </div>
  );
}

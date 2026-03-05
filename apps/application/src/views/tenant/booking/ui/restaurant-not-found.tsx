import * as React from "react";

export function RestaurantNotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          Ресторан не знайдено
        </h1>
        <p className="text-white/40 text-sm">Перевірте правильність адреси</p>
      </div>
    </div>
  );
}

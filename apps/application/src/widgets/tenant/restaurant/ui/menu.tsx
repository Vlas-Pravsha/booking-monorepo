import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";

interface RestaurantMenuProps {
  restaurant: Restaurant;
}

export function RestaurantMenu({ restaurant }: RestaurantMenuProps) {
  return (
    <section id="menu" className="py-20 lg:py-32 px-4 lg:px-6 bg-[#0c0c0e]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 lg:mb-12">
          <div>
            <span className="text-xs text-white/40 uppercase tracking-wider">
              Кулінарія
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold mt-2">Хіти меню</h2>
          </div>
        </div>

        <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {restaurant.menuHighlights.map((item, i) => (
            <div
              key={i}
              className="min-w-70 lg:min-w-0 bg-[#09090b] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-all"
            >
              <div className="aspect-4/3 relative overflow-hidden">
                <img
                  src={item.image ? item.image : ""}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-sm font-medium">
                  {item.price} ₴
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-white/80 transition-colors">
                  {item.name}
                </h3>
                <p className="text-white/40 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

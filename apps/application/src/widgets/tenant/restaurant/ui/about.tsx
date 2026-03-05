import Image from "next/image";
import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";

interface RestaurantAboutProps {
  restaurant: Restaurant;
}

export function RestaurantAbout({ restaurant }: RestaurantAboutProps) {
  return (
    <section id="about" className="py-20 lg:py-32 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2 rounded-3xl overflow-hidden relative h-100 lg:h-150 group">
            <Image
              src={restaurant.gallery[1] || ""}
              alt="Interior"
              width={800}
              height={600}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#09090b]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-2xl lg:text-3xl font-semibold mb-2">
                {restaurant.name}
              </p>
              <p className="text-white/60 text-sm">Справжня атмосфера</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="rounded-3xl bg-white/3 border border-white/5 p-6 flex-1">
              <span className="text-xs text-white/40 uppercase tracking-wider mb-4 block">
                Про нас
              </span>
              <p className="text-white/80 leading-relaxed text-sm lg:text-base">
                {restaurant.description.slice(0, 200)}
                ...
              </p>
            </div>

            <div className="rounded-3xl bg-linear-to-br from-white/6 to-white/2 border border-white/5 p-6">
              <span className="text-xs text-white/40 uppercase tracking-wider mb-4 block">
                Особливості
              </span>
              <div className="flex flex-wrap gap-2">
                {restaurant.features.slice(0, 6).map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 bg-white/5 rounded-full text-xs text-white/70"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

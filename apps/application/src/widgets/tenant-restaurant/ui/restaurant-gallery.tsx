import Image from "next/image";
import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";

import { RestaurantSectionHeading } from "./restaurant-section-heading";

interface RestaurantGalleryProps {
  restaurant: Restaurant;
}

const getGallerySpanClass = (index: number) => {
  if (index === 0) {
    return "md:col-span-2 lg:col-span-7 lg:row-span-2";
  }

  if (index === 1) {
    return "lg:col-span-5 lg:row-span-2";
  }

  return "lg:col-span-4";
};

const getLabel = (index: number) => {
  if (index === 0) {
    return "Головний зал";
  }

  if (index === 1) {
    return "Настрій вечора";
  }

  return "Деталі";
};

export function RestaurantGallery({ restaurant }: RestaurantGalleryProps) {
  return (
    <section id="gallery" className="px-4 py-20 lg:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <RestaurantSectionHeading
          eyebrow="Атмосфера"
          title="Простір у деталях"
          description="Кілька кадрів достатньо, щоб гість відчув ритм вечора, світло залу та характер сервісу ще до бронювання."
          className="mb-8 lg:mb-12"
        />

        <div className="grid auto-rows-[14rem] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {restaurant.gallery.slice(0, 6).map((img, i) => (
            <div
              key={img}
              className={`group relative overflow-hidden rounded-[2.2rem] border border-white/10 shadow-[0_24px_70px_-46px_rgba(0,0,0,0.95)] ${getGallerySpanClass(i)}`}
            >
              <Image
                src={img}
                alt={`Галерея ресторану ${i + 1}`}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.02),rgba(8,8,10,0.54)_100%)] transition-colors group-hover:bg-[linear-gradient(180deg,rgba(8,8,10,0.02),rgba(8,8,10,0.68)_100%)]" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#f4e3cb]/78">
                    {getLabel(i)}
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold tracking-[-0.04em] text-white">
                    {restaurant.name}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/74 backdrop-blur-md">
                  {restaurant.cuisine}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

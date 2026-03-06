import Image from "next/image";
import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";

interface RestaurantGalleryProps {
  restaurant: Restaurant;
}

export function RestaurantGallery({ restaurant }: RestaurantGalleryProps) {
  return (
    <section id="gallery" className="py-20 lg:py-32 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 lg:mb-12">
          <span className="text-xs text-white/40 uppercase tracking-wider">
            Атмосфера
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-2">Галерея</h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 lg:gap-6 space-y-4 lg:space-y-6">
          {restaurant.gallery.slice(0, 6).map((img, i) => (
            <div
              key={img}
              className="break-inside-avoid rounded-2xl overflow-hidden group relative"
            >
              <Image
                src={img}
                alt={`Галерея ресторану ${i + 1}`}
                width={600}
                height={400}
                className="w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

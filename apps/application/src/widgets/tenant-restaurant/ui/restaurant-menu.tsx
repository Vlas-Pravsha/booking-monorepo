import Image from "next/image";
import * as React from "react";

import { DEFAULT_HERO_IMAGE } from "@/entities/restaurant";
import type { Restaurant } from "@/entities/restaurant";

import { RestaurantSectionHeading } from "./restaurant-section-heading";

interface RestaurantMenuProps {
  restaurant: Restaurant;
}

export function RestaurantMenu({ restaurant }: RestaurantMenuProps) {
  return (
    <section
      id="menu"
      className="bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-4 py-20 lg:px-6 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <RestaurantSectionHeading
          eyebrow="Кулінарія"
          title="Хіти меню"
          description="Найсильніші позиції, які задають смак закладу і допомагають гостю швидше уявити свій візит."
          className="mb-8 lg:mb-12"
        />

        <div className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
          {restaurant.menuHighlights.map((item, index) => (
            <div
              key={`${item.name}-${String(index)}`}
              className="group min-w-72 overflow-hidden rounded-[2.2rem] border border-[color:var(--tenant-border)] bg-[rgba(12,12,14,0.86)] shadow-[0_24px_70px_-46px_rgba(0,0,0,0.95)] transition-all duration-300 hover:-translate-y-1 hover:border-white/18 lg:min-w-0"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={item.image || restaurant.heroImage || DEFAULT_HERO_IMAGE}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0)_10%,rgba(8,8,10,0.72)_100%)]" />
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#f4e3cb]/78 backdrop-blur-md">
                  {index === 0 ? "Chef pick" : "Signature"}
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-sm font-medium backdrop-blur-md">
                  {item.price} ₴
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] transition-colors group-hover:text-white/88">
                  {item.name}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[color:var(--tenant-muted)]">
                  {item.description}
                </p>
                <div className="mt-5 border-t border-white/6 pt-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                    Найчастіше замовляють для першого візиту
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

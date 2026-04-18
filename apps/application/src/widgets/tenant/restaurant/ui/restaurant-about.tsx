import Image from "next/image";
import * as React from "react";

import { DEFAULT_HERO_IMAGE } from "@/entities/restaurant";
import type { Restaurant } from "@/entities/restaurant";

import { RestaurantSectionHeading } from "./restaurant-section-heading";

interface RestaurantAboutProps {
  restaurant: Restaurant;
}

export function RestaurantAbout({ restaurant }: RestaurantAboutProps) {
  const aboutImage =
    restaurant.gallery[1] ||
    restaurant.gallery[0] ||
    restaurant.heroImage ||
    DEFAULT_HERO_IMAGE;

  return (
    <section id="about" className="px-4 py-20 lg:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <RestaurantSectionHeading
          eyebrow="Про заклад"
          title="Атмосфера, яка починається ще до першого келиха"
          description="Ми зібрали ключові сенси закладу в одну сторінку: візуальний настрій, історію бренду, переваги простору та зрозумілий шлях до бронювання."
          className="mb-10"
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <div className="relative h-[28rem] overflow-hidden rounded-[2.4rem] border border-white/10 shadow-[0_32px_120px_-56px_rgba(0,0,0,0.95)] lg:col-span-7 lg:h-[42rem]">
            <Image
              src={aboutImage}
              alt={`Інтер'єр ресторану ${restaurant.name}`}
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.04)_0%,rgba(8,8,10,0.18)_42%,rgba(8,8,10,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(244,227,203,0.18),transparent_24%)]" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.8rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md">
              <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#f4e3cb]/78">
                Signature mood
              </p>
              <p className="font-display text-2xl font-semibold tracking-[-0.04em] lg:text-3xl">
                {restaurant.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Простір для вечерь, зустрічей і спокійного сервісу без
                випадкових деталей.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5 lg:gap-6">
            <div className="rounded-[2.2rem] border border-[color:var(--tenant-border)] bg-[var(--tenant-panel)] p-6 backdrop-blur-xl">
              <span className="mb-4 inline-flex rounded-full border border-white/8 bg-white/[0.04] px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#f4e3cb]/78">
                Про нас
              </span>
              <p className="text-sm leading-relaxed text-[color:var(--tenant-muted)] lg:text-base">
                {restaurant.description}
              </p>
            </div>

            <div className="rounded-[2.2rem] border border-[color:var(--tenant-border)] bg-[linear-gradient(155deg,rgba(244,227,203,0.12),rgba(255,255,255,0.04))] p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="mb-4 inline-flex rounded-full border border-white/8 bg-black/10 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#f4e3cb]/78">
                    Особливості
                  </span>
                  <p className="max-w-sm text-sm leading-relaxed text-white/68">
                    Невеликі сигнали довіри, які працюють ще до моменту
                    бронювання.
                  </p>
                </div>
                <p className="font-display text-4xl font-semibold tracking-[-0.05em] text-white">
                  {restaurant.features.length}
                </p>
              </div>
              <div className="mt-5 grid gap-2">
                {restaurant.features.slice(0, 6).map((feature, index) => (
                  <span
                    key={`${feature}-${String(index)}`}
                    className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm text-white/78"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[2rem] border border-[color:var(--tenant-border)] bg-[var(--tenant-panel)] p-5 backdrop-blur-xl">
                <p className="font-display text-3xl font-semibold tracking-[-0.05em] text-white">
                  {restaurant.tables.length}
                </p>
                <p className="mt-1 text-sm text-white/48">
                  столів у конфігурації
                </p>
              </div>
              <div className="rounded-[2rem] border border-[color:var(--tenant-border)] bg-[var(--tenant-panel)] p-5 backdrop-blur-xl">
                <p className="font-display text-3xl font-semibold tracking-[-0.05em] text-white">
                  {restaurant.averageDuration}
                </p>
                <p className="mt-1 text-sm text-white/48">
                  хвилин середній візит
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Clock3, MapPinned, Sparkles, Users } from "lucide-react";
import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";

import { RestaurantSectionHeading } from "./restaurant-section-heading";

interface RestaurantExperienceProps {
  restaurant: Restaurant;
}

export function RestaurantExperience({
  restaurant,
}: RestaurantExperienceProps) {
  const experienceCards = [
    {
      description:
        "Коротке позиціонування одразу пояснює характер кухні й настрій вечора без перевантаження текстом.",
      icon: Sparkles,
      title: "Сильне перше враження",
      value: restaurant.shortDescription,
    },
    {
      description:
        "Робочий графік і середня тривалість візиту прибирають невизначеність ще до бронювання.",
      icon: Clock3,
      title: "Прозорий сервіс",
      value: `${restaurant.openingTime} - ${restaurant.closingTime}`,
    },
    {
      description:
        "Кількість столів і організація посадки показують, що заклад готовий до реального потоку гостей.",
      icon: Users,
      title: "Операційна готовність",
      value: `${restaurant.tables.length} столів`,
    },
    {
      description:
        "Адреса, телефон і соцмережі зібрані в одному місці, щоб рішення про візит приймалося швидше.",
      icon: MapPinned,
      title: "Повний контакт",
      value: restaurant.address,
    },
  ];

  return (
    <section id="experience" className="px-4 py-20 lg:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <RestaurantSectionHeading
          eyebrow="Досвід"
          title="Деталі, які формують правильне перше враження"
          description="Кожен блок на сторінці працює на довіру: чітко показує атмосферу, сервіс, організацію візиту та реальні точки контакту."
          className="mb-10"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {experienceCards.map((card, index) => (
            <article
              key={card.title}
              className="group rounded-[2rem] border border-[color:var(--tenant-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_64px_-42px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4e3cb]/12">
                  <card.icon className="h-5 w-5 text-[#f4e3cb]" />
                </div>
                <span className="font-display text-4xl font-semibold tracking-[-0.06em] text-white/14 transition-colors duration-300 group-hover:text-white/22">
                  0{index + 1}
                </span>
              </div>
              <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#f4e3cb]/74">
                {card.title}
              </p>
              <p className="mb-4 font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                {card.value}
              </p>
              <p className="text-sm leading-relaxed text-[color:var(--tenant-muted)]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

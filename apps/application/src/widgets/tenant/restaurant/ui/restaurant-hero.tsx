import { ArrowRight, Clock, Sparkles } from "lucide-react";

import { DEFAULT_HERO_IMAGE } from "@/entities/restaurant";
import type { Restaurant } from "@/entities/restaurant";

import {
  RestaurantHeroLocationCard,
  RestaurantHeroRatingBadge,
  RestaurantHeroSelectionCard,
  RestaurantHeroSideCard,
  RestaurantHeroSummaryCard,
} from "./restaurant-hero-parts";

interface RestaurantHeroProps {
  restaurant: Restaurant;
}

export function RestaurantHero({ restaurant }: RestaurantHeroProps) {
  const heroImage =
    restaurant.heroImage || restaurant.gallery[0] || DEFAULT_HERO_IMAGE;
  const [featuredDish] = restaurant.menuHighlights;
  const [featuredReview] = restaurant.reviews;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center pt-28 lg:pt-32"
    >
      <div className="w-full px-4 py-12 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[82vh] grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
            <div className="group relative overflow-hidden rounded-[2.4rem] border border-white/10 shadow-[0_32px_120px_-54px_rgba(0,0,0,0.95)] lg:col-span-8">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.1)_0%,rgba(8,8,10,0.38)_38%,rgba(8,8,10,0.92)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(244,227,203,0.24),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_75%_80%,rgba(183,124,72,0.22),transparent_28%)]" />

              <div className="relative flex h-full min-h-[40rem] flex-col justify-between p-6 lg:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/88 backdrop-blur-md">
                    {restaurant.cuisine}
                  </span>
                  <RestaurantHeroRatingBadge
                    rating={restaurant.rating}
                    reviewCount={restaurant.reviewCount}
                  />
                </div>

                <div className="max-w-3xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#f4e3cb]/78">
                    <Sparkles className="h-4 w-4" />
                    Сторінка ресторану
                  </div>

                  <h1 className="font-display text-4xl font-semibold leading-[0.94] tracking-[-0.06em] lg:text-7xl">
                    {restaurant.name}
                  </h1>
                  <p className="mt-5 max-w-2xl text-lg text-white/82 lg:text-2xl">
                    {restaurant.shortDescription}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--tenant-muted)] lg:text-base">
                    {restaurant.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#booking"
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#f4e3cb]/45 bg-[#f4e3cb] px-5 py-3 text-sm font-semibold text-[#17120d] transition-all hover:bg-[#faecd9]"
                    >
                      Забронювати столик
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#about"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/12"
                    >
                      Дослідити заклад
                    </a>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <RestaurantHeroSummaryCard
                    label="Адреса"
                    value={restaurant.address}
                  />
                  <RestaurantHeroSummaryCard
                    label="Графік"
                    value={restaurant.workHours}
                  />
                  <RestaurantHeroSummaryCard
                    label="Ціна"
                    value={restaurant.priceRange}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-4 lg:gap-6">
              <RestaurantHeroSideCard
                icon={Clock}
                title="Години роботи"
                value={restaurant.workHours}
                description={`${restaurant.averageDuration} хв середній візит`}
              />

              <RestaurantHeroLocationCard address={restaurant.address} />

              <RestaurantHeroSelectionCard
                featuredDish={featuredDish}
                featuredReview={featuredReview}
                featureCount={restaurant.features.length}
                reviewCount={restaurant.reviewCount || 0}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

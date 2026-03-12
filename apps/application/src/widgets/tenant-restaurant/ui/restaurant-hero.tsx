import { ArrowRight, Clock, MapPin, Sparkles, Star, Users } from "lucide-react";
import * as React from "react";

import { DEFAULT_HERO_IMAGE } from "@/entities/restaurant";
import type { Restaurant } from "@/entities/restaurant";

interface RestaurantHeroProps {
  restaurant: Restaurant;
}

const renderFeaturedPanel = (
  featuredDish: Restaurant["menuHighlights"][number] | undefined,
  featuredReview: Restaurant["reviews"][number] | undefined
) => {
  if (featuredDish) {
    return (
      <div className="rounded-[1.75rem] border border-[color:var(--tenant-border)] bg-[var(--tenant-panel)] p-5 backdrop-blur-md">
        <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#f4e3cb]/78">
          Рекомендуємо
        </p>
        <p className="font-display text-xl font-semibold tracking-[-0.03em] text-white">
          {featuredDish.name}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--tenant-muted)]">
          {featuredDish.description}
        </p>
      </div>
    );
  }

  if (featuredReview) {
    return (
      <div className="rounded-[1.75rem] border border-[color:var(--tenant-border)] bg-[var(--tenant-panel)] p-5 backdrop-blur-md">
        <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#f4e3cb]/78">
          Останній відгук
        </p>
        <p className="text-sm leading-relaxed text-[color:var(--tenant-muted)]">
          &quot;{featuredReview.text}&quot;
        </p>
      </div>
    );
  }

  return null;
};

export function RestaurantHero({ restaurant }: RestaurantHeroProps) {
  const heroImage =
    restaurant.heroImage || restaurant.gallery[0] || DEFAULT_HERO_IMAGE;
  const [featuredDish] = restaurant.menuHighlights;
  const [featuredReview] = restaurant.reviews;
  const featuredPanel = renderFeaturedPanel(featuredDish, featuredReview);

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
                  <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-md">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`star-${String(index)}`}
                        className={`h-3 w-3 ${index < Math.floor(restaurant.rating) ? "fill-white text-white" : "text-white/30"}`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-white/70">
                      {restaurant.reviewCount > 0
                        ? `${restaurant.rating} / ${restaurant.reviewCount} відгуків`
                        : "Новий простір"}
                    </span>
                  </div>
                </div>

                <div className="max-w-3xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#f4e3cb]/78">
                    <Sparkles className="h-4 w-4" />
                    Signature dining page
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
                  <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-4 backdrop-blur-md">
                    <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#f4e3cb]/72">
                      Адреса
                    </p>
                    <p className="text-sm text-white/82">
                      {restaurant.address}
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-4 backdrop-blur-md">
                    <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#f4e3cb]/72">
                      Графік
                    </p>
                    <p className="text-sm text-white/82">
                      {restaurant.workHours}
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-4 backdrop-blur-md">
                    <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#f4e3cb]/72">
                      Ціна
                    </p>
                    <p className="text-sm text-white/82">
                      {restaurant.priceRange}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-4 lg:gap-6">
              <div className="flex-1 rounded-[2.2rem] border border-[color:var(--tenant-border)] bg-[linear-gradient(160deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_70px_-46px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/7">
                    <Clock className="h-5 w-5 text-[#f4e3cb]/78" />
                  </div>
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#f4e3cb]/72">
                    Години роботи
                  </span>
                </div>
                <p className="font-display text-3xl font-semibold tracking-[-0.05em] text-white">
                  {restaurant.workHours}
                </p>
                <div className="mt-4 border-t border-white/6 pt-4">
                  <p className="text-sm leading-relaxed text-[color:var(--tenant-muted)]">
                    {restaurant.averageDuration} хв середній візит
                  </p>
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-[2.2rem] border border-[color:var(--tenant-border)] bg-[var(--tenant-panel)] p-6 backdrop-blur-xl">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#f4e3cb]/10 blur-3xl" />
                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/7">
                      <MapPin className="h-5 w-5 text-[#f4e3cb]/78" />
                    </div>
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#f4e3cb]/72">
                      Локація
                    </span>
                  </div>
                  <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                    {restaurant.address}
                  </p>
                  <a
                    href="#contacts"
                    className="mt-5 inline-flex items-center gap-1 text-sm text-[color:var(--tenant-muted)] transition-colors hover:text-white"
                  >
                    Дивитись контакти <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="rounded-[2.2rem] border border-[color:var(--tenant-border)] bg-[var(--tenant-panel)] p-6 backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#f4e3cb]/72">
                    Вибір гостей
                  </p>
                  <Users className="h-4 w-4 text-[#f4e3cb]/72" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-[1.6rem] bg-black/20 p-4">
                    <p className="font-display text-3xl font-semibold tracking-[-0.05em]">
                      {restaurant.reviewCount || 0}
                    </p>
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/42">
                      відгуків
                    </p>
                  </div>
                  <div className="rounded-[1.6rem] bg-black/20 p-4">
                    <p className="font-display text-3xl font-semibold tracking-[-0.05em]">
                      {restaurant.features.length}
                    </p>
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/42">
                      переваг
                    </p>
                  </div>
                </div>
                {featuredPanel ? (
                  <div className="mt-4">{featuredPanel}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

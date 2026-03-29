import { ArrowRight, MapPin, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import type { Restaurant } from "@/entities/restaurant";

interface RestaurantHeroRatingBadgeProps {
  rating: number;
  reviewCount: number;
}

export function RestaurantHeroRatingBadge({
  rating,
  reviewCount,
}: RestaurantHeroRatingBadgeProps) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-md">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={`star-${String(index)}`}
          className={`h-3 w-3 ${index < Math.floor(rating) ? "fill-white text-white" : "text-white/30"}`}
        />
      ))}
      <span className="ml-1 text-xs text-white/70">
        {reviewCount > 0
          ? `${rating} / ${reviewCount} відгуків`
          : "Новий простір"}
      </span>
    </div>
  );
}

interface RestaurantHeroSummaryCardProps {
  label: string;
  value: string;
}

export function RestaurantHeroSummaryCard({
  label,
  value,
}: RestaurantHeroSummaryCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-4 backdrop-blur-md">
      <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#f4e3cb]/72">
        {label}
      </p>
      <p className="text-sm text-white/82">{value}</p>
    </div>
  );
}

interface RestaurantHeroSideCardProps {
  children?: ReactNode;
  description?: string;
  icon: LucideIcon;
  title: string;
  value: string;
}

export function RestaurantHeroSideCard({
  children,
  description,
  icon: Icon,
  title,
  value,
}: RestaurantHeroSideCardProps) {
  return (
    <div className="flex-1 rounded-[2.2rem] border border-[color:var(--tenant-border)] bg-[linear-gradient(160deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_70px_-46px_rgba(0,0,0,0.95)] backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/7">
          <Icon className="h-5 w-5 text-[#f4e3cb]/78" />
        </div>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#f4e3cb]/72">
          {title}
        </span>
      </div>
      <p className="font-display text-3xl font-semibold tracking-[-0.05em] text-white">
        {value}
      </p>
      {description ? (
        <div className="mt-4 border-t border-white/6 pt-4">
          <p className="text-sm leading-relaxed text-[color:var(--tenant-muted)]">
            {description}
          </p>
        </div>
      ) : null}
      {children}
    </div>
  );
}

interface RestaurantHeroLocationCardProps {
  address: string;
}

export function RestaurantHeroLocationCard({
  address,
}: RestaurantHeroLocationCardProps) {
  return (
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
          {address}
        </p>
        <a
          href="#contacts"
          className="mt-5 inline-flex items-center gap-1 text-sm text-[color:var(--tenant-muted)] transition-colors hover:text-white"
        >
          Дивитись контакти <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

interface RestaurantHeroSelectionCardProps {
  featuredDish?: Restaurant["menuHighlights"][number];
  featuredReview?: Restaurant["reviews"][number];
  featureCount: number;
  reviewCount: number;
}

function RestaurantHeroMetricCard({
  label,
  value,
}: RestaurantHeroSummaryCardProps) {
  return (
    <div className="rounded-[1.6rem] bg-black/20 p-4">
      <p className="font-display text-3xl font-semibold tracking-[-0.05em]">
        {value}
      </p>
      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/42">
        {label}
      </p>
    </div>
  );
}

function RestaurantHeroFeaturedPanel({
  featuredDish,
  featuredReview,
}: {
  featuredDish?: Restaurant["menuHighlights"][number];
  featuredReview?: Restaurant["reviews"][number];
}) {
  if (featuredDish) {
    return (
      <div className="mt-4 rounded-[1.75rem] border border-[color:var(--tenant-border)] bg-[var(--tenant-panel)] p-5 backdrop-blur-md">
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
      <div className="mt-4 rounded-[1.75rem] border border-[color:var(--tenant-border)] bg-[var(--tenant-panel)] p-5 backdrop-blur-md">
        <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#f4e3cb]/78">
          Відгук гостей
        </p>
        <p className="text-sm leading-relaxed text-[color:var(--tenant-muted)]">
          &quot;{featuredReview.text}&quot;
        </p>
      </div>
    );
  }

  return null;
}

export function RestaurantHeroSelectionCard({
  featuredDish,
  featuredReview,
  featureCount,
  reviewCount,
}: RestaurantHeroSelectionCardProps) {
  return (
    <div className="rounded-[2.2rem] border border-[color:var(--tenant-border)] bg-[var(--tenant-panel)] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#f4e3cb]/72">
          Вибір гостей
        </p>
        <Star className="h-4 w-4 text-[#f4e3cb]/72" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <RestaurantHeroMetricCard
          label="відгуків"
          value={String(reviewCount)}
        />
        <RestaurantHeroMetricCard
          label="переваг"
          value={String(featureCount)}
        />
      </div>
      <RestaurantHeroFeaturedPanel
        featuredDish={featuredDish}
        featuredReview={featuredReview}
      />
    </div>
  );
}

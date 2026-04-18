"use client";

import { Star } from "lucide-react";

import type {
  RestaurantMenuDraft,
  RestaurantReviewDraft,
} from "@/entities/restaurant";

import { SiteContentEmptyState } from "./primitives";

function formatPriceLabel(price: number): string {
  return price > 0 ? `${price} ₴` : "Ціну не вказано";
}

function getGalleryImageCaption(index: number): string {
  if (index === 0) {
    return "Головне враження";
  }

  if (index === 1) {
    return "Атмосфера залу";
  }

  return "Деталі простору";
}

export function GalleryPreviewGrid({
  galleryImageUrls,
}: {
  galleryImageUrls: string[];
}) {
  if (galleryImageUrls.length === 0) {
    return (
      <SiteContentEmptyState
        title="Додайте кілька фото"
        description="Вставте URL зображень по одному в рядок, і ми одразу покажемо, як секція виглядатиме на вітрині."
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {galleryImageUrls.slice(0, 4).map((imageUrl, index) => (
        <div
          key={`${imageUrl}-${String(index)}`}
          className="group relative min-h-40 overflow-hidden rounded-[1.5rem] border border-border/60 bg-muted"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          <div className="relative flex h-full items-end p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/72">
                Кадр {index + 1}
              </p>
              <p className="mt-1 text-sm text-white/90">
                {getGalleryImageCaption(index)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MenuHighlightPreviewCards({
  menuHighlights,
}: {
  menuHighlights: RestaurantMenuDraft[];
}) {
  if (menuHighlights.length === 0) {
    return (
      <SiteContentEmptyState
        title="Хіти меню ще не додані"
        description="Залиште 3-6 позицій, які найкраще продають заклад: назва, короткий опис і ціна."
      />
    );
  }

  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {menuHighlights.slice(0, 3).map((menuHighlight, index) => (
        <div
          key={`${menuHighlight.name}-${String(index)}`}
          className="rounded-[1.5rem] border border-border/60 bg-background/80 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Позиція {index + 1}
              </p>
              <p className="mt-2 font-medium">
                {menuHighlight.name || "Нова позиція меню"}
              </p>
            </div>
            <div className="inline-flex items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              {formatPriceLabel(menuHighlight.price)}
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {menuHighlight.description || "Короткий опис страви з'явиться тут."}
          </p>
        </div>
      ))}
    </div>
  );
}

export function GuestReviewPreviewCards({
  reviews,
}: {
  reviews: RestaurantReviewDraft[];
}) {
  if (reviews.length === 0) {
    return (
      <SiteContentEmptyState
        title="Відгуки ще не додані"
        description="Достатньо кількох сильних цитат з іменем гостя та оцінкою, щоб секція виглядала переконливо."
      />
    );
  }

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {reviews.slice(0, 2).map((review, index) => (
        <div
          key={`${review.author}-${String(index)}`}
          className="rounded-[1.5rem] border border-border/60 bg-background/80 p-5"
        >
          <div className="mb-4 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, ratingIndex) => (
              <Star
                key={`preview-star-${String(index)}-${String(ratingIndex)}`}
                className={`h-4 w-4 ${
                  ratingIndex < review.rating
                    ? "fill-primary text-primary"
                    : "text-muted-foreground/40"
                }`}
              />
            ))}
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">
            &quot;{review.text || "Тут з'явиться короткий відгук гостя."}&quot;
          </p>
          <p className="mt-4 text-sm font-medium">
            {review.author || "Ім'я гостя"}
          </p>
        </div>
      ))}
    </div>
  );
}

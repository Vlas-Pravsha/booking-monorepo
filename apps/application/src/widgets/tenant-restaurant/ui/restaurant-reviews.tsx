import { Star } from "lucide-react";
import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";

import { RestaurantSectionHeading } from "./restaurant-section-heading";

interface RestaurantReviewsProps {
  restaurant: Restaurant;
}

export function RestaurantReviews({ restaurant }: RestaurantReviewsProps) {
  return (
    <section
      id="reviews"
      className="bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-4 py-20 lg:px-6 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <RestaurantSectionHeading
            eyebrow="Відгуки"
            title="Що кажуть гості"
            description="Реальні враження формують останній шар довіри: підтверджують сервіс, атмосферу та стабільність якості."
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {restaurant.reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-[2rem] border border-[color:var(--tenant-border)] bg-[rgba(12,12,14,0.86)] p-6 shadow-[0_24px_64px_-42px_rgba(0,0,0,0.95)] transition-all duration-300 hover:-translate-y-1 hover:border-white/18"
            >
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={`star-${String(j)}`}
                    className={`h-3 w-3 ${j < review.rating ? "fill-white text-white" : "text-white/20"}`}
                  />
                ))}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-[color:var(--tenant-muted)]">
                &quot;{review.text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4e3cb]/14 text-xs font-semibold text-[#f4e3cb]">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{review.author}</p>
                  <p className="text-xs text-white/40">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

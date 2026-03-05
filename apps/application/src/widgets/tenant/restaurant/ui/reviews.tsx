import { Star } from "lucide-react";
import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";

interface RestaurantReviewsProps {
  restaurant: Restaurant;
}

export function RestaurantReviews({ restaurant }: RestaurantReviewsProps) {
  return (
    <section id="reviews" className="py-20 lg:py-32 px-4 lg:px-6 bg-[#0c0c0e]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs text-white/40 uppercase tracking-wider">
            Відгуки
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-2">
            Що кажуть гості
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {restaurant.reviews.map((review) => (
            <div
              key={review.author}
              className="bg-[#09090b] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Star
                    key={`star-${String(j)}`}
                    className={`w-3 h-3 ${j < review.rating ? "fill-white text-white" : "text-white/20"}`}
                  />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                &quot;{review.text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium">
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

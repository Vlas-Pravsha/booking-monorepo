import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";

interface RestaurantHeroProps {
  restaurant: Restaurant;
}

export function RestaurantHero({ restaurant }: RestaurantHeroProps) {
  return (
    <section id="hero" className="pt-24 lg:pt-0 min-h-screen flex items-center">
      <div className="w-full px-4 lg:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 min-h-[80vh]">
            {/* Main Hero Card */}
            <div className="lg:col-span-8 relative rounded-3xl overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${restaurant.gallery[0]})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-[#09090b]/20 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.05),transparent_50%)]" />

              <div className="relative h-full min-h-100 lg:min-h-auto flex flex-col justify-end p-6 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium border border-white/10">
                    {restaurant.cuisine}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(restaurant.rating) ? "fill-white text-white" : "text-white/30"}`}
                      />
                    ))}
                    <span className="text-xs text-white/60 ml-1">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold mb-3 leading-tight">
                  {restaurant.name}
                </h1>
                <p className="text-white/60 text-lg max-w-md mb-6">
                  {restaurant.shortDescription}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-white/90 transition-colors"
                  >
                    Забронювати
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Side Cards */}
            <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">
              {/* Hours Card */}
              <div className="flex-1 rounded-3xl bg-linear-to-br from-white/8 to-white/2 border border-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white/60" />
                  </div>
                  <span className="text-sm text-white/40 uppercase tracking-wider">
                    Години роботи
                  </span>
                </div>
                <p className="text-xl font-semibold">{restaurant.workHours}</p>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-sm text-white/60">
                    {restaurant.priceRange} · Premium
                  </p>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex-1 rounded-3xl bg-white/3 border border-white/5 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/2 rounded-full blur-3xl" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white/60" />
                  </div>
                  <span className="text-sm text-white/40 uppercase tracking-wider">
                    Локація
                  </span>
                </div>
                <p className="text-lg font-medium">{restaurant.address}</p>
                <a
                  href="#contacts"
                  className="inline-flex items-center gap-1 text-sm text-white/40 mt-4 hover:text-white transition-colors"
                >
                  Дивитись на карті <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Quick Stats */}
              <div className="rounded-3xl bg-white/5 border border-white/5 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-bold">
                      {restaurant.reviewCount}+
                    </p>
                    <p className="text-xs text-white/40">відгуків</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">
                      {restaurant.features.length}
                    </p>
                    <p className="text-xs text-white/40">зручностей</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

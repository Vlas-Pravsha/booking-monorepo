"use client";

import { useQuery } from "@tanstack/react-query";
import * as React from "react";

import { restaurantApi } from "@/entities/restaurant";
import {
  RestaurantAbout,
  RestaurantBookingInfo,
  RestaurantContacts,
  RestaurantGallery,
  RestaurantHero,
  RestaurantMenu,
  RestaurantNavigation,
  RestaurantReviews,
} from "@/widgets/tenant/restaurant";

interface RestaurantBookingPageProps {
  domain: string;
}

export function RestaurantBookingPage({ domain }: RestaurantBookingPageProps) {
  const { data: restaurant, isLoading } = useQuery({
    enabled: !!domain,
    queryFn: () => restaurantApi.getByDomain(domain),
    queryKey: ["restaurant", domain],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-3 h-3 bg-white/80 rounded-full animate-pulse"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-3 h-3 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-3 h-3 bg-white/40 rounded-full animate-pulse"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Ресторан не знайдено</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <RestaurantNavigation restaurantName={restaurant.name} />
      <RestaurantHero restaurant={restaurant} />
      <RestaurantAbout restaurant={restaurant} />
      <RestaurantMenu restaurant={restaurant} />
      <RestaurantGallery restaurant={restaurant} />
      <RestaurantReviews restaurant={restaurant} />
      <RestaurantBookingInfo />
      <RestaurantContacts restaurant={restaurant} />

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <span>© 2026 {restaurant.name}</span>
            <span>Система бронювання TableReserve</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

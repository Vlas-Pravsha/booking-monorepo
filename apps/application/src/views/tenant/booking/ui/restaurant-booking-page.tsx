"use client";

import { useRestaurantByDomain } from "@/entities/restaurant";
import { TenantFooter } from "@/widgets/tenant-footer";
import {
  RestaurantAbout,
  RestaurantBookingInfo,
  RestaurantContacts,
  RestaurantGallery,
  RestaurantHero,
  RestaurantMenu,
  RestaurantNavigation,
  RestaurantReviews,
} from "@/widgets/tenant-restaurant";

import { RestaurantNotFound } from "./restaurant-not-found";
import { RestaurantSkeleton } from "./restaurant-skeleton";

interface RestaurantBookingPageProps {
  domain: string;
}

export function RestaurantBookingPage({ domain }: RestaurantBookingPageProps) {
  const { data: restaurant, isLoading } = useRestaurantByDomain(domain);

  if (isLoading) {
    return <RestaurantSkeleton />;
  }

  if (!restaurant) {
    return <RestaurantNotFound />;
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
      <TenantFooter restaurantName={restaurant.name} />
    </div>
  );
}

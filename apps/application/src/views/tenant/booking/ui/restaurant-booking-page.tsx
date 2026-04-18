"use client";

import { useRestaurantByDomain } from "@/entities/restaurant";
import {
  RestaurantAbout,
  RestaurantBookingInfo,
  RestaurantContacts,
  RestaurantExperience,
  RestaurantGallery,
  RestaurantHero,
  RestaurantMenu,
  RestaurantNavigation,
  RestaurantReviews,
  TenantFooter,
} from "@/widgets/tenant";

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
    <div className="relative min-h-screen overflow-hidden bg-[#070709] text-white [--tenant-accent:#f4e3cb] [--tenant-accent-strong:#faecd9] [--tenant-border:rgba(255,255,255,0.12)] [--tenant-muted:rgba(255,255,255,0.7)] [--tenant-muted-soft:rgba(255,255,255,0.44)] [--tenant-panel:rgba(255,255,255,0.06)] [--tenant-panel-strong:rgba(14,11,8,0.72)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[-18rem] top-[-8rem] h-[32rem] w-[32rem] rounded-full bg-[#f4e3cb]/12 blur-3xl" />
        <div className="absolute right-[-10rem] top-[18rem] h-[28rem] w-[28rem] rounded-full bg-[#b97d4b]/12 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top,rgba(244,227,203,0.18),transparent_52%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.14] [mask-image:radial-gradient(circle_at_center,white,transparent_82%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(7,7,9,0.08),rgba(7,7,9,0.78)_38%,#070709_100%)]" />
      </div>

      <div className="relative">
        <RestaurantNavigation restaurant={restaurant} />
        <RestaurantHero restaurant={restaurant} />
        <RestaurantAbout restaurant={restaurant} />
        <RestaurantExperience restaurant={restaurant} />
        {restaurant.showMenu && restaurant.menuHighlights.length > 0 ? (
          <RestaurantMenu restaurant={restaurant} />
        ) : null}
        {restaurant.showGallery && restaurant.gallery.length > 0 ? (
          <RestaurantGallery restaurant={restaurant} />
        ) : null}
        {restaurant.showReviews && restaurant.reviews.length > 0 ? (
          <RestaurantReviews restaurant={restaurant} />
        ) : null}
        <RestaurantBookingInfo restaurant={restaurant} />
        <RestaurantContacts restaurant={restaurant} />
        <TenantFooter restaurantName={restaurant.name} />
      </div>
    </div>
  );
}

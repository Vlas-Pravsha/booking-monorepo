"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";

interface RestaurantNavigationProps {
  restaurant: Restaurant;
}

export function RestaurantNavigation({
  restaurant,
}: RestaurantNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleToggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const navigationItems = [
    { id: "hero", label: "Головна" },
    { id: "about", label: "Про заклад" },
    { id: "experience", label: "Досвід" },
    ...(restaurant.showMenu && restaurant.menuHighlights.length > 0
      ? [{ id: "menu", label: "Меню" }]
      : []),
    ...(restaurant.showGallery && restaurant.gallery.length > 0
      ? [{ id: "gallery", label: "Галерея" }]
      : []),
    ...(restaurant.showReviews && restaurant.reviews.length > 0
      ? [{ id: "reviews", label: "Відгуки" }]
      : []),
    { id: "booking", label: "Бронювання" },
    { id: "contacts", label: "Контакти" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[1.9rem] border border-[color:var(--tenant-border)] bg-[color:var(--tenant-panel-strong)] px-4 py-3 shadow-[0_28px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-2xl lg:px-5">
        <div className="min-w-0">
          <p className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#f4e3cb]/72">
            {restaurant.cuisine}
          </p>
          <p className="truncate font-display text-base font-semibold tracking-[-0.03em] text-white">
            {restaurant.name}
          </p>
        </div>

        <nav className="hidden items-center gap-2 rounded-full border border-white/6 bg-white/[0.03] px-2 py-2 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-4 py-2 text-sm text-white/62 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#booking"
            className="hidden items-center gap-2 rounded-full border border-[#f4e3cb]/45 bg-[#f4e3cb] px-4 py-2 text-sm font-semibold text-[#17120d] transition-all hover:bg-[#faecd9] lg:inline-flex"
          >
            Забронювати
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={handleToggleMenu}
            className="rounded-full border border-white/10 bg-white/[0.03] p-2 lg:hidden"
            aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-[color:var(--tenant-border)] bg-[color:var(--tenant-panel-strong)] p-4 shadow-[0_28px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-2xl lg:hidden">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-2xl border border-transparent px-3 py-3 text-white/70 transition-colors hover:border-white/8 hover:bg-white/[0.04] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

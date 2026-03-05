"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import * as React from "react";

interface RestaurantNavigationProps {
  restaurantName: string;
}

export function RestaurantNavigation({
  restaurantName,
}: RestaurantNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      {/* Floating Sidebar Navigation */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {[
          { id: "hero", label: "Головна" },
          { id: "about", label: "Про" },
          { id: "menu", label: "Меню" },
          { id: "gallery", label: "Фото" },
          { id: "reviews", label: "Відгуки" },
          { id: "booking", label: "Бронь" },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-center gap-3"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-white/10 group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </span>
            <span className="text-sm text-white/0 group-hover:text-white/80 transition-all opacity-0 group-hover:opacity-100 whitespace-nowrap">
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-semibold">{restaurantName}</span>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="px-4 pb-4 space-y-2">
            {["hero", "about", "menu", "gallery", "reviews", "booking"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-white/60"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              )
            )}
          </div>
        )}
      </header>
    </>
  );
}

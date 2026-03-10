import {
  CalendarDays,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";

interface RestaurantContactsProps {
  restaurant: Restaurant;
}

export function RestaurantContacts({ restaurant }: RestaurantContactsProps) {
  return (
    <section id="contacts" className="py-20 lg:py-32 px-4 lg:px-6 bg-[#0c0c0e]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {[
            { icon: MapPin, label: "Адреса", value: restaurant.address },
            {
              href: `tel:${restaurant.phone}`,
              icon: Phone,
              label: "Телефон",
              value: restaurant.phone,
            },
            {
              href: `mailto:${restaurant.email}`,
              icon: Mail,
              label: "Email",
              value: restaurant.email,
            },
            {
              icon: CalendarDays,
              label: "Години",
              value: restaurant.workHours,
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group bg-[#09090b] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                <item.icon className="w-5 h-5 text-white/40" />
              </div>
              <p className="text-xs text-white/40 mb-1">{item.label}</p>
              <p className="text-sm font-medium truncate">{item.value}</p>
            </a>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 mt-12">
          {restaurant.socialLinks?.instagram && (
            <a
              href={restaurant.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Instagram className="w-5 h-5 text-white/60" />
            </a>
          )}
          {restaurant.socialLinks?.facebook && (
            <a
              href={restaurant.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Facebook className="w-5 h-5 text-white/60" />
            </a>
          )}
          {restaurant.socialLinks?.telegram && (
            <a
              href={restaurant.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-white/60" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

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

import { RestaurantSectionHeading } from "./restaurant-section-heading";

interface RestaurantContactsProps {
  restaurant: Restaurant;
}

export function RestaurantContacts({ restaurant }: RestaurantContactsProps) {
  const contactItems = [
    { icon: MapPin, label: "Адреса", value: restaurant.address },
    {
      href: `tel:${restaurant.phone}`,
      icon: Phone,
      label: "Телефон",
      value: restaurant.phone,
    },
    restaurant.email
      ? {
          href: `mailto:${restaurant.email}`,
          icon: Mail,
          label: "Email",
          value: restaurant.email,
        }
      : null,
    {
      icon: CalendarDays,
      label: "Години",
      value: restaurant.workHours,
    },
  ].filter(
    (
      item
    ): item is {
      href?: string;
      icon: typeof MapPin | typeof Phone | typeof Mail | typeof CalendarDays;
      label: string;
      value: string;
    } => item !== null
  );

  return (
    <section
      id="contacts"
      className="bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.04))] px-4 py-20 lg:px-6 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <RestaurantSectionHeading
            eyebrow="Контакти"
            title="Приходьте в гості або зв’яжіться з нами напряму"
            description="Адреса, графік, телефон і соціальні мережі зібрані в одному місці, щоб рішення про візит займало менше часу."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {contactItems.map((item) => (
            <div
              key={item.label}
              className="group rounded-[2rem] border border-[color:var(--tenant-border)] bg-[rgba(12,12,14,0.86)] p-5 shadow-[0_24px_64px_-42px_rgba(0,0,0,0.95)] transition-all duration-300 hover:-translate-y-1 hover:border-white/18"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4e3cb]/12 transition-colors group-hover:bg-[#f4e3cb]/18">
                <item.icon className="h-5 w-5 text-[#f4e3cb]" />
              </div>
              <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#f4e3cb]/72">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm font-medium text-white transition-colors hover:text-[#f4e3cb]"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm font-medium text-white">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          {restaurant.socialLinks?.instagram && (
            <a
              href={restaurant.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04] transition-colors hover:bg-white/[0.08]"
            >
              <Instagram className="h-5 w-5 text-white/60" />
            </a>
          )}
          {restaurant.socialLinks?.facebook && (
            <a
              href={restaurant.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04] transition-colors hover:bg-white/[0.08]"
            >
              <Facebook className="h-5 w-5 text-white/60" />
            </a>
          )}
          {restaurant.socialLinks?.telegram && (
            <a
              href={restaurant.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04] transition-colors hover:bg-white/[0.08]"
            >
              <MessageCircle className="h-5 w-5 text-white/60" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

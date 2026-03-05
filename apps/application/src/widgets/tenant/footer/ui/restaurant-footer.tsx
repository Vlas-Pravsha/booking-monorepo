"use client";

import { Clock, Facebook, Instagram, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import type { Restaurant } from "@/entities/restaurant";

interface RestaurantFooterProps {
  restaurant: Restaurant;
}

export function RestaurantFooter({ restaurant }: RestaurantFooterProps) {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-800 pb-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white">
              {restaurant.name}
            </h3>
            <p className="text-slate-400 max-w-xs">{restaurant.description}</p>
            <div className="flex gap-4">
              <Link
                href="/"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold">Контакти</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>{restaurant.address}</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>{restaurant.phone}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold">Години роботи</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>{restaurant.workHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>
            ©{new Date().getFullYear()} {restaurant.name}. Всі права захищено.
          </p>
          <div className="flex gap-8">
            <Link href="/" className="hover:text-white transition-colors">
              Політика конфіденційності
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Публічна оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

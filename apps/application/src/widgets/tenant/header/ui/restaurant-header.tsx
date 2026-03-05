"use client";

import { Menu, Utensils } from "lucide-react";
import * as React from "react";

import { Button } from "@/shared/ui/button";

interface RestaurantHeaderProps {
  name: string;
}

export function RestaurantHeader({ name }: RestaurantHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-100">
            <Utensils className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">
            {name}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors"
          >
            Головна
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors"
          >
            Меню
          </a>
          <a href="#" className="text-sm font-semibold text-orange-600">
            Бронювання
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors"
          >
            Контакти
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <Button className="hidden sm:flex bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 h-10 font-bold">
            Подзвонити
          </Button>
        </div>
      </div>
    </header>
  );
}

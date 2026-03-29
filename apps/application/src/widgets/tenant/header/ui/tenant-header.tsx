"use client";

import { Menu, Utensils } from "lucide-react";
import Link from "next/link";

import { surfaceClassNames } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

interface TenantHeaderProps {
  name: string;
}

interface NavigationItem {
  href: string;
  isActive: boolean;
  label: string;
}

const navigationItems: NavigationItem[] = [
  { href: "/", isActive: false, label: "Головна" },
  { href: "/", isActive: false, label: "Меню" },
  { href: "/", isActive: true, label: "Бронювання" },
  { href: "/", isActive: false, label: "Контакти" },
];

export function TenantHeader({ name }: TenantHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Utensils className="h-6 w-6" />
          </div>
          <span className="text-xl font-black tracking-tight text-foreground">
            {name}
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-semibold transition-colors",
                item.isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Button
            className={cn(
              surfaceClassNames.actionButton,
              "hidden h-10 rounded-xl px-6 font-bold sm:flex"
            )}
          >
            Подзвонити
          </Button>
        </div>
      </div>
    </header>
  );
}

import { LayoutDashboard, Settings } from "lucide-react";

import type { AuthMenuAction } from "../model/types";

export const NAVIGATION_LINKS = [
  { href: "#features", name: "Можливості" },
  { href: "#how-it-works", name: "Як це працює" },
  { href: "#pricing", name: "Тарифи" },
  { href: "#contact", name: "Контакти" },
] as const;

export const GUEST_CTA = {
  href: "/register",
  label: "Почати безкоштовно",
} as const;

export const AUTH_MENU_ACTIONS: readonly AuthMenuAction[] = [
  {
    href: "/admin",
    icon: LayoutDashboard,
    label: "Відкрити кабінет",
  },
  {
    href: "/onboarding",
    icon: Settings,
    label: "Налаштувати ресторан",
  },
];

"use client";

import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import type { ComponentType } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  clearSession,
  selectAuthSession,
  useLogoutMutation,
} from "@/features/auth/session";
import { cn } from "@/shared/lib/utils";

interface NavItem {
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  {
    description: "Ключові метрики дня",
    href: "/admin",
    icon: LayoutDashboard,
    title: "Дашборд",
  },
  {
    description: "Черга бронювань і статуси",
    href: "/admin/bookings",
    icon: CalendarDays,
    title: "Бронювання",
  },
  {
    description: "План залу та місця",
    href: "/admin/tables",
    icon: UtensilsCrossed,
    title: "Столи",
  },
  {
    description: "Клієнтська база",
    href: "/admin/customers",
    icon: Users,
    title: "Клієнти",
  },
  {
    description: "Налаштування ресторану",
    href: "/admin/settings",
    icon: Settings,
    title: "Налаштування",
  },
];

const isNavItemActive = (pathname: string, href: string) => {
  if (href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

interface SidebarNavItemProps extends NavItem {
  isActive: boolean;
}

function SidebarNavItem({
  href,
  icon: Icon,
  title,
  isActive,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      {title}
    </Link>
  );
}

export interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const session = useAppSelector(selectAuthSession);
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    if (!session?.refreshToken) {
      dispatch(clearSession());
      router.replace("/login");
      return;
    }

    logoutMutation.mutate(session.refreshToken, {
      onSettled: () => {
        dispatch(clearSession());
        toast.success("Сесію завершено");
        router.replace("/login");
      },
    });
  };

  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col border-r border-border/60 bg-card/60 px-4 py-6 shadow-[1px_0_0_0_rgba(0,0,0,0.05)] backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center gap-3 px-3 pb-8 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <UtensilsCrossed className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-foreground">
            TableReserve
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            Restaurant OS
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-auto px-1 py-2">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            {...item}
            isActive={isNavItemActive(pathname, item.href)}
          />
        ))}
      </nav>

      <div className="mt-auto px-1 pb-4 pt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger"
        >
          <LogOut className="h-5 w-5" />
          Вийти
        </button>
      </div>
    </aside>
  );
}

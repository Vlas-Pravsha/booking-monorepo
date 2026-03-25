"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentUser,
  selectIsAuthHydrated,
} from "@/features/auth/session";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";

const NAVIGATION_LINKS = [
  { href: "#features", name: "Можливості" },
  { href: "#how-it-works", name: "Як це працює" },
  { href: "#pricing", name: "Тарифи" },
  { href: "#contact", name: "Контакти" },
] as const;

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const targetId = href.replace("#", "");
  const element = document.querySelector(`#${targetId}`);

  if (element) {
    e.preventDefault();
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      behavior: "smooth",
      top: offsetPosition,
    });
  }
}

function HeaderActionPlaceholder() {
  return <div className="hidden h-9 w-40 rounded-full bg-muted/70 sm:block" />;
}

export function MarketingHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const isHydrated = useAppSelector(selectIsAuthHydrated);
  const primaryCta = currentUser
    ? { href: "/onboarding", label: "Продовжити онбординг" }
    : { href: "/register", label: "Почати безкоштовно" };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">
              TableReserve
              <span className="text-primary">.com</span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {NAVIGATION_LINKS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {isHydrated ? (
            <Button className="hidden sm:inline-flex" size="sm" asChild>
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
          ) : (
            <HeaderActionPlaceholder />
          )}

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Відкрити меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 sm:w-100">
                <SheetHeader>
                  <SheetTitle className="text-left">Навігація</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4">
                  {NAVIGATION_LINKS.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        setIsOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <Button className="mt-2 w-full" asChild>
                    <Link
                      href={primaryCta.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {primaryCta.label}
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

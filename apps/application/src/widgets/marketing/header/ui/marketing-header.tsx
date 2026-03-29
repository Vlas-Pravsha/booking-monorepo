"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";

import {
  AUTH_MENU_ACTIONS,
  GUEST_CTA,
  NAVIGATION_LINKS,
} from "../config/header-menu";
import { handleNavClick } from "../lib/navigation";
import { useMarketingHeaderAuth } from "../model/use-marketing-header-auth";
import { AuthenticatedUserMenu } from "./authenticated-user-menu";
import { HeaderActionPlaceholder } from "./header-action-placeholder";
import { MobileMenuActions } from "./mobile-menu-actions";

export function MarketingHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { currentUser, handleLogout, isHydrated } = useMarketingHeaderAuth();

  const closeMobileMenu = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const hydratedHeaderAction = currentUser ? (
    <AuthenticatedUserMenu
      actions={AUTH_MENU_ACTIONS}
      email={currentUser.email}
      firstName={currentUser.firstName}
      lastName={currentUser.lastName}
      onLogout={handleLogout}
    />
  ) : (
    <Button className="hidden sm:inline-flex" size="sm" asChild>
      <Link href={GUEST_CTA.href}>{GUEST_CTA.label}</Link>
    </Button>
  );

  const headerAction = isHydrated ? (
    hydratedHeaderAction
  ) : (
    <HeaderActionPlaceholder />
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
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
          {headerAction}

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
                        closeMobileMenu();
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <MobileMenuActions
                    actions={AUTH_MENU_ACTIONS}
                    currentUser={currentUser}
                    onClose={closeMobileMenu}
                    onLogout={handleLogout}
                  />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

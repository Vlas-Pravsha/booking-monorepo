"use client";

import { LayoutDashboard, LogOut, Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import type { AuthUser } from "@/features/auth/session";
import {
  clearSession,
  selectAuthSession,
  selectCurrentUser,
  selectIsAuthHydrated,
  useLogoutMutation,
} from "@/features/auth/session";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
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

const getDisplayName = (
  firstName: string | null | undefined,
  lastName: string | null | undefined,
  email: string | undefined
): string =>
  [firstName, lastName].filter(Boolean).join(" ").trim() ||
  email ||
  "Користувач";

const getInitials = (
  firstName: string | null | undefined,
  lastName: string | null | undefined,
  email: string | undefined
): string => {
  const nameParts = [firstName, lastName].filter(Boolean);

  if (nameParts.length > 0) {
    return nameParts
      .map((part) => part?.trim().charAt(0).toUpperCase() ?? "")
      .join("")
      .slice(0, 2);
  }

  return email?.trim().charAt(0).toUpperCase() || "U";
};

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

function AuthActionPlaceholder() {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <div className="h-9 w-20 rounded-full bg-muted/70" />
      <div className="h-9 w-9 rounded-full bg-muted/70" />
    </div>
  );
}

const getUserIdentity = (currentUser: AuthUser | undefined) => ({
  displayName: getDisplayName(
    currentUser?.firstName,
    currentUser?.lastName,
    currentUser?.email
  ),
  initials: getInitials(
    currentUser?.firstName,
    currentUser?.lastName,
    currentUser?.email
  ),
  isAuthenticated: Boolean(currentUser),
});

interface SharedAuthActionsProps {
  displayName: string;
  email?: string;
  initials: string;
  isAuthenticated: boolean;
  isHydrated: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
}

interface MarketingHeaderAuthState extends SharedAuthActionsProps {
  currentUser: AuthUser | undefined;
  handleLogout: () => void;
}

function useMarketingHeaderAuth(): MarketingHeaderAuthState {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authSession = useAppSelector(selectAuthSession);
  const currentUser = useAppSelector(selectCurrentUser);
  const isHydrated = useAppSelector(selectIsAuthHydrated);
  const logoutMutation = useLogoutMutation();
  const userIdentity = getUserIdentity(currentUser);

  const handleLogout = () => {
    const refreshToken = authSession?.refreshToken;

    if (!refreshToken) {
      dispatch(clearSession());
      router.replace("/login");
      return;
    }

    logoutMutation.mutate(refreshToken, {
      onSettled: () => {
        dispatch(clearSession());
        toast.success("Сесію завершено");
        router.replace("/login");
      },
    });
  };

  return {
    ...userIdentity,
    currentUser,
    handleLogout,
    isHydrated,
    isLoggingOut: logoutMutation.isPending,
    onLogout: handleLogout,
  };
}

interface UserMenuProps {
  displayName: string;
  email?: string;
  initials: string;
  isLoggingOut: boolean;
  onLogout: () => void;
}

function UserMenu({
  displayName,
  email,
  initials,
  isLoggingOut,
  onLogout,
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/80 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Меню профілю"
        >
          <Avatar className="h-9 w-9 border border-primary/10">
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="space-y-1">
          <p className="truncate text-sm font-semibold">{displayName}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin">
            <LayoutDashboard className="h-4 w-4" />
            Адмін-панель
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/onboarding">
            <Sparkles className="h-4 w-4" />
            Онбординг
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-danger focus:text-danger"
          disabled={isLoggingOut}
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? "Виходимо..." : "Вийти"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DesktopAuthActions({
  displayName,
  email,
  initials,
  isAuthenticated,
  isHydrated,
  isLoggingOut,
  onLogout,
}: SharedAuthActionsProps) {
  if (isHydrated) {
    if (isAuthenticated) {
      return (
        <div className="hidden items-center sm:flex">
          <UserMenu
            displayName={displayName}
            email={email}
            initials={initials}
            isLoggingOut={isLoggingOut}
            onLogout={onLogout}
          />
        </div>
      );
    }

    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Увійти</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/register">Спробувати</Link>
        </Button>
      </div>
    );
  }

  return <AuthActionPlaceholder />;
}

interface MobileAuthActionsProps extends SharedAuthActionsProps {
  onClose: () => void;
}

function MobileAuthActions({
  displayName,
  email,
  initials,
  isAuthenticated,
  isHydrated,
  isLoggingOut,
  onClose,
  onLogout,
}: MobileAuthActionsProps) {
  if (!isHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Link
          href="/login"
          className="text-lg font-medium transition-colors hover:text-primary"
          onClick={onClose}
        >
          Увійти
        </Link>
        <Button className="mt-2 w-full" asChild onClick={onClose}>
          <Link href="/register">Почати безкоштовно</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 border border-primary/10">
            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
      </div>

      <Link
        href="/admin"
        className="text-lg font-medium transition-colors hover:text-primary"
        onClick={onClose}
      >
        Адмін-панель
      </Link>
      <Link
        href="/onboarding"
        className="text-lg font-medium transition-colors hover:text-primary"
        onClick={onClose}
      >
        Онбординг
      </Link>
      <Button
        type="button"
        variant="outline"
        className="mt-2 w-full justify-start"
        disabled={isLoggingOut}
        onClick={() => {
          onClose();
          onLogout();
        }}
      >
        <LogOut className="h-4 w-4" />
        {isLoggingOut ? "Виходимо..." : "Вийти"}
      </Button>
    </>
  );
}

export function MarketingHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const authState = useMarketingHeaderAuth();

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
          <DesktopAuthActions
            displayName={authState.displayName}
            email={authState.currentUser?.email}
            initials={authState.initials}
            isAuthenticated={authState.isAuthenticated}
            isHydrated={authState.isHydrated}
            isLoggingOut={authState.isLoggingOut}
            onLogout={authState.handleLogout}
          />

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
                  <MobileAuthActions
                    displayName={authState.displayName}
                    email={authState.currentUser?.email}
                    initials={authState.initials}
                    isAuthenticated={authState.isAuthenticated}
                    isHydrated={authState.isHydrated}
                    isLoggingOut={authState.isLoggingOut}
                    onClose={() => setIsOpen(false)}
                    onLogout={authState.handleLogout}
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

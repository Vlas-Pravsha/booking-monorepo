"use client";

import { ShieldCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppSelector } from "@/app/store/hooks";

import {
  selectIsAuthenticated,
  selectIsAuthHydrated,
} from "../model/selectors";

interface AuthGuardProps {
  children: React.ReactNode;
  mode: "guest" | "protected";
}

function AuthLoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card/90 p-8 text-center shadow-xl backdrop-blur-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <ShieldCheck className="h-7 w-7 text-primary" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Перевіряємо сесію</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Підключаємо ваш обліковий запис і готуємо робочий простір.
        </p>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}

const getAuthRedirectPath = (
  mode: AuthGuardProps["mode"],
  isAuthenticated: boolean,
  pathname: string | null
) => {
  if (mode === "protected" && !isAuthenticated) {
    const nextPath = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
    return `/login${nextPath}`;
  }

  if (mode === "guest" && isAuthenticated) {
    return "/onboarding";
  }

  return null;
};

const shouldShowLoadingState = (
  mode: AuthGuardProps["mode"],
  isAuthenticated: boolean,
  isHydrated: boolean
) => {
  if (!isHydrated) {
    return true;
  }

  if (mode === "protected") {
    return !isAuthenticated;
  }

  return isAuthenticated;
};

export function AuthGuard({ children, mode }: AuthGuardProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isHydrated = useAppSelector(selectIsAuthHydrated);
  const pathname = usePathname();
  const router = useRouter();
  const redirectPath = getAuthRedirectPath(mode, isAuthenticated, pathname);

  useEffect(() => {
    if (isHydrated && redirectPath) {
      router.replace(redirectPath);
    }
  }, [isHydrated, redirectPath, router]);

  if (shouldShowLoadingState(mode, isAuthenticated, isHydrated)) {
    return <AuthLoadingState />;
  }

  return children;
}

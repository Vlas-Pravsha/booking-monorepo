"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import {
  clearSession,
  useAuthCurrentUser,
  useAuthSession,
  useIsAuthHydrated,
  useLogoutMutation,
} from "@/features/auth/session";
import { useAppDispatch } from "@/shared/lib/store";

export function useMarketingHeaderAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUser = useAuthCurrentUser();
  const session = useAuthSession();
  const isHydrated = useIsAuthHydrated();
  const logoutMutation = useLogoutMutation();

  const handleLogout = React.useCallback(() => {
    if (!session?.refreshToken) {
      dispatch(clearSession());
      router.replace("/");
      return;
    }

    logoutMutation.mutate(session.refreshToken, {
      onSettled: () => {
        dispatch(clearSession());
        toast.success("Сесію завершено");
        router.replace("/");
      },
    });
  }, [dispatch, logoutMutation, router, session?.refreshToken]);

  return {
    currentUser: currentUser ?? null,
    handleLogout,
    isHydrated,
  };
}

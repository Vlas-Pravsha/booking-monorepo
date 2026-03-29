"use client";

import { useAppSelector } from "@/shared/lib/store";

import {
  selectAuthSession,
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsAuthHydrated,
} from "./selectors";

export function useAuthSession() {
  return useAppSelector(selectAuthSession);
}

export function useAuthCurrentUser() {
  return useAppSelector(selectCurrentUser);
}

export function useIsAuthenticated() {
  return useAppSelector(selectIsAuthenticated);
}

export function useIsAuthHydrated() {
  return useAppSelector(selectIsAuthHydrated);
}

export function useAuthAccessToken() {
  return useAppSelector((state) => state.auth.session?.accessToken ?? null);
}

"use client";

import { authSessionSchema } from "@booking/contracts/auth";

import type { AuthSession } from "./types";

const AUTH_SESSION_STORAGE_KEY = "table-reserve.auth.session";

const canUseStorage = (): boolean => typeof window !== "undefined";

export const readStoredAuthSession = (): AuthSession | null => {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return authSessionSchema.parse(JSON.parse(rawValue));
  } catch {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    return null;
  }
};

export const writeStoredAuthSession = (session: AuthSession | null): void => {
  if (!canUseStorage()) {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    AUTH_SESSION_STORAGE_KEY,
    JSON.stringify(session)
  );
};

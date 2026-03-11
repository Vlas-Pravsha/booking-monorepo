"use client";

import { z } from "zod";

import type { AuthSession } from "./types";

const AUTH_SESSION_STORAGE_KEY = "table-reserve.auth.session";

const authUserSchema = z.object({
  createdAt: z.string(),
  email: z.string().email(),
  firstName: z.string().nullable(),
  id: z.string().min(1),
  lastLoginAt: z.string().nullable(),
  lastName: z.string().nullable(),
  status: z.string().min(1),
  updatedAt: z.string(),
});

const authSessionSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  user: authUserSchema,
});

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

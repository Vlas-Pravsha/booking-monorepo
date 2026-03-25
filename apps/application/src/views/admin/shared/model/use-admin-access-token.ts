"use client";

import { useAppSelector } from "@/app/store/hooks";
import { selectAuthSession } from "@/features/auth/session";

export function useAdminAccessToken() {
  const session = useAppSelector(selectAuthSession);

  return session?.accessToken ?? null;
}

import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";

interface AuthUserState {
  createdAt: string;
  email: string;
  firstName: string | null;
  id: string;
  lastLoginAt: string | null;
  lastName: string | null;
  status: string;
  updatedAt: string;
}

interface AuthSessionState {
  accessToken: string;
  refreshToken: string;
  user: AuthUserState;
}

export interface AppState {
  auth: {
    isHydrated: boolean;
    session: AuthSessionState | null;
    status: "authenticated" | "guest";
  };
}

export type AppDispatch = Dispatch<UnknownAction>;

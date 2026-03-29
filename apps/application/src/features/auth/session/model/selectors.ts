import type { AppState } from "@/shared/lib/store";

export const selectAuthState = (state: AppState) => state.auth;

export const selectAuthSession = (state: AppState) => state.auth.session;

export const selectCurrentUser = (state: AppState) => state.auth.session?.user;

export const selectIsAuthenticated = (state: AppState) =>
  Boolean(state.auth.session?.accessToken);

export const selectIsAuthHydrated = (state: AppState) => state.auth.isHydrated;

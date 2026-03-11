import type { RootState } from "@/app/store";

export const selectAuthState = (state: RootState) => state.auth;

export const selectAuthSession = (state: RootState) => state.auth.session;

export const selectCurrentUser = (state: RootState) => state.auth.session?.user;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.session?.accessToken);

export const selectIsAuthHydrated = (state: RootState) => state.auth.isHydrated;

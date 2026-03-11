import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AuthSession, AuthUser } from "./types";

export interface AuthState {
  isHydrated: boolean;
  session: AuthSession | null;
  status: "authenticated" | "guest";
}

const initialState: AuthState = {
  isHydrated: false,
  session: null,
  status: "guest",
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    clearSession: (state) => {
      state.isHydrated = true;
      state.session = null;
      state.status = "guest";
    },
    hydrateSession: (state, action: PayloadAction<AuthSession | null>) => {
      state.isHydrated = true;
      state.session = action.payload;
      state.status = action.payload ? "authenticated" : "guest";
    },
    setSession: (state, action: PayloadAction<AuthSession>) => {
      state.isHydrated = true;
      state.session = action.payload;
      state.status = "authenticated";
    },
    updateUser: (state, action: PayloadAction<AuthUser>) => {
      if (!state.session) {
        return;
      }

      state.session.user = action.payload;
      state.status = "authenticated";
    },
  },
});

export const { clearSession, hydrateSession, setSession, updateUser } =
  authSlice.actions;

export const authReducer = authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    _base: (state: Record<string, unknown> = {}) => state,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

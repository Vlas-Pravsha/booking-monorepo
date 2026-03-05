# State Management Guide

This guide defines how to manage state in the **table-reserve.com** Smart Booking System using **Redux Toolkit** and **TanStack React Query**.

## 📐 General Principles

1.  **TanStack Query** for ALL **server state** (fetching, caching, syncing, updating data from the API).
2.  **Redux Toolkit** for complex **client state** (UI state, multi-step forms, global settings, non-persisted local storage).
3.  **React Hooks (`useState`, `useContext`)** for simple, local component state.
4.  **Zod** for data validation at the boundaries.
5.  **Strict Typing**: Store, actions, and queries must be fully typed.

## 🏗️ Technical Implementation

### TanStack React Query (Server State)

We use TanStack Query for:

- API calls (GET, POST, PUT, DELETE).
- Cache management and revalidation.
- Loading/Error states for async operations.

#### Custom Hooks

Encapsulate all queries/mutations in custom hooks within `entities` or `features`:

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";

export function useUser(userId: string) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => api.users.getById(userId),
    enabled: !!userId,
  });
}
```

### Redux Toolkit (Client State)

We use Redux for:

- Complex UI interactions (e.g., booking calendar wizard state).
- Cross-component client-only data.
- State that needs to be accessible globally but doesn't come from the server.

#### Slice Pattern

Follow the slice pattern in `entities` or `features`:

```typescript
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  sidebarOpen: boolean;
}

const initialState: UIState = {
  sidebarOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});
```

#### Store Configuration

The central store is located in `src/app/store.ts`.

### Persistence

- **Server State**: Persisted via TanStack Query's cache and server sync.
- **Client State**: Use `redux-persist` (if needed) or simple `localStorage` for cross-session UI state.

## 📁 Organization

- **Redux Slices**: In `entities/*/model/` or `features/*/model/`.
- **TanStack Query Hooks**: In `entities/*/api/` or `features/*/api/`.

## 🚨 Guidelines for Agent Developers

- **Don't Duplicate State**: If data is already in the server state (TanStack Query), don't copy it to Redux.
- **Use Selector Pattern**: Access Redux state using `useAppSelector` with typed selectors.
- **Actions as Events**: Dispatch actions that describe _what happened_, not _how to change the state_.

## 🧪 Verification Checklist

- [ ] Is server data managed by TanStack Query?
- [ ] Is global client state in Redux?
- [ ] Are all hooks/slices strictly typed?
- [ ] Are query keys consistent and predictable?
- [ ] Is there redundant state synchronization?

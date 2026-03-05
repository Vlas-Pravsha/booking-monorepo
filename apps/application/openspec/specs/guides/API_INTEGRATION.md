# API Integration Guide

This guide defines the architectural patterns for integrating the **table-reserve.com** Smart Booking System with its external backend using **TanStack React Query** and a centralized **API Client**.

## 📐 General Principles

1.  **TanStack Query** for ALL data fetching, caching, and mutations on the client.
2.  **Centralized API Layer**: All requests must go through the shared API client in `src/shared/api`.
3.  **No Server Actions**: Direct usage of `use server` or Next.js Server Actions for business logic is forbidden.
4.  **No Internal API Routes**: Do not use `src/app/api` for core business logic; use the external API.
5.  **Zod Validation**: Validate all request payloads and response data at the boundaries.
6.  **Strict Typing**: DTOs (Data Transfer Objects) must be strictly typed and shared via the API client.

## 🏗️ Technical Implementation

### Shared API Layer

All endpoints are defined and grouped in `src/shared/api/`. This layer acts as the single source of truth for communication with the backend.

- `src/shared/api/`
  - `index.ts`: The main API client instance (e.g., Axios or Fetch wrapper).
  - `base.ts`: Core configuration (base URL, interceptors for auth).
  - `modules/`: Domain-specific request definitions (e.g., `booking.ts`, `auth.ts`).

### TanStack Query (Fetching & Mutations)

We encapsulate API calls in custom hooks within FSD slices (`entities` or `features`).

#### Example: Query (Fetching Data)

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";

export function useBooking(id: string) {
  return useQuery({
    queryKey: ["bookings", id],
    queryFn: () => api.bookings.getById(id),
    enabled: !!id,
  });
}
```

#### Example: Mutation (Updating Data)

```typescript
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingDto) => api.bookings.create(data),
    onSuccess: () => {
      // Invalidate cache to trigger re-fetching
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
```

## 📁 Organization (FSD)

- **API Client Definitions**: `src/shared/api/`.
- **Query/Mutation Hooks**: `src/entities/*/api/` or `src/features/*/api/`.
- **DTOs & Types**: `src/shared/api/types/` or co-located with the module in `src/shared/api/modules/`.

## 🚨 Guidelines for Agent Developers

- **Always use the Client**: Never use `fetch` or `axios` directly in components.
- **Cache Invalidation**: Always invalidate relevant queries in `onSuccess` handlers of mutations.
- **Error Handling**: Use global interceptors for common errors (401, 500) and TanStack Query `isError` for UI-specific feedback.
- **Ukrainian Errors**: Ensure that the backend returns localized error messages or map codes to Ukrainian strings in the client.

## 🧪 Verification Checklist

- [ ] Are all requests handled by TanStack Query?
- [ ] Is there NO usage of `use server` or Server Actions?
- [ ] Is the shared API client used for all communication?
- [ ] Are all request/response types strictly defined?
- [ ] Is cache invalidation handled after every mutation?
- [ ] Is data validated with Zod at the API boundary?

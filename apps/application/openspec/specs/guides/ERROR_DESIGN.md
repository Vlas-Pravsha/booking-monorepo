# Error Design Guide

This guide defines how to classify, capture, and display errors consistently throughout the **table-reserve.com** Smart Booking System.

## 📐 General Principles

1.  **Strict Typing**: Errors must be well-defined with TypeScript types or classes.
2.  **No Swallowing**: Never catch an error without logging it or re-throwing it.
3.  **Human-Friendly**: User-facing errors **MUST** be in Ukrainian and actionable.
4.  **Security**: Avoid leaking sensitive server details in client-facing error messages.
5.  **Validation First**: Use [Zod](https://zod.dev/) for input and environment variable validation.

## 🏗️ Error Classification

We classify errors into four main categories:

| Category        | Description                                       | Handling Strategy                                      |
| --------------- | ------------------------------------------------- | ------------------------------------------------------ |
| **Validation**  | Incorrect input (forms, API requests).            | Zod schemas, React Hook Form, 400 Bad Request.         |
| **Auth**        | Unauthorized or unauthenticated access.           | Middleware, API interceptors, 401/403.                 |
| **Domain**      | Business logic violations (e.g., table occupied). | Specific DomainError classes, UI alerts, 409 Conflict. |
| **Operational** | DB down, network issues, 500 errors.              | Global error boundaries, Sentry (TBD), 500.            |

## 🏗️ Technical Implementation

### Zod Validation

Always define schemas in `entities` or `features`:

```typescript
import { z } from "zod";

export const BookingSchema = z.object({
  tableId: z.string().min(1, "Оберіть стіл"),
  date: z.date(),
  guests: z.number().min(1).max(20),
});
```

### API Mutations (Handling Errors)

When using mutations, handle errors either in `onError` or by wrapping the `mutationFn` in the shared API client:

```typescript
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { toast } from "@/shared/ui/toast"; // example

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: unknown) => api.bookings.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Бронювання успішно створено");
    },
    onError: (error: any) => {
      // Common practice: extract message from backend response
      const message =
        error.response?.data?.message || "Помилка при створенні бронювання";
      toast.error(message);
      console.error("Booking creation failed:", error);
    },
  });
}
```

### TanStack Query (Query Handlers)

Use global query cache handlers or component-level `isError`/`error` states for API errors:

```typescript
const { data, isError, error } = useQuery({
  queryKey: ["bookings"],
  queryFn: api.bookings.getAll,
});
```

## 🚨 Guidelines for Agent Developers

- **Log Everything**: Always use `console.error(err)` (or a logging service) in `catch` blocks or `onError` handlers.
- **Specific Errors**: Prefer mapping backend error codes to localized Ukrainian messages in the client or ensuring the backend handles it.
- **No Silent Failures**: If a task fails, report it clearly to the user.

## 🇺🇦 Localization of Errors

- **404**: "Сторінку не знайдено"
- **401**: "Будь ласка, авторизуйтесь"
- **403**: "Доступ заборонено"
- **500**: "Сталася системна помилка. Наші розробники вже працюють над цим."

## 🧪 Verification Checklist

- [ ] Are all API failures handled by TanStack Query or API interceptors?
- [ ] Are validation errors localized in Ukrainian?
- [ ] Does Zod handle all external inputs?
- [ ] Is sensitive info stripped from client-facing errors?
- [ ] Does the UI show clear, actionable feedback for errors?

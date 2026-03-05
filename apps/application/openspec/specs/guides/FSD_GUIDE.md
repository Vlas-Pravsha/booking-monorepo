# Feature-Sliced Design (FSD) Guide

This guide defines how to apply the **Feature-Sliced Design (FSD)** architecture in the **table-reserve.com** Smart Booking System.

## 📐 General Principles

1.  **Isolation**: Slices should be as independent as possible.
2.  **No Cross-Imports**: A slice in a layer cannot import from another slice in the same layer (e.g., `features/auth` cannot import from `features/booking`).
3.  **Upward Imports Forbidden**: A lower layer (e.g., `shared`) cannot import from a higher layer (e.g., `features`).
4.  **Public API**: Every slice must have an `index.ts` that acts as its public API. Only what is exported here can be used by other layers/slices.
5.  **Standard Structure**: Follow the standard internal structure for each slice (api, model, ui, lib).

## 🏗️ FSD Layers

| Layer        | Description                                              | Example                                       |
| ------------ | -------------------------------------------------------- | --------------------------------------------- |
| **App**      | Next.js App Router, global providers, store, styles.     | `src/app/store.ts`, `src/app/layout.tsx`      |
| **Views**    | Page-level compositions of widgets/features/entities.    | `src/views/home/`, `src/views/admin/`         |
| **Widgets**  | Composite UI blocks (Header, Sidebar, Booking calendar). | `src/widgets/header/`, `src/widgets/sidebar/` |
| **Features** | User-facing actions (Auth by email, Make reservation).   | `src/features/auth-by-email/`                 |
| **Entities** | Business domain entities (User, Booking, Restaurant).    | `src/entities/user/`, `src/entities/booking/` |
| **Shared**   | Reusable UI (shadcn), utils, hooks, config.              | `src/shared/ui/button.tsx`, `src/shared/lib/` |

## 📁 Slice Internal Structure

Each slice (except in `shared`) should follow this structure:

```
my-slice/
├── index.ts          # Public API (barrel export)
├── api/              # API calls, TanStack Query hooks, Server Actions
├── model/            # Redux slices, Zod schemas, types
├── ui/               # React components
└── lib/              # Utils, hooks specific to this slice
```

## 🚨 Cross-Import Rules (The Matrix)

- **App** can import from **everything**.
- **Views** can import from **Widgets**, **Features**, **Entities**, **Shared**.
- **Widgets** can import from **Features**, **Entities**, **Shared**.
- **Features** can import from **Entities**, **Shared**.
- **Entities** can import from **Shared**.
- **Shared** cannot import from **anything**.

## 🚨 Violation Fixes

- **Problem**: `features/booking` needs `features/auth` state.
- **Solution**: Move the shared logic to an **Entity** or pass it as props from a **View**.
- **Problem**: `entities/user` needs `shared/ui/button`.
- **Solution**: OK (downward import).
- **Problem**: `shared/lib/utils` needs `entities/user` type.
- **Solution**: Move the type to `shared/api/types` or `shared/model/types`.

## 🧪 Verification Checklist

- [ ] Does the slice have an `index.ts`?
- [ ] Are there any upward imports?
- [ ] Are there any cross-slice imports in the same layer?
- [ ] Is business logic separated from UI (api/model vs ui)?
- [ ] Are all imports using the `@/*` path alias?

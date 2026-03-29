# Gemini CLI Guide - Smart Booking System

This document provides architectural context, strict coding guidelines, and domain knowledge for Gemini CLI when collaborating on the **table-reserve.com** Smart Booking System.

## 🏢 Project Overview

A multi-tenant SaaS application designed to reduce restaurant no-shows and streamline table management using the **T3 Stack** and **Feature-Sliced Design (FSD)**.

- **Marketing (`table-reserve.com`):** Landing page for restaurant owners.
- **Admin (`app.table-reserve.com`):** Back-office for floor plans, bookings, and staff.
- **Tenant (`[restaurant].table-reserve.com`):** Customer-facing booking portal.
- **API (`api.table-reserve.com`):** External Core data processing layer.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org) with React 19
- **Language**: [TypeScript 5.8](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State**: [Redux Toolkit](https://redux-toolkit.js.org/) + [TanStack React Query](https://tanstack.com/query/latest)
- **Validation**: [Zod](https://zod.dev/) + [@t3-oss/env-nextjs](https://env.t3.gg/)
- **Architecture**: [Feature-Sliced Design (FSD)](https://feature-sliced.design/)

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENT (Next.js)                      │
│  React 19 + Redux Toolkit + TanStack Query                  │
│  Tailwind CSS 4 + shadcn/ui + Framer Motion                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ REST API / JSON
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (External API)                    │
│  Node.js / Express / NestJS (External Service)              │
│  Data persistence, Business Logic, Auth                     │
└─────────────────────────────────────────────────────────────┘
```

## 🚨 CRITICAL: DEVELOPMENT MANDATES 🚨

**This is a HARD REQUIREMENT. When implementing features:**

1. **FSD ADHERENCE**: Strictly follow Feature-Sliced Design. Do not cross-import between slices in the same layer.
2. **UKRAINIAN UI**: All user-facing text **MUST** be in Ukrainian.
3. **STRICT TYPING**: `any` is forbidden. Use `import type` for type-only imports.
4. **NO SERVER ACTIONS**: Use the centralized API client and TanStack Query for all mutations.
5. **NAMED EXPORTS**: Avoid default exports for components. Use function declarations.
6. **CODE STYLE**: No semicolons, single quotes, 2-space indentation.
7. **TENANT ISOLATION**: Ensure `[domain]` routing correctly identifies the current tenant for API calls.

## 📁 Project Structure

| Directory       | Description                                            |
| --------------- | ------------------------------------------------------ |
| `src/app/`      | Next.js App Router (Layouts, Pages, Providers, Store)  |
| `src/entities/` | Business domain entities (user, booking, restaurant)   |
| `src/features/` | User-facing features (auth-by-email, make-reservation) |
| `src/views/`    | Page-level components (composed of widgets/features)   |
| `src/shared/`   | Reusable UI (shadcn), utils, hooks, config, API client |
| `src/widgets/`  | Composite UI blocks (Header, Footer, Sidebar)          |

## 📖 Key Documentation

| File                     | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| [AGENTS.md](AGENTS.md)   | Detailed coding style, linting, and formatting rules |
| [README.md](README.md)   | Project initialization and general information       |
| `openspec/specs/guides/` | Detailed architectural and style guides              |

## 🛠️ Implementation Guidelines

### Feature-Sliced Design (FSD)

- **Entities**: Business logic and data models. (e.g., `src/entities/user`)
- **Features**: User actions that bring business value. (e.g., `src/features/auth-by-email`)
- **Widgets**: Large self-contained UI blocks. (e.g., `src/widgets/header`)
- **Shared**: Non-business-specific components and utils. (e.g., `src/shared/api`)

### API Integration

All communication with the backend must happen through the shared API client using **TanStack Query**. Direct usage of `fetch` or Next.js `use server` is not allowed.

### React Components

- Use **function declarations**: `export function Component() { ... }`
- Pattern for component files:

  ```tsx
  "use client";
  import type { ComponentProps } from "./types";
  import { cn } from "@/shared/lib/utils";

  export function MyComponent({ className }: ComponentProps) {
    return <div className={cn("base-class", className)}>...</div>;
  }
  ```

## ⚡ Quick Reference Commands

```bash
# Development
pnpm dev          # Start dev server with Turbopack
pnpm build        # Build for production
pnpm check        # Lint + Typecheck (MANDATORY before completion)

# Code Quality
pnpm lint:fix     # Auto-fix linting errors
pnpm format:write # Format with Prettier
pnpm typecheck    # Run TS compiler check
```

---

## 🤖 AI Interaction Guidelines

1. **Act as a Senior Peer**: Provide high-signal technical rationale.
2. **Surgical Changes**: Apply minimal, precise updates following FSD boundaries.
3. **Validation**: Always run `pnpm check` to verify your changes.
4. **No Chitchat**: Keep responses professional and concise.

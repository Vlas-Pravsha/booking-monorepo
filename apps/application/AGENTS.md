# AGENTS.md - Frontend Guide

## Project Overview

`apps/application` is the Next.js 16 frontend for the booking platform. It serves three product surfaces from one codebase:

- marketing site on the root domain
- admin interface on the admin subdomain
- tenant booking pages on restaurant subdomains

The frontend follows Feature-Sliced Design and uses a shared REST API client to talk to `apps/backend`.

## Tech Stack

- Framework: [Next.js 16 App Router](https://nextjs.org/docs/app)
- UI: [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- State: [TanStack Query](https://tanstack.com/query/latest) for server state, [Redux Toolkit](https://redux-toolkit.js.org/) for session/app state
- Forms and validation: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- Motion and polish: [Framer Motion](https://www.framer.com/motion/), `sonner`, `embla-carousel-react`
- Env validation: [@t3-oss/env-nextjs](https://env.t3.gg/)

## Architecture

```text
Next.js App Router
  -> proxy.ts rewrites root/admin/tenant domains
  -> route groups in src/app
  -> views/widgets/features/entities/shared (FSD)
  -> shared/api client
  -> backend REST API
```

Current routing model:

- `src/app/(marketing)` - landing pages
- `src/app/(auth)` - login, register, forgot password
- `src/app/(admin)` - admin pages mounted behind the admin subdomain rewrite
- `src/app/[domain]` - tenant-facing restaurant page resolved from subdomain rewrite
- `src/app/onboarding` - onboarding flow

`src/proxy.ts` is critical. It rewrites:

- `admin.<root-domain>` to `/admin/...`
- `<tenant>.<root-domain>` to `/<tenant>/...`

If you change routing, account for proxy behavior and tenant helpers in `src/shared/lib/tenant`.

## Source Structure

```text
src/
  app/
    (marketing)/
    (auth)/
    (admin)/
    [domain]/
    onboarding/
    providers/
    store/
    styles/
  entities/
    booking/
    customer/
    restaurant/
    table/
  features/
    auth/
    booking/
    contact/
  views/
    admin/
    auth/
    marketing/
    tenant/
  widgets/
    admin-sidebar/
    marketing-header/
    marketing-footer/
    tenant-header/
    tenant-footer/
    tenant-restaurant/
  shared/
    api/
    config/
    lib/
    ui/
```

FSD intent in this repo:

- `entities` define domain-shaped client models and entity-level API hooks
- `features` contain user actions and mutation flows
- `widgets` compose reusable page sections
- `views` assemble full screens/pages
- `shared` holds low-level UI, config, utilities, and the API client

## API Integration Rules

1. Use `src/shared/api` for HTTP calls. Do not scatter raw `fetch` calls across the app.
2. Put reusable query/mutation hooks close to the owning entity or feature.
3. Keep the backend response envelope intact. Current consumers expect `{ data: ... }`.
4. Authenticated requests must go through `getAuthHeaders`.
5. If you turn a mocked flow into a real one, wire the backend endpoint in the same task.

Current real API-backed areas:

- auth session lifecycle
- owner restaurant read/update
- admin bookings
- admin customers
- admin tables

Current mocked areas:

- marketing contact request
- tenant reservation submit
- forgot password

## Frontend Coding Rules

1. All user-facing copy must be in Ukrainian.
2. Prefer Server Components by default for route files and layout shells; add `'use client'` only when state, effects, browser APIs, or React Query hooks are needed.
3. Use function declarations and named exports for components and helpers. Next.js route files can use default exports where the framework requires them.
4. Use `import type` for type-only imports.
5. Reuse shared UI primitives from `src/shared/ui` before adding new component variants.
6. Keep slice boundaries clean. Shared code must not depend on features/views/widgets. Features should not reach into unrelated feature internals.
7. Preserve the existing `index.ts` re-export pattern at slice boundaries where it already exists.
8. Use `cn()` and existing layout primitives (`container`, `layout`, `surface-card`, `dashboard-shell`) instead of ad hoc wrappers.
9. Follow the repo formatter/linter conventions: no semicolons, single quotes in TS, concise comments only when needed.
10. Do not use Server Actions for product workflows in this app. Use the centralized API client and React Query mutations.

## State Management Conventions

- TanStack Query owns async server state, cache, and invalidation.
- Redux currently handles auth/session bootstrapping and app-level client state.
- Persisted auth data lives under `features/auth/session/model`.
- After successful mutations, invalidate or update the relevant query keys instead of forcing page reloads.

## Environment And Config

Important frontend env vars:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_ROOT_DOMAIN`
- `NEXT_PUBLIC_ADMIN_SUBDOMAIN`

`src/shared/config/env.ts` validates the public env contract. Keep it in sync with usage.

## Commands

From `apps/application`:

```bash
pnpm dev
pnpm build
pnpm start
pnpm preview
pnpm check-types
```

From the repo root:

```bash
pnpm dev
pnpm build
pnpm check
pnpm check-types
pnpm fix
```

## Validation Expectations

There is no established frontend test suite yet. Before finishing work, run at least:

```bash
pnpm --filter booking-system check-types
pnpm --filter booking-system build
```

If your change affects backend contracts, validate the backend too.

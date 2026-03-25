# AGENTS.md - Booking System Monorepo Guide

## Project Overview

This repository is a pnpm + Turborepo monorepo for a multi-tenant restaurant booking platform.

Current runtime applications live in `apps/`:

- `apps/application` - customer-facing, marketing, auth, onboarding, and admin UI
- `apps/backend` - REST API, authentication, restaurant/admin data access, and persistence

`packages/` is currently included in the workspace but does not contain active runtime packages yet.

## Architecture At A Glance

```text
Browser / tenant subdomain / admin subdomain
  -> Next.js 16 application (App Router, proxy-based subdomain rewrites)
  -> shared API client + TanStack Query / Redux on the frontend
  -> Hono REST API on the backend
  -> domain functions + Prisma
  -> SQLite database (Prisma migrations)
```

Important current nuance:

- Frontend and backend are separate apps, but they are tightly coupled.
- Real API-backed flows already exist for auth, restaurant owner data, admin bookings, admin customers, and admin tables.
- Some UX flows are still mocked on the frontend (`contact`, `make-reservation`, `forgot-password`). If you implement those features for real, update both apps together.

## Hard Requirements

1. Keep frontend and backend aligned. If a feature needs persistent data or a real workflow, do not stop at UI-only changes.
2. Do not run Docker commands. This repo uses Prisma + SQLite locally; container orchestration is not part of the workflow here.
3. Treat `apps/*` as the source of truth. Some top-level docs are older than the current implementation.
4. All user-facing UI copy must stay in Ukrainian unless the task explicitly says otherwise.
5. Use strict TypeScript. Avoid `any`, avoid unsafe casts, and prefer explicit types when they clarify intent.
6. Do not edit generated Prisma client files in `apps/backend/src/generated/prisma` manually.
7. Run validation before finishing work. There is no established test suite yet, so at minimum run the relevant typecheck/build commands.

## Prompting Expectations For This Repo

When working in this repository, always make the task explicit in four parts whenever possible:

- Goal - what feature, fix, or refactor is being requested
- Context - which apps, routes, docs, errors, or files matter
- Constraints - architecture rules, multi-tenant rules, Ukrainian UI copy, no Docker, generated-file boundaries
- Done when - which commands passed and what user-visible behavior changed

For review tasks, also load `code_review.md`.

## Workspace Structure

```text
apps/
  application/  Next.js frontend using Feature-Sliced Design
  backend/      Hono API with Prisma + SQLite
openspec/
  changes/      OpenSpec change history / archive
  specs/        OpenSpec specs (currently minimal)
.agents/
  local agent-related files
```

## Key Technology Choices

- Monorepo: [pnpm Workspaces](https://pnpm.io/workspaces), [Turborepo](https://turbo.build/repo)
- Frontend: [Next.js 16](https://nextjs.org/), [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [TanStack Query](https://tanstack.com/query/latest), [Redux Toolkit](https://redux-toolkit.js.org/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- Backend: [Hono](https://hono.dev/), [Zod](https://zod.dev/), [Prisma](https://www.prisma.io/), [SQLite](https://www.sqlite.org/), [JOSE](https://github.com/panva/jose), [Pino](https://getpino.io/)
- Validation / tooling: [TypeScript](https://www.typescriptlang.org/), [Ultracite](https://www.ultracite.ai/) via `oxlint` + `oxfmt`

## Development Commands

From the repository root:

```bash
pnpm dev          # Run all app dev tasks through Turbo
pnpm build        # Build workspace packages/apps through Turbo
pnpm check        # Ultracite check
pnpm check-types  # Type-check workspace apps through Turbo
pnpm fix          # Ultracite autofix
pnpm format       # Prettier for ts/tsx/md files
```

App-specific commands:

- Frontend guide: `apps/application/AGENTS.md`
- Backend guide: `apps/backend/AGENTS.md`
- Review checklist: `code_review.md`
- Repo skills: `.agents/skills/`

## Environment Summary

Frontend (`apps/application`):

- `NEXT_PUBLIC_API_URL` - base URL for backend requests
- `NEXT_PUBLIC_ROOT_DOMAIN` - used by tenant/admin subdomain helpers
- `NEXT_PUBLIC_ADMIN_SUBDOMAIN` - admin subdomain rewrite target

Backend (`apps/backend`):

- `DATABASE_URL`
- `PORT`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `ACCESS_TOKEN_TTL_MINUTES`
- `REFRESH_TOKEN_TTL_DAYS`
- `LOG_LEVEL`

## How To Work In This Repo

For frontend work:

- Read `apps/application/AGENTS.md`
- Respect Feature-Sliced Design boundaries
- Use the shared API client and entity/feature hooks

For backend work:

- Read `apps/backend/AGENTS.md`
- Keep routes thin and domain modules responsible for business rules
- Update Prisma schema, contracts, routes, and frontend consumers together when API shape changes

For cross-cutting features:

1. Define or update the backend contract first.
2. Implement backend domain and route changes.
3. Update frontend typed usage and UI state flow.
4. Validate both apps.

## Definition Of Done

Unless the task explicitly says otherwise, work is only done when:

1. The implementation matches the request across all affected layers.
2. Any mocked flow you touched is either kept intentionally mocked and documented, or upgraded to a real backend-backed implementation.
3. Relevant checks were run and reported.
4. The final diff was reviewed for regressions, tenant-routing issues, and API/frontend mismatch.

Minimum validation by area:

- Frontend-only: `pnpm --filter booking-system check-types` and `pnpm --filter booking-system build`
- Backend-only: `pnpm --filter @booking/backend check-types` and `pnpm --filter @booking/backend build`
- Full-stack: run both

## Review Guidance

For explicit reviews, use `code_review.md` as the repository review contract.

Prioritize:

- correctness and regressions
- frontend/backend contract drift
- tenant and subdomain routing issues
- auth/session edge cases
- Prisma schema or migration risks
- places where mocked frontend behavior hides missing backend work

## Repeatable Workflows

This repo keeps repeatable team workflows in `.agents/skills/`.

Current repo-specific skills:

- `booking-full-stack-change` - for changes that cross `apps/application` and `apps/backend`
- `booking-mock-to-api-rollout` - for replacing mocked frontend flows with real API-backed behavior

Use them when the task clearly matches instead of re-deriving the same checklist each time.

## Quality Bar

- Prefer small, surgical changes over broad rewrites.
- Preserve multi-tenant behavior: admin subdomain, tenant subdomain, and root marketing site each have distinct routing expectations.
- Keep API envelopes consistent. Existing backend responses use `{ data: ... }`; errors are normalized by the Hono error middleware.
- Reuse existing patterns before introducing new abstractions.
- If you find an older instruction that contradicts the current codebase, follow the codebase and update the documentation if part of your task.

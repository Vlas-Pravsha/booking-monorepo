# AGENTS.md - Backend Guide

## Project Overview

`apps/backend` is the REST API for the booking platform. It is a TypeScript service built with Hono and Prisma and currently uses SQLite for local persistence.

The backend is responsible for:

- authentication and session lifecycle
- owner restaurant profile data
- admin bookings, customers, and tables data
- request validation, auth middleware, and normalized API errors

## Tech Stack

- HTTP framework: [Hono](https://hono.dev/)
- Validation: [Zod](https://zod.dev/) with `@hono/zod-validator`
- ORM / database access: [Prisma](https://www.prisma.io/)
- Database: [SQLite](https://www.sqlite.org/) via `better-sqlite3`
- Auth / tokens: [JOSE](https://github.com/panva/jose)
- Password hashing: `@node-rs/argon2`
- Logging: [Pino](https://getpino.io/)
- Build / dev: `tsx`, `tsup`, TypeScript

## Backend Architecture

```text
Hono app
  -> global middleware (request id, request logger, Prisma, headers, CORS)
  -> route module
  -> request validation with Zod
  -> auth middleware for protected endpoints
  -> domain function
  -> Prisma reads/writes/selects/mappers
  -> SQLite
```

Current top-level API groups under `/api`:

- `/auth`
- `/restaurants`
- `/admin`

## Source Structure

```text
src/
  index.ts                  app wiring and middleware registration
  server.ts                 process entrypoint
  routes/
    auth.ts
    restaurants.ts
    admin.ts
  contracts/
    zod/
      auth.ts
      restaurant.ts
      admin.ts
  domains/
    user/
    restaurant/
    admin/
  core/
    api-error.ts
    logger.ts
    types.ts
    middlewares/
  database/
    client.ts
    selects/
  lib/
    env.ts
    prisma.ts
    auth/
    http/
  generated/prisma/         generated, do not edit manually
prisma/
  schema.prisma
  migrations/
  seed.ts
  dev.db
```

How responsibilities are split:

- `routes/` keeps HTTP handlers thin
- `contracts/zod/` defines and exports request validation schemas
- `domains/*` contains business logic, mapping, read/write helpers, and domain-specific utilities
- `core/` holds middleware, shared request types, and HTTP-level error/logging behavior
- `lib/` contains environment parsing, auth helpers, request metadata helpers, and Prisma bootstrapping
- `database/selects/` centralizes reusable Prisma select shapes

## Current Data Model

`prisma/schema.prisma` currently models:

- `User`
- `AuthSession`
- `Restaurant`
- `RestaurantFeature`
- `RestaurantMenuItem`
- `RestaurantReview`
- `RestaurantGalleryImage`
- `RestaurantTable`
- `Customer`
- `CustomerTag`
- `Booking`

The owner-to-restaurant relationship is one-to-one through `Restaurant.ownerId`.

## Backend Coding Rules

1. Keep route handlers thin. Put real logic in `domains/*`.
2. Validate all public input with Zod contracts before it reaches domain logic.
3. For request/response failures, use `ApiError` so the error middleware can preserve a consistent HTTP shape.
4. Preserve the current success envelope: route handlers return `{ data: ... }`.
5. Keep owner and restaurant scoping explicit. Admin operations must stay constrained to the authenticated owner's restaurant.
6. Reuse `selects`, `mappers`, `read`, and `write` modules instead of duplicating raw Prisma shapes.
7. Keep all direct Prisma/database queries inside domain `read.ts` or `write.ts` files. Do not place DB queries in `functions.ts`, route handlers, or other helpers.
8. Do not edit `src/generated/prisma` directly. Change `prisma/schema.prisma`, then regenerate if needed.
9. Keep auth concerns inside `lib/auth` and `core/middlewares/auth`, not scattered across route handlers.
10. Prefer explicit normalization helpers, such as restaurant domain normalization, instead of inlining format logic in many places.
11. Avoid introducing frontend-facing response shape changes without updating the frontend consumers in `apps/application`.

## Request Context And Middleware

Request context variables are defined in `src/core/types.ts` and currently include:

- `requestId`
- `prisma`
- `auth`

Global middleware order in `src/index.ts` matters:

1. request id
2. request logger
3. Prisma injection
4. secure headers
5. CORS

Protected routes use `authenticate`, which parses the bearer token, verifies it, and stores the auth identity on the Hono context.

## Contracts And API Stability

Existing contract patterns:

- auth payload schemas in `contracts/zod/auth.ts`
- restaurant upsert/domain schemas in `contracts/zod/restaurant.ts`
- admin mutation schemas in `contracts/zod/admin.ts`

If you change a contract:

1. update the Zod schema
2. update the domain logic
3. update route handlers if needed
4. update frontend types/hooks that consume the endpoint

## Prisma Workflow

From `apps/backend`:

```bash
pnpm dev
pnpm build
pnpm start
pnpm check-types
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:studio
```

Rules for schema work:

- edit `prisma/schema.prisma`
- create/update migrations through Prisma tooling
- keep generated client output in sync
- do not hand-edit migration history unless the task explicitly requires it

## Environment

Validated in `src/lib/env.ts`:

- `DATABASE_URL`
- `PORT`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `ACCESS_TOKEN_TTL_MINUTES`
- `REFRESH_TOKEN_TTL_DAYS`
- `LOG_LEVEL`
- `NODE_ENV`

Boot should fail fast if env validation fails.

## Validation Expectations

There is no established automated backend test suite yet. Before finishing backend work, run at least:

```bash
pnpm --filter @booking/backend check-types
pnpm --filter @booking/backend build
```

If you changed contracts or persistence, validate the frontend integration as well.

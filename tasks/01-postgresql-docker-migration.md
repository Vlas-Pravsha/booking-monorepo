# Task 01 — PostgreSQL + Docker Migration

## Мета

Мігрувати backend з SQLite на PostgreSQL, оновити Prisma 7 setup, додати Docker Compose для локальних сервісів і підготувати базу для production deploy.

Це full-stack/infrastructure задача, але основні зміни в `apps/backend`.

---

## Поточний стан

Актуальні файли:

- Prisma schema: `apps/backend/prisma/schema.prisma`
- Prisma bootstrap: `apps/backend/src/lib/prisma.ts`
- generated Prisma client: `apps/backend/src/generated/prisma`
- backend env validation: `apps/backend/src/lib/env.ts`
- backend package: `apps/backend/package.json`

Зараз backend використовує:

- `datasource db { provider = "sqlite" }`
- `@prisma/adapter-better-sqlite3`
- `better-sqlite3`
- generated Prisma client у `apps/backend/src/generated/prisma`

Це треба замінити на PostgreSQL-compatible Prisma setup без ручного редагування generated files.

---

## Чому PostgreSQL

- SQLite не підходить для concurrent writes у multi-tenant booking SaaS.
- PostgreSQL дає транзакції, row-level locks, advisory locks і стабільний production backup/restore.
- Booking creation потребує надійної перевірки overlap всередині transaction.
- AI analytics і heatmap потребують індексованих агрегувань.
- Production deploy простіший із managed PostgreSQL або PostgreSQL container.

---

## Docker Compose для локальних сервісів

Створити `docker-compose.yml` у root:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: booking
      POSTGRES_USER: booking
      POSTGRES_PASSWORD: booking_secret
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U booking -d booking"]
      interval: 5s
      timeout: 5s
      retries: 10

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 10

volumes:
  postgres_data:
  redis_data:
```

На цьому етапі достатньо Docker Compose для dependencies. Dockerfiles для application/backend можна залишити для Task 07, якщо локальна розробка запускається через `pnpm dev`.

---

## PostgreSQL init

Створити `docker/postgres/init.sql`:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;
```

Ці extensions потрібні для майбутнього fuzzy search клієнтів/ресторанів. Якщо managed provider не дозволяє extensions, task має мати fallback без них.

---

## Prisma schema changes

У `apps/backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}
```

`directUrl` потрібен для production setups з PgBouncer. У local dev `DIRECT_DATABASE_URL` може дорівнювати `DATABASE_URL`.

Перевірити індекси для hot paths:

```prisma
model Booking {
  @@index([restaurantId, startAt])
  @@index([restaurantId, deletedAt, startAt])
  @@index([restaurantId, status])
  @@index([tableId, deletedAt, startAt])
  @@index([customerId, startAt])
}

model Customer {
  @@index([restaurantId, createdAt])
  @@index([restaurantId, deletedAt, createdAt])
  @@index([restaurantId, vip])
}

model RestaurantTable {
  @@unique([restaurantId, position])
}
```

Для customer dedup у Task 06 може знадобитись додати normalized fields:

```prisma
normalizedEmail String?
normalizedPhone String?

@@index([restaurantId, normalizedEmail])
@@index([restaurantId, normalizedPhone])
```

Не додавати ці поля в Task 01, якщо dedup не реалізується одразу.

---

## Prisma client bootstrap

Оновити `apps/backend/src/lib/prisma.ts`:

- прибрати `PrismaBetterSqlite3`;
- прибрати `better-sqlite3` adapter config;
- створювати `new PrismaClient()` напряму або через PostgreSQL adapter, якщо цього вимагає поточна Prisma 7 конфігурація;
- залишити global singleton для dev hot reload;
- залишити Hono middleware `withPrisma`.

Очікувана форма:

```typescript
import "dotenv/config";
import type { MiddlewareHandler } from "hono";

import type { RequestContextVariables } from "../core/types";
import { PrismaClient } from "../generated/prisma/client.js";
import { env } from "./env";

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

const createPrismaClient = (): PrismaClient =>
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const withPrisma: MiddlewareHandler<{
  Variables: RequestContextVariables;
}> = async (c, next) => {
  if (!c.get("prisma")) {
    c.set("prisma", prisma);
  }

  await next();
};
```

Перед імплементацією перевірити актуальний Prisma 7 recommendation для PostgreSQL у цьому repo. Не редагувати generated client вручну.

---

## Dependencies

У `apps/backend/package.json`:

Прибрати:

```bash
pnpm --filter @booking/backend remove @prisma/adapter-better-sqlite3 better-sqlite3
```

Додати PostgreSQL dependency, якщо потрібна для Prisma 7 runtime:

```bash
pnpm --filter @booking/backend add pg
pnpm --filter @booking/backend add -D @types/pg
```

Якщо Prisma 7 setup вимагає driver adapter, додати рекомендований Prisma adapter для PostgreSQL замість `pg` direct usage.

---

## Environment

Backend `.env` / `.env.local`:

```bash
DATABASE_URL="postgresql://booking:booking_secret@localhost:5432/booking"
DIRECT_DATABASE_URL="postgresql://booking:booking_secret@localhost:5432/booking"
PORT=3001
JWT_ACCESS_SECRET="dev-access-secret-change-me"
JWT_REFRESH_SECRET="dev-refresh-secret-change-me"
ACCESS_TOKEN_TTL_MINUTES=15
REFRESH_TOKEN_TTL_DAYS=30
LOG_LEVEL=debug
NODE_ENV=development
```

Production:

```bash
DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require&connection_limit=10&pool_timeout=30"
DIRECT_DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
```

Оновити `apps/backend/src/lib/env.ts`, щоб `DIRECT_DATABASE_URL` була optional у dev або required тільки коли це потрібно production migration strategy.

---

## Migration Strategy

Для дипломного MWP без production даних:

```bash
docker compose up -d postgres
pnpm --filter @booking/backend prisma:migrate -- --name init_postgresql
pnpm --filter @booking/backend prisma:generate
```

Якщо треба перенести існуючий SQLite dev data:

1. Зробити backup `apps/backend/prisma/dev.db`.
2. Експортувати потрібні дані через seed або custom script.
3. Створити PostgreSQL migration.
4. Імпортувати seed/demo data.

Не переносити стару SQLite migration history у production як є. Для нового MWP простіше створити clean PostgreSQL initial migration.

---

## Backend Code Audit

Після зміни provider перевірити:

- date/time comparisons у booking overlap queries;
- `mode: "insensitive"` у Prisma filters, якщо додається;
- raw SQL, якщо з'явиться;
- enum mappings;
- generated imports з `../generated/prisma/...`;
- seed script.

---

## Validation

```bash
docker compose up -d postgres
pnpm --filter @booking/backend prisma:generate
pnpm --filter @booking/backend prisma:migrate -- --name init_postgresql
pnpm --filter @booking/backend check-types
pnpm --filter @booking/backend build
pnpm --filter @booking/contracts check-types
pnpm --filter booking-system check-types
```

Для повної перевірки:

```bash
pnpm build
```

---

## Rollback

Local dev:

```bash
docker compose down
docker volume rm booking-system_postgres_data
```

Production:

- перед migration зробити provider backup або `pg_dump`;
- запускати тільки `prisma migrate deploy`;
- rollback план має бути в Task 12.

---

## Done When

- Backend працює з PostgreSQL local container.
- SQLite adapter/dependencies прибрані.
- Prisma schema, generated client і `lib/prisma.ts` синхронізовані.
- `docker compose up -d postgres redis` стартує dependencies.
- Typecheck/build backend проходять.
- Existing auth/admin/public reservation flows не зламані.

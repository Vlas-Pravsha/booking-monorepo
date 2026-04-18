# Task 02 — Redis: Cache, Distributed Rate Limiting і Token Revocation

## Мета

Додати Redis як shared infrastructure для кешування hot reads, distributed rate limiting і token/session revocation across backend instances.

Поточний backend уже має rate limiting у `apps/backend/src/core/middlewares/rate-limit.ts`, але він in-memory через `hono-rate-limiter`. Ця задача не створює rate limiting з нуля, а мігрує його на Redis-backed behavior.

---

## Use Cases

| Use case                   |                        TTL | Key                                                       |
| -------------------------- | -------------------------: | --------------------------------------------------------- |
| Reservation availability   |                  30-60 сек | `avail:v1:{restaurantId}:{date}:{time}:{guests}`          |
| Public restaurant profile  |                       5 хв | `restaurant:pub:v1:{domain}`                              |
| AI recommendations summary |                      1 год | `ai:summary:v1:{restaurantId}`                            |
| Rate limiting              |             sliding window | `rl:{scope}:{ip}`                                         |
| Token/session blacklist    | until token/session expiry | `session:revoked:{jti}` або `session:revoked:{sessionId}` |

Важливо: cache keys мають використовувати `restaurantId`, коли він відомий, а не тільки domain. Domain може змінитися.

---

## Dependencies

```bash
pnpm --filter @booking/backend add ioredis
```

`@types/ioredis` не потрібен для сучасного `ioredis`, якщо типи вже bundled. Додавати тільки якщо TypeScript справді вимагає.

---

## Environment

Додати в backend env validation:

```bash
REDIS_URL="redis://localhost:6379"
REDIS_REQUIRED=false
```

Production:

```bash
REDIS_URL="rediss://..."
REDIS_REQUIRED=true
```

`REDIS_REQUIRED` допомагає явно визначити failure policy. Для локальної розробки Redis може бути optional, для production rate limiting/session revocation краще required.

---

## Redis Client

Створити `apps/backend/src/lib/redis.ts`:

```typescript
import Redis from "ioredis";

import { logger } from "../core/logger";
import { env } from "./env";

let redis: Redis | null = null;

export const getRedis = (): Redis => {
  if (!redis) {
    redis = new Redis(env.REDIS_URL, {
      enableReadyCheck: true,
      lazyConnect: true,
      maxRetriesPerRequest: 2,
    });

    redis.on("error", (error) => {
      logger.warn({ error }, "Redis connection error");
    });
  }

  return redis;
};

export const closeRedis = async (): Promise<void> => {
  if (redis) {
    await redis.quit();
    redis = null;
  }
};
```

Підключити graceful shutdown у backend server entrypoint разом із Prisma disconnect.

---

## Cache Helpers

Створити маленький helper у `apps/backend/src/lib/cache.ts`, щоб domain logic не дублювала JSON parse/stringify і Redis fallback.

Очікувана поведінка:

- cache read failure не ламає основний flow;
- cache write failure логиться warning і не ламає request;
- не кешувати exceptions;
- schema validation або typed parser на boundary, якщо кешуються frontend-facing responses.

---

## Availability Cache

Інтегрувати в:

- `apps/backend/src/domains/booking/functions.ts`
- `apps/backend/src/domains/booking/read.ts`
- `apps/backend/src/routes/public.ts`

Cache key:

```text
avail:v1:{restaurantId}:{date}:{time}:{guests}
```

Інвалідація після successful booking creation:

- видалити ключі availability для `restaurantId + date`;
- не використовувати `KEYS` у production;
- варіанти:
  - `SCAN` по prefix;
  - Redis set `avail:index:{restaurantId}:{date}` з переліком keys;
  - version key `avail:version:{restaurantId}:{date}`.

Рекомендований простий варіант для MWP:

```text
avail:version:{restaurantId}:{date} -> integer
avail:v{version}:{restaurantId}:{date}:{time}:{guests}
```

Після booking increment version:

```text
INCR avail:version:{restaurantId}:{date}
```

Так не треба сканувати ключі.

---

## Public Restaurant Profile Cache

Інтегрувати в restaurant read/domain layer, не в route handler.

Cache key:

```text
restaurant:pub:v1:{domain}
```

Інвалідація після:

- update restaurant settings;
- update menu;
- update gallery;
- update features/reviews;
- domain change.

Якщо domain змінюється, видалити старий і новий ключ.

---

## Redis-backed Rate Limiting

Оновити `apps/backend/src/core/middlewares/rate-limit.ts`.

Зберегти існуючі exports:

- `contactRequestRateLimiter`
- `reservationAvailabilityRateLimiter`
- `reservationCreateRateLimiter`

Додати для auth routes:

- login;
- register;
- forgot password;
- reset password;
- refresh token.

Алгоритм:

- sliding window через sorted set;
- key by `cf-connecting-ip`, `x-forwarded-for`, `x-real-ip`, fallback remote address;
- standard rate limit headers;
- error response через існуючу normalized shape.

Failure policy:

- якщо Redis недоступний у dev: fail-open + warning log;
- якщо `REDIS_REQUIRED=true`: fail-closed для sensitive auth endpoints або повертати `503`.

---

## Token / Session Revocation

Поточний backend має `AuthSession` у DB. Redis blacklist має бути додатковим прискоренням, а не єдиним джерелом правди.

При logout:

- revoke/delete DB session як зараз;
- додати Redis key до expiry.

При authenticate:

- перевірити JWT validity;
- перевірити Redis revoked key, якщо token має `jti`/session id;
- якщо Redis down, fallback до DB session check або існуючої DB-backed revocation logic.

Якщо поточні access tokens не мають `jti`, додати це окремою auth contract/internal change, не ламати frontend API.

---

## Validation

```bash
docker compose up -d redis
pnpm --filter @booking/backend check-types
pnpm --filter @booking/backend build
```

Manual smoke:

- зробити кілька availability запитів і перевірити cache hit у logs;
- створити booking і перевірити, що availability cache invalidated/version incremented;
- перевищити public rate limit і отримати 429;
- logout робить token/session unusable.

---

## Done When

- Redis client і graceful shutdown додані.
- Existing rate limit middleware переведений або адаптований під Redis.
- Availability/profile cache мають інвалідацію.
- Redis failure policy явно реалізований.
- Backend typecheck/build проходять.

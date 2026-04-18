# Smart Booking — Task Index

Технічні специфікації для реалізації MWP дипломного проєкту.

Ці задачі треба читати як implementation roadmap для поточного репозиторію, а не як абстрактні приклади. Реальна структура зараз така:

- frontend: `apps/application/src/app`, `entities`, `features`, `views`, `widgets`, `shared`
- backend: `apps/backend/src/routes`, `domains`, `contracts`, `core`, `lib`
- shared contracts: `packages/contracts/src`
- Prisma schema: `apps/backend/prisma/schema.prisma`
- generated Prisma client: `apps/backend/src/generated/prisma` — вручну не редагувати

Для будь-якої API-фічі порядок такий:

```text
packages/contracts
  -> apps/backend/src/contracts + routes + domains
  -> apps/application shared api + entities/features/views
  -> validation
```

---

## Пріоритети

### P0 — Підготовка і базова інфраструктура

| Файл                                      | Фіча                                                    | Складність | Залежності |
| ----------------------------------------- | ------------------------------------------------------- | ---------- | ---------- |
| [00](./00-project-docs-alignment.md)      | Актуалізація README, env і task roadmap                 | Низька     | —          |
| [01](./01-postgresql-docker-migration.md) | PostgreSQL + Docker local services                      | Висока     | 00         |
| [02](./02-redis-caching.md)               | Redis cache, distributed rate limiting, token blacklist | Середня    | 01         |
| [03](./03-s3-storage.md)                  | S3/R2 сховище для зображень і файлів                    | Середня    | 01         |

### P0 — Booking core і AI-фіча для MWP

| Файл                                      | Фіча                                                           | Складність | Залежності |
| ----------------------------------------- | -------------------------------------------------------------- | ---------- | ---------- |
| [06](./06-booking-engine-improvements.md) | Working hours, concurrency-safe booking, customer dedup, slots | Висока     | 01         |
| [05](./05-ai-discount-engine.md)          | AI Discount Engine                                             | Висока     | 01, 02, 06 |
| [08](./08-admin-ai-ui.md)                 | Admin UI для AI-аналітики                                      | Середня    | 05         |
| [09](./09-seed-data-demo.md)              | Seed дані і демо-сценарій                                      | Низька     | 01, 05, 06 |

### P0 — Якість і production readiness

| Файл                                | Фіча                                           | Складність | Залежності         |
| ----------------------------------- | ---------------------------------------------- | ---------- | ------------------ |
| [11](./11-testing-and-quality.md)   | Tests, smoke flows, CI validation              | Середня    | 01, 06             |
| [07](./07-production-deployment.md) | Production deploy і subdomains                 | Висока     | 01, 02, 03, 11     |
| [12](./12-production-hardening.md)  | Backups, observability, security hardening     | Середня    | 07                 |
| [13](./13-prometheus-metrics.md)    | Prometheus metrics для backend і business KPIs | Середня    | 07, 12             |
| [14](./14-application-security.md)  | Application security audit і hardening         | Висока     | 01, 02, 03, 06, 07 |

### P1 — Бажано, якщо лишається час

| Файл                                   | Фіча                               | Складність | Залежності |
| -------------------------------------- | ---------------------------------- | ---------- | ---------- |
| [04](./04-google-vision-menu-parse.md) | Google Vision: парсинг меню з фото | Середня    | 03         |
| [10](./10-email-delivery.md)           | Email delivery через Resend        | Низька     | 01         |

---

## Рекомендований порядок реалізації

```text
00 Project docs alignment
  ↓
01 PostgreSQL + Docker
  ↓
02 Redis  ←→  03 S3 Storage
  ↓
06 Booking engine improvements
  ↓
05 AI Discount Engine
  ↓
08 Admin AI UI
  ↓
09 Seed data + demo scenario
  ↓
11 Testing and quality
  ↓
07 Production deployment
  ↓
12 Production hardening
  ↓
14 Application security
  ↓
13 Prometheus metrics
  ↓
04 Google Vision (якщо є час)
10 Email delivery (можна робити раніше, якщо потрібен password reset/notifications)
```

---

## Технологічний стек

| Рівень                | Технологія                                                                   |
| --------------------- | ---------------------------------------------------------------------------- |
| Monorepo              | pnpm Workspaces, Turborepo                                                   |
| Frontend              | Next.js 16, App Router, React 19, TanStack Query, Redux Toolkit              |
| Backend               | Hono, Prisma 7, TypeScript                                                   |
| Contracts             | Shared Zod schemas in `packages/contracts`                                   |
| Database              | PostgreSQL 16                                                                |
| Cache / rate limiting | Redis 7 / Upstash Redis                                                      |
| Storage               | Cloudflare R2 / AWS S3-compatible storage                                    |
| AI explanations       | Anthropic Claude API, optional deterministic fallback                        |
| OCR                   | Google Cloud Vision                                                          |
| Email                 | Resend                                                                       |
| Primary deploy        | Vercel frontend + Railway backend/PostgreSQL + Upstash Redis + Cloudflare R2 |
| DNS/CDN               | Cloudflare                                                                   |
| CI/CD                 | GitHub Actions + provider deploy hooks                                       |

---

## Ключові архітектурні рішення

**PostgreSQL замість SQLite:** потрібні concurrent writes, транзакції, row-level locking/advisory locks, production backups і надійні індекси для booking/analytics.

**Redis:** кеш availability/profile reads, distributed rate limiting, session/token blacklist і майбутня event-driven інвалідація. Якщо Redis недоступний, кеш має деградувати без падіння основного booking flow; security-critical flows мають fail-closed або чітко описаний fallback.

**S3/R2:** великі файли йдуть напряму з браузера через presigned upload. Backend підтверджує ownership, тип, розмір і зберігає URL/key у БД.

**AI module:** для MWP достатньо deterministic demand analysis + rule-based discount recommendations. Claude можна використовувати для пояснень, але core recommendation logic має бути повторюваним і легко пояснюваним на захисті.

**Contracts-first:** кожна API-зміна починається з `packages/contracts`, щоб backend і frontend не роз'їхалися.

---

## Definition Of Done для кожної задачі

- Реалізація відповідає реальній структурі репозиторію.
- Оновлені `packages/contracts`, якщо змінився API shape.
- Frontend і backend узгоджені.
- User-facing copy українською.
- Немає ручних змін у `apps/backend/src/generated/prisma`.
- Запущені релевантні команди:

```bash
pnpm --filter @booking/contracts check-types
pnpm --filter @booking/contracts build
pnpm --filter @booking/backend check-types
pnpm --filter @booking/backend build
pnpm --filter booking-system check-types
pnpm --filter booking-system build
```

Для full-stack задач запускати всі релевантні команди або чітко пояснювати, чому якусь команду не запускали.

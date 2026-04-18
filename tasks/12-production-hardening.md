# Task 12 — Production Hardening

## Мета

Закрити production-ризики, які не є окремими продуктовими фічами, але потрібні для стабільного демо і безпечного запуску: backups, observability, secrets, CORS, health checks, rate limits і migration safety.

---

## Backups і Restore

PostgreSQL:

- налаштувати автоматичний daily backup у provider або `pg_dump`;
- зберігати мінімум 7 останніх backup snapshots;
- один раз перевірити restore у тимчасову БД;
- задокументувати restore-команди.

Приклад для self-managed/VPS:

```bash
pg_dump "$DATABASE_URL" > backups/booking-$(date +%F).sql
```

Для Railway/Supabase використовувати provider-native backups, якщо доступні.

---

## Migration Safety

Production migrations:

- запускати тільки `prisma migrate deploy`;
- не використовувати `migrate dev` у production;
- для destructive changes мати manual backup перед деплоєм;
- schema changes, які вимагають backfill, робити у два кроки:
  1. additive migration;
  2. code deploy/backfill;
  3. cleanup migration.

---

## Observability

Backend має логувати:

- `requestId`;
- method/path/status/duration;
- auth user id для protected endpoints, якщо доступний;
- restaurant id для admin/public booking operations, якщо доступний;
- structured error code.

Health endpoints:

- `/api/health` — lightweight liveness;
- `/api/health/ready` — readiness з перевіркою database і, якщо критично, Redis.

У production logs не можна писати:

- JWT tokens;
- refresh tokens;
- passwords/reset tokens;
- S3 secrets;
- full authorization headers.

---

## Security

Checklist:

- `JWT_ACCESS_SECRET` і `JWT_REFRESH_SECRET` довгі, різні, production-only;
- CORS дозволяє тільки production domains і preview domains за потреби;
- cookie/header policy перевірена для admin і tenant subdomains;
- rate limiting працює за реальним client IP behind Cloudflare/Railway/Vercel;
- Redis token blacklist або DB session revocation перевіряється в auth middleware;
- upload confirm перевіряє ownership S3 key;
- admin endpoints завжди scope by authenticated owner restaurant;
- no secrets in repo.

Детальний application security audit винесений у Task 14. Тут залишити тільки runtime/production checklist, який блокує небезпечний deploy.

---

## Redis Failure Policy

Для cache-only use cases:

- Redis down не має ламати read flow;
- fallback: DB query + warning log;
- не кешувати помилки.

Для rate limiting/session blacklist:

- вибрати fail-open або fail-closed явно;
- для дипломного MVP прийнятно fail-open для public rate limit з warning log;
- для token revocation краще мати DB-backed session revocation як fallback.

---

## Runtime Limits

Налаштувати:

- request body size limit для JSON і upload confirm endpoints;
- timeout для outbound AI/OCR/email requests;
- retry policy для email/storage/AI без дублювання booking creation;
- graceful shutdown backend process:
  - close Prisma;
  - close Redis;
  - stop accepting new requests.

---

## Done When

- Production env checklist заповнений.
- Backup і restore перевірені хоча б один раз.
- Health/readiness endpoints працюють.
- Logs містять request id і не містять secrets.
- CORS/rate limit/client IP behavior перевірені на production або staging.
- Є документований rollback plan для DB migrations і deploy.

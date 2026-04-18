# Task 07 — Production Deployment і Subdomain Architecture

## Мета

Задеплоїти frontend, backend і managed services у production/staging середовище, налаштувати root/admin/tenant subdomains, SSL, env, CI/CD і health checks.

Primary path для MWP: Vercel frontend + Railway backend/PostgreSQL + Upstash Redis + Cloudflare R2 + Cloudflare DNS.

VPS/Nginx варіант залишити як appendix/alternative, не змішувати з primary deploy.

---

## Production Architecture

```text
Cloudflare DNS
  -> root domain / admin subdomain / wildcard tenant subdomains
  -> Vercel Next.js frontend
       -> NEXT_PUBLIC_API_URL
       -> Railway Hono backend
            -> Railway/Supabase PostgreSQL
            -> Upstash Redis
            -> Cloudflare R2
```

Expected domains:

```text
yourdomain.com
admin.yourdomain.com
*.yourdomain.com
api.yourdomain.com
cdn.yourdomain.com
```

---

## Frontend Routing

Поточний frontend використовує proxy-based routing. Перевіряти й оновлювати існуючий файл:

```text
apps/application/src/proxy.ts
```

Не додавати паралельний `middleware.ts`, якщо поточний Next.js 16 setup уже використовує `proxy.ts`.

Requirements:

- root domain renders marketing;
- admin subdomain routes to admin app;
- tenant subdomain routes to tenant restaurant page;
- local dev supports localhost domain strategy documented in code/config;
- static assets and Next internals не переписуються.

---

## Vercel Setup

Environment:

```bash
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"
NEXT_PUBLIC_ROOT_DOMAIN="yourdomain.com"
NEXT_PUBLIC_ADMIN_SUBDOMAIN="admin"
```

Domains:

```text
yourdomain.com
admin.yourdomain.com
*.yourdomain.com
```

Build command:

```bash
pnpm --filter booking-system build
```

If Vercel builds from monorepo root, configure project root or install/build commands accordingly.

---

## Railway Backend

Backend env:

```bash
DATABASE_URL="postgresql://...?sslmode=require"
DIRECT_DATABASE_URL="postgresql://...?sslmode=require"
REDIS_URL="rediss://..."
REDIS_REQUIRED=true
PORT=3001
JWT_ACCESS_SECRET="..."
JWT_REFRESH_SECRET="..."
ACCESS_TOKEN_TTL_MINUTES=15
REFRESH_TOKEN_TTL_DAYS=30
LOG_LEVEL=info
NODE_ENV=production
APP_BASE_URL="https://yourdomain.com"
ADMIN_BASE_URL="https://admin.yourdomain.com"
S3_ENDPOINT="https://...r2.cloudflarestorage.com"
S3_ACCESS_KEY_ID="..."
S3_SECRET_ACCESS_KEY="..."
S3_BUCKET_NAME="booking-restaurants"
S3_PUBLIC_URL="https://cdn.yourdomain.com"
ANTHROPIC_API_KEY="..."
GOOGLE_CREDENTIALS_BASE64="..."
RESEND_API_KEY="..."
```

Dockerfile path:

```text
apps/backend/Dockerfile
```

Production start:

```bash
pnpm --filter @booking/backend build
pnpm --filter @booking/backend prisma migrate deploy
node apps/backend/dist/server.js
```

Actual Dockerfile must match current build output. Current backend package uses `node dist/server.js` in `start`.

---

## Health Checks

Backend routes:

```text
GET /api/health
GET /api/health/ready
```

`/api/health` can be lightweight.

`/api/health/ready` should check:

- database `SELECT 1`;
- Redis if `REDIS_REQUIRED=true`;
- no external AI/email/storage dependency required for readiness unless product depends on it at startup.

---

## CORS

Production CORS allowlist must include:

```text
https://yourdomain.com
https://admin.yourdomain.com
https://*.yourdomain.com
https://*.vercel.app (optional preview only)
```

Do not use wildcard `*` with credentials/auth headers in production.

---

## Cloudflare DNS

For Vercel/Railway primary path, use provider-required CNAME/A records, not VPS A records.

Example shape:

```text
CNAME  @      cname.vercel-dns.com
CNAME  admin  cname.vercel-dns.com
CNAME  *      cname.vercel-dns.com
CNAME  api    railway-generated-domain
CNAME  cdn    r2-public/custom-domain-target
```

Exact records depend on provider dashboards.

---

## CI/CD

Minimum GitHub Actions:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10.30.3
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter @booking/contracts check-types
      - run: pnpm --filter @booking/contracts build
      - run: pnpm --filter @booking/backend check-types
      - run: pnpm --filter @booking/backend build
      - run: pnpm --filter booking-system check-types
      - run: pnpm --filter booking-system build
```

Deployment can be provider-native:

- Vercel auto deploys frontend from main;
- Railway auto deploys backend from main or Dockerfile;
- GitHub Actions remains validation gate.

---

## VPS/Nginx Alternative

Use only if not using Vercel/Railway.

Requirements:

- one Docker Compose with application/backend/postgres/redis/nginx;
- wildcard SSL via Certbot DNS challenge;
- PostgreSQL backups;
- reverse proxy headers;
- process restart policy;
- log rotation.

Do not mix VPS instructions into primary Vercel/Railway setup.

---

## Deployment Checklist

- [ ] Production env configured.
- [ ] `prisma migrate deploy` runs successfully.
- [ ] Backend health and readiness pass.
- [ ] Root domain opens marketing page.
- [ ] Admin subdomain opens admin app.
- [ ] Tenant subdomain opens seeded restaurant.
- [ ] API CORS works from root/admin/tenant domains.
- [ ] Redis rate limiting works behind real proxy IP.
- [ ] R2 images render from CDN domain.
- [ ] Demo booking flow works end to end.
- [ ] Backups covered by Task 12.

---

## Done When

- Production/staging URL is usable for demo.
- Subdomain routing is verified.
- Backend is reachable only through intended API domain.
- CI validates contracts/backend/frontend.
- Deployment instructions match the chosen provider path.

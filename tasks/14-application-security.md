# Task 14 — Application Security Audit і Hardening

## Мета

Провести application-level security pass перед production/demo release: перевірити auth/session lifecycle, tenant isolation, access control, input validation, upload security, secrets, headers, CORS, dependency risk і OWASP-style attack surface.

Task 12 закриває production runtime hardening. Ця задача фокусується на безпеці самої аплікації та бізнес-логіки.

---

## Threat Model

Зафіксувати короткий threat model у документації або pull request notes.

Основні actors:

- anonymous guest на tenant site;
- restaurant owner у admin panel;
- attacker без акаунта;
- attacker з акаунтом одного ресторану;
- external service/provider failure;
- accidental secret leak.

Основні assets:

- owner accounts;
- JWT/refresh sessions;
- restaurant data;
- customer PII: names, phones, emails, booking notes;
- booking availability;
- S3/R2 uploaded files;
- AI/Google/Resend API keys;
- PostgreSQL data.

Ключове правило: owner ресторану A ніколи не має читати або змінювати дані ресторану B.

---

## Auth і Sessions

Перевірити backend:

```text
apps/backend/src/routes/auth.ts
apps/backend/src/core/middlewares/auth.ts
apps/backend/src/lib/auth
apps/backend/src/domains/user
```

Checklist:

- access і refresh secrets різні;
- refresh token зберігається hashed;
- logout revokes refresh session;
- refresh token rotation або чітко documented decision;
- expired/revoked sessions не приймаються;
- password reset token зберігається hashed;
- password reset не розкриває, чи існує email;
- login/register/forgot password мають rate limit після Task 02;
- auth errors не повертають internal details.

Manual checks:

- старий refresh token не працює після logout;
- reset token не можна використати двічі;
- reset token не працює після expiry;
- access до protected route без token повертає 401.

---

## Authorization і Tenant Isolation

Перевірити всі admin endpoints:

```text
apps/backend/src/routes/admin.ts
apps/backend/src/routes/restaurants.ts
apps/backend/src/domains/admin
apps/backend/src/domains/restaurant
```

Requirements:

- кожен admin read/write scope by authenticated owner restaurant;
- route params `bookingId`, `customerId`, `tableId`, `campaignId`, `recommendationId` перевіряються через owner restaurant scope;
- не покладатися тільки на frontend hiding controls;
- public endpoints не повертають admin-only fields;
- soft-deleted records не доступні там, де не треба;
- sample/demo data не змішується з real owner data без явного рішення.

Test cases:

- owner A не може отримати booking owner B через direct URL/API call;
- owner A не може змінити campaign/recommendation owner B;
- public tenant endpoint не повертає customer phone/email інших гостей;
- invalid domain не leak-ить існування internal restaurant ids.

---

## Input Validation і API Contracts

Contracts-first rule:

```text
packages/contracts
  -> backend contracts/routes/domains
  -> frontend API/hooks
```

Checklist:

- всі public/admin inputs validated через Zod contracts;
- numbers мають min/max;
- strings мають trim/min/max;
- dates/times validated and normalized;
- backend не довіряє frontend-computed price/discount/campaign;
- unexpected fields stripped or rejected consistently;
- errors normalized через existing Hono error middleware.

High-risk inputs:

- booking date/time/guest count/table id;
- admin status changes;
- restaurant domain/name/social links;
- upload folder/MIME/key;
- AI recommendation approve discount percent;
- menu parser confirm items.

---

## Public Booking Security

Checklist:

- booking creation повторно перевіряє availability server-side;
- concurrency-safe lock/transaction після Task 06;
- selected table belongs to target restaurant;
- discount campaign verified server-side;
- booking in past blocked unless explicitly allowed;
- guest contact info validation and max lengths;
- notes/comments max length and safe rendering;
- rate limit create booking and availability endpoints;
- no PII in logs.

Abuse cases:

- brute-force availability endpoint;
- mass booking spam;
- booking another restaurant's table id;
- forcing discount campaign id from another restaurant;
- creating giant comment payloads.

---

## Upload Security

Applies to Task 03 and Task 04.

Checklist:

- backend generates S3/R2 object keys;
- frontend cannot confirm arbitrary external URL;
- confirm checks key prefix `restaurants/{restaurantId}/...`;
- file MIME whitelist;
- max file size;
- no SVG upload unless sanitized/trusted;
- old files deleted best-effort after replacement;
- orphan cleanup strategy documented;
- menu OCR parse accepts only owner-owned uploaded file key;
- image URLs rendered safely on frontend.

Do not store secrets or signed URLs in DB. Store public URL/key only.

---

## Frontend Security

Check:

```text
apps/application/src/shared/api
apps/application/src/features/auth
apps/application/src/views/admin
apps/application/src/proxy.ts
```

Checklist:

- tokens are stored according to current auth decision and not leaked to logs;
- API client attaches auth only to backend API origin;
- admin routes redirect unauthenticated users;
- user-facing HTML is not rendered via unsafe HTML APIs unless sanitized;
- external links use safe `rel` where applicable;
- tenant/admin/root proxy routing cannot accidentally expose admin route on tenant domain;
- all frontend env vars with `NEXT_PUBLIC_` are safe to be public.

---

## HTTP Security Headers

Backend/frontend production should have:

- `Content-Security-Policy` appropriate for API/frontend;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- `Strict-Transport-Security` on HTTPS production;
- CORS allowlist only for known frontend domains;
- no wildcard CORS with auth.

If headers are already handled by framework/provider, document where.

---

## Secrets і Config

Checklist:

- no `.env` committed;
- no API keys in README/tasks/examples except placeholders;
- production secrets differ from dev;
- JWT secrets long/random;
- Resend/Anthropic/Google/R2 keys scoped minimally;
- GitHub Actions secrets used for deploy;
- logs do not include authorization headers, tokens, reset links, raw provider credentials.

Commands:

```bash
git grep -n "sk-" -- .
git grep -n "re_" -- .
git grep -n "JWT_.*=" -- .
```

Adjust patterns for real providers before release.

---

## Dependency і Supply Chain

Run:

```bash
pnpm audit
pnpm outdated
```

Checklist:

- critical/high vulnerabilities reviewed;
- unnecessary dependencies removed;
- generated Prisma client not manually edited;
- lockfile changes reviewed;
- Docker images use supported Node version;
- provider CLIs not required at runtime image unless needed.

If a vulnerability cannot be fixed before demo, document impact and mitigation.

---

## Logging і PII

PII that should not appear in logs:

- passwords;
- JWT/access/refresh tokens;
- password reset tokens/links;
- full authorization headers;
- customer emails/phones unless explicitly necessary and redacted;
- booking notes if they may contain personal data.

Allowed:

- request id;
- route;
- status code;
- duration;
- owner user id if needed;
- restaurant id if needed;
- error code.

---

## Security Validation

Minimum commands:

```bash
pnpm check
pnpm check-types
pnpm build
pnpm audit
```

Manual security smoke:

- unauthenticated admin request returns 401;
- owner A cannot access owner B data by id;
- invalid upload key rejected;
- forged discount campaign id ignored/rejected;
- rate limit triggers on auth/public booking endpoints;
- reset token cannot be reused;
- CORS rejects unexpected origin in production/staging config.

---

## Done When

- Threat model documented.
- Auth/session edge cases verified.
- Tenant isolation verified for admin endpoints.
- Public booking abuse cases covered.
- Upload and OCR flows check ownership.
- Headers/CORS/secrets reviewed.
- `pnpm audit` reviewed.
- Security smoke checklist completed before production demo.

# Task 10 — Email Delivery

## Мета

Підключити реальну email-доставку для password reset, booking confirmation і owner notifications.

Поточний backend уже має forgot/reset password routes і `PasswordResetToken`. Ця задача не створює password reset з нуля, а замінює dev/no-op notification layer на real provider.

---

## Provider

Рекомендовано Resend:

- простий API;
- нормальний free tier для MWP;
- можна почати з HTML templates без React Email.

Dependencies:

```bash
pnpm --filter @booking/backend add resend
```

React Email optional:

```bash
pnpm --filter @booking/backend add @react-email/components
```

---

## Current Integration Points

Перевірити й оновити:

```text
apps/backend/src/routes/auth.ts
apps/backend/src/domains/user/functions.ts
apps/backend/src/lib/notifications/password-reset.ts
apps/backend/src/domains/booking/functions.ts
apps/backend/src/domains/booking/write.ts
```

Не створювати `src/modules`.

Рекомендовані нові файли:

```text
apps/backend/src/lib/email/client.ts
apps/backend/src/lib/email/templates/password-reset.ts
apps/backend/src/lib/email/templates/booking-confirmation.ts
apps/backend/src/lib/email/templates/owner-booking-notification.ts
```

---

## Environment

```bash
RESEND_API_KEY="re_..."
EMAIL_FROM="Smart Booking <noreply@yourdomain.com>"
APP_BASE_URL="https://yourdomain.com"
ADMIN_BASE_URL="https://admin.yourdomain.com"
PASSWORD_RESET_TOKEN_TTL_MINUTES=30
EMAIL_DELIVERY_ENABLED=true
```

In dev:

```bash
EMAIL_DELIVERY_ENABLED=false
```

When disabled, log a safe preview message without leaking raw reset tokens in production logs.

---

## Emails

### Password Reset

Trigger: existing forgot password flow.

Rules:

- do not reveal whether email exists;
- send reset link only if user exists;
- token stored hashed in DB;
- email template українською;
- link points to frontend reset password route;
- reset link expiry shown in email.

### Booking Confirmation

Trigger: successful public booking.

Send to guest if email present.

Include:

- restaurant name;
- date/time;
- guest count;
- table name if appropriate;
- discount percent if applied;
- short Ukrainian confirmation text.

Email failure must not roll back booking.

### Owner Notification

Trigger: successful public booking.

Send to restaurant owner email.

Include:

- guest name;
- phone/email if present;
- date/time;
- guest count;
- note/comment;
- discount percent if applied;
- link to admin bookings.

Email failure must not roll back booking.

---

## Safety

- Escape/interpolate user-provided values safely in templates.
- Do not log full email HTML with personal data in production.
- Wrap non-critical booking emails with `.catch` or background-safe handling.
- Password reset email failure can still return success to avoid account enumeration, but should log warning.
- Consider rate limiting forgot password endpoint through Task 02.

---

## DNS

In Cloudflare/Resend configure:

```text
SPF
DKIM
Return-Path / bounce CNAME
DMARC recommended
```

Exact records come from Resend dashboard.

---

## Validation

```bash
pnpm --filter @booking/backend check-types
pnpm --filter @booking/backend build
```

Manual smoke:

- forgot password sends email in enabled dev/staging;
- reset link opens frontend route;
- public booking with email sends guest confirmation;
- owner receives notification;
- if Resend API key invalid, booking still succeeds and warning is logged.

---

## Done When

- Password reset uses real email provider when enabled.
- Booking confirmation and owner notification are sent after successful booking.
- Email failure policy is explicit.
- DNS checklist documented for production.

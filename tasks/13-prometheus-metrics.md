# Task 13 — Prometheus Metrics

## Мета

Додати Prometheus-compatible metrics для backend health, API performance, booking funnel, AI discount engine і production observability.

Ця задача доповнює Task 12. Logs показують, що сталося в конкретному request, а metrics мають показувати тренди: latency, errors, throughput, booking success rate, AI analysis duration і business KPIs.

---

## Scope

Перший етап — backend metrics endpoint:

```text
GET /metrics
```

Endpoint має віддавати Prometheus text format і бути захищеним у production.

Другий етап — dashboard/alerts:

- Grafana dashboard або provider-native dashboard;
- basic alerts for availability, latency, error rate;
- business metrics для demo/story.

---

## Dependencies

Backend dependency:

```bash
pnpm --filter @booking/backend add prom-client
```

Якщо типи потрібні окремо:

```bash
pnpm --filter @booking/backend add -D @types/prom-client
```

Спочатку перевірити, чи `prom-client` вже має bundled types.

---

## Backend Structure

Рекомендовані файли:

```text
apps/backend/src/lib/metrics/registry.ts
apps/backend/src/lib/metrics/http.ts
apps/backend/src/lib/metrics/business.ts
apps/backend/src/core/middlewares/metrics.ts
apps/backend/src/routes/metrics.ts
```

Route registration у `apps/backend/src/routes/index.ts` або `apps/backend/src/index.ts`, відповідно до поточного pattern.

Не змішувати metrics logic з domain write/read modules. Domain code може викликати маленькі metric helpers після успішних операцій.

---

## Environment

```bash
METRICS_ENABLED=true
METRICS_PATH="/metrics"
METRICS_TOKEN="long-random-token"
METRICS_COLLECT_DEFAULTS=true
```

Production:

- endpoint має бути закритий token auth, IP allowlist або internal network;
- не відкривати `/metrics` публічно без захисту;
- token не логувати.

Local dev:

```bash
METRICS_ENABLED=true
METRICS_TOKEN="dev-metrics-token"
```

---

## Default Runtime Metrics

Увімкнути `collectDefaultMetrics`:

- process CPU;
- memory;
- event loop lag;
- GC where available;
- Node.js process metrics.

Labels:

```text
service="booking-backend"
env="development|staging|production"
```

Не додавати high-cardinality labels на default metrics.

---

## HTTP Metrics

Middleware має збирати:

```text
http_requests_total
http_request_duration_seconds
http_request_errors_total
```

Recommended labels:

```text
method
route
status_code
```

Important:

- `route` має бути route pattern, не raw URL;
- не включати `bookingId`, `restaurantId`, `email`, `domain`, query strings або user input як labels;
- 404 можна групувати як `route="unknown"`;
- metrics middleware має працювати після request id/logger, але не ламати error middleware.

Buckets для latency:

```text
0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5
```

---

## Business Metrics

### Booking Flow

```text
booking_created_total
booking_create_failed_total
booking_availability_checked_total
booking_availability_duration_seconds
booking_slots_generated_total
booking_slot_discount_visible_total
```

Safe labels:

```text
source="website|phone|walk_in"
status="success|conflict|validation_error|error"
has_discount="true|false"
```

Avoid labels:

- restaurant id;
- tenant domain;
- customer email/phone/name;
- booking id;
- table id.

### AI Discount Engine

```text
ai_analysis_runs_total
ai_analysis_duration_seconds
ai_recommendations_generated_total
ai_recommendations_approved_total
ai_recommendations_rejected_total
discount_campaigns_created_total
```

Safe labels:

```text
trigger="manual|cron"
status="success|error"
```

### Email / Storage Optional

If Task 10 or Task 03 is implemented:

```text
email_send_total
s3_presign_total
s3_upload_confirm_total
```

Labels:

```text
type="password_reset|booking_confirmation|owner_notification"
status="success|error"
folder="hero|logo|gallery|menu-item|menu-ocr"
```

---

## Metrics Endpoint Security

Options:

1. Bearer token:

```text
Authorization: Bearer <METRICS_TOKEN>
```

2. Basic auth for Prometheus scrape.
3. Internal network only, if provider supports private networking.
4. Cloudflare Access in front of `/metrics`.

For MWP, Bearer token is enough if HTTPS is enabled and token is long/random.

Unauthorized response:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Недостатньо прав для перегляду метрик",
    "requestId": "..."
  }
}
```

Do not return partial metrics on auth failure.

---

## Prometheus Scrape Config

Example:

```yaml
scrape_configs:
  - job_name: booking-backend
    metrics_path: /metrics
    scheme: https
    static_configs:
      - targets:
          - api.yourdomain.com
    authorization:
      type: Bearer
      credentials: ${METRICS_TOKEN}
```

If using Railway/Render/Vercel-compatible hosting, prefer a managed metrics collector if direct Prometheus scraping is inconvenient.

---

## Grafana Dashboard

Minimum panels:

- request rate by route;
- p95 request latency;
- error rate;
- process memory;
- booking created count;
- booking conflicts;
- availability latency;
- AI analysis runs and duration;
- recommendations generated/approved;
- active discount campaigns, if exported as gauge.

Demo-friendly business panels:

- bookings with discount vs without discount;
- AI recommendations by status;
- booking success/conflict trend.

---

## Alerts

Basic alerts:

- backend down: scrape fails for 2-5 minutes;
- high error rate: 5xx > 5% for 5 minutes;
- high latency: p95 > 1s for 5 minutes;
- booking conflicts spike unexpectedly;
- AI analysis job fails;
- memory usage grows continuously.

For MWP, alerts can be documented even if not fully wired.

---

## Validation

```bash
pnpm --filter @booking/backend check-types
pnpm --filter @booking/backend build
```

Manual smoke:

```bash
curl -H "Authorization: Bearer $METRICS_TOKEN" http://localhost:3001/metrics
```

Verify:

- response content type is Prometheus-compatible text;
- unauthorized request is rejected;
- HTTP request metrics increase after API calls;
- booking metrics increase after successful reservation;
- no high-cardinality labels appear in output.

---

## Done When

- `/metrics` endpoint exists and is protected in production.
- Default Node.js metrics are exported.
- HTTP latency/count/error metrics are exported.
- Booking and AI business metrics are exported without PII/high-cardinality labels.
- Dashboard/alert plan is documented.
- Backend typecheck/build pass.

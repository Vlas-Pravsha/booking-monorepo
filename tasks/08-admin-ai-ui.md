# Task 08 — Admin UI: AI Analytics і Discount Campaigns

## Мета

Побудувати admin UI для AI recommendations, discount campaigns, heatmap і discount effectiveness analytics.

Це frontend-heavy full-stack task. Backend contracts/endpoints мають бути завершені в Task 05 до початку UI.

---

## Реальні Frontend Integration Points

```text
apps/application/src/app/(admin)/admin
apps/application/src/views/admin
apps/application/src/widgets/admin/sidebar
apps/application/src/entities/booking
apps/application/src/entities/restaurant
apps/application/src/shared/api
apps/application/src/shared/ui
```

Дотримуватись Feature-Sliced Design:

- API/types для AI можна зробити `entities/ai` або `features/ai/...`, залежно від існуючих patterns.
- Page composition у `views/admin`.
- Route files у `app/(admin)/admin/...`.
- Shared UI тільки для generic components.

All user-facing copy Ukrainian.

---

## Admin Routes

```text
/admin/ai
/admin/ai/recommendations
/admin/ai/campaigns
/admin/ai/analytics
/admin/analytics/heatmap
```

Якщо поточний admin routing має іншу композицію, слідувати існуючому pattern.

---

## Required API Contracts

Frontend має парсити responses через `@booking/contracts`:

```text
GET  /api/admin/ai/summary
GET  /api/admin/ai/recommendations
POST /api/admin/ai/recommendations/:id/approve
POST /api/admin/ai/recommendations/:id/reject
POST /api/admin/ai/analyze
GET  /api/admin/ai/campaigns
PATCH /api/admin/ai/campaigns/:id
GET  /api/admin/ai/analytics
GET  /api/admin/analytics/heatmap
```

No direct `fetch` in components. Use shared API client + TanStack Query.

---

## AI Dashboard

Page: `/admin/ai`

Shows:

- pending recommendations count;
- active campaigns count;
- bookings with discount in last 30 days;
- last analyzed timestamp;
- manual “Запустити аналіз” button;
- short alert if recommendations need review.

States:

- loading skeleton;
- empty state;
- analysis running;
- analysis error;
- success toast.

---

## Recommendations Page

Page: `/admin/ai/recommendations`

For each recommendation:

- day/time slot;
- occupancy percent;
- recommended discount;
- reasoning;
- expiry date;
- editable discount control, step 5, min/max from backend contract;
- approve button;
- reject button.

UX:

- optimistic UI optional, but backend result remains source of truth;
- disabled state while mutation pending;
- validation error shown in Ukrainian;
- after approve/reject invalidate recommendations, summary, campaigns and slots cache queries.

---

## Campaigns Page

Page: `/admin/ai/campaigns`

Shows:

- active campaigns;
- slot;
- discount percent;
- start/end dates;
- bookings count;
- deactivate action.

Optional:

- filter active/expired/all;
- edit end date;
- edit discount for future bookings only.

---

## Heatmap Page

Page: `/admin/analytics/heatmap`

Shows:

- matrix by day x time slot;
- color scale for occupancy;
- legend;
- empty state if not enough data;
- last analysis timestamp.

Important:

- days order should be Ukrainian-friendly: `Пн ... Нд` unless backend returns another explicit order;
- backend should return labels or frontend should map deterministically.

---

## Discount Analytics Page

Page: `/admin/ai/analytics`

Shows:

- total campaigns;
- bookings with discount;
- average uplift;
- most used discount percent;
- table comparing before/after per campaign.

For MWP demo, simple before/after booking count per week is enough.

---

## Sidebar Navigation

Update existing admin sidebar in:

```text
apps/application/src/widgets/admin/sidebar
```

Add:

- `AI-модуль`
- `Рекомендації`
- `Активні знижки`
- `Ефективність`
- `Теплова карта`

If badge count is available from summary, show pending recommendations badge.

---

## Visual/UX Requirements

- Use existing shadcn/shared UI components.
- Avoid introducing a separate visual system.
- Cards only for repeated items/metrics, not nested cards.
- Tables for dense campaign/analytics data.
- Buttons/icons should match existing admin style.
- Text must fit on mobile and desktop.

---

## Validation

```bash
pnpm --filter @booking/contracts check-types
pnpm --filter @booking/contracts build
pnpm --filter booking-system check-types
pnpm --filter booking-system build
```

Full-stack smoke with backend:

- login admin;
- open AI dashboard;
- trigger analysis;
- approve recommendation;
- see campaign;
- tenant slot shows discount.

---

## Done When

- Admin AI pages consume real backend APIs.
- Sidebar navigation updated.
- All states handled: loading, empty, error, success.
- UI copy is Ukrainian.
- Frontend typecheck/build pass.

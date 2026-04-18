# Task 06 — Booking Engine Improvements

## Мета

Довести public booking flow до production-ready стану:

- validation against working hours;
- concurrency-safe reservation creation;
- customer deduplication;
- generated available slots instead of manual time guessing;
- discount-aware availability for AI campaigns.

Це full-stack задача. Вона має оновити `packages/contracts`, `apps/backend` і `apps/application`.

---

## Поточний стан

Backend:

- public routes: `apps/backend/src/routes/public.ts`
- booking domain: `apps/backend/src/domains/booking/*`
- public contracts re-export: `apps/backend/src/contracts/zod/public.ts`
- shared contracts: `packages/contracts/src/public.ts`

Frontend:

- booking API/query keys: `apps/application/src/entities/booking/api`
- booking feature: `apps/application/src/features/booking/make-reservation`
- tenant booking view: `apps/application/src/views/tenant/booking`

Поточний create flow створює нового customer для кожного booking і перевіряє availability до create. Після PostgreSQL migration треба гарантувати безпеку від race conditions.

---

## 6.1 Working Schedule

### Prisma

Додати формалізований weekly schedule:

```prisma
model WorkSchedule {
  id           String     @id @default(cuid())
  restaurantId String
  dayOfWeek    Int
  isOpen       Boolean    @default(true)
  openTime     String
  closeTime    String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)

  @@unique([restaurantId, dayOfWeek])
  @@index([restaurantId, isOpen])
}
```

Додати relation у `Restaurant`.

Fallback на поточні `Restaurant.openingTime` і `Restaurant.closingTime` залишити, щоб не ламати існуючі ресторани.

### Validation Rules

Booking invalid якщо:

- restaurant closed this day;
- start time before open time;
- end time after close time;
- date/time invalid;
- booking in the past, якщо product не дозволяє admin backfill;
- guest count > allowed contract max.

Error messages українською через `ApiError`.

---

## 6.2 Concurrency-safe Booking Creation

Це найважливіша частина задачі.

Після PostgreSQL migration create reservation має:

1. Normalize domain.
2. Load restaurant + selected table.
3. Validate working hours.
4. Open DB transaction.
5. Lock selected table or restaurant/date slot.
6. Re-check overlapping bookings inside transaction.
7. Find/create customer inside transaction.
8. Create booking.
9. Commit.
10. Invalidate availability cache after successful commit.

### Lock Strategy

Варіант A — row-level lock selected table:

```sql
SELECT id FROM "RestaurantTable" WHERE id = $1 FOR UPDATE;
```

Варіант B — PostgreSQL advisory lock per table/date/time:

```sql
SELECT pg_advisory_xact_lock(hashtext($1));
```

Lock key:

```text
booking:{restaurantId}:{tableId}:{startAtIso}
```

Для MWP advisory lock простіший, якщо Prisma generated client не має зручного `FOR UPDATE`.

### Overlap Query

У transaction перевірити:

```text
existing.startAt < requestedEndAt
AND existing.endAt > requestedStartAt
AND existing.tableId = selectedTableId
AND existing.deletedAt IS NULL
AND status IN pending/confirmed/seated
```

Якщо overlap існує:

```text
409 Conflict: Обраний столик уже недоступний на цей час
```

---

## 6.3 Customer Deduplication

Поточна проблема: кожне public reservation створює нового `Customer`.

Рішення:

- normalize email to lowercase trim;
- normalize phone до стабільного формату або хоча б digits-only;
- шукати customer у межах `restaurantId`;
- якщо знайдено — оновити name/phone/email тільки без втрати корисних existing fields;
- якщо не знайдено — створити.

Рекомендовані schema fields:

```prisma
model Customer {
  normalizedEmail String?
  normalizedPhone String?

  @@index([restaurantId, normalizedEmail])
  @@index([restaurantId, normalizedPhone])
}
```

Не робити `@@unique` одразу, поки існують дублікати з попередніх seed/dev даних. Спочатку backfill/merge, потім можна посилити constraint.

---

## 6.4 Available Slots Endpoint

Додати endpoint:

```text
GET /api/public/restaurants/:domain/reservations/slots?date=YYYY-MM-DD&guests=2
```

Response через `{ data: ... }`:

```json
{
  "data": {
    "date": "2026-04-20",
    "slots": [
      {
        "time": "12:00",
        "available": true,
        "tablesCount": 3,
        "discount": null
      },
      {
        "time": "13:30",
        "available": true,
        "tablesCount": 1,
        "discount": {
          "campaignId": "cmp_...",
          "pct": 20,
          "label": "Знижка 20% на цей час"
        }
      }
    ]
  }
}
```

Contracts:

- add schemas/types in `packages/contracts/src/public.ts`;
- backend route validates query via backend contracts;
- frontend API parses response with shared contract.

Slot generation:

- use weekly schedule if present;
- fallback to restaurant `openingTime`/`closingTime`;
- step can be 30 minutes or `averageDuration`, but choose explicitly;
- do not generate slots where `start + averageDuration > closeTime`;
- include discounts from active campaigns after Task 05.

Recommended for UX: 30-minute slot step, booking duration still `averageDuration`.

---

## 6.5 Frontend Slot Picker

Replace manual time input in public booking form with a slot picker.

Requirements:

- query slots after date + guests selected;
- loading state;
- empty state: `На цю дату немає доступних слотів`;
- disabled unavailable slots if backend returns them;
- visible discount badge for discounted slots;
- selected slot drives availability/table selection;
- all copy Ukrainian.

Feature location:

```text
apps/application/src/features/booking/make-reservation
apps/application/src/entities/booking/api
apps/application/src/entities/booking/model
```

---

## 6.6 Admin Weekly Schedule Editor

Add schedule editor to admin settings.

Requirements:

- 7 days;
- open/closed switch;
- open time;
- close time;
- validation close > open;
- save through restaurant settings API or dedicated endpoint;
- fallback values from existing `openingTime`/`closingTime`.

Contracts must include schedule shape.

---

## 6.7 Discount Snapshot

After Task 05, booking creation must snapshot discount data:

```prisma
discountCampaignId String?
discountPctApplied Int?
originalAmount     Int?
finalAmount        Int?
```

For MVP without payment/menu pricing, it is acceptable to store only `discountCampaignId` and `discountPctApplied`.

Important: backend must verify campaign server-side during booking creation. Do not trust `campaignId` or `discountPct` from frontend.

---

## Validation

```bash
pnpm --filter @booking/contracts check-types
pnpm --filter @booking/contracts build
pnpm --filter @booking/backend check-types
pnpm --filter @booking/backend build
pnpm --filter booking-system check-types
pnpm --filter booking-system build
```

Manual smoke:

- tenant sees slots for open day;
- closed day returns no slots;
- booking outside hours is rejected;
- two simultaneous requests cannot book same table/time;
- repeated guest does not create duplicate customer;
- admin can edit weekly schedule.

---

## Done When

- Booking creation is concurrency-safe in PostgreSQL.
- Working schedule is enforced in availability and create flows.
- Slot picker replaces manual time guessing.
- Customer dedup works for email/phone.
- Contracts/backend/frontend are aligned.
- Relevant validation passes.

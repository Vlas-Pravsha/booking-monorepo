# Task 05 — AI Discount Engine

## Мета

Реалізувати deterministic demand analysis і recommendation engine, який знаходить слабкі часові слоти, пропонує знижки власнику ресторану і після підтвердження активує discount campaigns для public booking flow.

Claude/AI може допомагати з поясненнями, але core logic має бути rule-based, повторюваною і придатною для захисту дипломного MWP.

---

## Залежності

Потрібні:

- Task 01 PostgreSQL;
- Task 02 Redis для cache invalidation;
- Task 06 slot generation і working schedule.

AI analysis має використовувати той самий schedule/slot logic, що й public availability. Не hardcode `10:00-22:00`, якщо у ресторану є weekly schedule.

---

## Data Flow

```text
Manual trigger / weekly job
  -> load restaurant schedule + tables + bookings
  -> aggregate occupancy by dayOfWeek x timeSlot
  -> save SlotDemandAnalysis rows
  -> generate pending AiRecommendation rows
  -> owner approves/rejects in Admin
  -> approved recommendation creates DiscountCampaign
  -> availability/slots include active discount
  -> booking snapshots applied discount
```

---

## Prisma Schema

Додати models:

```prisma
model SlotDemandAnalysis {
  id           String     @id @default(cuid())
  restaurantId String
  dayOfWeek    Int
  timeSlot     String
  periodWeeks  Int
  totalSlots   Int
  bookedSlots  Int
  avgGuests    Float
  avgOccupancy Float
  analyzedAt   DateTime   @default(now())
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)

  @@index([restaurantId, analyzedAt])
  @@index([restaurantId, dayOfWeek, timeSlot])
}

model AiRecommendation {
  id                  String                 @id @default(cuid())
  restaurantId        String
  dayOfWeek           Int
  timeSlot            String
  occupancy           Float
  recommendedDiscount Int
  reasoning           String
  status              AiRecommendationStatus @default(pending)
  reviewedAt          DateTime?
  reviewedBy          String?
  campaignId          String?
  createdAt           DateTime               @default(now())
  expiresAt           DateTime
  restaurant          Restaurant             @relation(fields: [restaurantId], references: [id], onDelete: Cascade)
  campaign            DiscountCampaign?      @relation(fields: [campaignId], references: [id], onDelete: SetNull)

  @@index([restaurantId, status])
  @@index([restaurantId, dayOfWeek, timeSlot])
}

model DiscountCampaign {
  id           String     @id @default(cuid())
  restaurantId String
  name         String
  dayOfWeek    Int
  timeSlot     String
  discountPct  Int
  startsAt     DateTime
  endsAt       DateTime
  isActive     Boolean    @default(true)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)
  bookings     Booking[]
  recommendations AiRecommendation[]

  @@index([restaurantId, isActive])
  @@index([restaurantId, dayOfWeek, timeSlot, isActive])
}

enum AiRecommendationStatus {
  pending
  approved
  rejected
  expired
}
```

Booking snapshot:

```prisma
discountCampaignId String?
discountPctApplied Int?
```

Optional later:

```prisma
originalAmount Int?
finalAmount    Int?
```

---

## Backend Structure

Рекомендовані файли:

```text
apps/backend/src/domains/ai/demand-analysis.ts
apps/backend/src/domains/ai/recommendations.ts
apps/backend/src/domains/ai/campaigns.ts
apps/backend/src/domains/ai/analytics.ts
apps/backend/src/contracts/zod/ai.ts
apps/backend/src/routes/admin.ts
```

DB reads/writes мають лишатися в domain read/write helpers або чітко відокремлених domain modules. Route handlers thin.

---

## Contracts

Додати в `packages/contracts/src/admin.ts` або новий `ai.ts`, який exportиться з package:

- AI summary response;
- recommendation list response;
- approve/reject inputs/results;
- campaign list response;
- campaign update input;
- analytics response;
- heatmap response.

Frontend має використовувати ці schemas при parsing API responses.

---

## Demand Analysis Rules

Input:

- last N weeks, default 8;
- restaurant working schedule;
- generated slots with same slot step as Task 06;
- bookings with status `confirmed`, `seated`, `completed`;
- ignore `cancelled`, soft-deleted and sample data unless demo mode explicitly includes them.

Metrics:

```text
avgOccupancy = bookedSlots / totalSlots * 100
avgGuests = total guests / bookedSlots
```

For demo clarity, occupancy by table slot is enough. For later accuracy, use seat capacity occupancy.

---

## Recommendation Rules

Thresholds:

| Occupancy |          Discount |
| --------: | ----------------: |
|    <= 20% |               30% |
|    <= 35% |               25% |
|    <= 50% |               20% |
|    <= 65% |               15% |
|    <= 75% |               10% |
|     > 75% | no recommendation |

Rules:

- require minimum 4 observed occurrences per slot;
- do not create duplicate pending recommendations for same restaurant/day/time;
- expire pending recommendations after 7 days;
- reasoning українською;
- deterministic reasoning templates preferred for repeatable demo.

Claude optional:

- use only to rephrase explanations;
- timeout and fallback to deterministic text;
- never let Claude decide discount percentage.

---

## Admin Endpoints

Under existing authenticated admin routes:

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

All operations must scope by authenticated owner's restaurant. Owner cannot approve/reject another restaurant's recommendation.

---

## Campaign Approval

Approve flow:

1. Load recommendation by id and owner restaurant scope.
2. Verify status `pending` and not expired.
3. Validate override discount, e.g. 5-50 step 5.
4. Deactivate existing active campaign for same restaurant/day/time.
5. Create campaign for 30 days.
6. Mark recommendation approved.
7. Invalidate availability/slots cache for affected restaurant.

---

## Public Availability Integration

Task 06 slots and availability responses should include discount:

```json
{
  "campaignId": "cmp_...",
  "pct": 20,
  "label": "Знижка 20% на цей час"
}
```

Booking create must re-check active campaign server-side and snapshot applied discount. Frontend-provided discount data is only a hint.

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

- seed demo data;
- run manual analysis;
- recommendations appear;
- approve recommendation;
- active campaign appears;
- tenant slots show discount;
- booking stores discount snapshot.

---

## Done When

- AI analysis uses real schedule/slot logic.
- Recommendations are deterministic and explainable.
- Owner approval creates campaigns safely.
- Availability and booking flows apply discounts server-side.
- Admin UI task can consume stable contracts.

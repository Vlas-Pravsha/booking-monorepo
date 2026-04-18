# Task 09 — Seed Дані і Демонстрація MWP

## Мета

Підготувати deterministic seed data і demo script, які стабільно показують цінність AI discount module на захисті.

Seed має працювати після PostgreSQL migration і не повинен залежати від випадковості без seed value.

---

## Demo Story

Демо має показати:

1. Tenant site ресторану.
2. Public booking зі slots і знижкою.
3. Admin бачить нове бронювання.
4. AI recommendations знаходять слабкі слоти.
5. Owner approves recommendation.
6. Discount campaign активується.
7. Heatmap пояснює, чому рекомендація має сенс.
8. Analytics показує before/after або demo uplift.

---

## Seed Scope

Створити:

- 1 demo owner;
- 1 restaurant `bistro-kyiv`;
- full onboarding data;
- weekly work schedule;
- 8-10 tables;
- 50+ customers;
- 8-10 weeks bookings з реалістичним pattern;
- weak Monday/Tuesday lunch slots;
- strong Friday/Saturday evening slots;
- menu/features/reviews/gallery;
- optional active discount campaigns;
- optional precomputed AI recommendations for stable demo.

---

## Реальні Prisma Fields

Перед написанням seed звірити з `apps/backend/prisma/schema.prisma`.

Поточні важливі відмінності:

- `Restaurant.ownerId`, не `userId`;
- `Restaurant.shortDescription` required;
- `Restaurant.logo` / `heroImage`, не `logoUrl` / `heroImageUrl`, якщо Task 03 ще не перейменував;
- `RestaurantTable.name`, `seats`, `position`, не `number` / `capacity`;
- `Booking.guestCount`, не `guests`;
- `RestaurantFeature.label`, не `title`;
- `RestaurantMenuItem.position`, не `order`.

Seed task має використовувати актуальну schema після виконаних migrations.

---

## Deterministic Random

Не використовувати `Math.random()` напряму для demo-critical даних.

Додати seeded random helper:

```typescript
const createSeededRandom = (seed: string) => {
  let value = 0;
  for (const char of seed) {
    value = (value * 31 + char.charCodeAt(0)) >>> 0;
  }

  return () => {
    value = (1664525 * value + 1013904223) >>> 0;
    return value / 4294967296;
  };
};
```

Env:

```bash
SEED_MODE=demo
SEED_RANDOM_SEED=booking-demo
```

---

## Booking Demand Pattern

Pattern має створювати:

- Monday lunch occupancy 15-25%;
- Tuesday lunch occupancy 20-35%;
- Wednesday moderate;
- Thursday good;
- Friday/Saturday evening 85-95%;
- Sunday moderate.

Bookings:

- statuses mostly `completed` for historical data;
- no overlapping bookings for same table;
- `startAt` and `endAt` match `averageDuration`;
- customers reused across bookings.

---

## Seed Script Location

Use backend Prisma seed:

```text
apps/backend/prisma/seed.ts
```

Package config in `apps/backend/package.json` or Prisma config should point to the seed script according to current Prisma version.

Run:

```bash
pnpm --filter @booking/backend prisma db seed
```

If current package scripts do not expose this directly, add a backend script:

```json
{
  "scripts": {
    "prisma:seed": "prisma db seed"
  }
}
```

---

## Demo Credentials

```text
Email: owner@bistro-kyiv.demo
Password: demo1234
Tenant domain: bistro-kyiv.yourdomain.com
Local tenant path/domain: document actual local setup after proxy config
```

Password hashing must use the same helper as production auth, currently backend auth password utilities, not a random hashing library if one already exists.

---

## Demo Script

### 1. Tenant Site

- open `bistro-kyiv.yourdomain.com`;
- show hero, menu, gallery/reviews;
- open booking form;
- choose Monday lunch slot;
- show visible discount;
- submit booking.

### 2. Admin Bookings

- login as owner;
- open bookings;
- show new booking and discount snapshot.

### 3. AI Recommendations

- open AI recommendations;
- show weak Monday/Tuesday slots;
- explain occupancy threshold;
- approve recommendation and optionally adjust discount.

### 4. Campaigns and Tenant Slots

- open active campaigns;
- return to tenant booking;
- show discount on affected slot.

### 5. Heatmap/Analytics

- open heatmap;
- show weak vs strong slots;
- open analytics and show before/after.

Target total time: 8-10 minutes.

---

## Validation

```bash
pnpm --filter @booking/backend prisma:generate
pnpm --filter @booking/backend prisma:seed
pnpm --filter @booking/backend check-types
pnpm --filter booking-system check-types
```

Manual:

- seeded login works;
- tenant page opens;
- AI analysis produces expected weak slots;
- demo script can be completed without manual DB edits.

---

## Done When

- Seed is deterministic.
- Demo restaurant has realistic data.
- AI recommendations are stable between runs.
- Demo credentials documented.
- Demo script matches actual UI routes and domain setup.

# Task 11 — Testing, Quality Gates і Smoke Flows

## Мета

Додати мінімальний, але корисний шар тестів і перевірок, щоб PostgreSQL migration, booking engine, AI discount logic і production deploy не ламалися непомітно.

---

## Що треба покрити

### Backend domain tests

Критичні сценарії:

- availability не повертає столик із overlapping booking;
- create reservation повторно перевіряє доступність всередині transaction;
- два одночасні booking requests не можуть забронювати один і той самий столик;
- working hours validation блокує бронювання до відкриття, після закриття і в закритий день;
- customer dedup знаходить існуючого клієнта за normalized email або phone в межах ресторану;
- discount campaign застосовується тільки для правильного `restaurantId`, `dayOfWeek`, `timeSlot`, `startsAt`, `endsAt`;
- AI recommendation generation не створює рекомендації для сильних слотів.

### Contract tests

Для кожної нової API-фічі:

- schema в `packages/contracts/src` парсить backend response;
- frontend API hook використовує той самий contract;
- backend route повертає `{ data: ... }`;
- error shape залишається через глобальний error middleware.

### Frontend smoke tests

Мінімальні сценарії:

- root marketing page відкривається;
- admin login працює з demo credentials;
- admin bookings/customers/tables сторінки не падають;
- tenant page ресторану відкривається;
- tenant booking flow показує слоти, availability і створює бронювання;
- AI recommendations page показує empty state або список рекомендацій.

Для дипломного MWP достатньо Playwright smoke tests або documented manual smoke script, якщо час обмежений.

---

## Рекомендований tooling

Backend:

```bash
pnpm --filter @booking/backend add -D vitest
```

Frontend/e2e:

```bash
pnpm add -D playwright
```

Якщо додавання Playwright занадто велике для дедлайну, залишити manual smoke checklist у `tasks/09-seed-data-demo.md` і CI type/build checks.

---

## CI Quality Gate

GitHub Actions має запускати:

```bash
pnpm install --frozen-lockfile
pnpm --filter @booking/contracts check-types
pnpm --filter @booking/contracts build
pnpm --filter @booking/backend check-types
pnpm --filter @booking/backend build
pnpm --filter booking-system check-types
pnpm --filter booking-system build
```

Після додавання тестів:

```bash
pnpm --filter @booking/backend test
pnpm test:e2e
```

---

## Test Data

Seed має підтримувати deterministic mode:

```bash
SEED_MODE=demo SEED_RANDOM_SEED=booking-demo pnpm --filter @booking/backend prisma db seed
```

Це потрібно, щоб AI heatmap і recommendations були стабільними на демо.

---

## Done When

- Є мінімальні backend tests для найризикованішої booking logic.
- Є smoke checklist або Playwright tests для demo flow.
- CI запускає typecheck/build для contracts, backend і frontend.
- Seed data може відтворювати однаковий demo scenario.
- У фіналі кожної наступної задачі вказано, які checks пройшли.

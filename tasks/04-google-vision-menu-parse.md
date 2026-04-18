# Task 04 — Google Cloud Vision: Зчитування меню з картинки

## Мета

Дозволити власнику ресторану завантажити фото або PDF меню, автоматично витягнути текст через Google Cloud Vision і перетворити його у draft menu items, які власник може перевірити, відредагувати й зберегти.

Це P1 задача. Вона залежить від Task 03, бо OCR input має приходити через S3/R2 upload.

---

## Pipeline

```text
Admin uploads menu image/PDF
  -> S3/R2 presigned upload
  -> Backend parse endpoint
  -> Google Vision OCR
  -> structured parser
  -> owner reviews editable draft
  -> confirm saves RestaurantMenuItem records
```

Structured parser може бути:

- deterministic parser для простих меню;
- Claude API для хаотичного OCR;
- hybrid: deterministic cleanup + Claude JSON extraction.

Core UX має працювати навіть якщо Claude недоступний: показати raw OCR text і дати власнику вручну створити items.

---

## Backend Structure

Не створювати `src/modules`.

Рекомендовані файли:

```text
apps/backend/src/lib/vision/client.ts
apps/backend/src/lib/menu-parser/parser.ts
apps/backend/src/domains/restaurant/menu-parse.ts
apps/backend/src/contracts/zod/menu-parse.ts
apps/backend/src/routes/restaurants.ts
```

Route краще монтувати під authenticated restaurant owner scope:

```text
POST /api/restaurants/me/menu/parse-image
POST /api/restaurants/me/menu/parse-confirm
```

---

## Contracts

Додати в `packages/contracts/src/restaurant.ts` або окремий public export, якщо так краще лягає в існуючу структуру:

```typescript
parsedMenuItemSchema;
menuParseImageInputSchema;
menuParseImageResultSchema;
menuParseConfirmInputSchema;
menuParseConfirmResultSchema;
```

Response envelope на backend:

```json
{
  "data": {
    "items": [],
    "rawText": "...",
    "count": 0
  }
}
```

---

## Environment

```bash
GOOGLE_CREDENTIALS_BASE64="..."
ANTHROPIC_API_KEY="..."
MENU_PARSE_USE_AI=true
MENU_PARSE_TIMEOUT_MS=20000
```

`ANTHROPIC_API_KEY` потрібен тільки якщо AI parser увімкнений.

---

## Security

Input має бути не довільний external URL, а S3/R2 key, який:

- належить authenticated owner restaurant;
- має allowed folder `menu-ocr`;
- має allowed MIME;
- існує в bucket;
- не перевищує max size.

Backend сам будує private/public URL для OCR. Не довіряти `imageUrl` з frontend.

---

## Parsing Rules

Parsed item shape:

```typescript
type ParsedMenuItem = {
  name: string;
  description: string | null;
  price: number | null;
  category: string | null;
};
```

Rules:

- output українською, якщо OCR українською;
- price в копійках або гривнях має відповідати поточному `RestaurantMenuItem.price` model. У schema зараз `price Int`, тому вирішити явно: `price` = гривні як integer або копійки;
- не зберігати items без `name`;
- owner завжди review/confirm перед save;
- confirm може `append` або `replace` existing menu items.

---

## Frontend

Реальні integration points:

```text
apps/application/src/entities/restaurant
apps/application/src/features/restaurant/manage-settings
apps/application/src/views/admin/settings
apps/application/src/shared/api
```

UI states:

- upload pending;
- OCR/parsing pending;
- parsed draft table;
- editable rows;
- remove row;
- save all;
- fallback raw text if structured parse fails.

All copy Ukrainian.

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

- upload sample menu image;
- parse returns raw text and draft items;
- owner edits item and confirms;
- tenant menu renders saved items;
- invalid foreign S3 key is rejected.

---

## Done When

- OCR endpoint uses authenticated restaurant scope.
- Parser returns validated structured items.
- Owner review is required before DB save.
- Frontend handles success, empty OCR, parse failure and manual fallback.

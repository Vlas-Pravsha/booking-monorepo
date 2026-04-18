# Task 03 — S3/R2 Storage для ресторанів

## Мета

Замінити локальні/зовнішні image URL поля на кероване S3-compatible сховище для hero, logo, gallery, menu images і OCR input.

Рекомендований provider для MWP: Cloudflare R2 + public/custom CDN domain.

---

## Поточний стан

У Prisma зараз є image-like поля:

- `Restaurant.logo`
- `Restaurant.heroImage`
- `RestaurantMenuItem.image`
- `RestaurantGalleryImage.image`

Task має мігрувати це обережно, не ламаючи існуючий tenant UI.

---

## Що зберігається

| Тип             | Folder      | Max size | MIME                                                                    |
| --------------- | ----------- | -------: | ----------------------------------------------------------------------- |
| Logo            | `logo`      |     1 MB | `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml` якщо дозволено |
| Hero image      | `hero`      |     5 MB | `image/jpeg`, `image/png`, `image/webp`                                 |
| Gallery image   | `gallery`   |     5 MB | `image/jpeg`, `image/png`, `image/webp`                                 |
| Menu item image | `menu-item` |     2 MB | `image/jpeg`, `image/png`, `image/webp`                                 |
| Menu OCR input  | `menu-ocr`  |    10 MB | images або `application/pdf`                                            |

SVG для logo дозволяти тільки якщо є sanitization або trusted upload by restaurant owner. Для простішого MVP можна заборонити SVG.

---

## Dependencies

```bash
pnpm --filter @booking/backend add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

---

## Environment

Backend:

```bash
S3_ENDPOINT="https://<accountid>.r2.cloudflarestorage.com"
S3_ACCESS_KEY_ID="..."
S3_SECRET_ACCESS_KEY="..."
S3_BUCKET_NAME="booking-restaurants"
S3_PUBLIC_URL="https://cdn.yourdomain.com"
S3_REGION="auto"
```

Local MinIO alternative:

```bash
S3_ENDPOINT="http://localhost:9000"
S3_PUBLIC_URL="http://localhost:9000/booking-restaurants"
S3_REGION="us-east-1"
```

---

## Docker Compose MinIO для dev

Опційно додати в `docker-compose.yml`:

```yaml
minio:
  image: minio/minio
  command: server /data --console-address ":9001"
  environment:
    MINIO_ROOT_USER: minioadmin
    MINIO_ROOT_PASSWORD: minioadmin
  ports:
    - "9000:9000"
    - "9001:9001"
  volumes:
    - minio_data:/data
```

І додати volume:

```yaml
minio_data:
```

---

## Backend Structure

Не створювати `src/modules`.

Рекомендовані файли:

```text
apps/backend/src/lib/storage/s3.ts
apps/backend/src/lib/storage/keys.ts
apps/backend/src/lib/storage/validation.ts
apps/backend/src/domains/restaurant/uploads.ts
apps/backend/src/contracts/zod/upload.ts
apps/backend/src/routes/uploads.ts
```

Якщо route прив'язана тільки до restaurant owner settings, можна монтувати endpoints під існуючі `restaurants` routes.

---

## Prisma Schema

Додати key fields поруч із існуючими URL fields або перейменувати в два кроки.

Безпечний additive варіант:

```prisma
model Restaurant {
  logo          String?
  logoKey       String?
  heroImage     String?
  heroImageKey  String?
}

model RestaurantMenuItem {
  image    String?
  imageKey String?
}

model RestaurantGalleryImage {
  image    String
  imageKey String?
}
```

Пізніше можна перейменувати `logo` -> `logoUrl`, `heroImage` -> `heroImageUrl`, але не робити це одночасно з upload rollout без потреби.

---

## API Contracts

Оновити `packages/contracts/src`:

- upload presign input;
- upload presign response;
- upload confirm input;
- upload confirm response;
- enum/union для allowed folders.

Потім re-export у backend contracts і використати на frontend.

Успішні responses залишаються:

```json
{ "data": { "...": "..." } }
```

---

## Upload Flow

1. Admin UI просить presigned URL.
2. Backend перевіряє auth, restaurant ownership, folder, MIME, size.
3. Backend генерує object key:

```text
restaurants/{restaurantId}/{folder}/{uuid}.{ext}
```

4. Browser завантажує файл напряму в S3/R2.
5. Frontend викликає confirm endpoint.
6. Backend перевіряє, що key належить цьому restaurant і folder allowed.
7. Backend зберігає public URL/key у відповідну модель.
8. При заміні файлу backend видаляє старий key best-effort.

---

## Security Requirements

Presign endpoint:

- тільки authenticated owner;
- folder whitelist;
- MIME whitelist;
- max size;
- key завжди генерує backend, ніколи клієнт;
- short expiry, наприклад 5 хв.

Confirm endpoint:

- не приймати довільний external URL;
- перевіряти prefix `restaurants/{restaurantId}/...`;
- перевіряти folder і key з presign;
- перевіряти object existence/head metadata, якщо provider дозволяє;
- не дозволяти одному owner підтвердити key іншого ресторану.

Cleanup:

- orphan uploads можна чистити cron/job або manual admin task;
- заміна image видаляє старий key best-effort, помилка delete не ламає save.

---

## Frontend Integration

Реальні frontend layers:

- API client: `apps/application/src/shared/api`
- restaurant entity API/types: `apps/application/src/entities/restaurant`
- settings feature/view: `apps/application/src/features/restaurant/manage-settings` і `apps/application/src/views/admin/settings`

UI copy українською.

Для file inputs:

- показувати upload progress;
- preview image;
- error state для розміру/MIME;
- disable save while upload pending.

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

- owner uploads hero image;
- tenant page renders new image;
- replacing image removes old key or logs best-effort failure;
- invalid MIME/oversized file is rejected;
- confirm with another restaurant key is rejected.

---

## Done When

- Backend can presign and confirm uploads safely.
- DB stores URL/key pairs.
- Admin settings can upload/replace images.
- Tenant page renders S3/R2 images.
- Contracts, backend, frontend build/typecheck pass.

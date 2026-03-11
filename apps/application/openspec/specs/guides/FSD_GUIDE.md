# FSD Guide for `apps/application`

Цей документ фіксує цільову архітектуру **Feature-Sliced Design** для `apps/application` у поточному Next.js застосунку.

У цьому проекті шар `views` виконує роль класичного FSD-шару `pages`, а папка `src/app` використовується як тонкий Next.js App Router entrypoint.

## Мета

- зробити шари передбачуваними;
- прибрати хаотичний доступ до API з `views` і `widgets`;
- закріпити місце для `query`, `mutation`, DTO, transport client і UI-композиції;
- спростити масштабування без cross-import хаосу.

## Шари проекту

| Шар        | Призначення                                    | Що тут має бути                                          | Приклади з проекту                                           |
| ---------- | ---------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| `app`      | Next.js entrypoints і глобальна ініціалізація  | `layout.tsx`, route `page.tsx`, providers, store         | `src/app/layout.tsx`, `src/app/providers/*`                  |
| `views`    | Повноцінні сторінки або route-level композиції | збірка `widgets`, `features`, `entities` у готовий екран | `src/views/auth/login`, `src/views/tenant/booking`           |
| `widgets`  | Великі самостійні UI-блоки                     | секції, хедери, сайдбари, композитні блоки               | `src/widgets/tenant-restaurant`, `src/widgets/admin-sidebar` |
| `features` | Дії користувача і завершені сценарії           | форми, mutations, orchestration одного use case          | `src/features/booking/make-reservation`                      |
| `entities` | Бізнес-сутності                                | типи, читання даних, entity-specific UI, entity rules    | `src/entities/restaurant`, `src/entities/booking`            |
| `shared`   | Загальні технічні і UI-ресурси                 | дизайн-система, utils, config, transport base            | `src/shared/ui`, `src/shared/lib`, `src/shared/config`       |

## Головне правило імпортів

Імпорт дозволений тільки вниз по шарах:

- `app` -> `views`, `widgets`, `features`, `entities`, `shared`
- `views` -> `widgets`, `features`, `entities`, `shared`
- `widgets` -> `features`, `entities`, `shared`
- `features` -> `entities`, `shared`
- `entities` -> `shared`
- `shared` -> не імпортує код із вищих шарів

Додатково:

- slice не імпортує інший slice того самого шару напряму;
- доступ між slice йде тільки через їхній `index.ts`;
- deep import в чужий slice заборонений;
- `app` не повинен містити бізнес-логіку фічі або сутності.

## Структура slice

Для `features`, `entities`, `widgets`, `views` використовуємо однаковий принцип: папка відображає зону відповідальності, а не тип файлу.

Базова структура slice:

```text
slice-name/
├── index.ts
├── api/
├── model/
├── ui/
└── lib/
```

Не всі підпапки обов'язкові. Дозволено мати тільки те, що реально потрібно, але:

- `index.ts` обов'язковий для публічного API slice;
- `ui/` містить тільки компоненти;
- `model/` містить типи, schema, client state, pure business rules;
- `api/` містить доступ до зовнішніх або асинхронних даних для цього slice;
- `lib/` містить локальні helper-функції, які не підходять у `shared`.

## Що беремо з `nextjs-fsd-ddd-example`

Орієнтир: структура з [lapidix/nextjs-fsd-ddd-example](https://github.com/lapidix/nextjs-fsd-ddd-example/tree/main/src/pages/home), але без повного DDD і без зайвого ускладнення.

Беремо такі ідеї:

- page slice є тонкою точкою входу, а не місцем для логіки;
- кожен slice має чіткий public API через `index.ts`;
- UI, data access і внутрішні трансформації не змішуються в одному файлі;
- якщо slice росте, його можна деталізувати внутрішньо, не ламаючи зовнішній API;
- мапінг між transport DTO і внутрішньою моделлю має жити поруч із slice, а не в random `utils`.

Не беремо за замовчуванням:

- repository pattern усюди;
- value objects усюди;
- factories для кожної сутності;
- окремі `core/infrastructure` папки в кожному slice без реальної потреби.

Для цього проекту підхід такий: спочатку простий FSD, а DDD-елементи додаємо тільки там, де з'являється реальна складність домену.

## Рівні складності slice

Щоб не перегнути з архітектурою, у slice є 3 рівні складності.

### Рівень 1. Простий slice

Використовуємо за замовчуванням:

```text
slice-name/
├── index.ts
├── api/
├── model/
├── ui/
└── lib/
```

Підходить для більшості ваших поточних `features`, `widgets`, `entities`.

### Рівень 2. Slice з явним mapping

Якщо backend DTO відрізняється від того, що зручно в UI або бізнес-логіці, додаємо `mapper/`.

```text
slice-name/
├── index.ts
├── api/
├── mapper/
├── model/
├── ui/
└── lib/
```

Це вже дуже корисно для:

- `restaurant`;
- `booking`;
- `customer`;
- майбутніх auth response моделей.

### Рівень 3. Складний доменний slice

Лише якщо в сутності з'являються справжні бізнес-правила, інваріанти або складне створення об'єктів, можна деталізувати `model/`.

```text
entity-name/
├── index.ts
├── api/
├── model/
│   ├── types.ts
│   ├── schema.ts
│   ├── rules.ts
│   └── mapper.ts
├── ui/
└── lib/
```

Важливо: для цього проекту ми не вводимо окремі `factory`, `repository`, `value-objects`, поки вони не розв'язують конкретну проблему.

## Page slice pattern

У зовнішньому прикладі сторінка виглядає як окрема папка `pages/home` з `HomePage.tsx` і `index.ts`. Це хороший патерн, і його варто зберегти у вас, але в шарі `views`.

Цільовий варіант для route-level slice:

```text
src/views/tenant/booking/
├── index.ts
├── ui/
│   ├── restaurant-booking-page.tsx
│   ├── restaurant-not-found.tsx
│   └── restaurant-skeleton.tsx
├── model/
└── lib/
```

Правило:

- `app/.../page.tsx` тільки підключає `view`;
- `views/*/index.ts` експортує page component;
- page component збирає екран із `widgets`, `features`, `entities`;
- page component не містить raw transport logic.

## Публічний API slice

Це одна з найсильніших ідей у прикладі, і її треба тримати жорстко.

Кожен slice повинен експортувати назовні тільки те, що іншим шарам справді дозволено знати:

- компонент;
- hook;
- тип;
- константу;
- helper, якщо він частина контракту slice.

Не можна імпортувати щось напряму з `ui/*`, `model/*`, `api/*` іншого slice, якщо це не ваш власний slice.

Добре:

```ts
import { RestaurantBookingPage } from "@/views/tenant/booking";
import { BookingForm } from "@/features/booking/make-reservation";
import { restaurantApi } from "@/entities/restaurant";
```

Погано:

```ts
import { RestaurantBookingPage } from "@/views/tenant/booking/ui/restaurant-booking-page";
import { BookingSchema } from "@/features/booking/make-reservation/model/schema";
```

## Як трактувати `app` у Next.js

У цьому проекті `src/app` не є місцем для FSD-бізнес-логіки.

`src/app` має містити:

- route files (`page.tsx`, `layout.tsx`);
- глобальні providers;
- store setup;
- глобальні стилі;
- framework-specific glue code.

`src/app` не має містити:

- `fetch`/`axios` логіку конкретної сутності;
- `useQuery`/`useMutation` для конкретної сторінки;
- форму або workflow, які належать `feature`;
- entity-specific transform логіку.

Правильний route entrypoint:

```tsx
import { RestaurantBookingPage } from "@/views/tenant/booking";

interface Props {
  params: Promise<{ domain: string }>;
}

export default async function Page({ params }: Props) {
  const { domain } = await params;
  return <RestaurantBookingPage domain={domain} />;
}
```

Тобто `app` отримує route params, cookies, headers, робить framework wiring і передає дані вниз.

## Де має жити API

Нижче зафіксовано обов'язковий розподіл відповідальності.

### 1. `src/shared/api`

Тут живе спільний transport layer, який не належить жодній конкретній фічі:

- базовий `fetch`/client wrapper;
- base URL;
- auth headers/interceptors;
- common error mapping;
- shared DTO helpers;
- query key factories, якщо вони справді глобальні.

Тут не повинно бути бізнес-іменованих React hooks на кшталт `useRestaurant` або `useCreateBooking`.

Приклад:

```text
src/shared/api/
├── client.ts
├── types.ts
├── errors.ts
└── auth.ts
```

### 2. `src/entities/*/api`

Тут живе API для **читання і представлення сутності**.

Сюди відносимо:

- запити на отримання однієї сутності;
- списки сутностей;
- entity-specific query hooks;
- адаптери response -> entity model;
- query keys, які належать конкретній сутності.

Приклади:

- отримати ресторан за доменом -> `src/entities/restaurant/api`
- отримати список бронювань -> `src/entities/booking/api`
- отримати клієнта або список клієнтів -> `src/entities/customer/api`

Якщо операція відповідає на питання "які дані цієї сутності треба показати?", її місце в `entities`.

### 3. `src/features/*/api`

Тут живе API для **дії користувача або workflow**.

Сюди відносимо:

- create/update/delete mutations;
- submit form;
- login/register/forgot-password;
- create reservation;
- send contact request;
- feature-specific optimistic update, invalidate, orchestration.

Приклади:

- створити бронювання -> `src/features/booking/make-reservation/api`
- авторизація email/password -> `src/features/auth/email-auth/api`
- відправити контактну форму -> `src/features/contact/send-contact-request/api`

Якщо операція відповідає на питання "що користувач зараз робить?", її місце в `features`.

### 4. `views` і `widgets`

`views` і `widgets` не повинні містити transport logic.

Допустимо:

- імпортувати готовий hook із `entities/*/api` або `features/*/api`;
- отримувати готові дані пропсами;
- композиційно збирати UI.

Недопустимо:

- писати `fetch`, `axios`, raw client calls;
- створювати новий `useQuery`/`useMutation` прямо в `ui` сторінки або віджета;
- дублювати query key і caching logic.

Правило просте: `views` і `widgets` споживають API, але не визначають його.

## Рекомендований потік роботи з API

Коли з'являється новий backend endpoint:

1. Створити або оновити transport-частину в `src/shared/api`, якщо потрібен новий client/helper.
2. Визначити, це `entity read` чи `feature action`.
3. Додати slice-specific функцію або hook в `entities/*/api` чи `features/*/api`.
4. Експортувати його через `index.ts` slice.
5. Використати цей публічний API у `widgets` або `views`.
6. Залишити `app` thin: тільки route wiring, providers, prefetch за потреби.

## React Query правила

- `useQuery` і `useMutation` створюємо в `api/` конкретного `entity` або `feature`;
- `queryKey` оголошуємо поряд із hook або в тому ж slice;
- invalidate робимо у mutation того ж `feature`;
- UI-компоненти не повинні знати про transport details;
- якщо потрібно SSR/prefetch у `app`, route викликає slice-level API, а не raw `fetch`.

## Що куди класти в цьому проекті

Нижче наведено пряме мапування для поточних сценаріїв:

| Сценарій                            | Де має жити                                     |
| ----------------------------------- | ----------------------------------------------- |
| Отримати ресторан по домену         | `src/entities/restaurant/api`                   |
| Отримати bookings для адмінки       | `src/entities/booking/api`                      |
| Отримати customers для адмінки      | `src/entities/customer/api`                     |
| Створити бронювання                 | `src/features/booking/make-reservation/api`     |
| Відправити contact форму            | `src/features/contact/send-contact-request/api` |
| Login/Register/Forgot password      | `src/features/auth/email-auth/api`              |
| Base client, auth headers, base url | `src/shared/api`                                |
| ReactQueryProvider, StoreProvider   | `src/app/providers`                             |

## Поточні відхилення, які варто виправити

### `views/tenant/booking`

Зараз `src/views/tenant/booking/ui/restaurant-booking-page.tsx` містить `useQuery`.

Правильніше:

- винести query hook в `src/entities/restaurant/api/use-restaurant-by-domain.ts`;
- експортувати його через `src/entities/restaurant/index.ts`;
- у `RestaurantBookingPage` використовувати тільки готовий hook.

### `features/contact/send-contact-request`

Зараз submit side effect живе всередині `ui/contact-form.tsx`.

Правильніше:

- створити `src/features/contact/send-contact-request/api/use-send-contact-request.ts`;
- винести async submit туди;
- компонент форми лишити лише для UI, form state і рендеру.

### `shared/lib/hooks/redux.ts`

Зараз `shared` імпортує типи з `app/store`, а це порушує базове правило FSD: `shared` не має залежати від `app`.

Правильніше:

- перенести typed Redux hooks у `src/app/store/hooks.ts` або `src/app/providers/store/hooks.ts`;
- імпортувати їх у нижчі шари вже з `app`, тільки там, де це справді потрібно.

## Приклад цільової структури

```text
src/
├── app/
│   ├── layout.tsx
│   ├── providers/
│   └── store/
├── views/
│   └── tenant/booking/
├── widgets/
│   └── tenant-restaurant/
├── features/
│   ├── booking/make-reservation/
│   │   ├── api/
│   │   ├── model/
│   │   ├── ui/
│   │   └── index.ts
│   └── contact/send-contact-request/
├── entities/
│   ├── restaurant/
│   │   ├── api/
│   │   ├── model/
│   │   └── index.ts
│   ├── booking/
│   └── customer/
└── shared/
    ├── api/
    ├── config/
    ├── lib/
    └── ui/
```

## Короткі правила для команди

- Будь-який зовнішній API endpoint повинен входити в систему через `shared/api` + slice `api`.
- Читання сутностей йде в `entities`.
- Дії користувача йдуть у `features`.
- `views` збирають сторінку, але не описують transport logic.
- `widgets` складають великі блоки, але не роблять raw API calls.
- `shared` не знає нічого про `app`, `views`, `widgets`, `features`, `entities`.
- Будь-який slice експортує публічний API через `index.ts`.

## Checklist перед merge

- [ ] Новий код покладено у правильний шар.
- [ ] Немає імпортів угору по шарах.
- [ ] Немає deep import у чужий slice.
- [ ] `views` і `widgets` не містять raw API calls.
- [ ] `useQuery`/`useMutation` лежать у `entities/*/api` або `features/*/api`.
- [ ] Публічний API slice описаний у `index.ts`.
- [ ] `shared` не залежить від `app`.

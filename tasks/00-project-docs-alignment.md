# Task 00 — Project Docs Alignment

## Мета

Підготувати документацію так, щоб будь-яку наступну задачу можна було реалізовувати без здогадок про структуру репозиторію, env, команди або порядок робіт.

---

## Чому це потрібно

У проєкті вже є реальні frontend/backend flows, shared contracts і Prisma setup. Старі або абстрактні приклади в task-файлах можуть привести до створення паралельної архітектури, наприклад `src/modules/...`, хоча актуальний backend використовує `routes/`, `domains/`, `contracts/`, `core/` і `lib/`.

Перед великими змінами треба зафіксувати поточну правду про код.

---

## Що оновити

### Root README

Файл `README.md` має містити:

- короткий опис продукту;
- структуру monorepo;
- актуальні app/package names;
- основні dev/build/typecheck команди;
- список базових env variables;
- посилання на `tasks/README.md`;
- правило contracts-first для API changes.

### Task index

Файл `tasks/README.md` має містити:

- актуальний список задач;
- залежності між задачами;
- рекомендований порядок реалізації;
- Definition of Done;
- попередження про реальні шляхи:
  - `apps/backend/prisma/schema.prisma`
  - `apps/backend/src/routes`
  - `apps/backend/src/domains`
  - `packages/contracts/src`
  - `apps/application/src/entities|features|views|shared`

### App-specific docs

Перевірити, що:

- `apps/backend/AGENTS.md` описує поточний backend;
- `apps/application/AGENTS.md` не суперечить реальному frontend setup;
- якщо top-level docs кажуть одне, а код інше — docs треба оновити під код.

---

## Мінімальні команди перевірки

```bash
pnpm check-types
pnpm build
```

Якщо задача торкається тільки документації, достатньо перевірити, що markdown файли відкриваються і внутрішні посилання в `tasks/` ведуть на існуючі файли.

---

## Done When

- `README.md` не порожній і описує актуальний monorepo.
- `tasks/README.md` містить повний roadmap.
- У task-файлах немає інструкцій, які змушують створювати паралельні backend/frontend структури.
- Нові задачі мають чіткі залежності й validation expectations.

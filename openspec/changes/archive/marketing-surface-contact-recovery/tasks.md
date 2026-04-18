## 1. Marketing surface boundaries

- [x] 1.1 Оновити marketing header/footer і CTA-компоненти так, щоб root-domain marketing не показував admin/profile-навігацію
- [x] 1.2 Реалізувати правило переходів `marketing -> register | onboarding` для гостей і автентифікованих користувачів
- [x] 1.3 Перевірити, що marketing-маршрути залишаються публічними і не змішуються з admin/tenant surface у поточному proxy/routing setup

## 2. Real contact lead intake

- [x] 2.1 Додати Prisma-модель і міграцію для збереження marketing contact requests
- [x] 2.2 Додати backend-контракт, public route і domain logic для валідації та запису contact request у `{ data: ... }` форматі
- [x] 2.3 Замінити `mockRequest` у marketing contact form на реальний API-виклик з pending/success/error станами

## 3. Real password recovery

- [x] 3.1 Додати Prisma-модель і backend-утиліти для password reset token з expiry, single-use і безпечним зберіганням
- [x] 3.2 Реалізувати backend endpoints для request/reset password recovery, включно з generic response, доставкою reset link і revoke активних сесій після успішного reset
- [x] 3.3 Оновити frontend `forgot-password` flow і додати reset-password screen, які працюють через реальний API

## 4. Validation

- [x] 4.1 Запустити `pnpm --filter booking-system check-types` і `pnpm --filter booking-system build`
- [x] 4.2 Запустити `pnpm --filter @booking/backend check-types` і `pnpm --filter @booking/backend build`

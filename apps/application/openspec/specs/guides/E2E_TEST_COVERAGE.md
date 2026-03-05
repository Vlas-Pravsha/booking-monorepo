# E2E Test Coverage Guide

This guide defines the architectural patterns and plans for **End-to-End (E2E) Testing** in the **table-reserve.com** Smart Booking System.

## 📐 General Principles

1.  **Critical Paths**: Focus on critical business user journeys (Booking, Auth, Admin).
2.  **Black-Box Testing**: Treat the application as a black box (interact with UI elements).
3.  **Tenant-Aware**: Tests must work across different tenant domains (`[domain]`).
4.  **Ukrainian UI**: Assert on Ukrainian text to verify correct localization.
5.  **Clean State**: Each test should run with a predictable (mocked or fresh) database state.

## 🏗️ Technical Implementation (Strategy)

### Tools (Planned)

- **Playwright**: For cross-browser E2E testing.
- **Vitest**: For unit and integration tests (TBD).
- **Zod Schemas**: Used to validate API responses in tests.

### Test Structure

Organize tests by features or views:

- `tests/e2e/auth/`
- `tests/e2e/booking/`
- `tests/e2e/admin/`

### Example Test (Playwright)

```typescript
import { expect, test } from "@playwright/test";

test("user can create a booking", async ({ page }) => {
  await page.goto("https://demo.table-reserve.com/booking");

  await page.click("text=Обрати стіл");
  await page.click("text=Стіл №5");

  await page.fill('input[name="guests"]', "4");
  await page.click('button:has-text("Забронювати")');

  await expect(page.locator("text=Бронювання успішне")).toBeVisible();
});
```

## 🏗️ Critical Paths to Cover

- [ ] **Auth**: Login, Logout, Password Recovery (Ukrainian).
- [ ] **Tenant Selection**: Correct landing page based on domain.
- [ ] **Booking Flow**: Table selection, Guest count, Success state.
- [ ] **Admin Dashboard**: View bookings, Manage tables, Restaurant settings.
- [ ] **Multi-Tenancy**: Data isolation between two different domains.

## 📁 Organization

- **Tests**: `tests/`.
- **Mocks**: `tests/mocks/`.
- **Fixtures**: `tests/fixtures/`.

## 🚨 Guidelines for Agent Developers

- **Assert on Ukrainian**: Use `expect(page.locator('text=...')).toBeVisible()` with Ukrainian strings.
- **Clean Database**: Ensure tests don't leave side effects that break subsequent runs.
- **Isolate Tenants**: Test that a user on `tenant1.com` cannot see data from `tenant2.com`.

## 🧪 Verification Checklist

- [ ] Are all critical paths covered by E2E tests?
- [ ] Do tests pass on multiple browsers?
- [ ] Are assertions based on Ukrainian UI text?
- [ ] Does the test environment mirror the production multi-tenancy?
- [ ] Is the data isolation verified between tenants?

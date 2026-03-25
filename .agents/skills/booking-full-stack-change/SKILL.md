---
name: booking-full-stack-change
description: Use when a feature or bug spans apps/application and apps/backend, especially when frontend and backend must stay aligned.
version: 1.0.0
---

# Booking Full-Stack Change

Use this workflow for any product change that touches both the Next.js frontend and the Hono/Prisma backend.

## Goals

- Keep contracts, domain logic, and UI behavior aligned.
- Avoid frontend-only workarounds when backend support is required.
- End with both layers validated.

## Workflow

1. Read the root `AGENTS.md`, then the app-specific guides in `apps/application/AGENTS.md` and `apps/backend/AGENTS.md`.
2. Identify the current data flow:
   - frontend route, hook, or component
   - backend route and contract
   - domain logic and Prisma model/select/mappers
3. Decide whether the work is:
   - frontend-only
   - backend-only
   - true full-stack
4. For true full-stack work, change the backend contract first:
   - update Zod schemas in `apps/backend/src/contracts/zod`
   - update route handlers if needed
   - update domain logic and Prisma usage
5. Update frontend consumers:
   - entity or feature API hook
   - view/widget/component flow
   - cache invalidation and optimistic assumptions
6. Check for multi-tenant correctness:
   - root domain
   - admin subdomain
   - tenant subdomain
7. Run the minimum validation for both apps.
8. Review the final diff against `code_review.md`.

## Done When

- Backend and frontend use the same contract shape.
- Any user-visible flow works without hidden mock assumptions.
- Relevant build/typecheck commands were run for every touched app.

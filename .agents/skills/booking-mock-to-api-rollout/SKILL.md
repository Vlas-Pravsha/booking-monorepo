---
name: booking-mock-to-api-rollout
description: Use when replacing mocked frontend flows with real API-backed implementations in this repo.
version: 1.0.0
---

# Booking Mock To API Rollout

Use this workflow when a frontend flow currently uses `mockRequest` and needs to become a real backend-backed feature.

Current hotspots include:

- contact requests
- tenant reservation submission
- forgot password

## Workflow

1. Find the mocked entry point in `apps/application` and confirm which user flow it serves.
2. Trace the intended persistent behavior:
   - request payload
   - response payload
   - auth requirements
   - owner or tenant scope
3. Add or update the backend pieces in `apps/backend`:
   - Zod contract
   - route
   - domain logic
   - Prisma reads/writes or schema changes if persistence is needed
4. Replace `mockRequest` usage on the frontend with real `apiRequest` usage.
5. Add query invalidation or cache updates where the flow changes visible data.
6. Keep the backend response envelope consistent with existing frontend helpers.
7. Validate both apps and confirm the mocked path is fully removed or intentionally retained.

## Watch Outs

- Do not leave a partial integration where the UI appears complete but the backend still lacks the real workflow.
- Do not introduce a new ad hoc fetch helper when `src/shared/api` already covers the need.
- Do not change response shapes in only one layer.

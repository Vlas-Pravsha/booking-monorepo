## Why

The backend already exposes multiple public and authenticated REST endpoints, but the project has no machine-readable API contract or interactive documentation surface for local development and integration work. Adding Swagger-backed API docs now will reduce contract drift between frontend and backend, speed up manual verification, and make the current Hono + Zod routes easier to inspect and maintain.

## What Changes

- Add backend-generated OpenAPI documentation for the current REST API groups under `/api`.
- Expose a Swagger UI page and raw OpenAPI JSON endpoint from the backend for local and shared development environments.
- Document auth requirements, request validation shapes, and success/error envelopes for public, auth, restaurant, and admin routes.
- Establish a repeatable pattern so new Hono routes and Zod contracts stay reflected in the generated API documentation over time.

## Capabilities

### New Capabilities

- `api-reference-documentation`: Generate and publish OpenAPI-backed API reference documentation for the backend, including a browser-based Swagger UI and raw schema output.

### Modified Capabilities

- None.

## Impact

- Backend app wiring in `apps/backend/src/index.ts` and `apps/backend/src/routes`
- Backend request contracts in `apps/backend/src/contracts/zod`
- New backend documentation/config helpers for OpenAPI generation and Swagger UI serving
- Backend dependencies for OpenAPI/Swagger integration in `apps/backend/package.json`
- Developer workflow for manual API verification and cross-app contract review

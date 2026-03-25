## 1. OpenAPI foundation

- [x] 1.1 Add the backend OpenAPI/Swagger dependencies and extend env parsing with an `API_DOCS_ENABLED`-style configuration flag
- [x] 1.2 Create shared OpenAPI configuration/helpers for API metadata, bearer auth, success envelopes, and normalized error responses
- [x] 1.3 Mount backend documentation endpoints for `GET /openapi.json` and `GET /docs` behind the docs-enabled configuration

## 2. Route documentation coverage

- [x] 2.1 Register the `/api/public` routes in the OpenAPI document with request and response schemas derived from the existing Zod contracts
- [x] 2.2 Register the `/api/auth` routes in the OpenAPI document, including password recovery endpoints and their documented envelopes
- [x] 2.3 Register the `/api/restaurants` and `/api/admin` routes in the OpenAPI document with bearer-auth requirements and parameter/body schemas

## 3. Documentation quality and rollout safety

- [x] 3.1 Verify the published schema documents the current transport conventions, including `{ data: ... }` success envelopes and normalized error payloads
- [x] 3.2 Confirm the docs-enabled flag behavior for enabled and disabled states without changing existing business endpoint behavior
- [x] 3.3 Run `pnpm --filter @booking/backend check-types` and `pnpm --filter @booking/backend build`

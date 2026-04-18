## Context

The backend currently serves REST endpoints through Hono route modules backed by Zod validation and standardized `{ data: ... }` success envelopes plus normalized error responses. There is no generated API contract, no interactive documentation surface, and no single developer-facing place to inspect auth requirements, request payloads, or route coverage across `/api/public`, `/api/auth`, `/api/restaurants`, and `/api/admin`.

This change is cross-cutting because it touches app bootstrapping, route definitions, request/response contract metadata, and developer workflow. The repo constraints also matter: keep routes thin, reuse existing Zod contracts where possible, preserve the current response envelopes, and avoid introducing frontend-specific documentation flows when the backend itself is the source of truth for the API.

## Goals / Non-Goals

**Goals:**

- Generate an OpenAPI document from the backend's real route and validation definitions instead of maintaining a separate manual YAML file.
- Expose a browser-based Swagger UI and raw OpenAPI JSON from the backend service for local and shared development usage.
- Reflect current auth requirements, path/query/body validation, and standardized success/error envelopes in the published docs.
- Establish a maintainable pattern so future backend routes can be documented as part of their normal contract definition work.
- Keep documentation exposure configurable so production can opt in deliberately instead of publishing docs accidentally.

**Non-Goals:**

- Building a custom frontend documentation portal inside `apps/application`.
- Generating client SDKs, Postman collections, or external portal publishing in this change.
- Reworking the domain layer or changing existing runtime response envelopes just for documentation.
- Introducing endpoint versioning or reorganizing the API surface beyond what is needed to publish docs.

## Decisions

### 1. Use a Hono + Zod OpenAPI integration path instead of a hand-maintained Swagger file

The backend should adopt an OpenAPI-aware routing layer that can derive documentation from the same Zod-backed contracts used for validation. In practice, this means introducing an OpenAPI integration package in `apps/backend` and wiring route metadata close to the existing route modules so the runtime handlers remain the source of truth.

Why:

- The codebase already relies on Zod contracts and thin Hono route handlers, so generated docs can stay aligned with real validation logic.
- A code-first approach reduces contract drift compared with hand-editing `openapi.yaml`.
- Route-level metadata can be added incrementally while preserving the current domain functions and success envelopes.

Alternatives considered:

- Maintain a standalone Swagger/OpenAPI file by hand: simpler to start, but highly prone to drift as routes evolve.
- Generate docs from traffic samples or test fixtures: too indirect and incomplete for this backend.

### 2. Publish docs through dedicated backend endpoints for the schema and UI

The backend should expose two dedicated documentation endpoints from the same server process:

- `GET /openapi.json` for the raw OpenAPI schema
- `GET /docs` for Swagger UI configured against that schema

Why:

- These routes are easy to discover and work well for both browsers and tooling.
- Keeping docs outside the `/api/...` business route groups avoids mixing operational documentation endpoints with product endpoints.
- Serving docs directly from the backend ensures the published contract matches the running service instance.

Alternatives considered:

- Nest docs under `/api/docs` and `/api/openapi.json`: workable, but less conventional and noisier inside the API namespace.
- Serve Swagger UI from the frontend app: adds unnecessary cross-app coupling when the backend owns the contract.

### 3. Make documentation exposure environment-configurable with safe defaults

Documentation publishing should be controlled by a backend env flag, for example `API_DOCS_ENABLED`, with development-safe defaults. The design should default docs to enabled in local development and test-like environments, while production requires an explicit opt-in to publish them.

Why:

- Interactive docs are valuable in development but can be an unnecessary public surface in production.
- An env-driven switch keeps rollout and rollback simple without affecting business endpoints.

Alternatives considered:

- Always enable docs in every environment: easiest operationally, but increases exposure without an explicit decision.
- Only enable docs locally with hardcoded `NODE_ENV` checks: too rigid for staging or internal preview environments.

### 4. Document auth schemes and shared response envelopes as reusable OpenAPI components

The generated schema should define shared components for bearer authentication, standard error responses, and the common `{ data: ... }` success wrapper so route documentation stays consistent across public and protected endpoints.

Why:

- The backend already follows stable transport conventions, and repeating them per route would be noisy and error-prone.
- Reusable components make admin/auth/restaurant route docs easier to read and maintain.

Alternatives considered:

- Describe envelopes inline on every route: duplicates schema fragments and invites inconsistencies.
- Document only request bodies and omit shared responses/auth: faster, but incomplete for real integrators.

### 5. Cover the current API surface first and require the same pattern for future routes

This change should document the current route groups under `/api/public`, `/api/auth`, `/api/restaurants`, and `/api/admin` as the initial supported surface. New backend routes added later should follow the same OpenAPI registration pattern as part of normal contract work.

Why:

- Partial coverage would limit the usefulness of Swagger and leave the most important contract drift problem unsolved.
- Defining the pattern now avoids docs becoming a one-off artifact that stops reflecting the real API.

Alternatives considered:

- Start with only public routes: smaller scope, but poor value for the admin/auth-heavy backend.
- Document only newly added routes going forward: leaves existing API consumers without a reliable reference.

## Risks / Trade-offs

- [OpenAPI-aware route registration touches many existing handlers] -> Keep domain logic unchanged and refactor only the route-definition layer plus shared contract metadata.
- [Docs can drift if future routes skip the registration pattern] -> Make OpenAPI registration part of the route contract convention and validate through backend typecheck/build during future changes.
- [Swagger dependencies add backend complexity] -> Limit new packages to backend-only integration libraries and keep the docs wiring isolated in dedicated modules.
- [Production exposure may be undesirable] -> Gate publication behind an env flag with production opt-in semantics.
- [Some current response shapes may need explicit documentation helpers] -> Introduce shared schema helpers for envelopes and error payloads instead of special-casing each route.

## Migration Plan

1. Add backend dependencies and env parsing for documentation publishing.
2. Introduce OpenAPI configuration/helpers for shared metadata, security schemes, and envelope schemas.
3. Update route definitions to register the current API surface with request/response metadata derived from existing Zod contracts.
4. Mount `GET /openapi.json` and `GET /docs` in the backend app, respecting the docs-enabled flag.
5. Validate with `pnpm --filter @booking/backend check-types` and `pnpm --filter @booking/backend build`.

Rollback:

- Disable API docs via env configuration if publication needs to stop immediately.
- Revert the OpenAPI/Swagger route wiring and route metadata changes without affecting database state, since this change is code-only.

## Open Questions

- Which exact Hono-compatible OpenAPI package best fits the current Zod 4 setup and build pipeline?
- Should staging environments expose docs by default, or should they also require explicit opt-in?

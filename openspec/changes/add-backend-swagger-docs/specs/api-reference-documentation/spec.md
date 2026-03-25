## ADDED Requirements

### Requirement: Backend SHALL publish an OpenAPI document for the current REST API surface

The backend SHALL expose a machine-readable OpenAPI document that describes the supported routes under `/api/public`, `/api/auth`, `/api/restaurants`, and `/api/admin`, including path parameters, query parameters, request bodies, and documented responses.

#### Scenario: Consumer requests the OpenAPI schema

- **WHEN** API documentation publishing is enabled and a consumer sends `GET /openapi.json`
- **THEN** the backend returns an OpenAPI document for the current API surface
- **AND** the document includes operations for the public, auth, restaurant, and admin route groups

#### Scenario: Route contracts appear in the published schema

- **WHEN** a route defines validated params or request bodies through the backend contract layer
- **THEN** the published OpenAPI document includes the corresponding schema metadata for that route

### Requirement: Backend SHALL provide an interactive Swagger UI for API exploration

The backend SHALL expose a browser-accessible Swagger UI that loads the published OpenAPI document and allows developers to inspect available endpoints from a single page.

#### Scenario: Developer opens the docs page

- **WHEN** API documentation publishing is enabled and a browser requests `GET /docs`
- **THEN** the backend returns a Swagger UI page
- **AND** the UI is configured to load the backend OpenAPI document

### Requirement: Published API docs SHALL describe auth and transport conventions

The published documentation SHALL describe which endpoints require bearer authentication and SHALL document the backend's standard response conventions, including the `{ data: ... }` success envelope and normalized error payload shape.

#### Scenario: Protected endpoints show auth requirements

- **WHEN** a developer inspects a protected admin or owner endpoint in the published docs
- **THEN** the endpoint is marked as requiring bearer authentication

#### Scenario: Documented responses reflect API envelopes

- **WHEN** a developer inspects a documented success or error response in the published docs
- **THEN** the response shape matches the backend's transport conventions instead of an undocumented raw domain object

### Requirement: Documentation publishing SHALL be configurable by environment

The backend SHALL allow API documentation publication to be enabled or disabled through configuration so teams can keep docs available in development while controlling exposure in production-like environments.

#### Scenario: Docs are disabled

- **WHEN** API documentation publishing is disabled by backend configuration
- **THEN** the backend does not expose the Swagger UI or OpenAPI schema endpoints

#### Scenario: Docs are enabled in development

- **WHEN** the backend runs in a development workflow with documentation publishing enabled
- **THEN** developers can access both the Swagger UI and raw OpenAPI schema without changing business endpoint behavior

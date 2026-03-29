## ADDED Requirements

### Requirement: Frontend SHALL define color themes through centralized configuration

The frontend SHALL define its supported color themes, semantic color roles, and required mode variants through a centralized typed configuration source instead of scattering palette values across component files.

#### Scenario: Theme configuration declares required semantic roles

- **WHEN** a developer adds or updates a supported color theme
- **THEN** the theme is defined in the centralized configuration layer
- **AND** the configuration includes the semantic color roles required by the shared styling system

### Requirement: Frontend SHALL apply the active color theme without component edits

The frontend SHALL derive its active color palette from configuration so that changing the selected theme does not require editing shared UI, feature, widget, or view components.

#### Scenario: Active palette changes through configuration

- **WHEN** the active color theme is changed in the frontend configuration
- **THEN** the application styling resolves against the newly selected palette
- **AND** existing components continue to consume semantic tokens without code changes in those components

#### Scenario: Color theme remains compatible with light and dark mode

- **WHEN** the application renders in light mode or dark mode
- **THEN** the active color theme provides the semantic values required for that mode
- **AND** the mode switch does not bypass the centralized theme configuration

### Requirement: Surface-specific accents SHALL be expressed through theme tokens

Marketing, admin, and tenant surfaces MAY have distinct visual accents, but those accents SHALL be represented through named theme tokens or palette extensions rather than inline color literals embedded in route-level components.

#### Scenario: Tenant surface uses configured decorative accents

- **WHEN** the tenant booking surface renders decorative accents, panels, buttons, or overlays
- **THEN** those values are sourced from named theme tokens or configured palette extensions
- **AND** the route components do not need inline hardcoded accent literals to preserve the intended look

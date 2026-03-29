## ADDED Requirements

### Requirement: Frontend SHALL audit component color usage before completing the refactor

The frontend refactor SHALL include a reviewable audit of component color usage across shared UI, layouts, features, widgets, and views so the migration scope is explicit and hardcoded color usage is not left to ad hoc discovery.

#### Scenario: Team reviews audit coverage

- **WHEN** a developer reviews the refactor scope for frontend color usage
- **THEN** there is an audit inventory or equivalent migration record covering the affected frontend component areas
- **AND** the record distinguishes migrated items, remaining work, or intentional exceptions

### Requirement: Frontend components SHALL use semantic theme tokens instead of hardcoded colors

Frontend components SHALL rely on semantic theme tokens, theme-aware utilities, or configuration-backed style helpers for colors and interaction states instead of embedding raw `hex`, `rgba`, or non-semantic Tailwind palette utilities in component implementations.

#### Scenario: Shared primitive uses theme-backed styling

- **WHEN** a shared UI primitive such as a button, input, badge, dialog, or calendar renders
- **THEN** its visual states resolve through semantic theme tokens or theme-aware helpers
- **AND** the primitive does not require local hardcoded palette values for its default behavior

#### Scenario: Feature or widget component renders validation and emphasis states

- **WHEN** a feature, widget, or view component renders emphasis, validation, or feedback states
- **THEN** those states use semantic success, warning, info, danger, accent, or surface tokens
- **AND** the component does not fall back to ad hoc color literals for those states

### Requirement: Theme changes SHALL propagate consistently across migrated components

Once components are migrated, switching the configured color theme SHALL update their colors consistently without requiring per-component overrides to preserve normal readability and interaction affordances.

#### Scenario: Configured theme changes after component migration

- **WHEN** the active configured color theme changes
- **THEN** migrated components update their rendered colors through the shared theme contract
- **AND** component hover, focus, border, text, and background treatments remain derived from theme-backed tokens

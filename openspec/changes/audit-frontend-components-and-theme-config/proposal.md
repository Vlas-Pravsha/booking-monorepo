## Why

The frontend already has base CSS tokens in `apps/application/src/app/styles/globals.css`, but the actual color system is split across CSS variables, semantic helper maps, hardcoded `hex` and `rgba` values, Tailwind utility colors such as `bg-amber-400` and `text-red-400`, and inline tenant accent variables. That makes the visual system hard to maintain, creates drift between marketing, admin, and tenant surfaces, and turns palette changes into a manual sweep across many components instead of a configuration change.

## What Changes

- Audit all frontend components in `apps/application` to identify hardcoded colors, duplicated visual patterns, and places where components bypass semantic theme tokens.
- Move palette definitions and related theme tokens into centralized frontend configuration with a clear model for light, dark, and brand-specific variants.
- Introduce a single mechanism for selecting the active color palette from configuration so themes can be switched without editing component code.
- Update shared UI, layout primitives, and feature/widget/view components to consume semantic tokens or theme helpers instead of local color literals.
- Define a migration path for marketing, admin, and tenant booking surfaces, including the areas that currently rely on inline accent variables and decorative gradients.

## Capabilities

### New Capabilities

- `configurable-color-themes`: The frontend defines theme palettes, semantic color roles, and the active color theme through centralized configuration that can be switched without changing component code.
- `frontend-theme-compliance`: Frontend components are audited for color usage and SHALL rely on theme tokens or configuration-backed style helpers instead of hardcoded color values.

### Modified Capabilities

- None.

## Impact

- Frontend theme infrastructure in `apps/application/src/app/styles`, `apps/application/src/app/providers`, and `apps/application/src/shared/config`
- Shared UI primitives in `apps/application/src/shared/ui`
- Marketing, admin, and tenant-facing widgets/views that currently use direct color literals or per-screen accent variables
- Frontend developer workflow for adding new colors, component variants, and future visual themes

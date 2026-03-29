## Context

`apps/application` already uses Tailwind 4 theme tokens backed by CSS custom properties in `src/app/styles/globals.css`, plus `next-themes` in `src/app/providers/theme-provider.tsx` for light/dark mode. At the same time, the codebase contains parallel color sources:

- semantic helper maps in `src/shared/config/theme.ts`
- shared UI components that mostly rely on semantic tokens
- route and layout shells with direct utility colors such as `bg-amber-400` and `bg-cyan-400`
- tenant booking components with hardcoded `hex`, `rgba`, and inline `[--tenant-*]` variables

This split means the frontend has no single source of truth for color palettes. It is especially visible on the tenant booking experience, where decorative gradients, buttons, and status treatments encode palette values directly in component files instead of consuming a theme registry.

The change is frontend-only, but it is cross-cutting because it touches global styling, theme bootstrapping, shared UI primitives, and page-level components across marketing, admin, and tenant surfaces. Repo constraints still apply: preserve existing routing behavior, keep the implementation strict and typed, reuse existing frontend patterns, and keep user-facing copy in Ukrainian when UI text is touched during implementation.

## Goals / Non-Goals

**Goals:**

- Establish a single typed configuration source for frontend color palettes and semantic color roles.
- Support choosing the active color theme without editing component files.
- Keep light/dark mode working while allowing branded palette variants to reuse the same semantic roles.
- Audit the current frontend components and migrate hardcoded color usage to theme tokens or configuration-backed helpers.
- Preserve the current visual intent of marketing, admin, and tenant experiences while making palette changes cheaper and safer.

**Non-Goals:**

- Redesigning the product UX, page structure, or copy beyond what is needed to normalize theme usage.
- Introducing backend-driven theming or tenant-specific persistence in this change.
- Replacing `next-themes` or building a full design-token pipeline outside the application app.
- Eliminating every decorative style helper if it can already be expressed safely through semantic theme tokens.

## Decisions

### 1. Keep CSS custom properties as the runtime styling contract, but generate them from a typed theme registry

The runtime styling contract should remain CSS custom properties because Tailwind 4 and the existing `@theme inline` block already depend on variables such as `--primary`, `--background`, and `--sidebar-accent`. Instead of hardcoding one palette directly in `globals.css`, the app should define typed palette objects in frontend config and map the active theme to the CSS variables consumed by the styling layer.

Why:

- It preserves compatibility with the current Tailwind token setup and shared UI primitives.
- It avoids a disruptive rewrite of existing classes like `bg-primary`, `text-muted-foreground`, and `border-border`.
- It creates a clean separation between semantic roles and concrete palette values.

Alternatives considered:

- Keep all palette values in static CSS only: simple, but difficult to switch and validate from config.
- Push colors into ad hoc component helpers only: too indirect for Tailwind/CSS variable integration and likely to fragment again.

### 2. Separate theme mode from color palette selection

The frontend should keep `next-themes` for light/dark mode and introduce a separate color palette identifier, for example through a `data-color-theme` attribute on the root element. Theme mode controls contrast mode, while color palette controls which semantic values populate that mode.

Why:

- The app already uses `class=\"dark\"` as a stable mechanism, so light/dark behavior should remain intact.
- Palette switching becomes independent from mode switching, which is necessary if the team wants multiple branded palettes across both light and dark variants.
- Components continue to read semantic tokens only and do not need to know which palette is active.

Alternatives considered:

- Encode each palette as its own top-level CSS class and merge light/dark into it: workable, but harder to scale and reason about.
- Replace `next-themes` with a custom provider: unnecessary complexity for a problem the app already solves.

### 3. Model themes around semantic roles, not around per-component class strings

The configuration should define semantic roles such as `background`, `foreground`, `primary`, `accent`, `danger`, `info`, `surface`, and tenant-specific decorative roles where needed. Shared helpers may still expose composed class names, but the source of truth should be theme roles and token maps rather than a growing collection of component-specific hardcoded class strings.

Why:

- Semantic roles let different surfaces share a contract even when their aesthetics differ.
- New palettes become a data problem instead of a find-and-replace problem across components.
- It keeps shared UI and feature/widget/view code aligned with the same design language.

Alternatives considered:

- Store only final class strings in config: fast for a few cases, but brittle and hard to validate.
- Force every component to inline CSS variables manually: consistent in theory, but too verbose in practice.

### 4. Run the refactor as an explicit audit-and-migrate workflow

Implementation should begin with a structured audit that inventories hardcoded colors and assigns each finding to one of a few buckets: shared primitive, layout shell, feature/widget/view, or tenant-specific decorative token. That inventory then drives the migration order and the definition of any missing semantic roles.

Why:

- The current problem is distributed across the codebase, so skipping the audit risks leaving hidden palette drift in place.
- An inventory makes it easier to verify completion and avoid one-off exceptions.
- It prevents over-engineering by adding new tokens only where the audit proves they are needed.

Alternatives considered:

- Refactor opportunistically while touching files: cheaper upfront, but unreliable for a full component sweep.
- Attempt a single bulk rewrite with regexes: faster, but likely to miss intent and break nuanced tenant visuals.

### 5. Preserve special tenant booking visuals by moving them to dedicated theme tokens instead of removing them

The tenant booking flow currently relies on custom accent variables and decorative backgrounds to create a distinct premium look. Those visuals should be preserved, but their values should move into named tenant-oriented tokens or palette extensions rather than remain inline inside `restaurant-booking-page.tsx`, `booking-form.tsx`, and related widgets.

Why:

- The tenant surface has a stronger visual identity than the admin area and should not be flattened into generic colors.
- Moving those accents into config keeps the experience switchable while preserving design intent.
- It reduces the risk that future palette changes break the tenant flow in isolated ways.

Alternatives considered:

- Normalize tenant screens to the same neutral palette as admin: simpler, but loses intentional surface differentiation.
- Leave tenant decorative colors hardcoded as a special case: defeats the main goal of centralized switching.

## Risks / Trade-offs

- [Some current visuals rely on highly specific gradients, alpha blends, and shadow values] -> Introduce dedicated semantic decorative tokens only where the audit shows they are necessary, instead of pretending all visuals fit the base token set.
- [Palette configuration can grow into an untyped blob] -> Define typed theme contracts and validate required semantic roles at compile time.
- [A full component sweep may touch many files and create regression risk] -> Migrate in ordered layers: theme infrastructure first, shared primitives second, then route/view/widget surfaces.
- [Light/dark and palette switching can conflict at the root element] -> Keep responsibilities split between mode and palette attributes and document the precedence clearly.
- [Some hardcoded colors may exist in third-party component wrappers] -> Normalize wrapper-level styling where possible and keep narrowly scoped exceptions explicit.

## Migration Plan

1. Define the typed theme registry and the active-theme selection contract in `src/shared/config` and theme provider infrastructure.
2. Update global styling so CSS variables are populated from the selected palette and mode instead of one inline palette definition.
3. Audit the frontend for hardcoded color usage and map each finding to shared, layout, feature/widget/view, or tenant-specific migration work.
4. Migrate shared UI primitives and layout shells to semantic tokens first so downstream components inherit the new contract.
5. Migrate marketing, admin, and tenant component trees, replacing inline color literals and ad hoc accent variables with theme-backed tokens/helpers.
6. Validate the sweep with `pnpm --filter booking-system check-types` and `pnpm --filter booking-system build`.

Rollback:

- Revert the theme registry and component migrations to the previous static token setup if palette switching introduces regressions.
- Keep the change isolated to frontend styling and config so rollback does not require backend or data changes.

## Open Questions

- Should the active palette be selected only from source configuration, or should the implementation also support a runtime toggle for internal review?
- Does the team want one shared branded palette for all product surfaces, or distinct named presets for admin/marketing and tenant experiences?

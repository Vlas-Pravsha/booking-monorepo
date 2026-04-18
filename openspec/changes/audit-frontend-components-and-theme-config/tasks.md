## 1. Frontend audit

- [ ] 1.1 Audit `apps/application` for hardcoded color usage across shared UI, layouts, features, widgets, and views, and record the migration inventory
- [ ] 1.2 Classify audit findings into shared primitive, layout shell, feature/widget/view, and tenant-specific decorative token workstreams
- [ ] 1.3 Confirm the semantic color roles and any additional decorative tokens required to cover the audited cases

## 2. Theme configuration infrastructure

- [ ] 2.1 Implement a typed theme registry in `apps/application/src/shared/config` for supported palettes and semantic color roles
- [ ] 2.2 Update the theme provider and global style wiring so the active palette is selected from configuration while remaining compatible with light and dark mode
- [ ] 2.3 Move existing palette values and tenant accent variables into centralized theme-backed tokens or palette extensions

## 3. Component migration

- [ ] 3.1 Refactor shared UI primitives and layout shells to consume semantic theme tokens or theme-aware helpers instead of hardcoded color values
- [ ] 3.2 Refactor marketing and admin components that still use direct Tailwind palette utilities or local literals to the new theme contract
- [ ] 3.3 Refactor tenant booking components and route-level decorative styling to use configured theme tokens without losing the intended visual identity

## 4. Verification and rollout safety

- [ ] 4.1 Verify that switching the configured palette updates migrated components without per-component code edits
- [ ] 4.2 Review the final audit inventory for any remaining exceptions and either migrate them or document why they remain
- [ ] 4.3 Run `pnpm --filter booking-system check-types` and `pnpm --filter booking-system build`

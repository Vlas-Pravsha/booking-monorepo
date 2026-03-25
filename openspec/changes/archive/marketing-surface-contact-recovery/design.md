## Context

The booking frontend serves three surfaces from one Next.js app: root-domain marketing, admin on the admin subdomain, and tenant sites on restaurant subdomains. Today the marketing header/footer still expose private navigation for authenticated users, and both the landing-page `contact` form and auth `forgot-password` flow stop at `mockRequest`, so they do not reach backend validation or persistence.

This change is cross-cutting because it touches routing expectations on the public surface, introduces a new public lead-intake workflow, and extends the auth domain with password recovery. The repo rules require frontend/backend alignment, Ukrainian copy, stable `{ data: ... }` API envelopes, and real persistence for production-facing workflows.

## Goals / Non-Goals

**Goals:**

- Make the root-domain marketing site an acquisition-only surface with no admin shortcuts or tenant-management affordances.
- Keep every marketing CTA inside the `marketing -> register -> onboarding` funnel, including the path for authenticated users who return to the landing page.
- Replace the mocked marketing `contact` submission with a real public API backed by server-side validation and persistence.
- Replace the mocked `forgot-password` action with a secure password recovery flow that can be completed through real API calls.
- Preserve the current monorepo structure and existing auth/session response envelopes while extending the platform.

**Non-Goals:**

- Splitting marketing into a separate deployable app or domain.
- Building a restaurant-owner inbox UI for contact leads in this change.
- Redesigning the onboarding flow itself beyond the entry/continuation rules from marketing.
- Expanding password recovery into MFA, SMS, or account-verification features.

## Decisions

### 1. Keep marketing as the root-domain surface inside `apps/application`, but enforce a dedicated marketing navigation policy

The change will stay inside the existing `(marketing)` route group and shared proxy setup. We will remove admin/dashboard-style entry points from marketing header/footer components and replace authenticated marketing actions with a single onboarding continuation path.

Why:

- The proxy model already cleanly separates root/admin/tenant hosts.
- The requested scope is behavioral isolation, not a new deployment boundary.
- Keeping one app avoids duplicate branding/layout systems and reduces routing drift.

Alternatives considered:

- Separate marketing into its own frontend app: clearer isolation, but unnecessary operational and code-sharing overhead for the current MWP.
- Keep auth-aware avatar/admin menu on marketing: simpler to implement, but violates the requirement that marketing remains a public acquisition surface without admin behavior.

### 2. Add a dedicated public lead-intake API backed by persistence

The marketing `contact` form will call a backend public endpoint that validates payloads, stores contact requests, and returns a stable success receipt. A new Prisma model will persist the lead so the workflow remains real even before a CRM or email inbox integration exists.

Why:

- A real API requires server-side validation and traceable storage, not only frontend state changes.
- Persisting the lead keeps the change useful immediately and avoids coupling delivery to an external SaaS decision.

Alternatives considered:

- Submit only to a third-party email service: faster initial routing, but brittle without a configured provider and weak for audit/history.
- Keep a fire-and-forget webhook stub: still effectively mocked from a product standpoint.

### 3. Implement password recovery as a two-step token flow

Password recovery will include:

- a request endpoint that accepts an email and returns a generic success response
- a persisted reset-token record with hashed token, expiry, and single-use semantics
- a reset endpoint that accepts a token plus new password and updates the user password
- a frontend reset page that consumes the token from the recovery link

Why:

- A request-only form is not a complete recovery workflow.
- Hashed, expiring, single-use tokens are the minimum secure baseline.
- A reset page lets the platform finish the workflow without relying on manual database intervention.

Alternatives considered:

- Request-only API with no completion flow: does not satisfy real recovery.
- Returning reset tokens directly in the API response: insecure and not production-appropriate.
- Reusing refresh-session infrastructure for recovery: mixes independent security concerns.

### 4. Introduce an email-delivery abstraction with a development-safe fallback

The backend will send password reset notifications through a small delivery abstraction. Production can use provider-backed credentials, while development can log the reset URL or write it to structured logs without changing the public API contract.

Why:

- The repo has no existing mail provider configuration.
- We still need a real end-to-end backend workflow and a path to production readiness.

Alternatives considered:

- Block the change on selecting a mail provider now: increases scope and slows delivery of the core flow.
- Omit delivery entirely and only store tokens: real persistence, but not a usable password recovery experience.

### 5. Preserve admin access through its proper surface, not through marketing

Owners who need the admin interface will still reach it through the admin subdomain or existing auth flows, but the marketing page itself will not advertise or shortcut to admin. If a signed-in owner lands on marketing, the page should encourage continuation into onboarding rather than opening private controls from the public shell.

Why:

- This preserves the mental model of three separate product surfaces.
- It keeps public navigation aligned with the acquisition funnel.

Alternatives considered:

- Conditional admin CTA for signed-in users: helpful for power users, but breaks the public-surface rule and muddies marketing analytics.

## Risks / Trade-offs

- [No mail provider is configured yet] -> Introduce an adapter interface with env-based provider wiring and a development logging fallback so the backend contract stays stable while delivery infrastructure catches up.
- [Public contact endpoint can attract spam or abuse] -> Enforce schema validation now and leave room for follow-up throttling/captcha without changing the endpoint contract.
- [Removing admin shortcuts from marketing may surprise already-signed-in owners] -> Keep the admin surface unchanged on its own subdomain and make onboarding continuation explicit on marketing.
- [Password reset introduces new persistence and cleanup needs] -> Store expiry timestamps, invalidate tokens after use, and schedule cleanup as a lightweight maintenance concern or lazy-delete on reads.
- [Resetting passwords without session handling can leave stale sessions active] -> Revoke active auth sessions for the user when the password is successfully reset.

## Migration Plan

1. Add Prisma models and migration(s) for contact requests and password reset tokens.
2. Add backend contracts, routes, domain logic, and delivery abstraction.
3. Wire frontend marketing/contact and auth recovery screens to the real APIs.
4. Update marketing navigation/CTA rules so root-domain behavior matches the new surface boundaries.
5. Validate with frontend and backend typecheck/build commands.

Rollback:

- Revert the frontend API wiring to the previous mock-based behavior if needed.
- Disable the new public endpoints at the route layer if recovery/contact delivery causes issues.
- Keep added tables inert if the code is rolled back; they are additive and do not break existing flows.

## Open Questions

- Which provider should power production email delivery for password recovery?
- Should contact requests later be exposed in an owner/admin view, or remain an internal acquisition queue for now?

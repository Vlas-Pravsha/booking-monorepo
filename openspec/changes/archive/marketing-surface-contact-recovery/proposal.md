## Why

Root-domain marketing still mixes acquisition with private/admin navigation and relies on mocked submit flows for `contact` and `forgot-password`. For the MWP, the public surface has to become a clean entrepreneur funnel that consistently leads into registration and onboarding, while both forms run through real backend workflows instead of local stubs.

## What Changes

- Fix the marketing site as a dedicated public surface on the root domain with no admin-specific entry points or tenant-management actions.
- Restrict marketing-site CTAs and navigation so they lead only to registration or onboarding continuation, including the authenticated-user path.
- Replace the mocked marketing `contact` submit with a validated public API flow that records inbound lead requests for follow-up.
- Replace the mocked `forgot-password` submit with a real password recovery flow backed by reset tokens and backend delivery logic.
- Add the backend contracts, persistence, and frontend API integrations needed to support both public flows without changing the existing auth/session response envelope.

## Capabilities

### New Capabilities

- `marketing-acquisition-surface`: Define the root-domain marketing site as a public acquisition-only surface with approved navigation and CTA destinations.
- `contact-lead-intake`: Accept, validate, and persist marketing contact requests through a real public API used by the landing-page contact form.
- `password-recovery`: Let platform users request and complete password recovery through a real API-backed reset flow instead of a mock success state.

### Modified Capabilities

- None.

## Impact

- Frontend marketing surface in `apps/application/src/app/(marketing)`, `src/views/marketing`, `src/widgets/marketing-header`, and `src/widgets/marketing-footer`
- Frontend contact and auth flows in `apps/application/src/features/contact` and `apps/application/src/features/auth/email-auth`
- Backend public/auth API in `apps/backend/src/routes`, `src/contracts/zod`, and `src/domains/user`
- Prisma schema and migrations for stored contact requests and password reset tokens
- Environment and delivery plumbing for password reset notifications in local and production setups

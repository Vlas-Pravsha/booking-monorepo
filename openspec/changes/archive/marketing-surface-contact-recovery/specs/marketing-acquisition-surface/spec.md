## ADDED Requirements

### Requirement: Marketing surface remains public and separate from admin behavior

The system SHALL treat the root-domain marketing site as a public acquisition surface and MUST NOT expose admin dashboard controls, owner management menus, or tenant-management actions inside the marketing shell.

#### Scenario: Guest opens the marketing homepage

- **WHEN** an unauthenticated visitor opens the root-domain homepage
- **THEN** the system shows only marketing content, public navigation, and acquisition actions

#### Scenario: Authenticated user opens the marketing homepage

- **WHEN** an authenticated platform user opens the root-domain homepage
- **THEN** the system does not render admin navigation or profile controls inside the marketing header/footer

### Requirement: Marketing calls-to-action stay inside the acquisition funnel

The marketing surface SHALL route primary actions only toward platform registration or onboarding continuation, and MUST NOT use marketing CTAs to send the user directly into the admin interface.

#### Scenario: New visitor clicks the primary CTA

- **WHEN** an unauthenticated visitor clicks a primary marketing CTA
- **THEN** the system routes the visitor to platform registration

#### Scenario: Returning signed-in owner clicks the primary CTA

- **WHEN** an authenticated user clicks the primary marketing CTA
- **THEN** the system routes the user to onboarding so they can continue setup instead of entering admin from marketing

#### Scenario: User browses marketing navigation

- **WHEN** the user uses the marketing header, footer, or section-level CTA links
- **THEN** each link either stays on public marketing content or routes to registration/onboarding only

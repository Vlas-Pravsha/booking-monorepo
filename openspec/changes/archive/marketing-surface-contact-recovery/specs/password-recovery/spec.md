## ADDED Requirements

### Requirement: Users can request password recovery without account enumeration

The system SHALL expose a password recovery request endpoint that accepts a platform user's email address and MUST return a generic success response regardless of whether the email exists.

#### Scenario: Existing user requests a password reset

- **WHEN** a registered user submits their email on the forgot-password screen
- **THEN** the system returns a generic success response and creates a password reset token for that account

#### Scenario: Unknown email is submitted

- **WHEN** an email address with no matching user is submitted on the forgot-password screen
- **THEN** the system still returns the same generic success response and does not reveal whether the account exists

### Requirement: Password reset tokens are secure and single-use

The system SHALL generate password reset tokens with expiration, store them securely, and invalidate them after successful use.

#### Scenario: Valid token is consumed

- **WHEN** the user opens a valid reset link and submits a compliant new password
- **THEN** the system accepts the token once, updates the password, and invalidates that reset token

#### Scenario: Invalid or expired token is used

- **WHEN** the user submits a reset request with an invalid, expired, or already-used token
- **THEN** the system rejects the request with a normalized API error response

### Requirement: Password recovery can be completed from the frontend

The system SHALL provide a frontend recovery flow that starts at `forgot-password` and ends with a reset-password action backed by the real API.

#### Scenario: Recovery email is sent

- **WHEN** a valid account requests password recovery
- **THEN** the system delivers a reset link through the configured backend notification channel

#### Scenario: Password is reset successfully

- **WHEN** the user opens the reset link and submits a valid new password
- **THEN** the UI confirms success and routes the user back to sign in with the new password

### Requirement: Password reset revokes existing sessions

The system MUST revoke active auth sessions for the user after a successful password reset.

#### Scenario: User resets password while sessions exist

- **WHEN** a password reset succeeds for a user with active refresh sessions
- **THEN** the system revokes those sessions so old credentials cannot continue refreshing access

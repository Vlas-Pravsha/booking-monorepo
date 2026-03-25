## ADDED Requirements

### Requirement: Marketing contact form submits through a real public API

The system SHALL provide a public backend endpoint for marketing contact requests, and the landing-page contact form MUST submit to that endpoint instead of using mocked client-side success responses.

#### Scenario: Contact request is submitted successfully

- **WHEN** a visitor submits a valid name, phone, email, and message from the marketing contact form
- **THEN** the backend accepts the request through the public API and returns a success response in the `{ data: ... }` envelope

### Requirement: Contact requests are validated and persisted

The system SHALL validate required contact fields on the backend and MUST persist each accepted contact request for later follow-up.

#### Scenario: Backend stores an accepted lead

- **WHEN** a contact request passes validation
- **THEN** the system stores the lead data with submission metadata in persistent storage

#### Scenario: Backend rejects invalid contact payload

- **WHEN** the request is missing required fields or contains invalid field formats
- **THEN** the system rejects the submission with a normalized API error response

### Requirement: Marketing UI reflects the real API result

The contact form UI SHALL show pending, success, and error states based on the backend response rather than a timer-based mock.

#### Scenario: Submission succeeds

- **WHEN** the public contact API returns success
- **THEN** the UI shows a success confirmation and allows the user to start another request

#### Scenario: Submission fails

- **WHEN** the public contact API returns an error
- **THEN** the UI keeps the user on the form and presents a recoverable error state

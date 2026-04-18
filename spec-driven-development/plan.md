# Plan: Bangkok Pet Grooming Booking Platform MVP

## Goal

Translate the Phase 1 spec into an implementation approach that can be reviewed before task breakdown and code.

This plan assumes the current spec in [spec.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/spec-driven-development/spec.md) is directionally correct and incorporates the newly added Thai and English support requirement.

## Implementation Strategy

Build the system in layers, with schedule truth and policy logic first, then booking channels, then operational surfaces.

The order matters:

1. Define canonical booking rules and status transitions.
2. Build the backend around one source of truth for schedule, booking, verification, and payment state.
3. Add the customer flow for online bookings.
4. Add the merchant flow for availability, offline bookings, and operational status cleanup.
5. Add reminders, reconfirmation, localization, and reporting.

The system should not begin with UI-first prototyping that bypasses domain rules. The hard part is policy correctness, not screens.

## Major Components

### 1. Domain and policy layer

Core responsibilities:

- booking state machine
- service eligibility and duration logic
- instant-book vs request-confirm routing
- merchant-decline outcome handling
- cancellation and no-show policy resolution
- hold, deposit, release, capture, and refund decision rules
- merchant correction-window rules

Dependencies:

- none beyond language/runtime choices

Why first:

- every other layer depends on these rules

### 2. Data model and canonical schedule

Core responsibilities:

- merchant, shop, service, pet, customer, booking, payment-protection, notification, and availability entities
- inventory-control fields for resource locking, blocking, and cutoff configuration
- canonical schedule model for both online and offline bookings
- audit fields for status changes and operator actions

Dependencies:

- domain model and state machine decisions

Why second:

- the product fails if capacity exists in more than one place

### 3. Booking and verification backend

Core responsibilities:

- booking creation API
- availability resolution
- offline booking ingestion API
- booking-status notification event generation
- OTP verification
- reminder and reconfirmation workflow
- payment-link orchestration
- payment provider callbacks or webhooks

Dependencies:

- domain rules
- data model

### 4. Localization foundation

Core responsibilities:

- Thai and English translation structure
- locale detection and preference persistence
- translation keys for booking states, reminders, errors, and merchant operations
- formatting rules for date, time, currency, and notification copy

Dependencies:

- basic product copy and workflow definitions

Why early:

- localization should be foundational, not retrofitted after UI is built

### 5. Customer application

Core responsibilities:

- onboarding
- shop search with availability discovery
- pet profile creation and reuse
- booking flow
- confirmation state visibility
- repeat booking
- Thai and English system UI

Dependencies:

- backend booking endpoints
- localization layer

### 6. Merchant application

Core responsibilities:

- availability management
- current and upcoming booking search
- service template management
- booking board
- fast status edits
- resource lock and block controls
- booking cutoff controls
- offline booking capture
- bulk status updates
- Thai and English system UI

Dependencies:

- backend scheduling and booking endpoints
- localization layer

### 7. Notifications and operational reporting

Core responsibilities:

- booking-created, confirmed, declined, reminder, and reconfirmation notifications
- reconfirmation prompts
- late-arrival and no-show policy messages
- booking and revenue summaries
- localized transactional content

Dependencies:

- backend events
- localization

## Recommended Implementation Order

### Phase A: Domain foundation

Deliverables:

- booking states and transition rules
- policy engine for cancellation, no-show, and payment outcomes
- instant vs request-confirm routing rules
- bilingual translation-key inventory for system-managed flows
- explicit decline outcome for request-based bookings

Checkpoint:

- The state machine and policy matrix can be tested independently of UI.

### Phase B: Canonical schedule and backend core

Deliverables:

- canonical booking model
- merchant availability model
- inventory controls for locking, blocking, and cutoff times
- online and offline booking ingestion
- OTP verification hooks
- payment-protection orchestration

Checkpoint:

- Both online and offline bookings can block capacity in one system.

### Phase C: Customer journey

Deliverables:

- onboarding
- search, availability discovery, and pet profile
- booking flow for routine services
- request-confirm flow for exception services
- localized customer copy in Thai and English

Checkpoint:

- A customer can complete an end-to-end booking flow in both languages.
- A first-time customer can finish onboarding and reach booking-ready state quickly.

### Phase D: Merchant operations

Deliverables:

- availability editor
- booking board
- booking search
- fast status updates
- resource lock and block controls
- offline booking entry
- bulk cleanup flows
- localized merchant copy in Thai and English

Checkpoint:

- A merchant can operate the booking day without falling back to a second shadow schedule.

### Phase E: Operational automation

Deliverables:

- booking-status notifications, reminder jobs, and reconfirmation jobs
- no-show and grace-period handling
- revenue summary and operational dashboard

Checkpoint:

- A booking can move from confirmation to outcome with the correct notifications and payment resolution.

## Risks and Mitigations

### Risk: payment holds may behave differently across Thai providers

Mitigation:

- validate PSP capabilities before schema hardening
- isolate payment-protection logic behind provider adapters
- keep deposit and card-hold policy configurable by service or merchant

### Risk: hybrid booking rules become too confusing

Mitigation:

- define a narrow V1 rule set for what is instant-bookable
- make the reason for merchant confirmation explicit in the UI
- keep exception triggers deterministic and testable

### Risk: bilingual support expands into full content translation

Mitigation:

- scope V1 bilingual support to system-managed text unless otherwise approved
- keep merchant-generated content translation as a separate product decision
- establish translation keys before UI implementation

### Risk: onboarding becomes too heavy and kills first-booking conversion

Mitigation:

- collect only required identity, language, and booking-critical setup upfront
- defer optional profile enrichment until it is needed
- test onboarding against time-to-first-search and time-to-first-booking goals

### Risk: waitlist or cancellation-fill scope sneaks into MVP without proper state design

Mitigation:

- keep waitlist and offered-slot flows explicitly out of V1 unless approved
- avoid partial implementations that introduce hidden states without policy rules
- document future waitlist states separately from the MVP state machine

### Risk: merchant schedule discipline breaks outside the system

Mitigation:

- support fast offline booking entry from day one
- make offline-originated bookings first-class
- ensure the merchant flow is fast enough to replace chat-only coordination

### Risk: no-show policy disputes create support burden

Mitigation:

- make policy and grace-period rules explicit at booking time
- store audit trails for status and payment transitions
- separate booking outcome states from payment outcome states internally

## Parallel vs Sequential Work

### Sequential work

These should happen in order:

1. State machine and policy rules
2. Canonical data model
3. Booking and payment orchestration
4. Customer and merchant app integration

### Parallel work

These can proceed once the domain contract is stable:

- localization foundation
- UI exploration for customer and merchant surfaces
- notification templates
- reporting and analytics scaffolding

The key is to avoid parallel work on undefined domain concepts.

## Verification Checkpoints

### Checkpoint 1: Policy correctness

Verify:

- all booking states are explicit
- cancellation, no-show, and grace-period outcomes are deterministic
- late-cancel and no-show policies are testable

### Checkpoint 2: Schedule integrity

Verify:

- online and offline bookings both block capacity in the same schedule
- double-booking is impossible through ordinary flows
- merchant corrections are audited

### Checkpoint 3: Localization readiness

Verify:

- Thai and English translation keys exist for system-managed journeys
- notifications render correctly in both locales
- no critical flows depend on hardcoded copy

### Checkpoint 4: Journey completeness

Verify:

- customer routine booking works end to end
- customer exception booking works end to end
- customer onboarding works end to end
- merchant offline booking flow works end to end
- merchant no-show and cancellation cleanup works end to end
- merchant search and inventory controls work end to end

## Decisions Needed Before TASKS

- Define the exact list of instant-bookable services in V1.
- Choose the default payment-protection policy for the Thai market.
- Choose the merchant correction window after appointment time.
- Decide whether merchant-generated content is bilingual in V1 or only system-managed text is bilingual.
- Choose the first merchant wedge in Bangkok.
- Confirm whether waitlist and offered-slot flows are explicitly out of V1.
- Decide when payment method setup happens in onboarding versus booking.

## Exit Criteria For PLAN Phase

This plan is ready to break into tasks when:

- the spec assumptions are accepted or corrected
- bilingual scope is confirmed
- payment-protection defaults are directionally agreed
- the merchant correction window is chosen or at least narrowed

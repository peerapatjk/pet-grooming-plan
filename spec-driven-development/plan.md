# Plan: Bangkok Pet Grooming Booking Platform MVP

## Goal

Translate the Phase 1 spec into an implementation approach that can be reviewed before task breakdown and code.

This plan assumes the current spec in [spec.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/spec-driven-development/spec.md) is directionally correct and incorporates Thai and English support, a minimal onboarding stance, and a premium-leaning independent-shop wedge in central Bangkok.

## Implementation Strategy

Build the system in layers, but only after the discovery loop locks the launch slice and the riskiest policy decisions.

The order matters:

1. Validate workflow fit with a concierge pilot and clickable demos.
2. Complete the decision gate for launch scope, routing rules, and provisional-hold behavior.
3. Define canonical booking rules and status transitions.
4. Build the backend around one source of truth for schedule, booking, verification, and payment state.
5. Add the customer flow for online bookings.
6. Add the merchant flow for availability, offline bookings, and operational status cleanup.
7. Add reminders, reconfirmation, localization, trust surfaces, and instrumentation.

The system should not begin with UI-first prototyping that bypasses domain rules. The hard part is policy correctness, not screens.

## Pre-Implementation Gate

Before deep implementation, run a fast discovery loop:

- concierge pilot with target merchants and customers
- clickable customer prototype for onboarding to booking
- clickable merchant prototype for schedule truth and offline booking capture
- clickable internal operations control-plane prototype for exceptions, overrides, merchant recovery, and trust-event review

This loop exists to validate the biggest risks before building the full product system.

Before the plan is treated as locked, the team must also complete:

- [idea-refine/pilot-decision-gate.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/idea-refine/pilot-decision-gate.md)

That gate must lock:

- launch service taxonomy
- request-confirm triggers
- verification-hold expiry behavior
- merchant response SLA
- payment-protection defaults
- minimum onboarding fields
- launch slice versus post-launch scope
- booking-unit boundary for launch
- confirmed-booking disruption policy
- reconfirmation non-response policy

## Launch Posture

This plan is intentionally narrower than the total roadmap.

The first release should prioritize:

- truthful instant booking for a narrow service set
- request-confirm for high-variance cases
- merchant schedule trust
- customer trust in payment protection
- repeat booking for the same pet and service

Capabilities such as richer dashboards and bulk merchant operations should follow only if the launch slice proves the core loop.

## Cross-Functional Alignment

The plan also assumes a pre-launch stakeholder gate covering:

- Product / GM / Launch DRI
- CEO
- Finance
- Accounting
- Operations
- Customer Support / Merchant Success
- Marketing
- Legal
- Risk / Compliance / Security / Privacy
- Tech
- Data / Analytics
- Sales / BD / Merchant Acquisition
- External Critical Vendors

That gate is documented in:

- [stakeholder-readiness.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/spec-driven-development/stakeholder-readiness.md)

## Major Components

### 1. Domain and policy layer

Core responsibilities:

- booking state machine
- inventory commitment model for confirmed versus provisional holds
- service eligibility and duration logic
- instant-book vs request-confirm routing
- merchant-decline outcome handling
- merchant-cancelled confirmed-booking handling with explicit reason codes
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
- provisional-hold expiry and release behavior
- offline booking ingestion API
- booking-status notification event generation
- OTP verification
- reminder and reconfirmation workflow
- payment-link orchestration
- payment provider callbacks or webhooks
- idempotent external-event processing and late-callback recovery behavior

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
- Thai and English system UI

Dependencies:

- backend scheduling and booking endpoints
- localization layer

### 7. Notifications and operational reporting

Core responsibilities:

- booking-created, confirmed, declined, reminder, and reconfirmation notifications
- reconfirmation prompts
- payment-protection state visibility and customer trust messaging
- late-arrival and no-show policy messages
- booking and revenue summaries
- onboarding, booking, and repeat-behavior instrumentation
- localized transactional content

### 8. Internal operations control plane

Core responsibilities:

- launch health dashboard
- exception queue for timeouts, failed payment or OTP flows, disputes, and merchant-side incidents
- booking investigation workspace with timeline and audit trail
- controlled manual override flows with permission and reason capture
- merchant recovery workflows for shops drifting back to shadow scheduling
- finance and trust-event review surfaces for holds, deposits, refunds, forfeitures, and payout-impacting events

Dependencies:

- backend events
- audit trail design
- payment and booking state semantics

### 9. Cross-functional launch readiness

Core responsibilities:

- Product or GM packet for launch ownership, waivers, and cadence
- CEO packet with wedge, metrics, and kill conditions
- Finance and Accounting packet for fee impact, reconciliation, and downside scenarios
- Operations and Support packet for merchant onboarding, support, exception handling, and recovery
- Marketing and Sales packet for positioning, claims, trust messaging, and merchant promises
- Legal and Risk packet for terms, consent, privacy, and controls
- Tech and Data packet for observability, incident, rollback, dashboards, and metric QA
- Vendor readiness packet for PSP, OTP, notifications, and fallback handling

Dependencies:

- launch-slice scope
- payment and policy decisions
- operational workflow definition

Dependencies:

- backend events
- localization

### 10. Prototype and eval loop

Core responsibilities:

- concierge pilot design
- prototype variants for customer, merchant, and internal operations flows
- leading-indicator instrumentation plan
- falsification criteria for the riskiest assumptions

Dependencies:

- product decisions, not code scaffolding

## Recommended Implementation Order

### Phase 0: Prototype and eval

Deliverables:

- concierge pilot plan
- clickable customer prototype
- clickable merchant prototype
- clickable internal operations control-plane prototype
- eval rubric for onboarding, booking trust, and merchant workflow fit

Checkpoint:

- We have evidence on merchant willingness, customer payment-protection tolerance, and first-run clarity before deep buildout.

### Phase 0.5: Decision lock

Deliverables:

- completed pilot decision gate
- locked launch service taxonomy
- locked request-confirm triggers
- locked verification-hold expiry and merchant response SLA
- locked launch slice versus deferred roadmap
- locked booking-unit boundary
- locked confirmed-booking disruption policy
- locked reconfirmation non-response policy

Checkpoint:

- Domain modeling is based on evidence, not on unresolved product guesses.

### Phase A: Domain foundation

Deliverables:

- booking states and transition rules
- inventory commitment model with provisional-hold expiry behavior
- policy engine for cancellation, no-show, and payment outcomes
- instant vs request-confirm routing rules
- bilingual translation-key inventory for system-managed flows
- explicit decline outcome for request-based bookings
- explicit merchant-cancelled confirmed-booking reasons

Checkpoint:

- The state machine and policy matrix can be tested independently of UI.

### Phase B: Canonical schedule and backend core

Deliverables:

- canonical booking model
- provisional-hold fields and expiry metadata
- merchant availability model
- inventory controls for locking, blocking, and cutoff times
- online and offline booking ingestion
- OTP verification hooks
- payment-protection orchestration
- idempotent OTP and payment callback processing

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
- localized merchant copy in Thai and English

Checkpoint:

- A merchant can operate the booking day without falling back to a second shadow schedule.

### Phase E: Operational automation

Deliverables:

- booking-status notifications, reminder jobs, and reconfirmation jobs
- payment-protection trust surfaces and fallback states
- no-show and grace-period handling
- activation, booking, and repeat-behavior instrumentation
- merchant-cancelled confirmed-booking handling and support traceability

Checkpoint:

- A booking can move from confirmation to outcome with the correct notifications and payment resolution.

### Phase E.5: Stakeholder launch readiness

Deliverables:

- Product or GM launch ownership and waiver packet
- CEO launch packet
- Finance and Accounting reconciliation and downside packet
- Operations, Support, and merchant-success SOP packet
- Marketing and Sales positioning and promise packet
- Legal and Risk reviewed terms and control packet
- Tech and Data observability and dashboard packet
- vendor readiness and fallback packet
- consolidated stakeholder readiness status

Checkpoint:

- Product / GM, CEO, Finance, Accounting, Operations, Customer Support / Merchant Success, Marketing, Legal, Risk, Tech, Data, Sales / BD, and external vendors are either green or have explicit time-bound waivers before launch.

### Phase F: Post-launch expansion

Deliverables:

- bulk cleanup flows if merchant volume justifies them
- richer revenue and operational dashboards
- additional marketplace or review surfaces only if the booking loop is stable

Checkpoint:

- The team expands only after the launch slice shows truthful availability, payment trust, and repeat-value.

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

### Risk: provisional holds create fake availability or ghost inventory

Mitigation:

- model provisional-hold expiry explicitly in the domain and persistence layers
- surface expiry expectations to both customer and merchant
- instrument timeout rates and stale-slot incidents from launch

### Risk: merchant approval and merchant-side disruption paths stay implicit

Mitigation:

- model `pending_merchant_confirmation -> confirmed` explicitly in domain and API contracts
- capture merchant-cancelled confirmed bookings with structured reason codes
- keep native rescheduling out of V1 so confirmed-booking disruption stays auditable and bounded

### Risk: late or duplicate provider callbacks resurrect expired bookings or double-apply payment outcomes

Mitigation:

- require idempotent processing for PSP and OTP success events
- define stale-callback recovery rules before implementation
- test duplicate and late callback paths before launch sign-off

### Risk: bilingual support expands into full content translation

Mitigation:

- scope V1 bilingual support to system-managed text unless otherwise approved
- keep merchant-generated content out of bilingual scope for V1
- establish translation keys before UI implementation

### Risk: onboarding becomes too heavy and kills first-booking conversion

Mitigation:

- collect only required identity, language, and booking-critical setup upfront
- defer optional profile enrichment until it is needed
- test onboarding against time-to-first-search and time-to-first-booking goals

### Risk: appointment shape expands before the launch slice is operationally truthful

Mitigation:

- keep launch bookings to one pet plus one primary service template with fixed add-ons only
- keep multi-pet and bundled multi-service flows out of V1
- validate add-on combinations during the pilot before calling them instant-bookable

### Risk: payment protection is correct in code but unclear to users

Mitigation:

- design explicit trust copy before launch
- show authorization and release state after booking
- give support and operations an auditable fallback path for disputes

### Risk: one function is launch-ready while another is surprised by operational or compliance gaps

Mitigation:

- maintain a shared stakeholder-readiness artifact
- require cross-functional packet review before launch
- use explicit waivers instead of silent assumptions

### Risk: we build a polished system before proving merchant and user behavior

Mitigation:

- run the concierge pilot first
- use clickable prototypes to validate first-run clarity
- instrument first-booking and repeat-booking signals early

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
- merchant approval and merchant-cancelled confirmed-booking paths are testable

### Checkpoint 2: Schedule integrity

Verify:

- online and offline bookings both block capacity in the same schedule
- double-booking is impossible through ordinary flows
- merchant corrections are audited
- late or duplicate provider callbacks cannot re-block expired inventory

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
- merchant approval and merchant-cancelled confirmed-booking flows work end to end
- merchant no-show and cancellation cleanup works end to end
- merchant search and inventory controls work end to end
- activation and repeat-behavior instrumentation works end to end

## Decisions Needed Before TASKS

- Define the exact list of instant-bookable services in V1.
- Lock the booking-unit boundary for V1, including add-on rules.
- Lock the reconfirmation non-response policy.
- Lock the merchant-cancelled confirmed-booking policy.

## Exit Criteria For PLAN Phase

This plan is ready to break into tasks when:

- the spec assumptions are accepted or corrected
- bilingual scope is confirmed
- payment-protection defaults are directionally agreed
- the merchant correction window is chosen or at least narrowed
- the booking-unit boundary is explicit
- the reconfirmation non-response rule is explicit
- the merchant-cancelled confirmed-booking policy is explicit

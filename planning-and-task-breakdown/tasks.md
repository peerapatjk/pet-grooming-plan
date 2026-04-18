# Task Breakdown: Bangkok Pet Grooming Booking Platform MVP

## Overview

This document decomposes the approved spec and implementation plan into small, verifiable tasks. The task order follows the dependency graph: domain rules first, then canonical schedule and backend flows, then landing-page, customer, merchant, and internal operations surfaces, then operational automation.

The goal is to leave the system in a working state after each small cluster of tasks rather than building all backend, then all UI, then attempting to connect everything at the end.

This task plan also distinguishes between:

- `launch-slice work` that proves schedule truth, payment trust, and repeat booking
- `post-launch expansion` that should follow only after the launch slice is working

It assumes a separate cross-functional readiness gate for:

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

## Architecture Decisions

- Build around one canonical booking schedule shared by online and offline-originated bookings.
- Treat payment-protection policy and booking state transitions as domain logic, not UI logic.
- Model provisional inventory explicitly for pending verification and pending merchant confirmation.
- Keep the launch booking unit to one pet plus one primary service template with fixed add-ons only.
- Build Thai and English localization into system-managed flows from the start.
- Keep merchant-generated bilingual content out of V1 unless approved separately.
- Treat merchant decline as distinct from cancellation and no-show.
- Model cancellation actor and cancellation reason separately from terminal booking status.
- Treat reconfirmation non-response in V1 as a follow-up signal, not a silent inventory release.
- Require idempotent OTP and payment callback handling so late success cannot resurrect expired bookings.
- Keep waitlist and offered-slot flows out of V1 unless separately approved.
- Default to card holds for routine bookings and deposits for higher-risk or higher-value services.
- Default to a 24-hour merchant correction window and a 24-hours-plus-same-day reminder cadence.
- Treat payment-protection explanation, failure fallback, and support visibility as launch requirements, not late copy polish.
- Keep bulk merchant cleanup and richer dashboards out of the launch slice unless merchant volume proves they are needed.

## Task List

### Phase 0: Prototype and Eval

## Task 0: Run concierge booking pilot design

**Description:** Define and prepare a lightweight concierge pilot with target merchants and customers to validate workflow fit, payment-protection tolerance, and merchant schedule trust before deep implementation.

**Acceptance criteria:**
- [ ] Pilot scope defines target merchant wedge, customer profile, and booking scenarios.
- [ ] Pilot includes routine bookings, exception bookings, offline bookings, and no-show policy communication.
- [ ] Success and failure thresholds are documented before the pilot starts.

**Verification:**
- [ ] Manual check: pilot brief exists and is reviewable by stakeholders
- [ ] Manual check: riskiest assumptions are attached to observable outcomes

**Dependencies:** None

**Files likely touched:**
- `idea-refine/prototype-and-eval.md`
- `docs/product/concierge-pilot.md`

**Estimated scope:** Small

## Task 0A: Create landing page, customer, merchant, and operations clickable prototypes

**Description:** Produce lightweight clickable prototypes that make the static landing page, onboarding, search, booking, merchant-ops, and internal operations-control-plane workflows real enough to test with users and stakeholders.

**Acceptance criteria:**
- [ ] Landing page prototype clearly explains the product and drives app-download intent without offering web booking.
- [ ] Customer prototype covers onboarding, search, routine booking, exception booking, and repeat booking.
- [ ] Merchant prototype covers availability, booking search, offline booking capture, and status actions.
- [ ] Operations control-plane prototype covers exception triage, booking investigation, manual override, merchant recovery, and trust-event review.
- [ ] Prototype feedback can be captured against explicit success criteria.

**Verification:**
- [ ] Manual check: prototypes are usable in review sessions
- [ ] Manual check: landing page, customer, merchant, and internal operations flows can be walked end to end

**Dependencies:** Task 0

**Files likely touched:**
- `docs/product/landing-page-prototype.md`
- `docs/product/customer-prototype.md`
- `docs/product/merchant-prototype.md`
- `docs/product/operations-control-plane-prototype.md`

**Estimated scope:** Small

## Task 0B: Define analytics and eval schema

**Description:** Define the event taxonomy and review loop for onboarding, first booking, merchant trust, and repeat booking so the team can learn from both the pilot and the MVP.

**Acceptance criteria:**
- [ ] Event list exists for onboarding completion, first search, booking start, booking success, and repeat booking.
- [ ] Merchant trust signals such as offline booking usage, decline rate, and status corrections are defined.
- [ ] Verification timeout, payment-protection drop-off, and merchant-response timing are defined.
- [ ] Reconfirmation non-response and correction-window review-required signals are defined.
- [ ] Review cadence and success thresholds are documented.

**Verification:**
- [ ] Manual check: event taxonomy is explicit and tied to product hypotheses
- [ ] Manual check: north-star and leading-indicator definitions are consistent with the spec

**Dependencies:** Task 0

**Files likely touched:**
- `idea-refine/prototype-and-eval.md`
- `docs/product/analytics-and-evals.md`

**Estimated scope:** Small

## Task 0C: Complete pilot synthesis and lock launch policy

**Description:** Convert the pilot and prototype findings into explicit launch decisions so later domain and workflow tasks are based on evidence rather than unresolved assumptions.

**Acceptance criteria:**
- [ ] The pilot decision gate artifact is complete.
- [ ] The launch service taxonomy is locked for instant booking versus request-confirm.
- [ ] Verification-hold expiry and merchant response SLA are locked.
- [ ] Payment-protection defaults and onboarding minimum fields are locked.
- [ ] Request-confirm sequencing for merchant review versus payment or OTP is locked.
- [ ] Booking-unit boundary and add-on rules are locked for the launch slice.
- [ ] Confirmed-booking disruption policy and reconfirmation non-response policy are locked.
- [ ] Launch-slice versus post-launch scope is explicit.

**Verification:**
- [ ] Manual check: [idea-refine/pilot-decision-gate.md](../idea-refine/pilot-decision-gate.md) is filled with evidence-backed decisions
- [ ] Manual check: remaining open questions are narrow enough that implementation can proceed without hidden product guesses

**Dependencies:** Task 0, Task 0A, Task 0B

**Files likely touched:**
- `idea-refine/pilot-decision-gate.md`
- `idea-refine/prototype-and-eval.md`
- `spec-driven-development/spec.md`

**Estimated scope:** Small

## Task 0D: Define stakeholder success criteria and launch packets

**Description:** Convert the product strategy into explicit cross-functional launch requirements so stakeholder alignment is operational rather than implied.

**Acceptance criteria:**
- [ ] Product / GM, CEO, Finance, Accounting, Operations, Customer Support / Merchant Success, Marketing, Legal, Risk, Tech, Data, Sales / BD, and external vendors each have explicit launch requirements.
- [ ] Required launch packets are defined for each stakeholder group.
- [ ] Ownership is clear for each packet and approval decision.

**Verification:**
- [ ] Manual check: [spec-driven-development/stakeholder-readiness.md](../spec-driven-development/stakeholder-readiness.md) is complete
- [ ] Manual check: stakeholder requirements match the launch-slice scope rather than a hypothetical broader product

**Dependencies:** Task 0C

**Files likely touched:**
- `spec-driven-development/stakeholder-readiness.md`
- `spec-driven-development/requirements.md`
- `spec-driven-development/plan.md`

**Estimated scope:** Small

### Checkpoint: Prototype Gate

- [ ] Concierge pilot and clickable prototypes are defined
- [ ] Learning plan exists for first booking, merchant trust, and repeat booking
- [ ] Pilot decision gate is complete and launch policy is locked
- [ ] Stakeholder success criteria and launch packets are defined
- [ ] Review with human before deep implementation

### Phase 1: Foundation

## Task 1: Scaffold shared domain model package

**Description:** Create the shared domain package that will hold booking status types, policy objects, service eligibility rules, and core entity contracts used by API and clients.

**Acceptance criteria:**
- [ ] Shared domain module exists for bookings, pets, services, availability, and payment protection.
- [ ] Canonical booking states are defined in one location.
- [ ] Cancellation actor and reason types are defined in the shared layer.
- [ ] Domain types are importable by backend and app surfaces without duplication.

**Verification:**
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Unit tests pass for package bootstrap: `pnpm test -- --grep "domain"`
- [ ] Manual check: booking status and policy types are defined only once in the shared layer

**Dependencies:** None

**Files likely touched:**
- `packages/domain/src/bookings.ts`
- `packages/domain/src/pets.ts`
- `packages/domain/src/services.ts`
- `packages/domain/src/index.ts`
- `packages/domain/tests/domain-bootstrap.test.ts`

**Estimated scope:** Medium

## Task 2: Implement booking state machine and transition guards

**Description:** Encode the full booking lifecycle so that state transitions are explicit, validated, and testable before any UI or API begins relying on them, including a distinct merchant-decline outcome for request-based bookings, explicit timeout behavior for provisional states, and structured cancellation metadata for merchant and system-originated cancellations.

**Acceptance criteria:**
- [ ] Valid transitions for all canonical booking states are implemented.
- [ ] Invalid transitions are rejected with explicit errors.
- [ ] Request-based bookings can transition from `pending_merchant_confirmation` to `confirmed`.
- [ ] Request-based bookings can transition into a merchant-decline outcome that is distinct from cancellation and no-show.
- [ ] Timeout-based system cancellations are represented explicitly for verification and merchant-response expiry.
- [ ] Confirmed bookings can be merchant-cancelled with structured reason metadata.
- [ ] Merchant correction-window rules are represented in the transition logic.

**Verification:**
- [ ] Unit tests pass: `pnpm test -- --grep "booking-state-machine"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: transition rules match the spec state machine

**Dependencies:** Task 0C, Task 1

**Files likely touched:**
- `packages/domain/src/booking-state-machine.ts`
- `packages/domain/src/booking-errors.ts`
- `packages/domain/tests/booking-state-machine.test.ts`

**Estimated scope:** Small

## Task 3: Implement payment-protection and no-show policy engine

**Description:** Build the policy logic that determines hold, deposit, release, capture, refund, and forfeiture behavior across booking outcomes.

**Acceptance criteria:**
- [ ] Policy engine supports `none`, `card_hold`, and `deposit`.
- [ ] Cancellation, late-cancel, arrived, late, and no-show outcomes resolve to deterministic payment actions.
- [ ] Policy logic is independent of UI and payment-provider SDK calls.

**Verification:**
- [ ] Unit tests pass: `pnpm test -- --grep "payment-policy"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: policy outputs match the matrix in the spec

**Dependencies:** Task 0C, Task 1, Task 2

**Files likely touched:**
- `packages/domain/src/payment-policy.ts`
- `packages/domain/src/booking-policy.ts`
- `packages/domain/tests/payment-policy.test.ts`

**Estimated scope:** Small

## Task 4: Implement service eligibility and routing rules

**Description:** Build the rules that decide whether a booking can be instantly confirmed, must enter pending verification, or must enter merchant confirmation, based on the locked launch service taxonomy and routing inputs.

**Acceptance criteria:**
- [ ] Instant-book vs request-confirm decisions are deterministic.
- [ ] Rules reflect the pilot-locked launch service list and request-confirm triggers.
- [ ] Routing rules accept service, pet, and merchant policy inputs.
- [ ] Rule outputs include a machine-readable reason for request-confirm routing.
- [ ] Rule outputs include the next required action and the ordered sequence when request-confirm also requires payment protection or OTP.

**Verification:**
- [ ] Unit tests pass: `pnpm test -- --grep "booking-routing"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: exception reasons are explicit enough for future UI messaging

**Dependencies:** Task 0C, Task 1, Task 2

**Files likely touched:**
- `packages/domain/src/booking-routing.ts`
- `packages/domain/src/service-eligibility.ts`
- `packages/domain/tests/booking-routing.test.ts`

**Estimated scope:** Small

### Checkpoint: Foundation

- [ ] Domain package compiles cleanly
- [ ] State-machine and policy tests pass
- [ ] Routing and payment decisions are deterministic
- [ ] Review with human before proceeding to backend data modeling

### Phase 2: Canonical Schedule and Backend Core

## Task 5: Define persistence schema for canonical schedule and booking entities

**Description:** Model merchants, services, availability, bookings, pets, payment-protection state, and audit fields in persistent storage.

**Acceptance criteria:**
- [ ] Online and offline bookings share the same booking table or equivalent canonical model.
- [ ] Availability and booking data can represent capacity without a parallel shadow schedule.
- [ ] Schema includes provisional-hold expiry metadata and auditable timeout reasons.
- [ ] Schema stores structured cancellation actor or reason data and provider-event audit metadata.
- [ ] Audit fields exist for status changes and operator actions.

**Verification:**
- [ ] Schema validation or migration generation succeeds: `pnpm --filter api db:generate`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: schema supports every state and policy field from the spec

**Dependencies:** Task 2, Task 3, Task 4

**Files likely touched:**
- `apps/api/prisma/schema.prisma`
- `apps/api/src/db/types.ts`
- `apps/api/tests/schema-model.test.ts`

**Estimated scope:** Medium

## Task 6: Build availability and capacity-resolution service

**Description:** Implement the backend service that resolves whether a requested slot is actually bookable using merchant availability, buffers, duration rules, existing bookings, and online inventory controls.

**Acceptance criteria:**
- [ ] Capacity checks account for both online and offline bookings.
- [ ] Capacity checks account for provisional holds and their expiry behavior.
- [ ] Double-booking is rejected through ordinary booking flows.
- [ ] Online inventory controls support blocked resources and booking cutoff times.
- [ ] Service returns a clear reason when capacity is not available.

**Verification:**
- [ ] Integration tests pass: `pnpm test:integration -- --grep "availability"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: conflicting online/offline bookings cannot both consume the same slot

**Dependencies:** Task 5

**Files likely touched:**
- `apps/api/src/services/availability-service.ts`
- `apps/api/src/services/inventory-controls-service.ts`
- `apps/api/src/repositories/booking-repository.ts`
- `tests/integration/availability-service.test.ts`

**Estimated scope:** Medium

## Task 6A: Implement provisional-hold lifecycle service

**Description:** Build the service that creates, expires, releases, and audits provisional inventory holds for `pending_verification` and `pending_merchant_confirmation` bookings.

**Acceptance criteria:**
- [ ] Pending verification and pending merchant confirmation can reserve inventory provisionally with an expiry timestamp.
- [ ] Expired provisional holds auto-release inventory without manual cleanup.
- [ ] Timeout actions record explicit reason metadata for auditability.
- [ ] Hold-lifecycle behavior is reusable by both online and offline booking flows.

**Verification:**
- [ ] Integration tests pass: `pnpm test:integration -- --grep "provisional-hold"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: expired verification and review holds no longer block capacity

**Dependencies:** Task 2, Task 5, Task 6

**Files likely touched:**
- `apps/api/src/services/provisional-hold-service.ts`
- `apps/api/src/services/availability-service.ts`
- `apps/api/src/repositories/booking-repository.ts`
- `tests/integration/provisional-hold.test.ts`

**Estimated scope:** Medium

## Task 7: Build booking creation API for online flow

**Description:** Create the backend API for customer-originated bookings, including pet linkage, service selection, routing decision, and initial verification or payment requirements.

**Acceptance criteria:**
- [ ] API creates bookings in the canonical schedule.
- [ ] API returns `confirmed`, `pending_verification`, or `pending_merchant_confirmation` based on routing rules and verification requirements.
- [ ] API records whether OTP or payment protection is still outstanding.
- [ ] API returns next-step and expiry metadata when a booking is provisional.

**Verification:**
- [ ] Integration tests pass: `pnpm test:integration -- --grep "booking-create"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: online booking response includes next-step requirements for the client

**Dependencies:** Task 4, Task 5, Task 6, Task 6A

**Files likely touched:**
- `apps/api/src/routes/bookings/create-booking.ts`
- `apps/api/src/services/booking-service.ts`
- `tests/integration/create-booking.test.ts`

**Estimated scope:** Medium

## Task 7A: Build merchant decision API for request approval and confirmed-booking cancellation

**Description:** Implement the backend API that lets merchants approve or decline request-based bookings and cancel previously confirmed bookings with explicit operational reasons.

**Acceptance criteria:**
- [ ] Merchants can approve `pending_merchant_confirmation` bookings into `confirmed`.
- [ ] Merchants can decline request-based bookings into `declined_by_merchant`.
- [ ] Merchants can cancel confirmed bookings with explicit structured reason codes.
- [ ] API records actor, reason, and audit metadata for every merchant decision.
- [ ] Merchant actions submitted after request expiry fail safely or enter explicit manual recovery instead of mutating an expired booking.

**Verification:**
- [ ] Integration tests pass: `pnpm test:integration -- --grep "merchant-decision"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: merchant approval and merchant-cancelled confirmed-booking flows match the spec state machine

**Dependencies:** Task 2, Task 5, Task 6A, Task 7

**Files likely touched:**
- `apps/api/src/routes/bookings/merchant-decision.ts`
- `apps/api/src/services/merchant-booking-decision-service.ts`
- `tests/integration/merchant-booking-decision.test.ts`

**Estimated scope:** Medium

## Task 8: Build offline booking ingestion and payment-link flow

**Description:** Implement the merchant-originated booking path so phone, LINE, Instagram, Facebook, or walk-in inquiries enter the same system and can request payment verification.

**Acceptance criteria:**
- [ ] Merchant-created offline bookings consume capacity in the same canonical schedule.
- [ ] Backend can generate a secure payment or verification link for offline bookings.
- [ ] Offline bookings are marked with origin metadata for auditability.
- [ ] Offline bookings follow the same provisional-hold and expiry rules as app-originated bookings when verification is still outstanding.

**Verification:**
- [ ] Integration tests pass: `pnpm test:integration -- --grep "offline-booking"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: an offline booking can trigger verification without bypassing canonical schedule rules

**Dependencies:** Task 5, Task 6, Task 6A, Task 7

**Files likely touched:**
- `apps/api/src/routes/bookings/create-offline-booking.ts`
- `apps/api/src/services/offline-booking-service.ts`
- `apps/api/src/services/payment-link-service.ts`
- `tests/integration/offline-booking.test.ts`

**Estimated scope:** Medium

## Task 8A: Implement idempotent provider callback processing and late-success recovery

**Description:** Build the provider-event processing layer for OTP and payment callbacks so duplicate or late success events are handled safely and cannot resurrect expired bookings or double-apply payment outcomes.

**Acceptance criteria:**
- [ ] OTP and payment callbacks are processed idempotently.
- [ ] Late success events after provisional expiry do not re-confirm the booking or re-block capacity.
- [ ] Recovery actions for late success events are explicit, auditable, and traceable.
- [ ] Provider-event processing can safely handle retries and out-of-order arrival.

**Verification:**
- [ ] Integration tests pass: `pnpm test:integration -- --grep "provider-callback|late-success|idempotency"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: duplicate and late callbacks leave booking and payment state coherent

**Dependencies:** Task 5, Task 6A, Task 7, Task 8

**Files likely touched:**
- `apps/api/src/routes/providers/payment-callback.ts`
- `apps/api/src/routes/providers/otp-callback.ts`
- `apps/api/src/services/provider-event-service.ts`
- `tests/integration/provider-event-processing.test.ts`

**Estimated scope:** Medium

## Task 9: Build OTP verification and booking reconfirmation backend

**Description:** Implement verification endpoints and background-ready logic for OTP completion and reconfirmation events that can move bookings toward confirmation or updated status.

**Acceptance criteria:**
- [ ] OTP verification can unblock bookings that require it.
- [ ] Reconfirmation status is stored separately from initial confirmation.
- [ ] Verification failures do not incorrectly confirm a booking.
- [ ] Verification failures or timeouts do not leave provisional holds active.
- [ ] Reconfirmation non-response follows the locked launch policy without silently releasing confirmed inventory.
- [ ] When request-confirm bookings also require payment protection or OTP, the backend enforces the locked sequence without running conflicting live expiry timers.

**Verification:**
- [ ] Integration tests pass: `pnpm test:integration -- --grep "otp|reconfirmation"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: bookings cannot enter confirmed state until required verification completes

**Dependencies:** Task 2, Task 5, Task 6A, Task 7, Task 8, Task 8A

**Files likely touched:**
- `apps/api/src/routes/bookings/verify-booking.ts`
- `apps/api/src/services/otp-service.ts`
- `apps/api/src/services/reconfirmation-service.ts`
- `tests/integration/booking-verification.test.ts`

**Estimated scope:** Medium

### Checkpoint: Backend Core

- [ ] Canonical schedule exists for online and offline bookings
- [ ] Availability prevents ordinary double-booking
- [ ] Provisional holds expire and release inventory correctly
- [ ] Booking creation, merchant decision, offline ingestion, provider-callback, and verification tests pass
- [ ] Review with human before UI tasks

### Phase 3: Localization Foundation and Customer Flow

## Task 10: Build shared Thai and English localization foundation

**Description:** Create the translation-key structure, locale selection helpers, and formatting utilities used by customer, merchant, and notification surfaces.

**Acceptance criteria:**
- [ ] Translation keys exist for booking states, verification prompts, reminders, hold-expiry messaging, and common errors.
- [ ] Thai and English locale resources are both wired into the shared layer.
- [ ] Date, time, and currency helpers support locale-aware formatting.

**Verification:**
- [ ] Unit tests pass: `pnpm test -- --grep "i18n"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: no core system copy is hardcoded outside translation resources

**Dependencies:** Task 1

**Files likely touched:**
- `packages/i18n/src/en.ts`
- `packages/i18n/src/th.ts`
- `packages/i18n/src/formatting.ts`
- `packages/i18n/tests/i18n.test.ts`

**Estimated scope:** Medium

## Task 10A: Build customer onboarding flow

**Description:** Implement the first-time customer onboarding flow with language selection, phone or account verification, essential policy steps, and a clear path into search and booking without over-collecting data.

**Acceptance criteria:**
- [ ] First-time users can choose Thai or English during onboarding.
- [ ] First-time users can complete phone or equivalent identity verification.
- [ ] Onboarding gets the user to a booking-ready state without requiring optional profile depth upfront.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "customer-onboarding"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: onboarding path is shorter than full registration-plus-profile completion

**Dependencies:** Task 10

**Files likely touched:**
- `apps/app-mobile/src/screens/onboarding/LanguageSelection.tsx`
- `apps/app-mobile/src/screens/onboarding/PhoneVerification.tsx`
- `apps/app-mobile/src/screens/onboarding/OnboardingFlow.tsx`
- `apps/app-mobile/tests/customer-onboarding.test.tsx`

**Estimated scope:** Medium

## Task 10B: Build static launch landing page with app-download CTA

**Description:** Implement a static marketing site that explains the launch slice clearly and drives users to download the app without introducing web booking or onboarding functionality.

**Acceptance criteria:**
- [ ] Landing page clearly explains the product, launch wedge, and trust model.
- [ ] Landing page includes app-download CTAs only and does not offer booking, search, or onboarding.
- [ ] Landing-page copy stays within the actual Bangkok-first launch slice and does not imply broader coverage.
- [ ] Landing-page UI is responsive and polished enough for launch and stakeholder review.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "landing-page"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: a visitor understands that booking happens in the app, not on the website

**Dependencies:** Task 5, Task 7, Task 10

**Files likely touched:**
- `apps/web-marketing/src/pages/index.tsx`
- `apps/web-marketing/src/components/Hero.tsx`
- `apps/web-marketing/src/components/TrustSection.tsx`
- `apps/web-marketing/tests/landing-page.test.tsx`

**Estimated scope:** Small

## Task 11: Build customer pet profile flow

**Description:** Implement the customer flow for creating and reusing pet profiles with booking-relevant attributes.

**Acceptance criteria:**
- [ ] Customer can create a pet profile with required grooming attributes.
- [ ] Pet profile can be reused in later booking flows.
- [ ] System-managed UI is available in Thai and English.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "pet-profile"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: pet profile flow works in both locales

**Dependencies:** Task 5, Task 10, Task 10A

**Files likely touched:**
- `apps/app-mobile/src/screens/pets/PetProfileForm.tsx`
- `apps/app-mobile/src/screens/pets/PetProfilesList.tsx`
- `apps/app-mobile/src/lib/api/pets.ts`
- `apps/app-mobile/tests/pet-profile-flow.test.tsx`

**Estimated scope:** Medium

## Task 12: Build customer search and routine booking flow

**Description:** Implement the end-to-end customer flow for searching shops, reviewing relevant availability, choosing a service and pet, and creating a routine booking that can be instantly confirmed where eligible or move into pending verification when required.

**Acceptance criteria:**
- [ ] Customer can search shops by location, service, and relevant availability through the mobile flow.
- [ ] Customer can complete a routine booking through the mobile flow.
- [ ] Flow enforces the launch booking-unit boundary of one pet plus one primary service template with fixed add-ons only.
- [ ] Flow shows instant confirmation when routing allows it.
- [ ] Flow explains pending verification and expiry expectations when payment protection or OTP is still outstanding.
- [ ] Flow renders system-managed copy in Thai and English.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "routine-booking"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: a routine booking completes end to end in both locales

**Dependencies:** Task 7, Task 10, Task 10A, Task 11

**Files likely touched:**
- `apps/app-mobile/src/screens/search/ShopSearchScreen.tsx`
- `apps/app-mobile/src/screens/search/SearchResults.tsx`
- `apps/app-mobile/src/screens/booking/RoutineBookingFlow.tsx`
- `apps/app-mobile/src/screens/booking/BookingConfirmation.tsx`
- `apps/app-mobile/src/lib/api/bookings.ts`
- `apps/app-mobile/tests/routine-booking-flow.test.tsx`

**Estimated scope:** Medium

## Task 13: Build customer exception booking flow

**Description:** Implement the booking path for services or pets that require merchant confirmation, including clear reason messaging and pending state handling.

**Acceptance criteria:**
- [ ] Customer can submit a booking that enters merchant confirmation.
- [ ] Pending state and next-step messaging are explicit.
- [ ] Flow shows merchant-response timing or expiry expectations when the slot is provisionally held.
- [ ] Localization works for all system-managed pending-state copy.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "exception-booking"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: pending confirmation flow is understandable in Thai and English

**Dependencies:** Task 7, Task 10, Task 10A, Task 11, Task 12

**Files likely touched:**
- `apps/app-mobile/src/screens/booking/ExceptionBookingFlow.tsx`
- `apps/app-mobile/src/screens/booking/PendingConfirmation.tsx`
- `apps/app-mobile/tests/exception-booking-flow.test.tsx`

**Estimated scope:** Medium

## Task 13A: Build payment-protection trust surfaces and failure recovery flow

**Description:** Implement the customer-facing explanation, status visibility, and fallback states for holds, deposits, verification, and payment failures so trust is built into the launch slice.

**Acceptance criteria:**
- [ ] Booking flow explains hold or deposit behavior before commitment.
- [ ] Customer can see the current verification and authorization state after booking creation.
- [ ] Payment or verification failure shows a clear next step and support fallback.
- [ ] Trust and failure-state copy is localized in Thai and English.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "payment-trust"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: a user can understand what happens to their hold or deposit without external explanation

**Dependencies:** Task 7, Task 9, Task 10, Task 12, Task 13

**Files likely touched:**
- `apps/app-mobile/src/screens/booking/PaymentProtectionStep.tsx`
- `apps/app-mobile/src/screens/booking/BookingStatusDetail.tsx`
- `apps/app-mobile/src/screens/booking/PaymentFailureState.tsx`
- `apps/app-mobile/tests/payment-trust-flow.test.tsx`

**Estimated scope:** Medium

## Task 14: Build customer repeat-booking flow

**Description:** Implement the fastest-path rebooking flow so returning customers can reuse an existing pet and service with minimal friction.

**Acceptance criteria:**
- [ ] Customer can rebook from prior booking history or saved pet context.
- [ ] Repeat booking reuses pet and service data without redundant re-entry.
- [ ] Flow preserves Thai and English system-managed copy.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "repeat-booking"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: repeat booking is noticeably shorter than first-time booking

**Dependencies:** Task 7, Task 10A, Task 11, Task 12

**Files likely touched:**
- `apps/app-mobile/src/screens/booking/RepeatBookingFlow.tsx`
- `apps/app-mobile/src/screens/history/BookingHistory.tsx`
- `apps/app-mobile/tests/repeat-booking-flow.test.tsx`

**Estimated scope:** Medium

### Checkpoint: Customer Flow

- [ ] Thai and English localization foundation is in place
- [ ] Static launch landing page works and drives app-download intent without implying web booking
- [ ] Customer onboarding works
- [ ] Pet profile, routine booking, exception booking, payment-trust, and repeat booking flows work
- [ ] Review with human before merchant operations tasks

### Phase 4: Merchant Operations

## Task 15: Build merchant service-template and availability management

**Description:** Implement the merchant flow for defining service offerings, durations, and availability rules that drive schedule truth.

**Acceptance criteria:**
- [ ] Merchant can configure services, durations, and availability windows.
- [ ] Config changes affect booking eligibility and capacity resolution.
- [ ] Merchant system-managed UI works in Thai and English.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "merchant-availability"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: service and availability changes affect bookable slots

**Dependencies:** Task 6, Task 10

**Files likely touched:**
- `apps/app-merchant/src/screens/services/ServiceTemplateEditor.tsx`
- `apps/app-merchant/src/screens/availability/AvailabilityEditor.tsx`
- `apps/app-merchant/src/lib/api/merchant-settings.ts`
- `apps/app-merchant/tests/merchant-availability.test.tsx`

**Estimated scope:** Medium

## Task 16: Build merchant booking board, booking search, and single-booking status actions

**Description:** Implement the merchant booking board with search for current and upcoming bookings and quick actions for approval, decline, cancellation, late state, completion, and no-show on individual bookings.

**Acceptance criteria:**
- [ ] Merchant can view the booking board from desktop and tablet-friendly layouts.
- [ ] Merchant can search current and upcoming bookings quickly.
- [ ] Merchant can approve or decline request-based bookings through allowed transitions.
- [ ] Merchant can cancel confirmed bookings with explicit operational reason capture.
- [ ] Merchant can update one booking’s status through allowed transitions without bypassing the shared state machine.
- [ ] Booking board UI is localized for Thai and English system-managed copy.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "booking-board"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: merchant can update a booking through the normal operational flow

**Dependencies:** Task 2, Task 7, Task 7A, Task 10, Task 15

**Files likely touched:**
- `apps/app-merchant/src/screens/bookings/BookingBoard.tsx`
- `apps/app-merchant/src/components/bookings/BookingSearchBar.tsx`
- `apps/app-merchant/src/components/bookings/BookingCellActions.tsx`
- `apps/app-merchant/tests/booking-board.test.tsx`

**Estimated scope:** Medium

## Task 17: Build merchant offline booking capture and resource-control UI

**Description:** Implement the merchant-side UI for creating offline bookings, triggering payment or verification follow-up, and applying resource lock or block controls without leaving the canonical schedule.

**Acceptance criteria:**
- [ ] Merchant can create offline bookings from the booking board or equivalent surface.
- [ ] Merchant can trigger payment-link or verification follow-up for the offline booking.
- [ ] Merchant can lock a booking to a groomer or station and block resources from online booking.
- [ ] Offline bookings appear in the same board as online bookings.
- [ ] Merchant can see whether an offline booking is provisional, confirmed, or timed out.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "offline-booking-ui"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: offline bookings do not create a separate unmanaged list

**Dependencies:** Task 8, Task 10, Task 16

**Files likely touched:**
- `apps/app-merchant/src/screens/bookings/CreateOfflineBooking.tsx`
- `apps/app-merchant/src/components/bookings/OfflineBookingForm.tsx`
- `apps/app-merchant/src/components/bookings/ResourceLockControls.tsx`
- `apps/app-merchant/tests/offline-booking-ui.test.tsx`

**Estimated scope:** Medium

### Checkpoint: Merchant Operations

- [ ] Merchant can define services and availability
- [ ] Merchant can operate booking board with online and offline bookings
- [ ] Merchant can see and act on provisional versus confirmed bookings without falling back to a second shadow schedule
- [ ] Merchant approval and merchant-cancelled confirmed-booking flows are operationally clear
- [ ] Review with human before operational automation

### Phase 5: Notifications and Launch Readiness

## Task 19: Build transactional notification, reminder, and reconfirmation pipeline

**Description:** Implement booking-status notifications plus scheduled reminder and reconfirmation delivery for upcoming bookings, with localized transactional content.

**Acceptance criteria:**
- [ ] Booking-created, confirmed, and declined notifications are supported where relevant.
- [ ] Merchant-cancelled confirmed bookings send the right customer and merchant notifications.
- [ ] Reminder timing is configurable according to product decision.
- [ ] Reconfirmation messages are localized in Thai and English.
- [ ] Reminder jobs do not send for cancelled or completed bookings.
- [ ] Near-term bookings created inside the default reminder windows follow a compressed reminder path without duplicate sends.
- [ ] Time-sensitive messages for verification expiry or merchant-response timeout are supported where relevant.

**Verification:**
- [ ] Integration tests pass: `pnpm test:integration -- --grep "reminders"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: localized reminder output renders correctly for both locales

**Dependencies:** Task 7A, Task 8A, Task 9, Task 10, Task 12, Task 13

**Files likely touched:**
- `apps/api/src/jobs/reminder-job.ts`
- `apps/api/src/services/notification-service.ts`
- `tests/integration/booking-notification.test.ts`
- `tests/integration/reminder-job.test.ts`

**Estimated scope:** Medium

## Task 19A: Implement product analytics instrumentation

**Description:** Implement the event instrumentation and reporting hooks needed to observe onboarding completion, first booking conversion, merchant trust, and repeat-booking behavior in production.

**Acceptance criteria:**
- [ ] Customer events exist for onboarding completion, first search, booking start, booking success, and repeat booking.
- [ ] Merchant events exist for offline booking creation, approval actions, decline actions, merchant-cancelled confirmed bookings, and correction-window edits.
- [ ] Verification timeout, payment-protection drop-off, and merchant-response timing events are implemented.
- [ ] Reconfirmation non-response follow-up events and correction-window review-required events are implemented.
- [ ] Late-success recovery and duplicate-callback suppression events are implemented.
- [ ] Event naming and properties match the agreed analytics schema.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "analytics"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: event traces are visible for the critical user journeys

**Dependencies:** Task 0B, Task 7A, Task 8A, Task 9, Task 10A, Task 12, Task 13, Task 13A, Task 16

**Files likely touched:**
- `packages/domain/src/analytics-events.ts`
- `apps/app-mobile/src/lib/analytics.ts`
- `apps/app-merchant/src/lib/analytics.ts`
- `apps/api/src/services/analytics-service.ts`
- `tests/integration/analytics-events.test.ts`

**Estimated scope:** Medium

## Task 19B: Define Finance and Accounting reconciliation package

**Description:** Document how holds, deposits, captures, refunds, forfeitures, disputes, and payouts are tracked so Finance and Accounting can approve the launch slice.

**Acceptance criteria:**
- [ ] Ledger treatment is defined for holds, deposits, captures, refunds, forfeitures, and payout timing.
- [ ] Reconciliation workflow and ownership are documented.
- [ ] Finance downside scenarios for payment failures and dispute volume are documented.

**Verification:**
- [ ] Manual check: Finance and Accounting packet exists and is reviewable
- [ ] Manual check: reconciliation assumptions match the booking and payment policy design

**Dependencies:** Task 3, Task 8, Task 19A

**Files likely touched:**
- `spec-driven-development/stakeholder-readiness.md`
- `docs/readiness/finance-accounting-readiness.md`

**Estimated scope:** Small

## Task 19C: Define Operations, Support, and merchant-success package

**Description:** Document merchant onboarding, support workflows, escalation paths, manual override controls, and merchant recovery playbooks so Operations and frontline teams can run the launch slice without inventing policy on the fly.

**Acceptance criteria:**
- [ ] SOPs exist for merchant onboarding, verification timeout, merchant-response timeout, late arrival, no-show, and disputes.
- [ ] Escalation owners and SLA expectations are documented.
- [ ] Manual override permissions and audit expectations are documented.
- [ ] Merchant-cancelled confirmed-booking and late-success recovery workflows are documented.
- [ ] Support scripts and merchant-success recovery playbooks are documented.

**Verification:**
- [ ] Manual check: Operations and Support packet exists and is reviewable
- [ ] Manual check: operational flows match the actual product states and policies

**Dependencies:** Task 7A, Task 8A, Task 9, Task 16, Task 17, Task 20

**Files likely touched:**
- `spec-driven-development/stakeholder-readiness.md`
- `docs/readiness/operations-support-readiness.md`

**Estimated scope:** Small

## Task 19D: Define Marketing, Sales, Legal, and Risk launch package

**Description:** Produce the positioning, approved claims, trust messaging, merchant promises, terms, consent requirements, and control expectations needed so launch messaging is truthful and risky flows are commercially and legally reviewable.

**Acceptance criteria:**
- [ ] Marketing launch audience, value proposition, and approved claims are documented.
- [ ] Trust messaging for holds, deposits, cancellations, and pending states is documented.
- [ ] Sales or BD merchant promises and acquisition assumptions are documented.
- [ ] Terms and trust messaging cover merchant-cancelled confirmed bookings and late-success recovery cases where relevant.
- [ ] Customer and merchant terms, consent copy, and policy review requirements are documented for legal review.
- [ ] Risk, privacy, security, or compliance review requirements are documented.

**Verification:**
- [ ] Manual check: Marketing, Sales, Legal, and Risk packet exists and is reviewable
- [ ] Manual check: launch claims match the actual launch slice and product behavior

**Dependencies:** Task 8A, Task 13A, Task 19

**Files likely touched:**
- `spec-driven-development/stakeholder-readiness.md`
- `docs/readiness/marketing-sales-legal-risk-readiness.md`

**Estimated scope:** Small

## Task 19E: Define Product / GM, CEO, Tech, Data, and vendor launch-readiness package

**Description:** Produce the executive, technical, analytics, and vendor readiness packet covering launch ownership, wedge rationale, metrics, kill conditions, observability, rollback, dashboard quality, and external dependency validation.

**Acceptance criteria:**
- [ ] Product or GM packet includes launch ownership, waiver rules, and review cadence.
- [ ] CEO packet includes launch wedge, success metrics, kill conditions, and deferred scope.
- [ ] Tech packet includes observability, incident response, rollback, and dependency validation.
- [ ] Data or analytics packet includes metric definitions, dashboard QA, and launch review ownership.
- [ ] Vendor-readiness packet includes PSP, OTP, notification, and fallback validation.
- [ ] A consolidated stakeholder status view exists with green, yellow, red, or waiver state.

**Verification:**
- [ ] Manual check: Product, CEO, Tech, Data, and vendor packet exists and is reviewable
- [ ] Manual check: stakeholder status can be used as a real pre-launch gate

**Dependencies:** Task 19, Task 19A

**Files likely touched:**
- `spec-driven-development/stakeholder-readiness.md`
- `docs/readiness/product-ceo-tech-data-vendor-readiness.md`

**Estimated scope:** Small

## Task 20: Build grace-period, no-show, and correction-window handling

**Description:** Implement the operational automation and UI support for late arrival, no-show resolution, and post-appointment correction windows.

**Acceptance criteria:**
- [ ] Grace-period handling follows merchant policy settings.
- [ ] No-show and late outcomes invoke correct payment-policy decisions.
- [ ] Merchant correction-window rules are enforced and auditable.
- [ ] If the correction window closes without a final outcome, the system creates an auditable operations-review item and blocks payout-sensitive settlement until resolved.

**Verification:**
- [ ] Integration tests pass: `pnpm test:integration -- --grep "no-show|grace-period"`
- [ ] Typecheck passes: `pnpm typecheck`
- [ ] Manual check: late and no-show flows resolve both booking and payment outcomes correctly
- [ ] Manual check: unresolved bookings at correction-window expiry are surfaced for review instead of silently settling

**Dependencies:** Task 3, Task 9, Task 16, Task 19

**Files likely touched:**
- `apps/api/src/services/no-show-service.ts`
- `apps/api/src/services/grace-period-service.ts`
- `tests/integration/no-show-policy.test.ts`

**Estimated scope:** Medium

### Checkpoint: Launch Slice Ready

- [ ] All launch-critical domain, backend, customer, merchant, and automation tasks are complete
- [ ] Builds succeed: `pnpm build`
- [ ] Typecheck succeeds: `pnpm typecheck`
- [ ] Core customer and merchant journeys work end to end
- [ ] Provisional holds, payment trust, and timeout paths work end to end
- [ ] Merchant approval, merchant-cancelled confirmed-booking, and late-callback recovery paths work end to end
- [ ] Thai and English system-managed experiences are working
- [ ] Product / GM, CEO, Finance, Accounting, Operations, Customer Support / Merchant Success, Marketing, Legal, Risk, Tech, Data, Sales / BD, and external vendors each have a reviewable readiness packet
- [ ] Ready for human review before launch

### Phase 6: Post-launch Expansion

Task numbering is preserved from the broader workback plan, so a deferred post-launch task can carry an earlier task number than later launch-slice work.

## Task 18: Build bulk status update workflow

**Description:** Implement merchant bulk actions for cancellation and no-show cleanup once operator volume proves that end-of-day cleanup is common enough to justify the extra complexity.

**Acceptance criteria:**
- [ ] Merchant can select multiple bookings for a bulk status action.
- [ ] Bulk actions respect allowed transitions and audit fields.
- [ ] Bulk-action copy is localized for Thai and English.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "bulk-status"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: multiple bookings can be updated without violating state rules

**Dependencies:** Task 2, Task 16, Task 20

**Files likely touched:**
- `apps/app-merchant/src/components/bookings/BulkStatusToolbar.tsx`
- `apps/app-merchant/src/screens/bookings/BulkStatusModal.tsx`
- `apps/app-merchant/tests/bulk-status-update.test.tsx`

**Estimated scope:** Medium

## Task 21: Build daily revenue and booking summary dashboard

**Description:** Implement a lightweight reporting surface for merchants to review booking counts, outcomes, and revenue-related summaries after the launch slice proves the core loop and operators need more reporting depth.

**Acceptance criteria:**
- [ ] Merchant can view booking totals by outcome.
- [ ] Merchant can view basic revenue summary linked to completed or forfeited outcomes.
- [ ] Dashboard system-managed copy is localized for Thai and English.

**Verification:**
- [ ] Tests pass: `pnpm test -- --grep "merchant-dashboard"`
- [ ] Build succeeds: `pnpm build`
- [ ] Manual check: summary reflects completed, cancelled, and no-show states sensibly

**Dependencies:** Task 16, Task 20

**Files likely touched:**
- `apps/app-merchant/src/screens/dashboard/DailySummary.tsx`
- `apps/app-merchant/src/lib/api/dashboard.ts`
- `apps/app-merchant/tests/daily-summary.test.tsx`

**Estimated scope:** Medium

### Checkpoint: Complete

- [ ] Launch slice is stable in production or pilot-like rollout
- [ ] Post-launch expansion tasks are justified by real operator volume or reporting needs
- [ ] Builds succeed: `pnpm build`
- [ ] Typecheck succeeds: `pnpm typecheck`
- [ ] Ready for continued expansion without breaking the core booking loop

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Payment provider does not support required hold behavior in Thailand | High | Validate provider capabilities before finalizing adapter and policy defaults |
| Hybrid routing logic is unclear to users | High | Keep rules narrow in V1 and expose reason codes for pending confirmation |
| Merchant workflow is slower than LINE or phone coordination | High | Prioritize offline booking capture and fast status actions early |
| We build before validating workflow fit | High | Run concierge pilot and clickable prototypes before deep implementation |
| Late or duplicate provider callbacks corrupt booking or payment state | High | Add idempotent provider-event processing and test duplicate or stale-success paths explicitly |
| Multi-pet or bundled bookings sneak into the launch slice and break duration truth | Medium | Keep launch booking unit narrow and enforce one-pet one-primary-service boundaries |
| Bilingual support becomes content-translation scope creep | Medium | Restrict V1 to system-managed copy unless explicitly expanded |
| Bulk status actions create audit ambiguity | Medium | Record actor, timestamp, previous state, and new state for every bulk update |
| Waitlist or offered-slot scope sneaks into MVP | Medium | Keep those flows explicitly out of V1 unless the state model is expanded and approved |

## Open Questions

- Which exact services are instant-bookable in V1?
- What should the verification-hold expiry and merchant response SLA be?

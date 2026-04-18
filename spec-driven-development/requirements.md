# Product Requirements

## Goal

Define the requirement families for the Bangkok-first pet grooming booking platform so downstream spec, planning, tasks, prompts, and readiness work all inherit the same product contract.

## Product Thesis

For busy Bangkok pet owners who need a reliable grooming appointment without slow chat-based coordination, the launch slice is testing whether truthful merchant availability, hybrid instant-vs-request booking, repeat-friendly pet context, and clear payment protection can beat today's LINE-, phone-, and social-led workflow.

The first release is not trying to maximize every metric at once. It is optimizing first for fulfillment reliability, merchant schedule truth, and repeat booking speed.

## Source Of Truth And Precedence

Use this file for requirement families and cross-functional obligations.

When documents overlap:

- [spec.md](spec.md) wins on detailed behavior, invariants, and state semantics.
- This file wins on requirement grouping, supporting obligations, and requirement-family traceability.
- [plan.md](plan.md) wins on sequencing, dependency order, and implementation posture.
- [../planning-and-task-breakdown/tasks.md](../planning-and-task-breakdown/tasks.md) wins on execution decomposition only; it must not redefine scope or policy.
- [../docs/launch-canon.md](../docs/launch-canon.md) remains the concise cross-folder summary of current launch rules.

## Primary Launch Segments

### Customer segment

- busy urban pet owners in dense central Bangkok neighborhoods
- customers seeking reliable in-shop grooming and bathing, especially repeat appointments
- customers who value clarity, speed, and trust more than deep marketplace browsing

### Merchant segment

- premium-leaning independent grooming shops
- operators coordinating bookings through LINE, phone calls, Instagram, Facebook, and walk-ins
- merchants willing to standardize a narrow routine-service set if it reduces admin burden and no-shows

## Core Jobs To Be Done

### Customer job

When my pet needs grooming soon and I do not want to message multiple shops, I want to compare truthful availability, understand what happens next, and book quickly so I can trust the appointment will actually happen.

### Merchant job

When booking demand arrives from multiple channels, I want one canonical schedule, explicit request-confirm handling, and clear no-show controls so I can reduce scheduling chaos and protect revenue.

## Requirement Families

### REQ-BOOK: Booking and routing

- Customers must be able to search shops by location, service, and relevant availability.
- Customers must be able to create and reuse pet profiles.
- The launch slice must treat one booking as one pet plus one primary service template, with only merchant-defined fixed add-ons included inside the same booking unit.
- Multi-pet and bundled multi-service bookings are out of V1 unless explicitly approved later.
- Customers must be able to book routine services instantly where merchant rules allow.
- The system must support request-confirm booking for non-standard or higher-variance cases.
- The system must show a clear booking state to both customer and merchant.
- The system must support `pending_verification` and `pending_merchant_confirmation` as distinct pre-confirmation states where appropriate.
- If a request-confirm booking also requires payment protection or OTP, the launch policy must define one explicit sequence for review versus verification so only one live expiry path owns the slot at a time.
- Prices shown for launch-eligible routine services should be authoritative for the selected service template plus fixed add-ons. Exception flows must make any review-needed pricing uncertainty explicit before commitment.

### REQ-ONBOARD: Onboarding and first-use setup

- The system must support customer onboarding for first-time users.
- The onboarding flow must support Thai and English.
- The onboarding flow must collect the minimum information required to reach first search and first booking.
- The onboarding flow must support phone verification or equivalent account verification.
- Optional setup such as deeper pet-profile completion should be deferrable.
- Payment-method setup should happen only when first required by booking policy, not during default onboarding.

### REQ-LANDING: Launch marketing surface

- The launch slice may include a static marketing landing page focused on product explanation and app-download CTAs.
- The landing page must not offer booking, search, onboarding, or any parallel web flow that duplicates app behavior.
- The landing page should make it clear that booking happens in the app.
- Landing-page claims must stay within the actual Bangkok-first launch slice and should not imply broader coverage or functionality.

### REQ-PET: Pet profile and repeat context

- The system must store breed, size, coat type, temperament, allergies, and special notes.
- The system should store past bookings and previous groomer notes for repeat booking.
- Repeat booking should be materially faster than first-time booking for the same pet and service.

### REQ-MERCHANT: Merchant operations and schedule truth

- Merchants must be able to define service templates, durations, and pricing logic.
- Merchants must be able to open, close, and edit availability.
- Merchants must be able to approve or decline request-based bookings explicitly.
- Merchants must be able to manage booking states such as confirmed, declined by merchant, arrived, in service, completed, cancelled, and no-show.
- Merchants must be able to see a summary dashboard for bookings and revenue.
- Merchants must be able to update booking outcomes quickly on desktop, tablet, and mobile.
- Merchants should be able to perform bulk status updates where operationally useful, but bulk cleanup remains post-launch unless volume proves it is necessary.
- Merchants must be able to search current and upcoming bookings quickly.
- The merchant surface must be fast enough that operators do not need a second shadow schedule for normal day-to-day work.

### REQ-INVENTORY: Availability, canonical schedule, and resource control

- The system must support locking a booking to a specific groomer or station where needed.
- The system must support blocking a resource from online booking.
- The system must support configuring online booking hours and cutoff times.
- Offline bookings must be entered into the same canonical schedule as online bookings.
- A slot cannot be considered truly blocked unless required verification and payment conditions are met.
- Merchants must be able to create an offline-originated booking inside the system and immediately trigger follow-up verification and payment steps.

### REQ-I18N: Localization and language behavior

- The system must support both Thai and English for system-managed UI on customer and merchant surfaces.
- The system must support both Thai and English for transactional notifications and booking-state copy.
- The system should persist a user language preference or honor device language where appropriate.
- The product should avoid hardcoded single-language UI strings.
- Merchant-generated content does not need bilingual support in V1.

### REQ-LIFECYCLE: Booking lifecycle, trust, and booking integrity

- The system must distinguish `declined_by_merchant` from customer cancellation and no-show.
- The system must preserve structured cancellation metadata so actor and reason remain explicit for customer cancellation, merchant cancellation, and system timeout cases.
- The system must support merchant-initiated cancellation of previously confirmed bookings with explicit operational reason codes and customer notification.
- Native self-serve rescheduling is out of V1; when a booking needs a new slot, it should be represented as a cancellation plus a replacement booking or another equally auditable mechanism.
- The system must support transactional notifications for booking creation, confirmation, decline, reminder, and reconfirmation where relevant.
- The system should support merchant-facing notification surfaces for new bookings, edits, cancellations, and deposit or verification updates.
- Reconfirmation non-response must follow one explicit launch policy and must not create hidden inventory transitions.
- Merchant decisions submitted after merchant-response timeout must be rejected or routed to auditable recovery; they must not silently confirm or decline an already expired booking.
- Reminder scheduling must handle bookings created inside the default reminder windows without duplicate or impossible-to-send messages.
- The system must support automated reminder messages before the appointment.
- The system must support reconfirmation prompts before the appointment.
- The system must support OTP or equivalent phone verification for bookings where authenticity risk is high.
- The system must support deposits and card holds.
- The system must support these protections for both online bookings and merchant-entered offline bookings.
- The system must support sending a secure payment link when the merchant captures a booking from phone, LINE, Instagram, Facebook, or walk-in channels.
- The system must use tokenized payment handling so merchants do not access raw card details.
- Routine bookings should default to card holds.
- Deposits should be reserved for higher-risk or higher-value services.
- The system must explain holds, deposits, release conditions, and late-cancel consequences before the customer commits.
- The system must show the customer the current authorization or deposit state after booking creation.
- The system must provide a clear fallback path when payment authorization or verification fails.
- The system must support an auditable trail for disputed holds, deposits, and merchant outcome changes.
- The system should define an operational support path for payment-protection complaints and exception handling.
- The system must support a merchant-configurable grace period for late arrival.
- The system must let merchants mark a customer as arrived, late, cancelled, or no-show.
- The system must define how payment protection changes for confirmed and arrived, cancelled in time, late cancellation, late arrival, and no-show outcomes.
- The system should define a post-appointment editing window during which merchants can correct booking outcomes.
- The default correction window is 24 hours after appointment time.
- If the correction window closes without a final appointment outcome, the system must create an auditable operations-review item and block payout-sensitive settlement until resolved.
- The system must model provisional inventory for `pending_verification` and `pending_merchant_confirmation` bookings.
- A provisional hold must have an explicit expiry timestamp.
- The system must auto-release a provisional hold when verification, payment, or merchant review does not complete in time.
- The system must preserve an audit trail when a provisional hold expires or is manually overridden.
- The customer and merchant should both be able to see the next required action and expiry expectation for a provisional booking.
- When review and verification or payment both apply, one explicit launch policy must own provisional inventory first; the booking must not run competing timeout paths against the same slot.
- Late or duplicate OTP and payment success events must be handled idempotently and must not silently re-confirm or re-block an expired booking.
- Recovery handling for a late success event must be explicit and auditable.

### REQ-ANALYTICS: Instrumentation and decision support

- The system must instrument onboarding completion, first search, booking start, booking success, and repeat booking events.
- The system must instrument merchant-facing trust signals such as offline booking usage, decline rate, and status-correction activity.
- The system must instrument verification timeout, payment-protection drop-off, and merchant-response timing so the team can tune booking policy after launch.
- The system must instrument reconfirmation non-response and any follow-up workload it creates.
- The system should support a lightweight funnel view for first booking and repeat booking behavior.

### REQ-READINESS: Cross-functional launch requirements

The launch slice should satisfy the stakeholder requirements documented in [stakeholder-readiness.md](stakeholder-readiness.md).

- The launch slice must have explicit go, no-go, and pause thresholds.
- The product must make clear what is shipping, what is deferred, and why the wedge is strategically coherent.
- Product or GM must own the launch decision log, waivers, and cross-functional review cadence.
- The business must define treatment and reporting for holds, deposits, captures, refunds, forfeitures, and payout timing.
- Merchant onboarding, support, escalation, and manual override workflows must be documented before launch.
- Frontline scripts for pending states, payment protection, refunds, and no-show disputes must be documented before launch.
- Launch claims must match the actual launch slice and service coverage.
- Customer-facing and merchant-facing terms must cover payment protection, cancellation, no-show, and dispute handling.
- Risk controls for sensitive actions, payment flows, and manual overrides must be reviewed before launch.
- Observability, incident response, rollback, and auditability must be documented for risky booking and payment flows.
- Launch metrics, event definitions, and dashboard QA must be owned explicitly before launch.
- PSP, OTP, notification, and other critical third-party dependencies must be validated or have fallback plans before launch.

### REQ-NFR: Non-functional targets and operational constraints

- All time-sensitive workflow logic must behave consistently in the Bangkok operating context, including timezone, local business hours, and near-term reminder scheduling.
- The product must preserve auditable events for provisional-hold expiry, late-success recovery, manual overrides, merchant cancellation, and payout-sensitive outcome corrections.
- Sensitive actions and sensitive data access must be role-scoped across customer, merchant, support or operations, finance, and internal admin contexts.
- Critical booking and payment callbacks must be idempotent.
- The customer surface should remain usable on mid-range mobile devices and mobile networks common in the launch market.
- Operational handoff from automated flow into support or merchant-recovery work must be explicit, not implied through private chat or undocumented process.

## Reference-Derived Constraints

### Grab Help reference

Source:

- [Grab Help Centre: How to manage Chope bookings](https://help.grab.com/merchant/en-th/40001016)

Requirements derived from that article:

- The product should support a formal operational window after appointment time for correcting booking status.
- The product should support both single-booking and bulk status edits after launch if merchant volume justifies it.
- The product should support fast status changes from multiple merchant surfaces, not only from a desktop admin panel.
- The product should treat no-show handling and booking edits as normal day-to-day operations, not as exception-only support tasks.

### ChopeBook reference

Source:

- [ChopeBook 6.19 User Guide](https://www.scribd.com/document/884337118/chopebook-user-guide)

Requirements derived from that guide:

- The product should provide merchant search for current and upcoming bookings.
- The product should provide resource-level inventory controls such as lock and block behavior.
- The product should provide session-level online booking hour and cutoff-time controls.
- The product should treat decline, cancellation, no-show, and waiting-style states as distinct operational concepts.
- Waitlist and offered-slot flows are explicitly out of V1.

## Non-Goals For V1

- home-service dispatch logistics
- loyalty points and coupon ecosystem
- content-heavy discovery and editorial features
- broad citywide rollout before supply density is proven
- deep public review moderation systems
- native self-serve reschedule flows
- multi-pet and bundled multi-service booking workflows

## Blockers To Implementation Lock

The following decisions are still blocking a fully locked implementation contract:

- exact list of always-instant-bookable services
- exact rules that trigger request-confirm mode
- verification-hold expiry duration and merchant response SLA
- request-confirm sequencing when merchant review and verification or payment both apply
- exact minimum onboarding field set
- approved customer-facing trust copy for holds, deposits, cancellations, and no-show outcomes

## Open Product Decisions

- Is the MVP optimized first for acquisition volume, conversion volume, or fulfillment reliability? The current recommendation is fulfillment reliability, but the launch owner must confirm that priority.
- What exact evidence would force the team to stop or descale after the pilot instead of continuing implementation-heavy work?
- Which commercial promises, if any, are allowed to affect launch pricing or merchant onboarding expectations before the monetization model is locked?

## Deferred Commercial Decisions

These decisions matter, but they should not be implied as already chosen in downstream docs:

- merchant monetization model: commission, subscription, hybrid, or another structure
- merchant acquisition incentives and commercial package design
- any loyalty or promotion mechanics tied to monetization

If one of these decisions changes customer pricing, payouts, legal obligations, or merchant promises, it must be promoted into the formal spec and readiness artifacts in the same change.

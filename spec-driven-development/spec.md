# Spec: Bangkok Pet Grooming Booking Platform MVP

## Purpose

This file is the formal behavior contract for the Bangkok-first launch slice.

It defines what must be true about product scope, booking behavior, state semantics, inventory handling, trust flows, and operational readiness before implementation work is treated as locked.

## Source Of Truth And Precedence

When documents overlap:

- [../docs/launch-canon.md](../docs/launch-canon.md) is the concise cross-folder summary of current launch rules.
- [requirements.md](requirements.md) defines the requirement families and supporting obligations.
- This file defines detailed behavior, invariants, state semantics, and implementation-facing contracts.
- [plan.md](plan.md) defines sequencing, dependencies, and implementation hypotheses.
- [../planning-and-task-breakdown/tasks.md](../planning-and-task-breakdown/tasks.md) decomposes work but must not redefine scope or policy.
- [../docs/governance/authority-boundaries.md](../docs/governance/authority-boundaries.md) governs any conflict across folders.

## Assumptions And Open Questions

### Accepted working assumptions

- The customer surface is mobile-first.
- The merchant surface must work well on desktop and tablet and support fast day-of operations.
- V1 is for in-shop grooming and bathing only in Bangkok.
- Thai and English support in V1 applies to system-managed UI, transactional messages, and booking-state copy.
- Routine bookings default to card holds. Deposits are reserved for higher-risk or higher-value cases.
- The merchant correction window defaults to 24 hours after appointment time.
- Reminder cadence defaults to `24 hours before + same-day`, with a compressed path for near-term bookings.
- `pending_verification` and `pending_merchant_confirmation` may hold inventory provisionally, but those holds must expire automatically if required action does not happen in time.
- The launch booking unit is one pet plus one primary service template, with only fixed add-ons already encoded in merchant pricing and duration rules.
- Multi-pet and bundled multi-service bookings are out of the launch slice unless explicitly approved later.
- A missed reconfirmation response in V1 does not silently release previously confirmed inventory. It raises merchant attention and remains auditable.
- OTP and payment success callbacks must be idempotent, and late success after expiry must not resurrect a released booking or double-apply a payment outcome.

### Questions blocked on the pilot decision gate

- Which services are always instant-bookable in the launch slice?
- What exact inputs should trigger request-confirm mode: service type, pet profile, uploaded photos, or a combination?
- What should the verification-hold expiry and merchant response SLA be?
- What sequence should request-confirm bookings follow when payment protection or OTP also applies?

## Objective

Build a Bangkok-first pet grooming booking platform that lets busy urban pet owners complete routine bookings in under 60 seconds while giving independent groomers a trustworthy, operationally accurate schedule.

The product must solve two problems at the same time:

- customers waste time coordinating through LINE, Instagram, Facebook, and phone calls
- groomers lose time and revenue to no-shows, stale availability, and manual scheduling cleanup

The product wins if a repeat customer can rebook the same pet and service faster than messaging the shop manually, and if a merchant trusts the booking board enough to rely on it as the canonical schedule.

## Launch Posture

This spec distinguishes between:

- `launch slice` — the first release that proves schedule truth, payment trust, and repeat value
- `full MVP roadmap` — the broader set of capabilities that may follow once the launch slice is working

The launch slice must stay narrow enough that:

- instant booking is truthful for the services included
- merchants can actually keep the canonical schedule current
- payment protection is explained clearly
- customer and merchant support load remains manageable

## Stakeholder Satisfaction

The product should not be considered launch-ready unless the following groups can each operate or approve it with confidence:

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

The detailed cross-functional gate lives in [stakeholder-readiness.md](stakeholder-readiness.md).

## Role And Permission Boundaries

| Role | Must be able to do | Must not be implied to do |
| --- | --- | --- |
| Customer | search, book, verify, view booking state, receive reminders, rebook | edit merchant availability, override booking outcomes, or see raw payment data |
| Merchant staff | manage availability, handle request-confirm decisions, capture offline-originated bookings, update arrival and outcome states | perform internal finance reconciliation or platform-wide override actions |
| Merchant owner or manager | set service templates, pricing logic, cutoff controls, and merchant policies allowed by the launch slice | bypass audit rules for customer trust or payout-sensitive events |
| Operations or support | investigate incidents, follow runbooks, manage queues, and coordinate recovery | silently rewrite booking history without auditable reason capture |
| Finance or accounting reviewer | inspect holds, deposits, captures, refunds, forfeitures, and payout-impacting events | manage customer-facing product flows or merchant day-to-day availability |
| Internal admin with override permission | use explicit dangerous actions with reason capture and audit trail | act through hidden or undocumented override paths |

## Product Scope

### Launch Slice for First Release

- static marketing landing page with app-download CTAs only
- customer onboarding with language choice, phone or account verification, and first-use setup
- customer search by location, service, and relevant near-term availability
- customer pet profiles with booking-relevant attributes
- single-pet booking unit with optional fixed add-ons
- merchant-defined service templates and duration rules
- hybrid booking flow with instant and request-based paths
- deposits and card holds
- OTP or equivalent verification for risky bookings
- booking-status notifications, reminders, and reconfirmation prompts
- Thai and English support for system-managed UI and transactional messages
- merchant booking board with fast status updates
- merchant search for current and upcoming bookings
- merchant controls to lock a booking to a groomer or station
- merchant controls to block resources from online booking and configure booking cutoff times
- merchant offline booking entry with payment-link follow-up
- repeat booking for the same pet and service
- product analytics for onboarding, first booking, merchant schedule trust, and repeat behavior
- internal operations control plane for exception handling, overrides, merchant recovery, and trust-event review

### Full MVP Roadmap After Launch Validation

- basic daily revenue and booking summary
- bulk merchant cleanup actions if booking volume proves they are necessary
- lightweight post-service review capture tied to completed bookings
- deeper marketplace discovery and reporting breadth once the core loop is stable

### Out of Scope for MVP

- home-service routing and dispatch
- loyalty marketplace and deal ecosystem
- social content and editorial discovery
- waitlist, queue, and offered-slot cancellation-fill workflows
- native self-serve reschedule flows
- multi-pet and bundled multi-service booking workflows
- broad multi-city rollout
- deep public-review moderation systems
- enterprise multi-branch management beyond simple future expansion support

## Core Workflows

### Customer booking workflow

1. Complete minimal onboarding if this is the first session:
   - choose Thai or English
   - verify phone or account identity
   - complete essential first-use policy and permission steps
2. Search shop by area, service, and relevant next-available time.
3. Select a pet profile or create one.
4. Choose one primary service template and any fixed add-ons allowed inside that template.
5. See the eligible booking mode:
   - instant confirmation for standard cases with no extra blocking step
   - `pending_verification` for cases that need OTP or payment completion before confirmation
   - `pending_merchant_confirmation` for exception cases
   - if an exception case also needs payment protection or OTP, the launch policy must define one ordered sequence for merchant review versus verification so the booking has only one active provisional-expiry owner at a time
6. Complete payment protection step:
   - no payment protection
   - card hold
   - deposit
7. Complete OTP or verification step if required.
8. Receive booking-created, confirmed, declined, reminder, and reconfirmation messages as appropriate.
9. Receive reminder and reconfirmation before appointment, including a compressed path for bookings created inside the normal reminder windows.
10. View system-managed booking copy in Thai or English.

### Static landing-page workflow

1. Visitor lands on a static marketing site.
2. Visitor understands the product, launch wedge, and trust model at a high level.
3. Visitor clicks an App Store or Play Store style CTA.
4. Visitor downloads the app to continue into the real booking experience.

The landing page must not create a parallel web booking flow.

### Merchant workflow

1. Define services, durations, buffers, availability, and online booking cutoff controls.
2. Search current and upcoming bookings.
3. Approve or decline request-based bookings before the response SLA expires, and manually add offline-originated bookings.
4. Trigger payment link or verification when needed.
5. Update status quickly from desktop, tablet, or mobile.
6. Mark arrival, in-service, completion, decline, merchant cancellation, customer cancellation, or no-show with explicit reason capture where required.
7. Lock bookings to a groomer or station and block resources from online booking when needed.
8. Use bulk status updates later only if operator volume proves they are necessary.
9. Review daily bookings and, later, revenue summary when reporting is added.
10. Use merchant workflows in Thai or English for system-managed UI.

### Operations control-plane workflow

1. Monitor launch health, queue volume, and trust-sensitive incidents.
2. Investigate failed verification, payment issues, SLA breaches, merchant disruptions, and no-show disputes.
3. Apply controlled override actions with explicit permission, reason capture, and auditability.
4. Review holds, deposits, refunds, forfeitures, and payout-impacting events without becoming a full accounting suite.
5. Drive merchant recovery when a shop drifts back to chat-based or shadow scheduling.

## Inventory Commitment Model

Inventory truth depends on separating `booking status` from `inventory commitment`.

The system must support:

- `confirmed inventory` for bookings that have satisfied required conditions and should fully consume capacity
- `provisional hold` for bookings in `pending_verification` or `pending_merchant_confirmation` when the product chooses to reserve the slot temporarily
- `released inventory` when a provisional hold expires, a request is declined, or a booking is cancelled

Rules:

- A provisional hold must include an expiry timestamp.
- The same slot must not remain provisionally blocked after the expiry timestamp passes.
- Customers and merchants should be able to see the next required action and time expectation for a provisional hold.
- The system must audit auto-releases and manual overrides.
- Only `pending_verification` and `pending_merchant_confirmation` may consume provisional inventory in V1.
- A booking must have one explicit provisional-expiry owner at a time. If merchant review and payment or OTP both apply, the launch policy must define which step owns inventory first and what unlocks the next step.
- Reconfirmation non-response must not silently transition confirmed inventory into released inventory.

## Booking State Machine

Canonical booking states for MVP:

- `pending_verification`
- `pending_merchant_confirmation`
- `declined_by_merchant`
- `confirmed`
- `reconfirmed`
- `arrived`
- `in_service`
- `completed`
- `late`
- `cancelled`
- `no_show`

State transition rules:

- An instant-eligible booking that still requires OTP or payment completion should enter `pending_verification` before it becomes `confirmed`.
- A booking that requires OTP or payment completion must not become `confirmed` before those steps pass.
- A request-based booking must not become `confirmed` before merchant approval.
- A request-based booking may become `declined_by_merchant` without being conflated with `cancelled` or `no_show`.
- A request-based booking that also requires payment protection or OTP must follow one explicit launch-locked sequence. It must not run competing live expiry timers for merchant review and verification at the same time.
- `pending_verification` and `pending_merchant_confirmation` must carry expiry behavior for any provisional inventory hold.
- When a provisional hold expires, the booking must release inventory and move to `cancelled` with an explicit system reason such as verification timeout or merchant response timeout.
- A merchant decision on a request-based booking must be explicit: `pending_merchant_confirmation` can move to either `confirmed` or `declined_by_merchant`.
- Merchant decisions received after a `pending_merchant_confirmation` booking has already expired must be rejected or routed to an auditable manual recovery path. They must not move the expired booking into `confirmed` or `declined_by_merchant`.
- A confirmed booking may become `reconfirmed` after reminder response.
- A confirmed or reconfirmed booking may become `late`, `arrived`, `cancelled`, or `no_show`.
- `cancelled` must preserve structured actor and reason metadata so customer cancellation, merchant cancellation, and system timeout remain operationally distinct.
- A confirmed booking may be merchant-cancelled for explicit operational reasons such as shop closure, staff unavailability, or safety mismatch.
- Reconfirmation non-response in V1 must not silently release confirmed inventory. It should instead create a visible follow-up signal for merchant and support tooling.
- A merchant must be able to correct booking outcome status within a defined post-appointment window.

Future note:

- Waitlist states such as `waitlisted`, `slot_offered`, and `removed` are intentionally excluded from V1 unless scope expands.

## Cancellation And No-Show Policy Matrix

This matrix is part of the product, not just operations copy.

| Scenario | Slot outcome | Payment outcome | Merchant or operations action required |
| --- | --- | --- | --- |
| Merchant declines request-based booking | Slot remains available | hold released or no charge captured per policy | mark `declined_by_merchant` |
| Customer cancels within policy | Slot reopens | hold released or deposit refunded per policy | mark `cancelled` |
| Customer cancels late | Slot may stay blocked if too late to refill | hold captured or deposit forfeited per policy | mark `cancelled` with late-cancel reason |
| Merchant cancels a confirmed booking | Slot reopens or replacement booking is created manually | hold released or deposit refunded per policy | mark `cancelled` with merchant reason |
| Customer does not respond to reconfirmation | Booking remains confirmed in V1 | payment outcome unchanged before appointment outcome | flag merchant follow-up |
| Customer arrives on time | Slot consumed | hold released or converted as configured | mark `arrived` |
| Customer arrives late within grace period | Slot may be preserved | payment outcome unchanged until service decision | mark `late` or `arrived` |
| Customer misses grace period | Slot may be released | hold or deposit follows no-show policy | mark `no_show` |
| OTP or payment success arrives after provisional expiry | Slot remains released | apply deterministic recovery rule; never silently re-confirm | record late-success event for review |

## Implementation Contracts

### Core entities and invariants

The implementation must make these objects explicit:

- `Booking`
- `BookingEvent`
- `PetProfile`
- `ServiceTemplate`
- `AvailabilityRule`
- `PaymentProtectionRecord`
- `NotificationRecord`
- `AuditEvent`

Core invariants:

- every capacity-consuming booking must exist in the same canonical schedule
- one booking has one booking unit in the launch slice
- one provisional-expiry owner exists at a time
- booking outcome and payment outcome remain distinct concepts even when they influence one another
- merchant decline, merchant cancellation, customer cancellation, system timeout, and no-show remain operationally distinguishable

### Notification triggers

The system must trigger auditable notifications for:

- booking created
- booking confirmed
- booking declined
- verification reminder or next-step reminder when relevant
- reminder and reconfirmation events
- merchant-cancelled confirmed booking
- failure or timeout outcomes that require customer follow-up

### Audit and operational events

The system must preserve auditability for:

- provisional-hold creation, expiry, release, and override
- merchant decision after SLA expiry
- payment authorization, capture, release, refund, and forfeiture-relevant outcome change
- OTP and payment late-success recovery
- merchant correction-window edits
- internal override actions and their reasons

### Failure and recovery handling

- Failed payment or verification must not leave the slot in an ambiguous state.
- Late or duplicate external callbacks must be idempotent and auditable.
- Bookings missing a final outcome at correction-window expiry must create an operations-review task before payout-sensitive settlement continues.
- Any dangerous internal override action must require explicit reason capture and leave an audit trail.

## Non-Functional Targets

- Critical booking and payment flows must be auditable end to end.
- Timeout and expiry behavior must be observable in production.
- The product must behave correctly in the Bangkok operating context, including timezone and local business-hour assumptions.
- Customer and merchant system-managed journeys must be usable in both Thai and English.
- The customer surface should remain usable on mid-range mobile devices and networks common in the launch market.
- Access to manual overrides, payment events, and sensitive customer data must be role-scoped.
- PSP, OTP, notification, and localization dependencies must have fallback or failure-handling plans before launch.

## Customer Trust And Support

These are launch requirements, not polish:

- Before commitment, the customer must see whether the booking uses no payment protection, a hold, or a deposit.
- The system must explain what releases a hold, what forfeits a deposit, and what happens on late cancellation or no-show.
- After booking, the customer must be able to see the current verification and payment-protection state.
- Failed authorization, failed OTP, or timeout states must have a clear next step.
- Operations and support must have an audit trail for booking-state changes, payment-protection events, and manual overrides.
- Merchant-initiated cancellations and late-success recovery cases must remain explainable to support and visible in audit history.

## Cross-Functional Readiness Requirements

The launch slice must also be legible to the rest of the company:

- CEO must be able to see the wedge, success metrics, and kill conditions.
- Product or GM must own the final launch decision process, waivers, and review cadence.
- Finance must be able to evaluate downside risk from payment protection and support burden.
- Accounting must be able to reconcile holds, deposits, captures, refunds, forfeitures, and payouts.
- Operations must have SOPs for merchant onboarding, support, disputes, and manual overrides.
- Customer Support and Merchant Success must have scripts, queue ownership, and merchant recovery playbooks.
- Marketing must have truthful claims and approved trust messaging.
- Legal must have reviewed terms, consent language, and dispute handling.
- Risk, Compliance, Security, and Privacy must have reviewed controls, access, and retention posture.
- Tech must have observability, rollback, and incident response for risky flows.
- Data and Analytics must have trustworthy metric definitions and launch dashboards.
- Sales, BD, or Merchant Acquisition must align merchant promises with the actual launch slice.
- External critical vendors must be validated or covered by fallback plans.

## Success Criteria

The spec is successful when the MVP can satisfy all of these conditions:

- A new customer can complete onboarding and reach first search or first booking without unnecessary mandatory steps.
- A repeat customer can rebook the same pet and service in under 60 seconds.
- Routine services can be instantly booked without causing schedule conflicts in the canonical schedule.
- Exception cases are clearly routed into merchant confirmation without misleading the customer.
- Merchants can explicitly approve exception cases into confirmed bookings and can merchant-cancel confirmed bookings with auditable reasons when necessary.
- Pending verification and pending merchant confirmation holds auto-release correctly when they expire.
- Both online and offline-originated bookings can trigger deposits or card holds and verification flows.
- Late or duplicate provider callbacks do not resurrect expired bookings or double-apply payment outcomes.
- Booking-created, confirmed, declined, and reminder notifications render correctly in Thai and English.
- Merchants can mark arrival, cancellation, and no-show from desktop, tablet, and mobile.
- Merchants can search current and upcoming bookings and manage online inventory with cutoff and resource controls.
- Merchants can correct booking outcomes inside a defined operational window after appointment time.
- A missed offline manual update does not create a second hidden schedule; every capacity-consuming booking must exist in the same booking system.
- The policy engine can determine release, refund, capture, or forfeiture behavior for each appointment outcome.
- Customers can understand the payment-protection policy before completing a booking.
- Support and operations can trace why a hold, deposit, decline, timeout, cancellation, or no-show occurred.
- Merchant actions submitted after request expiry cannot silently resurrect released bookings.
- Near-term bookings created inside reminder windows follow a sane, non-duplicate reminder path.
- Bookings missing a final outcome at correction-window expiry are surfaced for operations review before payout-sensitive settlement.
- Product / GM, CEO, Finance, Accounting, Operations, Customer Support / Merchant Success, Marketing, Legal, Risk, Tech, Data, Sales / BD, and external vendors each have a reviewable readiness packet or explicit waiver before launch.
- Customer and merchant system-managed journeys are usable in both Thai and English.
- The team can observe onboarding completion, first booking conversion, merchant schedule truth, and repeat booking through instrumentation.

## Open Questions

- Which services are always instant-bookable in the launch slice?
- What exact inputs should trigger request-confirm mode: service type, pet profile, uploaded photos, or a combination?
- What should the verification-hold expiry and merchant response SLA be?
- What sequence should request-confirm bookings follow when payment protection or OTP also applies?

These questions should be resolved through the pilot decision gate before implementation-heavy work is treated as locked.

## References

- [requirements.md](requirements.md)
- [plan.md](plan.md)
- [../idea-refine/pet-grooming-booking-platform.md](../idea-refine/pet-grooming-booking-platform.md)
- [../idea-refine/supporting-notes.md](../idea-refine/supporting-notes.md)
- [ChopeBook user guide](https://www.scribd.com/document/884337118/chopebook-user-guide)
- [Chope: Reducing No Show](https://restaurants.chope.co/singapore/restaurant-no-show/)
- [Grab Help Centre: How to manage Chope bookings](https://help.grab.com/merchant/en-th/40001016)

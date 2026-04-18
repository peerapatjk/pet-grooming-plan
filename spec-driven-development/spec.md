# Spec: Bangkok Pet Grooming Booking Platform MVP

## Assumptions I'm Making

1. This is a mobile-first product for customers, not a desktop-first marketplace.
2. Merchant operations need both browser support and tablet-friendly interaction, even if the customer surface is primarily mobile.
3. The implementation will likely be a TypeScript monorepo with a mobile app, merchant app, and API, even though the codebase has not been scaffolded yet.
4. Payments must be tokenized through a third-party payment provider that supports card holds, charges, and refunds or releases in Thailand.
5. Authentication and booking verification will rely heavily on phone number verification and OTP flows.
6. V1 is for in-shop grooming and bathing only in Bangkok. Home-service logistics are explicitly out of scope.
7. The booking model for MVP is hybrid: standard services may be instant-booked, while high-variance cases require merchant confirmation.
8. Thai and English support in V1 applies at minimum to system-managed UI, transactional messages, and booking-state copy. Merchant-entered content is not automatically translated unless explicitly added to scope later.
9. Waitlist, queue, and offered-slot flows are not included in V1 unless explicitly approved later.
10. Customer onboarding in V1 should be minimal and optimized for time-to-first-booking rather than full profile completion upfront.
11. Routine bookings default to card holds; deposits are reserved for higher-risk or higher-value services.
12. The merchant correction window defaults to 24 hours after appointment time.
13. Reminder schedule defaults to 24 hours before plus same-day reminder.
14. The first software launch should be a narrower launch slice, not the entire roadmap in one release.
15. `pending_verification` and `pending_merchant_confirmation` may hold inventory provisionally, but those holds must expire automatically if the required action does not happen in time.
16. The launch booking unit is one pet plus one primary service template, with only fixed add-ons already encoded in merchant pricing and duration rules.
17. Multi-pet and bundled multi-service bookings are out of the launch slice unless explicitly approved later.
18. A missed reconfirmation response in V1 should not silently release previously confirmed inventory; it should raise merchant attention and remain auditable.
19. OTP and payment success callbacks must be idempotent, and late success after expiry must not resurrect a released booking or double-apply a payment outcome.

Correct these before Phase 2 if any are wrong. The plan should not proceed on hidden assumptions.

## Objective

Build a Bangkok-first pet grooming booking platform that lets busy urban pet owners complete routine bookings in under 60 seconds while giving independent groomers a trustworthy, operationally accurate schedule.

The product must solve two real problems at the same time:

- customers waste time coordinating through LINE, Instagram, Facebook, and phone calls
- groomers lose time and revenue to no-shows, stale availability, and manual scheduling cleanup

The MVP should optimize for repeat behavior, not just discovery. The product wins if a customer can rebook the same service for the same pet faster than they can message the shop manually, and if a groomer trusts the booking board enough to rely on it as the canonical schedule.

The MVP must support both Thai and English for system-managed experiences on both customer and merchant surfaces.

## Launch Posture

This spec distinguishes between:

- `launch slice` — the first release that proves schedule truth, payment trust, and repeat-value
- `full MVP roadmap` — the broader set of capabilities that may follow once the launch slice is working

The launch slice should stay narrow enough that:

- instant booking is truthful for the services included
- merchants can actually keep the canonical schedule current
- payment protection is explained clearly
- customer and merchant support load remains manageable

## Stakeholder Satisfaction

This product should not be considered launch-ready unless the following groups can each operate or approve it with confidence:

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

The detailed cross-functional gate lives in:

- [stakeholder-readiness.md](stakeholder-readiness.md)

## Tech Stack

This section is provisional and exists to make planning concrete.

- Customer app: React Native with Expo + TypeScript
- Merchant app: React web app with TypeScript, optimized for desktop and tablet
- API: TypeScript service with REST or RPC endpoints
- Database: PostgreSQL
- Payments: third-party PSP with tokenized cards, holds, captures, refunds, and web payment links
- Notifications: push notifications + SMS or equivalent OTP provider
- Localization: application-level i18n layer for Thai and English copy

## Commands

These are proposed commands for the eventual implementation repo. They are placeholders for planning discipline, not verified against a scaffolded project yet.

- Mobile dev: `pnpm --filter app-mobile dev`
- Merchant dev: `pnpm --filter app-merchant dev`
- API dev: `pnpm --filter api dev`
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`
- Unit tests: `pnpm test -- --runInBand`
- Integration tests: `pnpm test:integration`
- E2E tests: `pnpm test:e2e`
- Production build: `pnpm build`

## Project Structure

This is the target structure for the eventual codebase.

```text
apps/
  app-mobile/                    Customer mobile app
  app-merchant/                  Merchant web or tablet app
  api/                           Backend service
packages/
  domain/                        Booking rules, policy logic, shared types
  ui/                            Shared UI primitives where appropriate
  i18n/                          Translation keys, locale config, formatting helpers
  config/                        Shared lint, TypeScript, and tooling config
docs/
  product/                       PRDs, UX flows, policy docs
  architecture/                  System design and ADRs
tests/
  integration/                   Cross-service and API integration tests
  e2e/                           Customer and merchant journey tests
idea-refine/
  pet-grooming-booking-platform.md
  supporting-notes.md
spec-driven-development/
  spec.md                        Phase 1 source of truth
  requirements.md                Supporting requirements notes
```

## Code Style

Favor explicit domain modeling over loose status strings and ad hoc conditionals.

```ts
export type BookingStatus =
  | "pending_verification"
  | "pending_merchant_confirmation"
  | "declined_by_merchant"
  | "confirmed"
  | "reconfirmed"
  | "arrived"
  | "in_service"
  | "completed"
  | "cancelled"
  | "late"
  | "no_show";

export type BookingCancellationActor = "customer" | "merchant" | "system";

export type BookingCancellationReason =
  | "customer_cancelled_in_policy"
  | "customer_cancelled_late"
  | "merchant_shop_closed"
  | "merchant_staff_unavailable"
  | "merchant_service_mismatch"
  | "system_verification_timeout"
  | "system_merchant_response_timeout";

export interface BookingPolicy {
  paymentProtection: "none" | "card_hold" | "deposit";
  gracePeriodMinutes: number;
  requiresOtp: boolean;
  allowsInstantBooking: boolean;
}
```

Conventions:

- Use descriptive domain names such as `BookingPolicy`, `PetProfile`, and `MerchantAvailabilityRule`.
- Keep booking rules in shared domain modules, not scattered across UI handlers.
- Prefer explicit state transitions over boolean flags like `isLate` and `isConfirmed`.
- Model cancellation actor and cancellation reason separately from terminal booking status.
- Treat offline-originated bookings as first-class objects, not special-case notes.
- Do not hardcode user-facing copy outside the translation layer.

## Testing Strategy

Testing must prove schedule truth, payment-protection behavior, and operational recovery paths.

- Unit tests:
  - booking state transitions
  - service-duration and slot-eligibility rules
  - deposit, hold, release, and forfeiture policy logic
  - instant-book vs request-book routing
  - cancellation actor and reason handling
- Integration tests:
  - booking creation against merchant availability
  - merchant approval of an exception booking into `confirmed`
  - offline booking entry followed by payment-link verification
  - booking-status notification rendering for Thai and English
  - OTP verification and reconfirmation flows
  - webhook or callback processing from the payment provider, including duplicate and late events
  - locale-sensitive notification rendering for Thai and English
- E2E tests:
  - customer completes onboarding and reaches booking-ready state
  - customer creates a pet profile and books a routine service
  - merchant confirms an exception booking
  - merchant cancels a confirmed booking with explicit operational reason
  - provisional hold expires and releases inventory correctly
  - late provider callback does not resurrect an expired booking
  - reminder and reconfirmation behavior before appointment time
  - merchant marks arrived, completed, cancelled, and no-show outcomes
  - customer and merchant flows render correctly in Thai and English

Coverage expectations:

- 100% coverage is not the goal
- Critical domain-policy modules should have high branch coverage
- Any booking state transition or payment-rule change must be covered by tests before merge

## Boundaries

- Always:
  - keep the booking board as the canonical schedule
  - model policy logic explicitly for cancellation, no-show, and hold or deposit outcomes
  - keep booking-unit boundaries explicit for launch-slice logic
  - support both online and offline booking ingestion in the same system
  - route system-managed copy through the Thai and English localization layer
  - write or update tests for domain rules before merging behavior changes
- Ask first:
  - changing the payment model from hold to deposit by default
  - changing the merchant correction window after appointment time
  - adding dependencies for notifications, payments, or analytics
  - changing the core data model for bookings, pets, or merchant availability
- Never:
  - store raw card details
  - allow capacity-consuming bookings to exist outside the canonical schedule
  - bury booking confirmation behind marketing or editorial surfaces
  - hardcode new system copy in only one language
  - remove no-show or cancellation tests to unblock delivery

## Product Scope

### Launch Slice for First Release

- static marketing landing page with app-download CTAs only
- customer onboarding with language choice, phone or account verification, and first-use setup
- customer search by location, service, and relevant near-term availability
- customer pet profiles with booking-relevant attributes
- single-pet booking unit with optional fixed add-ons
- merchant-defined service templates and duration rules
- hybrid booking flow with instant and request-based paths
- deposits and/or card holds
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
- enterprise multi-branch management beyond simple support for future expansion

## Core Workflows

### Customer booking workflow

1. Complete minimal onboarding if this is the first session:
   - choose Thai or English
   - verify phone or account identity
   - complete essential first-use policy and permission steps
2. Search shop by area, service, and relevant next-available time
3. Select pet profile or create one
4. Choose one primary service template and any fixed add-ons allowed inside that template
5. See eligible booking mode:
   - instant confirmation for standard cases with no extra blocking step
   - pending verification for cases that need OTP or payment completion before confirmation
   - pending merchant confirmation for exception cases
   - if an exception case also needs payment protection or OTP, the launch policy must define one ordered sequence for merchant review versus verification so the booking has only one active provisional-expiry owner at a time
6. Complete payment protection step:
   - no payment protection
   - card hold
   - deposit
7. Complete OTP or verification step if required
8. Receive booking-created, confirmed, declined, reminder, and reconfirmation messages as appropriate
9. Receive reminder and reconfirmation before appointment, including a compressed path for bookings created inside the normal reminder windows
10. View system-managed booking copy in Thai or English

### Static landing-page workflow

1. Visitor lands on a static marketing site
2. Visitor understands the product, launch wedge, and trust model at a high level
3. Visitor clicks App Store or Play Store style CTA
4. Visitor downloads the app to continue into the real booking experience

The landing page must not create a parallel web booking flow.

### Merchant workflow

1. Define services, durations, buffers, availability, and online booking cutoff controls
2. Search current and upcoming bookings
3. Approve or decline request-based bookings before the response SLA expires, and manually add offline bookings
4. Trigger payment link or verification when needed
5. Update status quickly from desktop, tablet, or mobile
6. Mark arrival, in-service, completion, decline, merchant cancellation, customer cancellation, or no-show with explicit reason capture where required
7. Lock bookings to a groomer or station and block resources from online booking when needed
8. Use bulk status updates later if operator volume proves they are necessary
9. Review daily bookings and, later, revenue summary when reporting is added
10. Use merchant workflows in Thai or English for system-managed UI

## Inventory Commitment Model

Inventory truth depends on separating `booking status` from `inventory commitment`.

The system must support:

- `confirmed inventory` for bookings that have satisfied the required conditions and should fully consume capacity
- `provisional hold` for bookings in `pending_verification` or `pending_merchant_confirmation` when the product chooses to reserve the slot temporarily
- `released inventory` when a provisional hold expires, a request is declined, or a booking is cancelled

Rules:

- A provisional hold must include an expiry timestamp.
- The same slot must not remain provisionally blocked after the expiry timestamp passes.
- Customers and merchants should be able to see the next required action and time expectation for a provisional hold.
- The system must audit auto-releases and manual overrides.
- Only `pending_verification` and `pending_merchant_confirmation` may consume provisional inventory in V1.
- A booking must have one explicit provisional-expiry owner at a time; if merchant review and payment or OTP both apply, the launch policy must define which step owns inventory first and what unlocks the next step.
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
- A request-based booking that also requires payment protection or OTP must follow one explicit launch-locked sequence; it must not run competing live expiry timers for merchant review and verification at the same time.
- `pending_verification` and `pending_merchant_confirmation` must carry expiry behavior for any provisional inventory hold.
- When a provisional hold expires, the booking must release inventory and move to `cancelled` with an explicit system reason such as verification timeout or merchant response timeout.
- A merchant decision on a request-based booking must be explicit: `pending_merchant_confirmation` can move to either `confirmed` or `declined_by_merchant`.
- Merchant decisions received after a `pending_merchant_confirmation` booking has already expired must be rejected or routed to an auditable manual recovery path; they must not move the expired booking into `confirmed` or `declined_by_merchant`.
- A confirmed booking may become `reconfirmed` after reminder response.
- A confirmed or reconfirmed booking may become `late`, `arrived`, `cancelled`, or `no_show`.
- `cancelled` must preserve structured actor and reason metadata so customer cancellation, merchant cancellation, and system timeout remain operationally distinct.
- A confirmed booking may be merchant-cancelled for explicit operational reasons such as shop closure, staff unavailability, or safety mismatch.
- Reconfirmation non-response in V1 must not silently release confirmed inventory. It should instead create a visible follow-up signal for the merchant and support tooling.
- A merchant must be able to correct booking outcome status within a defined post-appointment window.

Future note:

- Waitlist states such as `waitlisted`, `slot_offered`, and `removed` are intentionally excluded from V1 unless scope expands.

## Cancellation and No-Show Policy Matrix

This matrix is part of the product, not just operations copy.

| Scenario | Slot outcome | Payment outcome | Merchant action required |
|---|---|---|---|
| Merchant declines request-based booking | Slot remains available | Hold released or no charge captured per policy | Mark declined_by_merchant |
| Customer cancels within policy | Slot reopens | Hold released or deposit refunded per policy | Mark cancelled |
| Customer cancels late | Slot may stay blocked if too late to refill | Hold captured or deposit forfeited per policy | Mark cancelled with late-cancel reason |
| Merchant cancels a confirmed booking | Slot reopens or replacement booking is created manually | Hold released or deposit refunded per policy | Mark cancelled with merchant reason |
| Customer does not respond to reconfirmation | Booking remains confirmed in V1 | Payment outcome unchanged before appointment outcome | Flag merchant follow-up |
| Customer arrives on time | Slot consumed | Hold released or converted as configured | Mark arrived |
| Customer arrives late within grace period | Slot may be preserved | Payment outcome unchanged until service decision | Mark late or arrived |
| Customer misses grace period | Slot may be released | Hold or deposit follows no-show policy | Mark no_show |
| OTP or payment success arrives after provisional expiry | Slot remains released | Apply deterministic recovery rule; never silently re-confirm | Record late-success event for review |

## Operational Timing Guards

- Merchant approval or decline submitted after a request-confirm SLA expiry must fail safely or enter an auditable manual-recovery flow; it must never silently resurrect an expired request.
- Bookings created inside the default `24 hours before + same-day` reminder cadence must use a compressed reminder path that avoids duplicate or impossible-to-send reminders.
- If the merchant correction window closes without a final appointment outcome, the system must create an operations-review task and block payout-sensitive settlement until the outcome is resolved.

## Customer Trust and Support

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
- The team can observe onboarding completion, first booking conversion, merchant schedule trust, and repeat booking through instrumentation.

## Open Questions

- Which services are always instant-bookable in the launch slice?
- What exact inputs should trigger request-and-confirm mode: service type, pet profile, uploaded photos, or a combination?
- What should the verification-hold expiry and merchant response SLA be?
- What sequence should request-confirm bookings follow when payment protection or OTP also applies?

These questions should be resolved through the pilot decision gate before implementation-heavy work is treated as locked.

## References

- [requirements.md](requirements.md)
- [pet-grooming-booking-platform.md](../idea-refine/pet-grooming-booking-platform.md)
- [supporting-notes.md](../idea-refine/supporting-notes.md)
- [ChopeBook user guide](https://www.scribd.com/document/884337118/chopebook-user-guide)
- [Chope: Reducing No Show](https://restaurants.chope.co/singapore/restaurant-no-show/)
- [Grab Help Centre: How to manage Chope bookings](https://help.grab.com/merchant/en-th/40001016)

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

Correct these before Phase 2 if any are wrong. The plan should not proceed on hidden assumptions.

## Objective

Build a Bangkok-first pet grooming booking platform that lets busy urban pet owners complete routine bookings in under 60 seconds while giving independent groomers a trustworthy, operationally accurate schedule.

The product must solve two real problems at the same time:

- customers waste time coordinating through LINE, Instagram, Facebook, and phone calls
- groomers lose time and revenue to no-shows, stale availability, and manual scheduling cleanup

The MVP should optimize for repeat behavior, not just discovery. The product wins if a customer can rebook the same service for the same pet faster than they can message the shop manually, and if a groomer trusts the booking board enough to rely on it as the canonical schedule.

The MVP must support both Thai and English for system-managed experiences on both customer and merchant surfaces.

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
- Treat offline-originated bookings as first-class objects, not special-case notes.
- Do not hardcode user-facing copy outside the translation layer.

## Testing Strategy

Testing must prove schedule truth, payment-protection behavior, and operational recovery paths.

- Unit tests:
  - booking state transitions
  - service-duration and slot-eligibility rules
  - deposit, hold, release, and forfeiture policy logic
  - instant-book vs request-book routing
- Integration tests:
  - booking creation against merchant availability
  - offline booking entry followed by payment-link verification
  - booking-status notification rendering for Thai and English
  - OTP verification and reconfirmation flows
  - webhook or callback processing from the payment provider
  - locale-sensitive notification rendering for Thai and English
- E2E tests:
  - customer completes onboarding and reaches booking-ready state
  - customer creates a pet profile and books a routine service
  - merchant confirms an exception booking
  - reminder and reconfirmation behavior before appointment time
  - merchant marks arrived, completed, cancelled, and no-show outcomes
  - bulk status update workflow for merchant cleanup
  - customer and merchant flows render correctly in Thai and English

Coverage expectations:

- 100% coverage is not the goal
- Critical domain-policy modules should have high branch coverage
- Any booking state transition or payment-rule change must be covered by tests before merge

## Boundaries

- Always:
  - keep the booking board as the canonical schedule
  - model policy logic explicitly for cancellation, no-show, and hold or deposit outcomes
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

### In Scope for MVP

- customer onboarding with language choice, phone or account verification, and first-use setup
- customer search by location, service, and relevant near-term availability
- customer pet profiles with booking-relevant attributes
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
- basic daily revenue and booking summary
- repeat booking for the same pet and service
- product analytics for onboarding, first booking, merchant schedule trust, and repeat behavior

### Out of Scope for MVP

- home-service routing and dispatch
- loyalty marketplace and deal ecosystem
- social content and editorial discovery
- waitlist, queue, and offered-slot cancellation-fill workflows
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
4. Choose service
5. See eligible booking mode:
   - instant confirmation for standard cases
   - pending merchant confirmation for exception cases
6. Complete payment protection step:
   - no payment protection
   - card hold
   - deposit
7. Complete OTP or verification step if required
8. Receive booking-created, confirmed, declined, reminder, and reconfirmation messages as appropriate
9. Receive reminder and reconfirmation before appointment
10. View system-managed booking copy in Thai or English

### Merchant workflow

1. Define services, durations, buffers, availability, and online booking cutoff controls
2. Search current and upcoming bookings
3. Accept online bookings and manually add offline bookings
4. Trigger payment link or verification when needed
5. Update status quickly from desktop, tablet, or mobile
6. Mark arrival, in-service, completion, decline, cancellation, or no-show
7. Lock bookings to a groomer or station and block resources from online booking when needed
8. Perform bulk status updates if operational cleanup is needed
9. Review daily bookings and revenue summary
10. Use merchant workflows in Thai or English for system-managed UI

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

- A booking that requires OTP or payment completion must not become `confirmed` before those steps pass.
- A request-based booking must not become `confirmed` before merchant approval.
- A request-based booking may become `declined_by_merchant` without being conflated with `cancelled` or `no_show`.
- A confirmed booking may become `reconfirmed` after reminder response.
- A confirmed or reconfirmed booking may become `late`, `arrived`, `cancelled`, or `no_show`.
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
| Customer does not respond to reconfirmation | Policy-driven | Hold may remain until expiry or be released | Review or auto-handle |
| Customer arrives on time | Slot consumed | Hold released or converted as configured | Mark arrived |
| Customer arrives late within grace period | Slot may be preserved | Payment outcome unchanged until service decision | Mark late or arrived |
| Customer misses grace period | Slot may be released | Hold or deposit follows no-show policy | Mark no_show |

## Success Criteria

The spec is successful when the MVP can satisfy all of these conditions:

- A new customer can complete onboarding and reach first search or first booking without unnecessary mandatory steps.
- A repeat customer can rebook the same pet and service in under 60 seconds.
- Routine services can be instantly booked without causing schedule conflicts in the canonical schedule.
- Exception cases are clearly routed into merchant confirmation without misleading the customer.
- Both online and offline-originated bookings can trigger deposits or card holds and verification flows.
- Booking-created, confirmed, declined, and reminder notifications render correctly in Thai and English.
- Merchants can mark arrival, cancellation, and no-show from desktop, tablet, and mobile.
- Merchants can search current and upcoming bookings and manage online inventory with cutoff and resource controls.
- Merchants can correct booking outcomes inside a defined operational window after appointment time.
- A missed offline manual update does not create a second hidden schedule; every capacity-consuming booking must exist in the same booking system.
- The policy engine can determine release, refund, capture, or forfeiture behavior for each appointment outcome.
- Customer and merchant system-managed journeys are usable in both Thai and English.
- The team can observe onboarding completion, first booking conversion, merchant schedule trust, and repeat booking through instrumentation.

## Open Questions

- Which services are always instant-bookable in V1?
- What exact inputs should trigger request-and-confirm mode: service type, pet profile, uploaded photos, or a combination?

## References

- [requirements.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/spec-driven-development/requirements.md)
- [pet-grooming-booking-platform.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/idea-refine/pet-grooming-booking-platform.md)
- [supporting-notes.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/idea-refine/supporting-notes.md)
- [ChopeBook user guide](https://www.scribd.com/document/884337118/chopebook-user-guide)
- [Chope: Reducing No Show](https://restaurants.chope.co/singapore/restaurant-no-show/)
- [Grab Help Centre: How to manage Chope bookings](https://help.grab.com/merchant/en-th/40001016)

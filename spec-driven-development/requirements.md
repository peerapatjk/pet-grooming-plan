# Product Requirements Draft

## Goal

Define the initial product requirements for a Bangkok-first pet grooming booking app focused on reliable scheduling, reduced no-shows, and repeat booking.

## Product Goal

Enable busy urban pet owners to book grooming in under 60 seconds for routine cases, while giving independent groomers enough operational control to trust the schedule.

## Primary Users

- Busy urban pet owners in Bangkok
- Independent groomers and small grooming shops

## Core Jobs To Be Done

### Customer job

- Find a suitable shop
- Choose a service and time
- Complete the booking with minimal friction
- Rebook quickly for the same pet in the future

### Groomer job

- Publish truthful availability
- Review pet context before accepting risky cases
- Reduce no-shows and fake bookings
- Track booking status and daily revenue

## Core Functional Requirements

### Booking

- Customers must be able to search shops by location, service, and relevant availability.
- Customers must be able to create and reuse pet profiles.
- The launch slice must treat one booking as one pet plus one primary service template, with only merchant-defined fixed add-ons included inside the same booking unit.
- Multi-pet and bundled multi-service bookings are out of V1 unless explicitly approved later.
- Customers must be able to book routine services instantly where merchant rules allow.
- The system must support request-and-confirm booking for non-standard cases.
- The system must show a clear booking state to both customer and merchant.
- The system must support `pending_verification` and `pending_merchant_confirmation` as distinct pre-confirmation states where appropriate.
- If a request-confirm booking also requires payment protection or OTP, the launch policy must define one explicit sequence for review versus verification so only one live expiry path owns the slot at a time.

## Onboarding Requirements

- The system must support customer onboarding for first-time users.
- The onboarding flow must support Thai and English.
- The onboarding flow must collect the minimum information required to reach first search and first booking.
- The onboarding flow must support phone verification or equivalent account verification.
- Optional setup such as deeper pet-profile completion should be deferrable.
- Payment-method setup should happen only when first required by booking policy, not during default onboarding.

## Launch Marketing Surface Requirements

- The launch slice may include a static marketing landing page focused on product explanation and app-download CTAs.
- The landing page must not offer booking, search, onboarding, or any parallel web flow that duplicates app behavior.
- The landing page should make it clear that booking happens in the app.
- Landing-page claims must stay within the actual Bangkok-first launch slice and should not imply broader coverage or functionality.

### Pet profile

- The system must store breed, size, coat type, temperament, allergies, and special notes.
- The system should store past bookings and previous groomer notes for repeat booking.

### Merchant operations

- Groomers must be able to define service templates, durations, and pricing logic.
- Groomers must be able to open, close, and edit availability.
- Groomers must be able to approve or decline request-based bookings explicitly.
- Groomers must be able to manage booking states such as confirmed, declined by merchant, arrived, in service, completed, cancelled, and no-show.
- Groomers must be able to see a summary dashboard for bookings and revenue.
- Groomers must be able to update booking outcomes quickly on desktop, tablet, and mobile.
- Groomers should be able to perform bulk status updates where operationally useful.
- Groomers must be able to search current and upcoming bookings quickly.

## Inventory Control Requirements

- The system must support locking a booking to a specific groomer or station where needed.
- The system must support blocking a resource from online booking.
- The system must support configuring online booking hours and cutoff times.

## Localization Requirements

- The system must support both Thai and English for system-managed UI on customer and merchant surfaces.
- The system must support both Thai and English for transactional notifications and booking-state copy.
- The system should persist a user language preference or honor device language where appropriate.
- The product should avoid hardcoded single-language UI strings.
- Merchant-generated content does not need bilingual support in V1.

## Booking Lifecycle and Notification Requirements

- The system must distinguish `declined_by_merchant` from customer cancellation and no-show.
- The system must preserve structured cancellation metadata so actor and reason remain explicit for customer cancellation, merchant cancellation, and system timeout cases.
- The system must support merchant-initiated cancellation of previously confirmed bookings with explicit operational reason codes and customer notification.
- Native self-serve rescheduling is out of V1; when a booking needs a new slot, it should be represented as a cancellation plus a replacement booking or another equally auditable mechanism.
- The system must support transactional notifications for booking creation, confirmation, decline, reminder, and reconfirmation where relevant.
- The system should support merchant-facing notification surfaces for new bookings, edits, cancellations, and deposit or verification updates.
- Reconfirmation non-response must follow one explicit launch policy and must not create hidden inventory transitions.
- Merchant decisions submitted after merchant-response timeout must be rejected or routed to auditable recovery; they must not silently confirm or decline an already expired booking.
- Reminder scheduling must handle bookings created inside the default reminder windows without duplicate or impossible-to-send messages.

## Analytics and Feedback Requirements

- The system must instrument onboarding completion, first search, booking-start, booking-success, and repeat-booking events.
- The system must instrument merchant-facing trust signals such as offline booking usage, decline rate, and status-correction activity.
- The system must instrument verification timeout, payment-protection drop-off, and merchant-response timing so the team can tune booking policy after launch.
- The system must instrument reconfirmation non-response and any follow-up workload it creates.
- The system should support a lightweight funnel view for first booking and repeat booking behavior.

## Cross-Functional Launch Requirements

The launch slice should satisfy the stakeholder requirements documented in:

- [stakeholder-readiness.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/spec-driven-development/stakeholder-readiness.md)

### Product, CEO, and business readiness

- The launch slice must have explicit go, no-go, and pause thresholds.
- The product must make clear what is shipping, what is deferred, and why the wedge is strategically coherent.
- Product or GM must own the launch decision log, waivers, and cross-functional review cadence.

### Finance and accounting readiness

- The business must define treatment and reporting for holds, deposits, captures, refunds, forfeitures, and payout timing.
- The business must define acceptable downside for payment failures, refund volume, disputes, and support load.
- The product should provide exports, reports, or audit data sufficient for reconciliation and review.

### Operations readiness

- Merchant onboarding, support, escalation, and manual override workflows must be documented before launch.
- The business must define ownership for verification timeout, merchant-response timeout, late-arrival, and no-show exceptions.

### Support and merchant-success readiness

- Frontline scripts for pending states, payment protection, refunds, and no-show disputes must be documented before launch.
- Merchant-recovery workflows must be documented for cases where shops drift back to chat-based booking.

### Marketing readiness

- Launch claims must match the actual launch slice and service coverage.
- Trust messaging for payment protection must be approved alongside acquisition and onboarding messaging.

### Sales and merchant-acquisition readiness

- Merchant acquisition promises and onboarding expectations must match the actual product and support model.
- Supply-side target list and readiness assumptions should be explicit for launch.

### Legal readiness

- Customer-facing and merchant-facing terms must cover payment protection, cancellation, no-show, and dispute handling.
- Consent and policy copy for OTP, notifications, and payment authorization must be reviewed before launch.

### Risk, compliance, security, and privacy readiness

- Risk controls for sensitive actions, payment flows, and manual overrides must be reviewed before launch.
- Privacy, retention, and access-control expectations must be documented for launch operations.

### Technical readiness

- Observability, incident response, rollback, and auditability must be documented for risky booking and payment flows.

### Data and analytics readiness

- Launch metrics, event definitions, and dashboard QA must be owned explicitly before launch.

### External vendor readiness

- PSP, OTP, notification, and other critical third-party dependencies must be validated or have fallback plans before launch.

## No-Show and Booking Integrity Requirements

These are directly inspired by Chope's anti-no-show workflow for restaurants and should be treated as product requirements, not optional extras.

Source:

- [Chope: Reducing No Show](https://restaurants.chope.co/singapore/restaurant-no-show/)

### Verification and confirmation

- The system must support automated reminder messages before the appointment.
- The system must support reconfirmation prompts before the appointment.
- The system must support OTP or equivalent phone verification for bookings where authenticity risk is high.

### Payments protection

- The system must support deposits and/or card holds.
- The system must support these protections for both online bookings and merchant-entered offline bookings.
- The system must support sending a secure payment link when the merchant captures a booking from phone, LINE, Instagram, Facebook, or walk-in channels.
- The system must use tokenized payment handling so merchants do not access raw card details.
- Routine bookings should default to card holds.
- Deposits should be reserved for higher-risk or higher-value services.

### Trust and support

- The system must explain holds, deposits, release conditions, and late-cancel consequences before the customer commits.
- The system must show the customer the current authorization or deposit state after booking creation.
- The system must provide a clear fallback path when payment authorization or verification fails.
- The system must support an auditable trail for disputed holds, deposits, and merchant outcome changes.
- The system should define an operational support path for payment-protection complaints and exception handling.

### Arrival and no-show handling

- The system must support a merchant-configurable grace period for late arrival.
- The system must let merchants mark a customer as arrived, late, cancelled, or no-show.
- The system must define how payment protection changes for each outcome:
  - confirmed and arrived
  - cancelled in time
  - late cancellation
  - late arrival
  - no-show
- The system should define a post-appointment editing window during which merchants can correct booking outcomes.
- The default correction window is 24 hours after appointment time.
- If the correction window closes without a final appointment outcome, the system must create an auditable operations-review item and block payout-sensitive settlement until resolved.

### Schedule integrity

- Offline bookings must be entered into the same canonical schedule as online bookings.
- A slot cannot be considered truly blocked unless required verification and payment conditions are met.
- Merchants must be able to create an offline booking inside the system and immediately trigger follow-up verification and payment steps.

### Provisional inventory and expiry

- The system must model provisional inventory for `pending_verification` and `pending_merchant_confirmation` bookings.
- A provisional hold must have an explicit expiry timestamp.
- The system must auto-release a provisional hold when verification, payment, or merchant review does not complete in time.
- The system must preserve an audit trail when a provisional hold expires or is manually overridden.
- The customer and merchant should both be able to see the next required action and expiry expectation for a provisional booking.
- When review and verification or payment both apply, one explicit launch policy must own provisional inventory first; the booking must not run competing timeout paths against the same slot.
- Late or duplicate OTP and payment success events must be handled idempotently and must not silently re-confirm or re-block an expired booking.
- Recovery handling for a late success event must be explicit and auditable.

## Reference Requirements From Grab Help

Source:

- [Grab Help Centre: How to manage Chope bookings](https://help.grab.com/merchant/en-th/40001016)

Requirements derived from that article:

- The product should support a formal operational window after appointment time for correcting booking status.
- The product should support both single-booking and bulk status edits.
- The product should support fast status changes from multiple merchant surfaces, not only from a desktop admin panel.
- The product should treat no-show handling and booking edits as normal day-to-day operations, not as exception-only support tasks.

## Reference Requirements From ChopeBook Guide

Source:

- [ChopeBook 6.19 User Guide](https://www.scribd.com/document/884337118/chopebook-user-guide)

Requirements derived from that guide:

- The product should provide merchant search for current and upcoming bookings.
- The product should provide resource-level inventory controls such as lock and block behavior.
- The product should provide session-level online booking hour and cutoff-time controls.
- The product should treat decline, cancellation, no-show, and waiting-style states as distinct operational concepts.
- Waitlist and offered-slot flows are explicitly out of V1.

## Non-Goals for V1

- Home-service dispatch logistics
- Loyalty points and coupon ecosystem
- Content-heavy discovery and editorial features
- Broad citywide rollout before supply density is proven
- Deep public review moderation systems

## Open Product Decisions

- Which services are always instant-bookable?
- What exact rules trigger request-and-confirm mode?
- What should the verification-hold expiry and merchant response SLA be?
- How much merchant setup is acceptable before the product feels heavier than LINE?

These decisions should be closed through the pilot decision gate before implementation-heavy work is treated as committed.

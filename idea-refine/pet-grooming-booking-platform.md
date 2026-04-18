# Pet Grooming Booking Platform

## Problem Statement

How might we let busy Bangkok pet owners book reliable grooming and bathing appointments in under 60 seconds, while giving independent groomers enough pet and payment certainty to reduce no-shows, scheduling chaos, and time spent handling bookings on LINE, Instagram, and Facebook?

## Provisional Recommended Direction

The current best direction is a combination of `Hybrid Smart Intake`, `Repeat-First Grooming`, and `No-Show Shield`, starting with premium-leaning independent shops in dense central Bangkok neighborhoods.

This means standard services should be truly bookable instantly, while high-variance cases move into a request-and-confirm flow. Grooming is not the same as restaurant booking: duration depends on breed, size, coat condition, temperament, and add-ons. If the app pretends all services fit fixed slots, the inventory becomes misleading and shops lose trust in it quickly.

The repeat-booking loop should be the center of the product, because the target success metric is a `30% repeat booking rate`. The fastest path to repeat behavior is not more marketplace content. It is a stored pet profile, previous service history, groomer notes, and one-tap rebooking of the same shop or stylist. The no-show layer should sit underneath this with authorization holds or deposits, clear cancellation rules, and explicit release conditions.

## Key Assumptions to Validate

- [ ] Busy Bangkok pet owners will link a card and accept an authorization hold or deposit if the policy is explained clearly during booking.
- [ ] Independent groomers will publish standardized service templates and real slot availability for at least their routine work.
- [ ] A hybrid model is operationally better than forcing everything into pure instant booking or pure request booking.
- [ ] Repeat booking, pet profiles, and saved groom history will matter more for retention than deals, loyalty points, or editorial discovery.
- [ ] Groomers are willing to adopt a lightweight merchant dashboard if it saves them time compared with LINE and phone coordination.

## Working Decisions

- First merchant wedge: premium-leaning independent shops in dense central Bangkok neighborhoods
- Launch posture: ship a narrow launch slice before expanding into the broader MVP roadmap
- Payment protection default: card hold for routine bookings, deposit only for higher-risk or higher-value services
- Provisional inventory rule: bookings awaiting verification or merchant review may temporarily hold a slot, but they must auto-release if the required action does not complete within a defined expiry window
- Merchant correction window: 24 hours after appointment time
- Reminder schedule: 24 hours before plus same-day reminder
- Bilingual scope for V1: system-managed Thai and English only
- Waitlist and slot-offer flows: explicitly out of V1
- Payment method timing: collect only when first required by booking policy, not during onboarding
- Launch booking unit: one pet plus one primary service template, with only merchant-defined fixed add-ons; multi-pet and bundled multi-service bookings are out of the launch slice
- Merchant-side disruption policy: a confirmed booking may still be merchant-cancelled with an explicit operational reason such as shop closure, staff unavailability, or safety mismatch; native reschedule flows are out of V1 and should be handled as cancel plus replacement booking
- Reconfirmation policy for V1: a missed reconfirmation response should not silently release a previously confirmed slot; it should create a visible merchant follow-up signal and preserve an audit trail
- External event safety rule: OTP and payment success callbacks must be idempotent, and any success event that arrives after a provisional hold has expired must not silently re-confirm the booking or re-block capacity

## MVP Scope

The MVP should focus on one job: booking and fulfilling a pet grooming appointment with low friction and low no-show risk.

In scope:

- customer app onboarding with language choice, phone or account verification, and first-use setup
- customer search for shops by area, service, and relevant next-available times
- pet profiles with breed, size, coat type, temperament, allergies, and notes
- groomer-defined service templates with duration and price logic
- single-pet booking composition with optional fixed add-ons from the selected service template
- hybrid booking flow: instant for routine services, approval required for edge cases
- card hold or deposit during booking
- customer and groomer notifications for booking status changes
- merchant booking board with confirmed, declined, arrived, in-service, completed, cancelled, and no-show states
- merchant search for current and upcoming bookings
- merchant inventory controls for locking a booking to a groomer or station, blocking resources from online booking, and setting online booking hours or cutoff times
- basic revenue and booking summary dashboard
- post-service rating or review capture only if it is simple and tied to completed bookings

## Recommended Launch Slice

The first release should be smaller than the full MVP scope.

Ship first:

- a dense merchant wedge in central Bangkok
- a narrow list of truly instant-bookable routine services
- request-confirm for high-variance services and unfamiliar pets
- customer onboarding, search, booking, and repeat booking
- merchant availability, booking board, and offline booking capture
- card hold or deposit protection with explicit trust copy
- reminders, reconfirmation, and no-show handling

Hold for later unless the pilot proves they are required:

- bulk merchant cleanup actions for larger-volume operators
- richer reporting beyond operational essentials
- public review or rating loops beyond lightweight post-service capture
- broader marketplace discovery depth

## No-Show and Booking Integrity Requirements

These requirements should be treated as part of the MVP, not as a later payments add-on.

- Automated reminder and reconfirmation messages before the appointment
- A customer-facing reconfirmation action to confirm or cancel before the appointment, with explicit merchant-visible handling if the customer does not respond
- Deposit or card-hold support for both app-originated bookings and merchant-entered offline bookings
- A secure payment link flow for cases where the merchant creates a booking from a phone call, LINE chat, or walk-in inquiry
- OTP or equivalent phone verification to reduce fake reservations
- A strict provisional-hold expiry policy so pending verification or pending merchant review cannot block inventory indefinitely
- A clear grace-period policy for late arrival, after which the slot can be released or marked as no-show
- Tokenized payment handling so merchants do not handle raw card details
- Explicit cancellation actor and reason metadata so customer cancellation, merchant cancellation, and system timeout are operationally distinct
- Merchant controls for marking arrival, no-show, deposit forfeiture, hold release, and exception handling
- Merchant controls for declining a request-based booking without conflating that outcome with customer cancellation or no-show
- Merchant controls for cancelling a previously confirmed booking with an explicit operational reason when the shop can no longer honor the slot
- Booking cutoff-time controls so online bookings cannot be made too close to service start
- Onboarding must collect only the minimum required information needed to reach first booking quickly
- Customer-facing explanation of authorization holds, deposits, release conditions, and support fallback when payment or verification fails
- Late or duplicate payment and OTP success events must be recorded safely without resurrecting an expired booking or double-applying a payment outcome

## Not Doing (and Why)

- Home-service logistics — routing, travel windows, and staff dispatch add a second operations problem before the core in-shop workflow is proven.
- Loyalty marketplace, deals, and coupons — these add marketing complexity before booking trust and repeat behavior are working.
- Broad citywide supply from day one — a dense wedge in a few Bangkok neighborhoods is more valuable than shallow coverage everywhere.
- Rich social/discovery content — users mainly want a reliable booking action, not a lifestyle media app.
- Complex public review mechanics before transaction volume exists — moderation and trust systems are expensive early, and completed-booking reviews are enough for v1.
- Waitlist, queue, and cancellation-fill "offered slot" flows — these are valuable, but they should follow only after the core booking and merchant-ops workflow is stable.
- Multi-pet and bundled multi-service bookings — they create pricing, duration, and repeat-booking complexity before the single-pet launch slice is stable.
- Native reschedule workflows — they add a second lifecycle on top of cancellation and replacement booking before the operational states are proven.

## Open Questions

- Which services should always be instant-bookable, and which should always require confirmation at launch?
- Should exception handling be triggered by service type, pet profile data, uploaded photos, or all three?
- What should the verification-hold expiry and merchant response window be so inventory stays truthful?
- How much of the groomer workflow needs a native dashboard versus a lightweight app plus notification bridge?

These questions must be locked in the `pilot-decision-gate.md` artifact before the implementation plan is treated as final.

# Pilot Synthesis Status

## Go / No-Go

- Decision: No-Go for deep implementation lock. Go for prototype and concierge-pilot execution.
- Date: 2026-04-18
- Owners: Product / GM (TBD), Operations (TBD), Engineering (TBD)

## Locked Decisions

These are directionally decided from document synthesis, not from completed live evidence:

- Launch wedge: premium-leaning independent grooming shops in dense central Bangkok neighborhoods
- Instant-bookable services: routine, standardized services only; exact launch list still not locked
- Request-confirm triggers: high-variance services and unfamiliar pets; exact trigger matrix still not locked
- Verification hold duration: not locked
- Merchant response SLA: not locked
- Payment-protection defaults: card hold for routine bookings, deposit for higher-risk or higher-value services
- Minimum onboarding fields: minimal booking-critical onboarding only; exact field list still not locked
- Booking-unit boundary: one pet plus one primary service template, with only fixed merchant-defined add-ons in the launch slice
- Confirmed-booking disruption policy: merchant-initiated cancellation of a confirmed booking is allowed with an explicit operational reason; native reschedule remains out of V1
- Reconfirmation non-response rule: non-response should create a visible merchant follow-up signal, not a silent inventory release

## Not Yet Locked

- landing-page messaging and CTA framing that make app-download intent clear without implying web booking
- Exact launch service taxonomy for instant booking versus request-confirm
- Exact routing inputs: service type, pet-profile conditions, and photo-review rules
- Verification-hold expiry duration
- Merchant response SLA for request-based bookings
- Exact minimum onboarding field set
- Customer-facing trust copy for holds, deposits, cancellation, and no-show outcomes
- Evidence-backed thresholds for merchant schedule truth and payment-protection tolerance

## Launch Slice

- In:
  - static landing page with app-download CTA only
  - customer onboarding, search, booking, and repeat booking
  - merchant availability, booking board, and offline booking capture
  - truthful instant booking for a narrow routine-service set
  - request-confirm flow for high-variance cases
  - card hold or deposit protection with explicit trust messaging
  - reminders, reconfirmation, and no-show handling
- Out:
  - home-service dispatch logistics
  - waitlist and offered-slot flows
  - multi-pet and bundled multi-service bookings
  - native reschedule workflows
  - broad citywide supply from day one
- Deferred until post-launch:
  - richer reporting and broader merchant dashboards
  - bulk merchant cleanup actions
  - public review depth beyond lightweight post-service capture
  - broader marketplace discovery expansion

## Evidence Summary

- What worked:
  - The discovery docs converged on a coherent wedge: hybrid booking, repeat-first retention, and no-show protection.
  - The product has a strong launch-slice posture instead of trying to ship a full marketplace immediately.
  - The spec, plan, and task breakdown are internally consistent with the narrowed launch slice.
- What failed:
  - No live pilot, merchant walkthrough, customer prototype evidence, or internal operations prototype evidence is captured yet.
  - No landing-page prototype evidence is captured yet.
  - The most important operational numbers remain assumptions, not validated decisions.
- What changed:
  - Scope narrowed from a broad "Chope for pets" concept to a Bangkok-first launch slice focused on truthful booking, payment trust, and repeat behavior.

## Risks Still Open

- Risk: Instant-book coverage may be too narrow or too broad for the launch wedge.
  - Mitigation: Run merchant walkthroughs and lock a service taxonomy before implementation-heavy work.
- Risk: Provisional holds may make availability look fake if expiry windows are wrong.
  - Mitigation: Test verification timeout and merchant response timing in the concierge pilot.
- Risk: Payment protection may feel punitive to first-time customers.
  - Mitigation: Prototype trust copy and measure completion tolerance before locking defaults.
- Risk: Merchant workflow may still be slower than LINE or phone coordination.
  - Mitigation: Validate merchant booking-board and offline-booking flows in clickable demos before scaffolding the full product.

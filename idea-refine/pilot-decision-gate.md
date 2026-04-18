# Pilot Decision Gate

## Purpose

This artifact closes the discovery and prototype phase.

Do not treat the spec and implementation plan as locked until this gate has been completed with real evidence from:

- concierge pilot sessions
- clickable prototype reviews
- merchant workflow walkthroughs
- customer interviews and booking attempts

## What This Gate Must Decide

The team must leave this gate with explicit decisions on:

- launch merchant wedge
- launch customer wedge
- launch slice versus full MVP roadmap
- which services are instant-bookable at launch
- which inputs trigger request-and-confirm mode
- how provisional inventory behaves before verification or merchant approval
- payment-protection defaults by service class
- minimum onboarding fields
- customer-facing trust copy for holds, deposits, cancellations, and no-shows
- merchant response SLA for request-based bookings
- the launch booking-unit boundary, including whether add-ons stay inside truthful instant booking
- the confirmed-booking disruption policy when a merchant can no longer honor a slot
- the reconfirmation non-response rule for V1

If any of these are still unresolved, the implementation plan is not ready.

## Decision Criteria

| Decision area | Evidence required | Proceed threshold | What to do if threshold fails |
|---|---|---|---|
| Instant-book coverage | Pilot booking mix by service type | At least 60% of target launch demand can flow through truthful instant booking | Narrow launch service list or move closer to merchant-confirm-first |
| Merchant schedule truth | Pilot logs, operator corrections, merchant interviews | Fewer than 10% of customer-visible slots fail because availability was stale | Tighten merchant wedge or ship merchant-OS-first before broader customer rollout |
| Payment-protection tolerance | Prototype tests and pilot completion data | At least 70% of users who reach the hold or deposit step complete booking | Simplify trust copy, change defaults, or reduce payment protection on low-risk services |
| First-run clarity | Moderated prototype sessions | Most users can explain `instant` versus `pending` without moderator rescue | Simplify routing rules and rewrite booking-state copy |
| Merchant willingness | Post-pilot merchant debriefs | At least 4 of the first 5 target merchants say they would use the schedule daily | Reduce setup burden or re-scope the first merchant segment |
| Repeat-value signal | Follow-up interviews and simulated rebooking | Users describe rebooking as materially faster than messaging the shop | Re-center the product around merchant ops until rebooking value is real |

## Inventory Commitment Decisions

The pilot must lock these behaviors before implementation:

### Instant bookings that still require verification

- The booking enters `pending_verification`.
- The requested slot is held provisionally, not permanently.
- The provisional hold must have a strict expiry window.
- If verification or payment does not complete in time, the slot auto-releases and the booking is system-cancelled with an explicit reason.

### Request-based bookings

- The booking enters `pending_merchant_confirmation`.
- The merchant response window must be explicit to both customer and merchant.
- The slot may be held provisionally during that review window, but the expiry rule must be defined.
- If the merchant does not act within the response window, the booking auto-expires or system-cancels and the slot reopens.

## Required Outputs

Before moving forward, capture:

1. `Launch service taxonomy`
   - instant-bookable services
   - request-confirm services
   - disallowed or out-of-scope services
2. `Routing policy`
   - service-based triggers
   - pet-profile triggers
   - photo or merchant-review triggers, if any
3. `Provisional hold policy`
   - verification hold duration
   - merchant response SLA
   - release behavior on timeout
4. `Payment trust policy`
   - hold versus deposit defaults
   - customer-facing explanation
   - failure fallback
   - support escalation path
5. `Launch slice`
   - what ships first
   - what moves to post-launch
   - what is explicitly not in the first release
6. `Booking-unit boundary`
   - single-pet versus multi-pet support
   - single-service versus bundled-service support
   - which fixed add-ons stay inside the launch slice
7. `Confirmed-booking exception policy`
   - merchant-cancelled confirmed booking reasons
   - whether replacement booking is manual or productized
   - reconfirmation non-response behavior

## Output Template

Use this format after the pilot:

```md
# Pilot Synthesis Decision

## Go / No-Go
- Decision:
- Date:
- Owners:

## Locked Decisions
- Launch wedge:
- Instant-bookable services:
- Request-confirm triggers:
- Verification hold duration:
- Merchant response SLA:
- Payment-protection defaults:
- Minimum onboarding fields:
- Booking-unit boundary:
- Confirmed-booking disruption policy:
- Reconfirmation non-response rule:

## Launch Slice
- In:
- Out:
- Deferred until post-launch:

## Evidence Summary
- What worked:
- What failed:
- What changed:

## Risks Still Open
- Risk:
- Mitigation:
```

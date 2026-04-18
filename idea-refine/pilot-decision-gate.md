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
- whether request-confirm bookings collect payment protection or OTP before review, after approval, or only for selected service classes
- minimum onboarding fields
- customer-facing trust copy for holds, deposits, cancellations, and no-shows
- merchant response SLA for request-based bookings
- the launch booking-unit boundary, including whether add-ons stay inside truthful instant booking
- the confirmed-booking disruption policy when a merchant can no longer honor a slot
- the reconfirmation non-response rule for V1

If any of these are still unresolved, the implementation plan is not ready.

## Gate Rule

This artifact is a real continue, descoping, or stop gate.

Every decision closed here must record:

- decision owner
- evidence used
- threshold met or not met
- what was descoped, deferred, or tightened if evidence was weak

If evidence is missing, the correct output is not a soft "go anyway." The correct output is `No-Go for implementation lock` or an explicit descoped launch slice.

## Decision Criteria

| Decision area | Evidence required | Proceed threshold | What to do if threshold fails |
|---|---|---|---|
| Instant-book coverage | Pilot booking mix by service type | At least 60% of target launch demand can flow through truthful instant booking | Narrow launch service list or move closer to merchant-confirm-first |
| Merchant schedule truth | Pilot logs, operator corrections, merchant interviews | Fewer than 10% of customer-visible slots fail because availability was stale | Tighten merchant wedge or ship merchant-OS-first before broader customer rollout |
| Payment-protection tolerance | Prototype tests and pilot completion data | At least 70% of users who reach the hold or deposit step complete booking | Simplify trust copy, change defaults, or reduce payment protection on low-risk services |
| First-run clarity | Moderated prototype sessions | Most users can explain `instant` versus `pending` without moderator rescue | Simplify routing rules and rewrite booking-state copy |
| Merchant willingness | Post-pilot merchant debriefs | At least 4 of the first 5 target merchants say they would use the schedule daily | Reduce setup burden or re-scope the first merchant segment |
| Repeat-value signal | Follow-up interviews and simulated rebooking | Users describe rebooking as materially faster than messaging the shop | Re-center the product around merchant ops until rebooking value is real |

## Kill, Continue, And Descoping Rules

Use these rules if the pilot produces mixed evidence:

| Signal | Continue if... | Descoping action if weak | Stop condition |
| --- | --- | --- | --- |
| Customer trust in payment protection | customers understand holds or deposits without moderator rescue and completion remains acceptable | reduce protection on low-risk routine services, simplify trust copy, or move more flows into request-confirm | most qualified users treat payment protection as punitive or deceptive |
| Merchant schedule truth | merchants can keep availability accurate enough that stale-slot incidents stay rare | narrow the merchant wedge, reduce instant-bookable services, or ship merchant-ops-first first | merchants cannot maintain truthful availability without reverting to shadow scheduling |
| Routing clarity | users and merchants can explain instant vs request-confirm behavior accurately | narrow the launch taxonomy and reduce routing inputs | the team cannot make routing legible without heavy manual explanation |
| Operational manual effort | operations can handle exceptions without spreadsheet or chat sprawl | narrow launch volume, narrow channels, or simplify payment and timeout policies | core exception handling still depends on undocumented manual heroics |

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
- Merchant decisions that arrive after expiry must fail safely or move into explicit manual recovery; they must not silently resurrect the expired request.

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
   - active expiry owner when review and verification both apply
4. `Payment trust policy`
   - hold versus deposit defaults
   - sequence for payment or OTP versus merchant review on request-based bookings
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
8. `Deferred commercial decisions`
   - merchant monetization model if still unresolved
   - whether monetization affects launch pricing, payouts, or merchant promises
   - which commercial assumptions are explicitly deferred versus launch-blocking

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
- Request-confirm sequencing:
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

## Blocked Implementation Decisions
- Decision still blocked:
- Why it is still blocked:
- What cannot proceed safely while it remains open:
```

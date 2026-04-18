# Idea Refine

This folder is for structured divergent and convergent thinking that turns vague ideas into concrete proposals.

Use this folder when you have a rough concept that still needs exploration.

## Files

- `pet-grooming-booking-platform.md` — the current one-pager with the problem framing, provisional recommended direction, assumptions, MVP scope, and "not doing" list.
- `supporting-notes.md` — the full session notes, including user inputs, product tensions, divergent directions, and Chope reference findings.
- `prototype-and-eval.md` — the pre-build discovery loop covering prototype variants, falsification tests, and product eval signals.
- `pilot-decision-gate.md` — the evidence-backed checklist that must be completed before the spec and implementation plan are treated as locked.

## Session Snapshot

- Date: 2026-04-18
- Market: Bangkok, Thailand
- Primary users: busy urban pet owners and independent groomers
- Booking model: hybrid (`instant` for standard cases, `request/accept` for exceptions)
- Success metric: 30% repeat booking rate
- Current competitor/workarounds: phone calls, LINE chat, Instagram DMs, Facebook inbox, walk-ins

## Current Working Hypothesis

The strongest starting point is not a broad "Chope for pets" clone. It is a repeat-first booking product with:

- standardized instant booking for predictable services
- exception handling for high-variance pets and services
- card hold / deposit mechanics to reduce no-shows
- merchant-side tools that make daily scheduling manageable

The discovery package now assumes a narrower `launch slice` before a broader MVP rollout:

- a dense merchant wedge in central Bangkok
- a tightly defined list of instant-bookable services
- explicit provisional holds for bookings awaiting verification or merchant review
- a trust-first booking flow that explains payment protection before scale

## Related Spec

Formal specification artifacts now live under:

- [spec-driven-development/spec.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/spec-driven-development/spec.md)
- [spec-driven-development/requirements.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/spec-driven-development/requirements.md)

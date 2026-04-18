# Operations Control Plane Prototype Prompt

## When To Use

Paste this into Claude Design to generate the **internal operations / support / merchant-success control plane** for the company running the platform.

This is distinct from the merchant-facing product. The merchant app is for shops managing their own day-to-day bookings. This control plane is for the platform team managing exceptions, trust, disputes, manual overrides, merchant recovery, and launch operations across the whole system.

## Prompt Contract

- Purpose: show that the business can safely operate the launch slice, not just demo polished customer and merchant screens.
- Intended users and workflows: operations, support, merchant success, finance or accounting reviewers, risk reviewers, and launch leadership managing incidents, overrides, trust events, and merchant recovery.
- Source documents: [../docs/product/operations-control-plane-prototype.md](../docs/product/operations-control-plane-prototype.md), [../docs/launch-canon.md](../docs/launch-canon.md), [../spec-driven-development/spec.md](../spec-driven-development/spec.md), [../spec-driven-development/stakeholder-readiness.md](../spec-driven-development/stakeholder-readiness.md).
- Requirement families expressed: `REQ-LIFECYCLE`, `REQ-READINESS`, `REQ-NFR`, `REQ-ANALYTICS`.
- Must not imply: merchant-facing self-service permissions for dangerous internal actions, hidden override paths, or an ERP-grade accounting system that is outside launch scope.
- Review checklist: override actions are visibly dangerous and auditable, queue triage is understandable, and finance or support visibility exists without hiding operational complexity.

## Prompt

```text
Create a realistic internal operations control-plane prototype for a Bangkok-first pet grooming booking platform.

This is for a CEO and stakeholder demo. It should make it obvious that the business can actually operate the launch slice safely, not just show pretty customer and merchant screens.

This is NOT the merchant-facing app.
This is the company-internal operations surface used by:
- Operations
- Customer Support
- Merchant Success
- Finance / Accounting reviewers
- Risk / Compliance reviewers
- Launch DRI / Product / GM

Core purpose:
Help the internal team manage booking exceptions, payment-protection issues, merchant recovery, manual overrides, and launch health without inventing policy on the fly.

Product context:
- Bangkok-first launch
- in-shop grooming only
- one booking = one pet + one primary service template + optional fixed add-ons
- routine services can be instant-booked
- high-variance cases route to request-confirm
- routine bookings default to card holds
- deposits can apply to higher-risk or higher-value services
- provisional holds must expire if the required action is not completed
- merchant-cancelled confirmed bookings require explicit operational reasons
- reconfirmation non-response should create a visible follow-up signal, not silently release a confirmed booking

Operational truth this control plane must embody:
- the business needs one place to see disputes, timeouts, failed payments, merchant response breaches, no-shows, and manual override actions
- support cannot rely on Slack threads and ad hoc spreadsheets
- manual override permissions must be visible, limited, and auditable
- finance and accounting need visibility into holds, deposits, captures, refunds, forfeitures, and payout-impacting events
- merchant success needs tools to recover merchants that fall back to LINE or shadow scheduling

I want the prototype to cover these workflows:

FLOW 1: Launch operations dashboard
- overall booking health
- volume by state
- timeout rate
- payment-protection drop-off
- stale-slot or schedule-truth incidents
- merchant response SLA performance
- repeat-booking signal
- top incidents requiring action today

FLOW 2: Exception queue
- pending verification timeouts
- pending merchant confirmation SLA breaches
- failed payment or OTP flows
- merchant-cancelled confirmed bookings
- late-success provider callback cases
- no-show disputes
- support escalations

FLOW 3: Booking investigation workspace
- search by booking id, customer, merchant, pet, phone, or date
- timeline of booking state changes
- payment-protection timeline
- reminder and reconfirmation history
- actor + reason for cancellations and overrides
- audit trail for manual actions

FLOW 4: Manual override controls
- allow controlled internal override actions
- visible permission and reason requirements
- examples:
  - force release a hold
  - mark a timeout with explicit reason
  - record dispute review outcome
  - issue a refund or escalation recommendation
  - reopen a merchant follow-up task
- every action must be auditable and obviously dangerous enough that it is not treated casually

FLOW 5: Merchant success and recovery view
- merchants drifting back to chat-based scheduling
- merchants with high decline rates
- merchants with high correction-window edits
- merchants missing response SLAs
- merchants needing onboarding or process intervention
- support notes and recovery playbook hooks

FLOW 6: Finance / reconciliation review
- view holds, deposits, captures, refunds, forfeitures, disputes, and payout-impacting events
- do NOT build a full accounting suite
- do create a clear operational review surface that helps finance/accounting understand what needs reconciliation or escalation

FLOW 7: Policy and support runbook surfaces
- quick links or contextual guidance for:
  - verification timeout
  - merchant response timeout
  - late arrival
  - no-show
  - merchant-cancelled confirmed booking
  - failed payment
  - late provider callback recovery
- this should feel like a serious operational product, not a documentation dump

Primary users:

1. Operations lead
- wants launch health at a glance
- needs queue triage and override clarity

2. Support / merchant success lead
- needs customer-safe explanations
- needs merchant recovery workflows

3. Finance / accounting reviewer
- needs visibility into trust-sensitive financial events

4. Product / GM / launch DRI
- needs confidence that risky states are visible and manageable

Critical UX goals:
- make operational risk visible without chaos
- make queue triage fast
- make booking investigations feel trustworthy and auditable
- make override controls safe and deliberate
- make support and ops collaboration visible
- make this feel like the platform can actually run in production

Visual direction:
- internal, desktop-first control plane
- high-density but elegant
- polished enough for CEO review
- not a generic admin template
- restrained color use except for meaningful alert semantics
- clear severity levels and trust-state semantics

Must-show semantics:
- pending verification
- pending merchant confirmation
- confirmed
- declined by merchant
- cancelled by customer
- cancelled by merchant
- timeout by system
- arrived
- in service
- completed
- late
- no-show
- hold active
- deposit required
- refund issued
- forfeiture reviewed
- override action taken

Required screens:

1. Operations dashboard
2. Exception / incident queue
3. Booking investigation detail view
4. Manual override confirmation flow
5. Merchant health / recovery dashboard
6. Payment-protection and reconciliation review screen
7. Support runbook / policy side panel or contextual help view
8. Audit log / action history view

For the actual demo content, use realistic sample data:
- a mix of routine bookings, exception bookings, failed verification, merchant delays, no-shows, and disputed payment outcomes
- show a few merchants with different operational health profiles
- show both individual incident investigation and aggregate launch monitoring

Design and copy notes:
- make statuses and queues obvious at first glance
- do not hide complexity, but organize it clearly
- make risk review feel calm and controlled
- use strong labels and exact semantics
- avoid generic "admin dashboard" vibes
- avoid making the screen look like a SOC or fraud product unless the data justifies it

Also include:
- one hero screen for leadership demo use
- one clear triage flow for a failed booking or timeout case
- one merchant recovery flow
- one finance / trust event review flow
- one annotation layer showing why this internal app is necessary for launch readiness

At the end, show me:
- the full control-plane prototype
- the strongest live-demo path
- the key callouts for CEO, Operations, Support, and Finance stakeholders
```

## Good Follow-Ups

- "Make the exception queue more triage-friendly."
- "Show a clearer separation between support actions and dangerous override actions."
- "Make the merchant recovery screen more actionable."
- "Add stronger finance-oriented visibility without turning this into an ERP."

# Operations Support And Merchant-Success Readiness

## Purpose

This packet defines what Operations, Customer Support, and Merchant Success need before the launch slice can be run safely day to day.

Use it to make queue ownership, SOPs, overrides, and merchant recovery concrete.

## Status

- Maturity: `draft`
- Current state: template only; no named owners, evidence, or approval dates yet
- Owner: TBD

## Packet Sections

### Operations packet

- merchant onboarding checklist
- exception-handling SOPs
- SLA ownership for verification timeout, merchant-response timeout, late arrival, no-show, and disputes
- manual override permissions and audit rules

### Support packet

- frontline scripts for holds, deposits, pending states, merchant cancellations, late arrival, and no-show
- queue ownership and escalation matrix
- customer-safe explanation library for trust-sensitive states

### Merchant-success packet

- merchant recovery playbook for shops drifting back to chat or shadow scheduling
- operating thresholds for decline rate, correction-window edits, and response-SLA misses
- intervention workflow and ownership

## Required Decisions

- Which team owns each risky operational queue?
- Which actions require operations versus support versus finance escalation?
- Which overrides are allowed, and under whose permission?
- What is the escalation path for merchant-cancelled confirmed bookings and late-success recovery?
- What merchant-health signals trigger coaching or intervention?

## Evidence Required Before Launch

- reviewed SOPs mapped to live booking states and payment outcomes
- sample incident traces for verification timeout, merchant timeout, failed payment, no-show dispute, and override flow
- approval on queue ownership and escalation times
- merchant recovery workflow reviewed against the launch wedge

## Exit Criteria

- Operations approves SOPs and override boundaries
- Support approves scripts and queue ownership
- Merchant Success approves recovery playbooks and thresholds
- named owners, dates, and unresolved issues are copied into [../../spec-driven-development/stakeholder-readiness-status.md](../../spec-driven-development/stakeholder-readiness-status.md)

## Related Artifacts

- [../../spec-driven-development/stakeholder-readiness.md](../../spec-driven-development/stakeholder-readiness.md)
- [../../spec-driven-development/spec.md](../../spec-driven-development/spec.md)
- [../product/concierge-pilot.md](../product/concierge-pilot.md)
- [../product/operations-control-plane-prototype.md](../product/operations-control-plane-prototype.md)

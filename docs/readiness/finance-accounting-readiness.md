# Finance And Accounting Readiness

## Purpose

This packet defines what Finance and Accounting need before the launch slice can be approved.

Use it to make payment-protection economics, reconciliation, and downside assumptions explicit rather than implied.

## Status

- Maturity: `draft`
- Current state: template only; no named owners, evidence, or approval dates yet
- Owner: TBD

## Packet Sections

### Finance packet

- payment-protection model by service class
- PSP fee and downside assumptions
- acceptable payment-failure, refund, dispute, and support-cost bounds
- launch spend and cohort guardrails

### Accounting packet

- ledger treatment for holds, deposits, captures, refunds, forfeitures, and payout timing
- reconciliation workflow and operating cadence
- audit trail expectations for manual overrides and payout-sensitive events
- month-end ownership and escalation path

## Required Decisions

- When is a hold released versus captured?
- Which outcomes can forfeit a deposit?
- What is the acceptable downside if payment protection depresses conversion?
- What data is required for daily and month-end reconciliation?
- Which events block payout-sensitive settlement until reviewed?

## Evidence Required Before Launch

- reviewed payment-policy matrix tied to [../../spec-driven-development/spec.md](../../spec-driven-development/spec.md)
- PSP capability validation for tokenization, holds, captures, refunds, and web payment links
- sample reconciliation flow using launch-like booking outcomes
- owner-approved downside scenario review

## Exit Criteria

- Finance approves downside assumptions and guardrails
- Accounting approves reconciliation treatment and cadence
- named owners, dates, and unresolved issues are copied into [../../spec-driven-development/stakeholder-readiness-status.md](../../spec-driven-development/stakeholder-readiness-status.md)

## Related Artifacts

- [../../spec-driven-development/stakeholder-readiness.md](../../spec-driven-development/stakeholder-readiness.md)
- [../../spec-driven-development/requirements.md](../../spec-driven-development/requirements.md)
- [../../spec-driven-development/spec.md](../../spec-driven-development/spec.md)
- [../product/analytics-and-evals.md](../product/analytics-and-evals.md)

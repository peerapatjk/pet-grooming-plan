# Stakeholder Readiness

## Purpose

This artifact makes cross-functional launch requirements explicit.

The launch slice should not go live because product and engineering feel ready. It should go live only when the critical business, operational, financial, legal, and technical stakeholders can each answer:

- what is launching
- what could go wrong
- what controls exist
- what evidence supports the launch
- what would make us pause or roll back

If some functions are combined in your company, the same person may cover multiple stakeholder roles. The role still needs explicit coverage.

## Stakeholder Matrix

| Stakeholder | What must be true for them to be satisfied | Evidence required before launch | Owner |
|---|---|---|---|
| Product / GM / Launch DRI | There is one accountable owner for launch scope, tradeoffs, waivers, and cadence. | Launch owner, decision log, waiver policy, and cross-functional review cadence are documented. | Product / GM |
| CEO | The launch wedge is narrow, strategically coherent, and capital disciplined. Success and kill metrics are explicit. | Launch-slice scope, go or no-go thresholds, risk register, and post-launch decision cadence are documented. | Product + CEO |
| Finance | Payment protection, refunds, forfeitures, and payout timing make economic sense. Support and failure rates are bounded. | PSP fee assumptions, refund and dispute assumptions, cash-flow and downside scenarios, and launch spend guardrails are documented. | Finance + Product |
| Accounting | Holds, deposits, captures, refunds, forfeitures, and merchant payouts can be reconciled cleanly. | Ledger treatment, reconciliation workflow, settlement reports, and month-end ownership are documented. | Accounting + Finance |
| Operations | Merchant onboarding, exception handling, no-show disputes, and manual overrides are operationally manageable. | SOPs, SLAs, escalation paths, role permissions, and daily support workflow are documented and tested. | Operations + Product |
| Customer Support / Merchant Success | Frontline teams can explain booking states, resolve complaints, and recover merchants or customers without inventing policy. | Support macros, merchant success playbooks, handoff rules, and queue ownership are documented. | Support + Operations |
| Marketing | Positioning is truthful, differentiated, and matched to the narrow launch slice. | Launch audience, value proposition, trust messaging, and approved claims are documented. | Marketing + Product |
| Legal | Customer and merchant obligations are clear, consent language is defensible, and risky flows are reviewable. | Terms, privacy, cancellation policy, payment-consent wording, dispute path, and data-handling review are signed off. | Legal + Product |
| Risk / Compliance / Security / Privacy | Payment, access, audit, privacy, and operational controls are acceptable for launch. | Threat model, access controls, audit trail expectations, retention policy, and compliance review are documented. | Security / Compliance + Tech |
| Tech | The system can be operated safely, observed clearly, and rolled back if needed. | Architecture review, observability, on-call or incident path, feature controls, auditability, and rollback plan are documented. | Engineering |
| Data / Analytics | Metrics, event definitions, and dashboards are trustworthy enough for launch decisions. | Event schema, metric definitions, QA plan, and launch dashboards are documented. | Data + Product |
| Sales / BD / Merchant Acquisition | Supply-side promises match reality and the merchant pipeline matches the launch wedge. | Merchant target list, onboarding promise, supply readiness assumptions, and acquisition playbook are documented. | Sales / BD + Operations |
| External Critical Vendors | PSP, OTP, notification, and localization dependencies are validated for launch-like conditions. | Vendor capability check, SLA expectations, fallback paths, and test evidence are documented. | Product + Tech |

## Stakeholder-Specific Requirements

### Product / GM / Launch DRI

- One person must own the final launch call day to day.
- Scope changes, waivers, and tradeoffs must have a documented decision owner.
- Cross-functional review cadence must be explicit before launch.
- The launch owner must be able to pause the rollout when kill conditions are met.

### CEO

- The launch slice must show why this wedge is the right first market.
- The plan must state what is intentionally not shipping.
- Launch metrics must include both upside and kill conditions.
- Expansion beyond the launch slice must require evidence, not optimism.

### Finance

- The team must model fee impact for holds, deposits, refunds, disputes, and failed payments.
- The launch must define acceptable payment-protection conversion loss.
- Merchant incentives, onboarding cost, and support cost should be bounded for the first launch cohort.
- There must be a clear owner for downside scenario review.

### Accounting

- Authorization holds must not be treated like earned revenue.
- Deposits, captures, refunds, forfeitures, and chargeback-like events need explicit ledger treatment.
- Daily settlement and payout reconciliation must have a documented operating owner.
- Manual overrides must remain auditable.

### Operations

- Merchant onboarding and setup must have a repeatable checklist.
- Support must know how to handle verification timeout, failed payment, no-show dispute, and merchant decline cases.
- Manual override permissions must be limited and logged.
- Merchant response SLA and customer communication timing must be operationally realistic.

### Customer Support / Merchant Success

- Frontline teams must have approved scripts for holds, deposits, pending states, late arrival, and no-show disputes.
- Merchant success must know how to recover merchants who fall back to chat or shadow scheduling.
- Queue ownership and handoff between support, operations, finance, and tech must be explicit.
- Escalations must have time expectations and named owners.

### Marketing

- Claims must match the actual launch slice and not imply broader coverage than exists.
- Trust messaging around holds and deposits must be clear and non-punitive.
- Merchant and customer acquisition should focus on the dense launch wedge, not broad awareness.
- Repeat booking should be positioned as a core promise only if the flow is actually fast.

### Legal

- Customer terms must clearly cover holds, deposits, cancellation, late arrival, no-show, and dispute handling.
- Merchant terms must clearly cover payout, forfeiture, overrides, and liability boundaries.
- Consent language for messages, OTP, and payment protection must be reviewed.
- Privacy and data-retention expectations must be documented for both customer and merchant data.

This document does not replace legal advice. Counsel review is still required before launch.

### Risk / Compliance / Security / Privacy

- Access to manual overrides, payment events, and sensitive customer data must be role-scoped.
- Privacy and retention behavior must be documented for both normal operations and incident scenarios.
- Audit trails must exist for risky actions.
- If compliance review is needed for payments, messaging, or data handling, it must be completed before launch.

### Tech

- Provisional inventory, payment events, and manual overrides must all be auditable.
- Timeout and expiry behavior must be observable in production.
- There must be a rollback or feature-disable path for risky flows.
- PSP, OTP, notification, and localization dependencies must be validated in launch-like conditions.

### Data / Analytics

- Launch metrics must have a named owner and written definitions.
- Event QA must be completed before launch decisions rely on the dashboards.
- Funnel breaks such as payment drop-off, timeout rate, and merchant response lag must be measurable.
- Post-launch review cadence must be scheduled in advance.

### Sales / BD / Merchant Acquisition

- Merchant acquisition promises must match the real launch slice and operational support level.
- Merchant selection should prioritize the dense wedge rather than broad but shallow coverage.
- Sales scripts and onboarding promises must align with product behavior, payment rules, and support capability.
- Merchant pipeline health should be visible before launch.

### External Critical Vendors

- PSP support for holds, captures, refunds, and web links must be validated.
- OTP and notification vendors must be tested under launch-like load and failure scenarios.
- Fallback behavior for vendor outages must be documented.
- Localization dependencies or external content providers should not block critical booking flows.

## Launch Readiness Checklist

Use this as the final cross-functional gate:

- [ ] CEO approves the launch wedge, metrics, and pause conditions.
- [ ] Product / GM / Launch DRI approves scope ownership, waiver rules, and launch cadence.
- [ ] Finance approves downside assumptions and payment-risk guardrails.
- [ ] Accounting approves reconciliation treatment for holds, deposits, refunds, and forfeitures.
- [ ] Operations approves SOPs, SLAs, and escalation paths.
- [ ] Customer Support / Merchant Success approves frontline scripts, queue ownership, and recovery playbooks.
- [ ] Marketing approves positioning, target audience, and trust messaging.
- [ ] Legal approves terms, policies, consent copy, and dispute language.
- [ ] Risk / Compliance / Security / Privacy approves control expectations and data-handling posture.
- [ ] Tech approves observability, rollback, and incident-readiness.
- [ ] Data / Analytics approves metric definitions, event quality, and launch dashboards.
- [ ] Sales / BD / Merchant Acquisition approves merchant promises and supply-readiness assumptions.
- [ ] External critical vendors are validated or have explicit fallback waivers.

## Required Launch Packet

Before launch, the team should have a reviewable packet containing:

1. `Product / GM packet`
   - launch DRI
   - scope decisions
   - waiver log
   - review cadence
2. `CEO packet`
   - company-level rationale
   - success and kill thresholds
   - deferred roadmap
3. `Finance and Accounting packet`
   - fee model
   - reconciliation model
   - refund and dispute scenarios
4. `Operations and Support packet`
   - merchant onboarding SOP
   - support runbook
   - escalation matrix
   - merchant recovery playbook
5. `Marketing and Sales packet`
   - positioning
   - launch audience
   - approved claims and trust copy
   - merchant acquisition promise
6. `Legal and Risk packet`
   - customer terms
   - merchant terms
   - privacy and policy review
   - control and retention review
7. `Tech and Data packet`
   - observability checklist
   - incident runbook
   - rollback plan
   - metric QA and dashboard readiness
8. `Vendor readiness packet`
   - PSP validation
   - OTP and notification validation
   - vendor fallback plan

## Status Template

```md
# Stakeholder Readiness Status

## Status
- Product / GM / Launch DRI:
- CEO:
- Finance:
- Accounting:
- Operations:
- Customer Support / Merchant Success:
- Marketing:
- Legal:
- Risk / Compliance / Security / Privacy:
- Tech:
- Data / Analytics:
- Sales / BD / Merchant Acquisition:
- External Critical Vendors:

## Blockers
- Stakeholder:
- Blocker:
- Owner:
- Target date:

## Waivers
- Stakeholder:
- Temporary waiver:
- Expiry:
```

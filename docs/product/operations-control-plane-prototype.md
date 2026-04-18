# Operations Control Plane Prototype Brief

## Purpose

Create a clickable internal operations control-plane prototype that proves the company can actually run the launch slice safely.

This is distinct from the merchant-facing product. The merchant app is for shops managing their own bookings. This control plane is for the platform team handling exceptions, trust, disputes, manual overrides, merchant recovery, and launch operations across the system.

## Prototype Goal

Validate that Operations, Support, Merchant Success, Finance or Accounting reviewers, and the Launch DRI have one coherent internal surface for triage, investigation, and controlled intervention.

## Primary Flows To Cover

1. View launch health and top incidents in one operations dashboard
2. Triage an exception queue for timeouts, failed payments, disputes, and merchant-side issues
3. Investigate a specific booking with timeline, payment, reminder, and audit details
4. Perform controlled manual overrides with explicit permission and reason capture
5. Review merchant health and recovery signals
6. Review holds, deposits, refunds, forfeitures, and payout-impacting events in an operational finance view
7. Access policy and support-runbook context while handling live issues

## Prototype Screens

### Flow A: Operations dashboard

- booking volume by state
- timeout rate
- payment-protection drop-off
- merchant response SLA health
- no-show and dispute signals
- top incidents requiring action today

### Flow B: Exception queue

- pending verification timeout cases
- pending merchant confirmation SLA breaches
- failed payment or OTP flows
- merchant-cancelled confirmed bookings
- late provider callback recovery cases
- no-show disputes
- support escalations

### Flow C: Booking investigation workspace

- booking timeline
- payment-protection timeline
- reminder and reconfirmation history
- actor and reason for cancellations or overrides
- audit trail of internal actions

### Flow D: Manual override controls

- controlled override entry points
- permission and reason requirements
- explicit confirmation step
- visible audit consequences

### Flow E: Merchant recovery view

- merchants missing response SLAs
- merchants with high decline or correction rates
- merchants falling back to chat or shadow scheduling
- merchant follow-up notes and recovery actions

### Flow F: Finance and trust-event review

- holds
- deposits
- captures
- refunds
- forfeitures
- payout-impacting events
- dispute review signals

## Critical Questions To Test

- Can the internal team quickly understand what needs attention right now?
- Can support and operations explain risky booking states without inventing policy?
- Do manual overrides feel controlled and auditable rather than casual?
- Can merchant-success teams see who is drifting into operational risk?
- Can finance or accounting reviewers understand trust-sensitive events without needing a separate spreadsheet first?

## Success Criteria

- Operations can triage the top incident queue without ambiguity.
- Support can investigate a booking and explain what happened from one screen group.
- Manual override actions are visibly permissioned, reasoned, and auditable.
- Merchant Success can identify merchants that need intervention before they abandon the workflow.
- Finance or Accounting reviewers can interpret payment-protection events and escalation candidates without needing a full ERP.

## Failure Signals

- Internal teams still need Slack threads or side spreadsheets to understand incidents.
- Support cannot clearly distinguish timeout, decline, cancellation, and no-show outcomes.
- Override actions feel too easy or too hidden.
- Merchant recovery signals are buried or absent.
- Finance or Accounting cannot tell which events need reconciliation or escalation.

## Moderator Script

- Ask the operator to triage today's top exceptions.
- Ask them to investigate one failed booking or timeout case end to end.
- Ask them to perform a controlled manual override and explain why it is safe.
- Ask them to identify one merchant at operational risk and the next recovery action.
- Ask them to review a payment-protection or refund-related event and explain who should act next.

## Notes To Capture

- time to triage first incident
- confusion around state semantics
- points where support and operations would still need side channels
- where override permissions or audit behavior feel too weak or too heavy
- whether merchant recovery signals are actionable
- whether finance-oriented review feels operationally useful

## Output

The prototype review should produce concrete recommendations for:

- dashboard hierarchy
- exception queue design
- investigation workspace structure
- override safety model
- merchant recovery workflow
- finance and trust-event visibility

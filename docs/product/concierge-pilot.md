# Concierge Pilot Plan

## Purpose

Validate the highest-risk assumptions before deep implementation:

- merchants will trust and maintain a canonical schedule
- customers will tolerate payment protection when the value is clear
- the launch slice can honestly support a mix of instant booking and request-confirm booking

This pilot is not a launch rehearsal. It is a controlled learning loop to decide whether the product is ready for implementation-heavy work.

## Pilot Goal

Demonstrate that a Bangkok-first grooming-booking workflow can outperform chat-based coordination on speed and schedule trust for a narrow launch wedge.

## Pilot Scope

- Market: central Bangkok
- Merchant wedge: premium-leaning independent grooming shops
- Customer wedge: busy urban pet owners with repeat-grooming behavior
- Pilot size:
  - 5-10 merchants
  - 20-30 customers
  - enough volume to observe routine bookings, exception bookings, offline bookings, reminders, and no-show handling
- Pilot duration:
  - 2-3 weeks of active concierge operation
  - daily review during the run

## What The Pilot Must Simulate

1. Routine instant-like booking for standardized services
2. Request-confirm flow for high-variance pets or services
3. Offline-originated booking created from chat, phone, or walk-in demand
4. Card-hold or deposit policy communication
5. Reminder and reconfirmation before appointment time
6. Merchant-side status handling for arrived, cancelled, late, completed, and no-show

## What The Pilot Must Decide

- Which launch services are truthfully instant-bookable
- Which cases must route to request-confirm
- How long provisional holds should last
- What merchant response SLA is realistic
- Which payment-protection defaults are acceptable by service class
- Which onboarding fields are truly necessary before first booking

## Merchant Selection Criteria

- Operates in the target central Bangkok wedge
- Already has meaningful repeat demand
- Offers at least a few routine services that could plausibly be standardized
- Open to replacing part of their LINE or phone workflow during the pilot
- Willing to provide availability truth and debrief operational pain after each pilot week

## Customer Selection Criteria

- Owns at least one pet with recurring grooming or bathing needs
- Books through mobile-first behavior today
- Has used chat, phone, or social inbox as a booking workaround
- Fits the target value proposition: speed, reliability, and repeat convenience

## Pilot Operating Model

- One shared operations tracker acts as the temporary canonical schedule
- A human concierge or operator handles booking intake, merchant follow-up, reminder timing, and outcome logging
- Every pilot booking is tagged as one of:
  - routine instant-like
  - request-confirm
  - offline-originated
  - payment-protected
  - reminder or reconfirmation triggered
- Every exception and manual override must be logged

## Core Test Scenarios

### Scenario 1: Routine booking

- Customer chooses a routine service for a known pet
- Operator offers a slot that should be truthfully instant-bookable
- Merchant confirms that the slot and service fit were correct

### Scenario 2: Exception booking

- Customer requests a high-variance service or presents a pet profile that should not be auto-confirmed
- Operator routes into request-confirm
- Merchant explicitly approves or declines within the defined pilot SLA

### Scenario 3: Offline-originated booking

- Merchant captures a booking request that started outside the product flow
- Booking is entered into the same canonical schedule
- Follow-up verification and payment-protection steps are triggered

### Scenario 4: Payment-protection explanation

- Customer receives hold or deposit messaging before commitment
- Operator records whether the user understands the policy and proceeds

### Scenario 5: Reminder and reconfirmation

- Customer receives reminder and reconfirmation prompts
- Merchant can see whether follow-up is needed before the appointment

## Success Thresholds

- At least 60% of target launch demand can flow through truthful instant-booking rules
- Fewer than 10% of customer-visible slots fail because availability was stale
- At least 70% of users who reach the hold or deposit step complete booking
- Most tested customers can explain `instant`, `pending verification`, and `pending merchant review`
- At least 4 of the first 5 target merchants say they would use the schedule daily

## Failure Conditions

- Merchants refuse to keep availability accurate
- Request-confirm volume is so high that the "instant" promise becomes misleading
- Customers strongly resist payment protection even after trust copy is improved
- Merchants still prefer LINE or phone because the proposed workflow is slower

## Data To Capture Per Booking

- merchant
- customer
- pet
- service type
- booking path: instant-like or request-confirm
- origin: app-like or offline-originated
- payment-protection requirement
- whether booking completed
- whether slot or inventory changed during the process
- reminder sent
- reconfirmation result
- merchant final outcome
- support friction or trust confusion

## Daily Review Cadence

- Review every booking from the prior day
- Log stale-availability failures and why they happened
- Log payment-protection confusion or abandonment
- Log every decline, cancellation, and no-show with actor and reason
- Decide whether any routing rule or service definition needs tightening

## Deliverables

- pilot log with per-booking traces
- weekly synthesis of what worked and failed
- locked recommendations for:
  - instant-bookable service list
  - request-confirm triggers
  - verification-hold duration
  - merchant response SLA
  - payment-protection defaults
  - minimum onboarding fields

## Exit Criteria

This pilot is complete only when `idea-refine/pilot-decision-gate.md` can be filled with evidence-backed answers instead of assumptions.

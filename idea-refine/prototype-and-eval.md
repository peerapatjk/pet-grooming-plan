# Prototype and Eval Plan

## Stage

Discovery moving into prototype.

This product should not jump directly from documents into full-stack implementation. The highest-risk questions are workflow fit, merchant trust, and customer willingness to accept payment-protection rules.

## One-Sentence Problem

Busy Bangkok pet owners need a faster, more reliable way to book grooming than LINE and phone calls, while independent groomers need one trustworthy schedule that reduces no-shows and manual coordination.

## What Are We Building and Why?

We are building a repeat-first pet grooming booking product for Bangkok that combines:

- fast routine booking
- merchant approval for high-variance cases
- card-hold or deposit protection
- merchant operations that replace fragmented chat-based scheduling

Why now:

- mobile booking behavior is normal
- fragmented chat workflows are still common in this category
- no-show controls and merchant trust can create immediate operational value

## AI or Not AI?

AI is not the core product here.

The core product is workflow, inventory truth, and payment trust. AI may become useful later for:

- pet-photo intake classification
- service recommendation
- merchant-side assistance or support automation

For MVP, AI is an accelerant at most, not the product.

## Key Decisions Made For This Package

- Merchant wedge: premium-leaning independent grooming shops in dense central Bangkok neighborhoods.
- Booking model: hybrid.
- Payment protection default: card hold for routine bookings, deposit only for higher-risk or higher-value services.
- Merchant correction window: 24 hours after appointment time.
- Bilingual scope: system-managed Thai and English only for V1.
- Waitlist and offered-slot flows: explicitly out of V1.
- Payment method timing: collect only when first required by booking policy, not during onboarding.
- Launch booking unit: one pet plus one primary service template, with only fixed add-ons that are already encoded in merchant pricing and duration logic.
- Confirmed-booking disruption policy: merchant-initiated cancellations are allowed with explicit operational reason codes, but native rescheduling remains out of V1.
- Reconfirmation policy for V1: non-response should create merchant follow-up visibility, not a hidden inventory release.
- Near-term reminder policy: bookings created inside the default reminder windows must use a compressed reminder path instead of duplicate or impossible-to-send reminders.
- External callback policy: late or duplicate OTP or payment success events must be idempotent and must not re-confirm an expired provisional booking.

## Top Hypotheses

1. Pet owners will tolerate a card hold if the booking is materially faster and more reliable than messaging a shop.
2. Groomers will maintain schedule truth if the merchant workflow is faster than LINE and phone coordination.
3. Repeat booking for the same pet and service will drive retention more than marketplace browsing or deals.

## Fastest Falsification Tests

### Test 1: Concierge booking pilot

Run a manual pilot with 5-10 target grooming shops and 20-30 pet owners using a lightweight operator workflow.

What to simulate:

- routine instant-like booking
- request-confirm exceptions
- offline booking entry
- card-hold or deposit policy communication
- reminders and day-of confirmation

What would kill the idea:

- merchants refuse to maintain real availability
- customers strongly resist payment protection
- request-confirm volume is so high that "instant" becomes fake

### Test 2: Customer clickable prototype

Build a clickable mobile prototype for:

- onboarding
- search
- routine booking
- request-confirm booking
- repeat booking

Success signal:

- users understand the instant vs pending distinction without explanation
- time-to-first-booking feels clearly faster than current chat workflows

### Test 2A: Static landing page prototype

Build a static marketing landing page prototype for:

- product framing
- trust explanation
- launch-wedge clarity
- app-download CTA

Success signal:

- users understand the product quickly, want to download the app, and do not expect booking to happen on the website

### Test 3: Merchant ops prototype

Build a merchant-side prototype for:

- service templates
- availability
- booking search
- offline booking entry
- status changes
- decline handling
- inventory controls

Success signal:

- merchants say "I would actually use this instead of LINE" rather than "nice concept"

### Test 4: Internal operations control-plane prototype

Build an internal platform-operations prototype for:

- launch health dashboard
- exception queue
- booking investigation workspace
- manual override flow
- merchant recovery workflow
- finance and trust-event review

Success signal:

- operations, support, merchant success, and finance stakeholders believe the launch slice can be run without relying on Slack threads, side spreadsheets, or undocumented tribal knowledge

## Pilot Decision Gate

Before the team deepens the spec or starts implementation-heavy work, the pilot and prototype loop must lock:

- the launch service list for instant booking
- the request-confirm triggers
- the provisional-hold behavior for pending verification
- the merchant response SLA for pending confirmation
- the payment-protection default by service class
- the sequence between merchant review and payment or OTP when both apply
- the minimum onboarding fields
- the launch slice versus later roadmap
- the booking-unit boundary for launch, including whether any add-on combinations remain safely instant-bookable
- the confirmed-booking disruption policy for merchant-side failures after confirmation
- the reconfirmation non-response rule

The working artifact for that handoff lives in:

- [pilot-decision-gate.md](/Users/peerapatjk/Projects/Pet-Grooming/Plan/idea-refine/pilot-decision-gate.md)

## Prototype Variants

### Variant A: Concierge ops first

Human-operated scheduling layer using a simple internal tool.

Best for learning:

- real merchant behavior
- operational edge cases
- payment-protection friction

### Variant B: Customer-first interactive demo

High-fidelity mobile prototype emphasizing onboarding, search, and booking speed.

Best for learning:

- first-run clarity
- onboarding friction
- speed perception

### Variant C: Merchant-console demo

Interactive merchant ops prototype focused on schedule truth.

Best for learning:

- workflow fit
- inventory control needs
- trust in canonical schedule

### Variant D: Internal operations control-plane demo

Interactive internal operations prototype focused on triage, auditability, and recovery.

Best for learning:

- whether the launch slice is operationally manageable
- whether support and operations can resolve incidents from one place
- whether finance and trust-sensitive events are visible enough before launch

## Demo Before Memo

Do these before deep implementation:

1. Clickable customer demo for onboarding to booking
2. Clickable static landing page demo for positioning and app-download intent
3. Clickable merchant demo for availability to no-show cleanup
4. Clickable internal operations demo for disputes, timeouts, overrides, and merchant recovery
5. Concierge pilot with live merchants and customers

## Eval and Feedback Loop

### North-star outcome

- 30% repeat booking rate at 6 months

### Leading indicators

- onboarding completion rate
- time to first search
- time to first booking
- search-to-book conversion
- percent of bookings that are truly instant-confirmed
- no-show rate
- merchant schedule-trust score
- 30-day repeat booking rate

### Critical user journeys

- first-time user completes onboarding and reaches search
- first-time user completes first booking
- repeat user rebooks the same pet
- instant-eligible user completes verification before the provisional hold expires
- merchant accepts or declines an exception case
- merchant approves an exception case and the booking becomes confirmed without creating a second slot
- merchant enters an offline booking without creating shadow inventory
- merchant cancels a previously confirmed booking with an explicit operational reason and the customer sees the right explanation and next step
- merchant resolves late or no-show status correctly

### Failure modes

- onboarding is too heavy
- instant booking promise is false
- provisional holds block slots for too long and make availability look fake
- merchants stop updating the schedule
- payment protection feels punitive
- bilingual UX is incomplete in critical moments
- the landing page implies web booking or a broader launch than actually exists
- decline vs cancel vs no-show becomes operationally confusing
- merchant-initiated cancellation after confirmation is logged as a generic customer cancellation
- a late OTP or payment success callback re-confirms an expired booking or double-applies a payment outcome
- a near-term booking receives duplicate reminders or misses all reminder guidance because it was created inside the default reminder windows
- the correction window closes without a final appointment outcome and nobody is forced to review it
- support and operations still need Slack, spreadsheets, or memory to resolve incidents
- multi-pet or bundled-service requests sneak into the launch slice and break duration truth

### What should happen

- routine bookings feel materially faster than chat-based coordination
- users understand that the website is for learning and downloading, while booking happens in the app
- users understand why a booking is instant, pending verification, or pending merchant review
- pending states show what will happen next and when the slot will expire or be released
- merchants trust the booking board enough to treat it as the real schedule
- internal teams can triage incidents and overrides without depending on side channels

### What must never happen

- two customers believe they both hold the same confirmed slot
- a verification timeout blocks inventory after the customer has dropped
- a request decline is mistaken for a no-show or customer cancellation
- customers see a payment hold without understanding the release conditions
- a late provider callback silently resurrects inventory that was already released
- a merchant-side disruption is attributed to the customer and contaminates trust, analytics, or payment policy
- internal operators can change risky states without clear audit trails or permission boundaries

### What needs human review

- borderline service types that may be instant for some merchants and pending for others
- borderline booking compositions such as multiple pets, multiple services, or add-on-heavy appointments
- payment disputes, hold-release complaints, and late-arrival exceptions
- any merchant workflow that causes staff to fall back to a parallel shadow schedule

### Review cadence

- daily review during concierge pilot
- weekly product review on leading indicators
- biweekly merchant workflow review with traces and examples

## Quality, Trust, and Risks

- Trust starts with truthful availability, not with branding.
- The first-run experience must explain payment protection simply.
- Every pending state needs an expiry rule and visible next step.
- Decline, cancel, and no-show must be distinct to avoid support chaos.
- Bilingual support must cover critical system flows, not just marketing surfaces.
- Onboarding should defer nonessential setup until the user has felt the value.
- Payment issues need a clear fallback path and support escalation, not just backend policy logic.

## Distribution and Adoption Plan

### Initial supply wedge

- premium-leaning independent shops in central Bangkok

Why:

- higher digital readiness
- denser repeat demand
- stronger willingness to adopt process improvements

### Initial demand wedge

- busy urban pet owners with repeat grooming needs

Why:

- higher urgency
- stronger rebooking frequency
- more likely to value time savings

### Merchant adoption motion

- white-glove onboarding
- concierge setup of services and availability
- operational coaching on offline booking entry and payment-protection rules

## Launch Slice Recommendation

The first software launch should be narrower than the full roadmap.

Launch first:

- invite-only central Bangkok merchants
- routine services with a truthful instant path
- request-confirm for edge cases
- customer booking and repeat booking
- merchant booking board and offline booking capture
- payment-protection trust surfaces

Defer until the booking loop is clearly working:

- bulk operations for higher-volume merchants
- richer dashboards and reporting depth
- broader marketplace discovery experiences

## Next 1-2 Concrete Steps

1. Run the concierge pilot and clickable prototypes, then complete the pilot decision gate before treating the spec as locked.
2. Use that gate to finalize:
   - instant-bookable service list
   - request-confirm triggers
   - verification-hold expiry and merchant response SLA
   - card-hold vs deposit defaults
   - onboarding minimum fields
   - launch slice versus post-launch roadmap

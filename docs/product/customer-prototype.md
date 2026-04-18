# Customer Prototype Brief

## Purpose

Create a clickable customer prototype that tests first-run clarity, speed to booking, trust in payment protection, and repeat-booking value.

This prototype should answer whether the customer experience feels materially faster and clearer than chat-based coordination.

## Prototype Goal

Help target users complete a believable booking journey for a Bangkok pet-grooming appointment and explain the state they ended in without moderator rescue.

## Primary Flows To Cover

1. Language choice and lightweight onboarding
2. Search for shops by area, service, and relevant availability
3. Create or select a pet profile
4. Book a routine service through an instant-like flow
5. Book an exception case through request-confirm, including decline or timeout resolution
6. See payment-protection explanation before committing
7. Review booking status after creation
8. Rebook the same pet and service from prior history

## Prototype Screens

### Flow A: First-time onboarding to search

- language selection
- phone or account verification start
- minimum booking-critical setup
- search entry point

### Flow B: Routine booking

- search results
- shop detail
- service selection
- pet selection or quick profile creation
- slot selection
- hold or deposit explanation
- confirmation state

### Flow C: Request-confirm booking

- exception-trigger explanation
- pending merchant review state
- next step and expected response timing
- declined-by-merchant or request-expired outcome with clear next step
- release or refund explanation when payment protection was already shown

### Flow D: Repeat booking

- booking history or saved pet shortcut
- one-tap or near-one-tap rebooking
- confirmation state

## Critical Questions To Test

- Do users understand why some bookings are instant and others are pending?
- Does the onboarding ask for only what is necessary?
- Does the hold or deposit explanation feel fair and understandable?
- Is repeat booking obviously faster than first-time booking?
- Do users know what happens next after they create a booking?
- Do users understand what happens if a merchant declines or does not respond in time?

## Success Criteria

- Users can explain the difference between `instant`, `pending verification`, and `pending merchant review`
- Users can reach a routine booking without getting stuck on onboarding
- Users understand why payment protection exists and what happens to their hold or deposit
- Users describe repeat booking as clearly faster than their current workaround

## Failure Signals

- Users think "instant" still means merchant approval later
- Users do not understand whether the slot is truly held
- Users interpret payment protection as hidden or punitive
- Users cannot tell what action they or the merchant must take next
- Users cannot tell whether a declined or expired request released the slot or what happened to payment protection
- Repeat booking feels only marginally better than messaging the shop

## Moderator Script

- Ask the participant to book a routine service for a known pet
- Ask them to book a trickier case that should route to request-confirm
- Ask them what they think happens if the merchant declines or misses the response window
- Ask them to explain what the booking status means in their own words
- Ask them to rebook the same pet and service
- Ask them where they felt uncertainty, delay, or distrust

## Notes To Capture

- time to first meaningful action
- time to first booking
- confusion points by screen
- trust objections about hold or deposit behavior
- clarity of booking states
- perceived speed versus LINE or phone booking

## Output

The prototype review should produce concrete recommendations for:

- onboarding field minimization
- booking-state copy
- trust-copy wording
- decline and timeout recovery copy
- repeat-booking shortcuts
- request-confirm explanation and SLA messaging

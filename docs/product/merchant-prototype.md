# Merchant Prototype Brief

## Purpose

Create a clickable merchant prototype that tests whether shops would actually trust and use the product as the canonical schedule instead of falling back to LINE or phone coordination.

## Prototype Goal

Validate that the merchant workflow is operationally faster, clearer, and safer than current chat-based scheduling for the launch wedge.

## Primary Flows To Cover

1. Define service templates and truthful availability
2. Review current and upcoming bookings
3. Search bookings quickly
4. Approve or decline request-confirm bookings
5. Create offline-originated bookings in the same schedule
6. Apply lock or block controls to inventory
7. Update booking statuses during the day
8. Handle merchant-initiated cancellation of a confirmed booking with explicit reason

## Prototype Screens

### Flow A: Setup and availability

- service template management
- duration and pricing rules
- availability controls
- online-booking cutoff controls

### Flow B: Booking board

- current and upcoming schedule
- fast search
- status visibility
- clear distinction between provisional and confirmed states

### Flow C: Request-confirm handling

- incoming pending booking
- approve or decline action
- reason-aware decline flow
- customer-impact preview

### Flow D: Offline booking capture

- create booking from chat, phone, or walk-in
- trigger payment-link or verification follow-up
- ensure the booking lands in the same canonical board

### Flow E: Day-of operations

- mark arrived
- mark in service
- mark completed
- handle late or no-show
- merchant-cancel confirmed booking with explicit reason

## Critical Questions To Test

- Would a merchant trust this board enough to treat it as the real schedule?
- Is the workflow faster than juggling LINE, phone calls, and mental tracking?
- Are provisional bookings understandable and operationally safe?
- Is offline booking capture strong enough to prevent shadow scheduling?
- Are status edits fast enough for day-of operations?

## Success Criteria

- Merchants say they would actually use the booking board daily
- Merchants understand the difference between provisional and confirmed states
- Merchants can handle request-confirm and offline booking flows without creating a second schedule
- Merchants can update booking outcomes quickly enough for real operations

## Failure Signals

- Merchants still prefer LINE because the product adds overhead
- Merchants do not trust provisional holds or expiry behavior
- Offline booking capture feels like separate admin instead of normal scheduling
- Status handling is too slow or too confusing for live operations

## Moderator Script

- Ask the merchant to configure a routine service and its availability
- Ask them to process a request-confirm case
- Ask them to enter an offline-originated booking
- Ask them to resolve a late, no-show, or merchant-cancelled confirmed-booking case
- Ask whether they would stop maintaining a parallel shadow schedule

## Notes To Capture

- places where merchants hesitate or want to leave the workflow
- missing information required to trust the booking
- where cutoff, lock, and block controls feel necessary
- whether merchant-cancel and decline outcomes are clear enough for support and analytics

## Output

The prototype review should produce concrete recommendations for:

- booking-board layout
- search and filtering behavior
- offline booking capture flow
- request-confirm approval timing and messaging
- inventory-control defaults
- merchant status-action design

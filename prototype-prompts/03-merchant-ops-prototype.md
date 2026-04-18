# Merchant Ops Prototype Prompt

## When To Use

Paste this into Claude Design to generate the **merchant-facing desktop/tablet prototype** that proves schedule truth and operational trust.

## Prompt

```text
Create a realistic, interactive merchant operations prototype for a Bangkok-first pet grooming booking platform.

This is for a CEO and stakeholder demo. The goal is to show that the merchant side is not an afterthought. It is the trust engine of the product.

Core problem:
- independent groomers currently coordinate through LINE, phone calls, Instagram, Facebook, and mental tracking
- this creates stale availability, no-shows, fragmented communication, and shadow scheduling
- the product must give merchants one trustworthy canonical schedule

Launch-slice constraints:
- in-shop grooming only
- Bangkok-first wedge
- one booking = one pet + one primary service template + optional fixed add-ons
- routine services can be instantly bookable
- high-variance bookings must route to request-confirm
- routine bookings default to card holds
- deposits can apply to higher-risk or higher-value services
- provisional inventory must expire if required action is not completed
- merchant-cancelled confirmed bookings must use explicit operational reasons
- reconfirmation non-response should create a visible follow-up signal, not silently release a confirmed slot

Primary merchant user:
- independent grooming shop owner or manager
- often works from desktop or tablet
- wants speed, trust, and clarity more than fancy visuals
- will abandon the product if it is slower than LINE

Core objective for this prototype:
Make the merchant booking board feel fast enough, trustworthy enough, and operationally coherent enough that a merchant would use it as the real schedule.

I want the prototype to cover these flows:

FLOW 1: Service templates and truthful availability
- define routine services
- define duration and pricing logic
- configure availability
- configure online booking hours and cutoff times
- optionally lock services to a groomer or station

FLOW 2: Booking board and booking search
- current and upcoming bookings
- search current and upcoming bookings quickly
- make the difference between provisional and confirmed bookings visually obvious
- show key booking data needed for action without overloading the screen

FLOW 3: Request-confirm handling
- incoming pending booking
- approve or decline
- decline must be distinct from customer cancellation and no-show
- show why this booking required review
- show expected response timing / SLA
- show what happens if the merchant misses the response window
- late approval or decline after expiry must not silently resurrect the request

FLOW 4: Offline booking capture
- create a booking from phone, LINE, Instagram, Facebook, or walk-in demand
- keep it in the same canonical schedule
- trigger follow-up payment link or verification where needed
- make it very clear this is not a shadow workflow

FLOW 5: Day-of status operations
- mark arrived
- mark in service
- mark completed
- mark late
- mark no-show
- apply operationally clear corrections inside a defined window

FLOW 6: Merchant-cancel confirmed booking
- support cancellation of a confirmed booking only with explicit operational reason
- examples: shop closed, staff unavailable, safety mismatch
- make the customer impact visible
- make the auditability clear

Must-show semantics:
- pending verification
- pending merchant confirmation
- request expired / timeout by system
- confirmed
- declined by merchant
- arrived
- in service
- completed
- cancelled by customer
- cancelled by merchant
- no-show
- payment hold / deposit state

Critical UX goals:
- speed over decoration
- high information density without chaos
- obvious next actions
- no ambiguous booking states
- no hidden inventory rules
- a merchant should understand whether a slot is truly blocked, provisionally held, or free

Visual direction:
- desktop and tablet friendly
- modern operations software, not generic back-office gray
- polished enough for a boardroom demo
- premium but utilitarian
- the board should feel fast and calm, not crowded and stressful

Required screens:

1. Merchant login / workspace landing
2. Booking board default view
3. Search and filter state
4. Booking detail drawer or side panel
5. Request-confirm approval flow
6. Merchant decline flow with explicit reason
7. Expired-request / missed-SLA state
8. Offline booking capture form
9. Service template and duration configuration
10. Availability and cutoff settings
11. Resource lock / block controls
12. Day-of status action flow
13. Merchant-cancel confirmed-booking flow
14. Lightweight booking and revenue summary snapshot

For the actual demo content, use realistic but sample operational data:
- multiple pets and services across the day, but keep the launch booking unit rules intact
- show a mix of instant, provisional, confirmed, and operational exception cases
- make the board look like a real business is using it

Design and copy notes:
- keep labels direct and operationally clear
- avoid startup theater language
- avoid visually noisy kanban gimmicks
- use strong status semantics and strong empty-state guidance
- show enough detail that support, operations, and finance stakeholders can react to policy implications

Also include:
- one hero booking-board screen for deck use
- one clickable approval flow
- one clickable missed-SLA or expired-request flow
- one clickable offline-booking flow
- one clickable merchant-cancel flow
- one annotation layer that explains why this board is more trustworthy than chat-based scheduling

At the end, show me:
- the board
- the detailed flows
- a short stakeholder-callout view explaining the operational advantages
```

## Good Follow-Ups

- "Make the board denser for experienced operators."
- "Show a clearer visual difference between provisional and confirmed."
- "Make the offline-booking capture flow feel faster and more obvious."
- "Add just enough finance and payment state to make the trust model visible."

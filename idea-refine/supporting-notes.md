# Supporting Notes

## Raw Idea

Create a mobile app for booking pet grooming and bathing services. Grooming shops would publish their slots and services, similar to restaurant-booking platforms like Chope. Customers should be able to book in roughly `3-4 clicks`.

Customer booking flow:

1. Search for a shop
2. Select date and time
3. Make payment
4. Receive notifications

Additional customer data:

- pet profile information for easy future bookings

Groomer flow:

- open booking slots
- receive notifications when a booking is accepted
- customer arrives and confirms at the shop
- receive payment
- see revenue summary dashboard
- maintain grooming profile information and reviews

Payment concept:

- customer links a card to their account
- booking fee or card hold is placed at booking time
- hold is released or converted according to merchant confirmation and cancellation rules
- objective is to reduce no-shows

## User Inputs Captured

- Primary customer: busy urban pet owners
- Primary merchant: independent groomers
- Starting market: Bangkok, Thailand
- Booking model preference: hybrid
- Six-month success metric: 30% repeat booking rate
- Current alternatives: phone calls, LINE chat, Instagram DMs, Facebook inbox, walk-ins

## How Might We Frame It

How might we make grooming appointments as easy to book as a restaurant table, without hiding the real complexity of pet-specific service duration, merchant approval, and no-show risk?

## Core Product Tensions

### 1. Instant booking vs manual acceptance

These are different products.

- `Instant booking` works when service duration, staff availability, and inventory rules are stable.
- `Request booking` works when duration is uncertain or the merchant needs to inspect the case first.

Trying to present everything as instant when the merchant still needs to approve later creates broken expectations.

### 2. Discovery vs repeat behavior

The stated success metric is repeat rate, so the product should be optimized for rebooking, not only for discovery. A marketplace with lots of browsing and weak repeat mechanics would optimize the wrong thing.

### 3. Restaurant slots vs grooming slots

Restaurant booking mostly concerns table inventory and party size. Grooming booking depends on:

- breed
- size
- coat condition
- temperament
- age
- add-ons
- service duration
- staff skill match

This means the system needs service-duration logic, not just a simple calendar.

### 4. Customer convenience vs merchant trust

Customers want speed. Merchants want confidence that:

- the pet matches the booking
- the service fits the slot
- the customer will show up
- the payment is real

The best design should preserve both.

## Divergent Directions Explored

### 1. Instant Book Core

A lightweight marketplace for standardized services only, such as bath, nail trim, ear cleaning, and simple size-based cuts.

Why it exists:

- maximizes booking speed
- easiest UX story
- closest to the original Chope-like concept

Risk:

- fails on high-variance pets
- merchants may distrust the slot logic

### 2. Hybrid Smart Intake

Standard jobs are instantly bookable. Complex jobs require confirmation, usually triggered by pet profile data, photos, or service type.

Why it exists:

- preserves speed where possible
- avoids fake slot availability
- best fit with the selected `hybrid` booking model

Risk:

- can become confusing if the user does not know why some bookings are instant and others are pending

### 3. Repeat-First Grooming

The product is designed around "book the same service again for the same pet" rather than around broad marketplace discovery.

Why it exists:

- aligns directly with the `30% repeat booking rate` goal
- strongest retention loop
- pet profile becomes a product moat

Risk:

- weaker initial marketplace story if supply is thin

### 4. No-Show Shield

The product leads with payment trust and reservation quality: holds, deposits, cancellation rules, and explicit customer attendance states.

Why it exists:

- solves a clear merchant pain
- differentiates from fragmented DM-based booking

Risk:

- can feel punitive if introduced badly on the customer side

### 5. Empty-Slot Fill Engine

When a cancellation happens, nearby pet owners on a waitlist or alert list are notified about newly opened slots.

Why it exists:

- strong operational value for merchants
- can increase utilization

Risk:

- depends on enough density and demand
- not the first thing to build

### 6. Merchant OS First

Build the groomer-side scheduling, profile, intake, deposit, and status workflow before building a large consumer marketplace.

Why it exists:

- operational truth starts with merchants
- easier to create real availability than to fake supply with a consumer-first app

Risk:

- less obviously exciting as a customer-facing launch

### 7. Premium Bangkok Wedge

Start with premium salons and high-intent urban pet owners in a few dense Bangkok zones.

Why it exists:

- cleaner supply
- higher willingness to pay
- easier quality control

Risk:

- may miss the larger mainstream market initially

## Evaluation and Convergence

### Strongest direction

`Hybrid Smart Intake` + `Repeat-First Grooming` + `No-Show Shield`

### Why this cluster wins

- It preserves the desired fast booking experience for routine work.
- It accepts that some pet-grooming cases are too variable for fully automatic scheduling.
- It aligns directly with repeat booking as the key success metric.
- It gives merchants a concrete reason to switch away from LINE and manual inbox coordination.

### Painkiller or vitamin?

For merchants, this can be a painkiller if it reduces no-shows and back-and-forth coordination.

For customers, it becomes a painkiller only when:

- rebooking is clearly faster than messaging a shop
- pricing and service expectations are clear
- the booking is actually reliable

Without those conditions, it risks becoming a vitamin.

### Feasibility

Technically feasible for an MVP if the first version stays narrow:

- limited service templates
- limited geography
- limited merchant types
- simple statuses
- simple payments behavior

The hard problem is not building a calendar UI. The hard problem is truthful duration and slot logic.

### Differentiation

The strongest possible differentiation is not "pet grooming on mobile." That is easy to copy.

The stronger angle is:

- structured pet profile
- service-duration logic
- repeat-first booking
- no-show protection
- merchant-side workflow that is simpler than chat-based booking

## Hidden Assumptions

### Must be true

- Groomers will maintain real availability instead of letting the app become stale.
- Customers will tolerate a hold or deposit for selected bookings.
- Enough grooming services can be standardized for instant booking to feel real.

### Should be true

- Pet profile data meaningfully speeds up future bookings.
- Completed-booking reviews improve trust without requiring heavy moderation too early.
- Bangkok users want an app-based flow more than another LINE-heavy coordination layer.

### Might be true

- Customers care about content, inspiration, and broad discovery inside the product.
- Deals and loyalty mechanics materially increase retention in the early phase.

## Chope Reference Notes

Chope is useful as a benchmark for booking interaction design and merchant operations, but not as a perfect product analogue.

### What appears worth borrowing

1. `Fast booking as the core promise`

- Chope's iOS listing positions the product around easy restaurant discovery and reservations in "just a few clicks."
- A public iOS review dated `2023-10-03` complained that the app used to make it easy to search and book quickly, but later updates buried the reservation action behind too much information.
- Product implication: the booking CTA must remain primary. Do not let content push the action below the fold.

Source:

- https://apps.apple.com/us/app/chope-dining-made-easy/id517872650

2. `Deposits and authorization holds as anti-no-show mechanics`

- Chope's diner FAQ explains that restaurants may require deposits to discourage no-shows or late cancellations.
- The same FAQ defines a credit-card authorization hold and states the hold period may last up to 30 days.
- It also states that held amounts are released once the reservation is fulfilled.

Source:

- https://www.chope.co/singapore-restaurants/pages/dinerfaq

3. `Merchant workflow is much deeper than a slot picker`

- ChopeBook's public app listing emphasizes floor plan view, Gantt chart view, list view, diner data, automatic alerts, and business intelligence.
- The ChopeBook public user guide shows operational states like upcoming, seated, done, absent, waitlist, no-show, and cancellations.
- It also exposes details such as repeat-diner count, notes, special requests, deposit status, pinging diners, blocking tables from online reservations, and adding walk-ins.

Product implication:

- For pet grooming, the merchant side should not just show "available slots."
- It needs statuses, pet/customer context, notes, confirmation, and day-of-service handling.

Sources:

- https://apps.apple.com/us/app/chopebook/id1198425778
- https://www.scribd.com/document/884337118/chopebook-user-guide

4. `Unofficial redesign notes still point to useful UX principles`

- One public redesign case study argued that users need richer decision support and should not need to leave the app to make a choice.
- Another suggested carrying search inputs such as date and time through to the booking page, rather than forcing users to re-enter them.
- These are not official Chope materials, but they are directionally useful.

Sources:

- https://www.nicoleho.me/projects/chope
- https://yekyawpaing.github.io/portfolio/chope.html

5. `No-show reduction needs explicit workflow features, not just policy text`

- Chope's no-show page highlights automated reminder and reconfirmation messages called `Pings`.
- The same page claims one restaurant saw a `67% reduction in no-shows` after activating automated pings.
- Chope also supports deposits for both online and offline reservations, with a web link for diners to enter card details.
- Card details are tokenized rather than exposed directly to merchants.
- Phone-number authenticity is protected with OTP verification.
- Their example message also sets an explicit `15-minute` grace period before the reservation is released.

Product implication:

- The grooming app needs a proper anti-no-show workflow, not just a payment screen.
- Offline bookings must also be pulled into the same verified flow, otherwise merchants can still create unverified ghost slots by phone or chat.
- The product should define reminder timing, reconfirmation timing, payment authorization state, grace-period handling, and no-show state transitions.

Source:

- https://restaurants.chope.co/singapore/restaurant-no-show/

6. `No-show controls also need merchant-side speed and auditability`

- Grab's Chope merchant help page says restaurant teams have `48 hours after the booking time` to update a reservation's booking status if a customer cancels or is a no-show.
- In ChopeCloud, staff can edit multiple bookings at once with bulk actions and mark them cancelled or no-show in one step.
- Across ChopeCloud, ChopeBook on iPad, and mobile browser, the system is built around very fast status editing rather than a separate support workflow.
- The article also frames editing as necessary for accommodating guest changes, requests, and status corrections across list, Gantt, and table-plan views.

Product implication:

- The grooming app needs explicit status-edit permissions and an operational time window for post-appointment corrections.
- No-show handling should support both single-booking and bulk actions, especially for shops that manage many bookings per day.
- Merchant workflows should prioritize fast status updates on phone and tablet, not just on a full desktop dashboard.

Source:

- https://help.grab.com/merchant/en-th/40001016

### What should not be copied blindly

- Restaurant bookings assume more standardized duration than grooming.
- Table inventory is not the same as groomer capacity.
- Dining marketplaces often expand into deals, rewards, and editorial discovery. Those are likely distractions early for this product.

### Recency note

A `last30days` reference run on `2026-04-18` produced sparse and noisy recent social evidence for Chope because the term "chope" is also used generically across social platforms. That means Chope is better used as a structural benchmark than as a strong current-sentiment signal.

Saved research artifact:

- [/Users/peerapatjk/Documents/Last30Days/chope-app-ux-ui-raw-v3.md](/Users/peerapatjk/Documents/Last30Days/chope-app-ux-ui-raw-v3.md)

## Product Principles Emerging From This Session

- Booking speed matters, but only if the slot is truthful.
- The pet profile is not a side feature. It is core product infrastructure.
- Repeat booking should be more important than discovery for the first version.
- Card holds or deposits are a feature, not a payment detail, because they shape merchant trust.
- Anti-no-show controls must cover both online and offline bookings.
- Merchant operations are part of the product, not a back-office afterthought.
- The first version should solve one job well: book and fulfill a grooming appointment reliably.

## Recommended MVP Shape

### Customer side

- search by area, shop, and service
- pet profile
- service selection
- date and time selection
- clear booking state: `instant confirmed` or `pending confirmation`
- card hold or deposit capture
- OTP or equivalent phone verification when risk rules require it
- reminder and reconfirmation flow before appointment time
- status notifications
- rebook same service for same pet

### Groomer side

- open and edit availability
- define service templates and durations
- review exception requests
- accept or reject edge-case bookings
- update booking status through arrival, service, completion, cancellation, and no-show
- create verified offline bookings from phone, LINE, or walk-in traffic
- send payment links for offline bookings when deposit or card hold is required
- see daily revenue and booking summaries

## Requirements Derived From Chope's No-Show Flow

### Functional requirements

- The system must support automated reminder messages before the appointment.
- The system must support reconfirmation requests before the appointment.
- The system must support deposits or card holds for both online and offline bookings.
- The system must support sending a secure payment link when the customer is not booking directly in the app.
- The system must support OTP or equivalent phone verification for suspicious or high-risk bookings.
- The system must support merchant-configurable grace periods for late arrivals.
- The system must support explicit booking states for `pending verification`, `confirmed`, `reconfirmed`, `arrived`, `late`, `cancelled`, and `no-show`.

### Operational requirements

- Offline bookings cannot remain outside the system if they consume capacity.
- A slot should only be treated as fully locked when the required verification and payment steps are complete.
- Merchants need a simple way to mark a customer as arrived so the hold or deposit policy can transition correctly.
- Merchants need a defined time window after the scheduled appointment to correct booking outcomes such as `cancelled`, `late`, or `no-show`.
- Merchants should be able to update multiple bookings in bulk when operational cleanup is needed.
- The no-show policy must be visible to customers during booking and in reminders.

### Policy requirements

- The app must let merchants choose whether a service uses no payment protection, a card hold, or a deposit.
- The app must define what happens when the customer confirms, cancels in time, cancels late, arrives late, or does not arrive.
- The app must define when a hold is released and when a deposit is forfeited.

## Not Doing in V1

- home-service dispatch
- deep loyalty and coupon system
- broad citywide rollout
- rich editorial discovery
- complex public review moderation
- highly customized enterprise merchant tooling

## Open Questions for the Next Ideation Pass

- What is the exact rule set for switching from instant booking to request booking?
- Which merchant segment should be the first wedge in Bangkok?
- How much mandatory pet intake is needed before friction outweighs trust?
- Should a completed booking automatically trigger review collection, rebooking suggestion, and next-visit reminder?
- What is the thinnest useful merchant dashboard that still replaces chat-heavy coordination?
- What should the allowed post-appointment status-edit window be for merchants: immediate only, same day, or up to 48 hours?

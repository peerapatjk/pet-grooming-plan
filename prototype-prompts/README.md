# Claude Design Prompt Pack

This folder contains paste-ready prompts for **Claude Design** based on the current Bangkok-first pet grooming booking product strategy.

These prompts are designed for the workflow Anthropic is explicitly pushing in Claude Design:

- seed a design system from brand context
- generate realistic interactive prototypes
- create exec-friendly decks and one-pagers
- refine through conversation
- optionally hand off to Claude Code later

They are optimized for **CEO and stakeholder demos**, not implementation-perfect specs.

## Recommended Order

1. `01-brand-and-design-system-seed.md`
   - Use first if you want Claude Design to establish a coherent visual system before prototyping.
2. `02-customer-mobile-prototype.md`
   - Use to generate the customer-facing prototype.
3. `03-merchant-ops-prototype.md`
   - Use to generate the merchant-facing operations prototype.
4. `04-ceo-demo-deck.md`
   - Use to create a crisp narrative deck for leadership review.
5. `05-stakeholder-one-pager.md`
   - Use to create a summary artifact for broader review circulation.
6. `06-demo-refinement-and-handoff.md`
   - Use after the first drafts exist to align the visuals, tighten the storyline, and prepare a handoff bundle.

## How To Use In Claude Design

1. Open `claude.ai/design`.
2. If you have logos, fonts, brand colors, screenshots, or a website, upload them first.
3. Paste the prompt from one file at a time.
4. Let Claude generate a first version.
5. Refine with follow-ups such as:
   - "Make the trust-copy clearer for first-time users."
   - "Reduce visual noise and make the screen feel more premium."
   - "Show a stronger distinction between provisional and confirmed booking states."
   - "Make this feel boardroom-ready rather than startup-hype."

## Demo Strategy

For leadership demos, the strongest sequence is:

1. Show the **customer routine booking** flow.
2. Show the **customer exception / request-confirm** flow.
3. Show the **merchant booking board** and offline booking capture.
4. Show the **deck** that frames why this is a tight launch slice rather than a broad marketplace.

This is more credible than showing generic "AI made a pretty UI" screens.

## Guardrails Embedded In These Prompts

The prompts intentionally enforce the current product boundaries:

- Bangkok-first launch slice
- in-shop grooming only
- one pet plus one primary service template
- routine services can be instant-booked
- high-variance services route to request-confirm
- card hold for routine bookings, deposit for higher-risk cases
- Thai and English for system-managed UI
- no waitlist, no offered-slot flow, no native reschedule flow in V1
- merchant cancellation of confirmed bookings must use explicit operational reasons
- reconfirmation non-response must create follow-up visibility, not a silent inventory release

## Important Note

These prompts are intentionally **high-detail and directive** because Claude Design performs best when it is given:

- a clear audience
- a clear artifact type
- a constrained product scope
- concrete screens and states
- explicit "not this / yes this" guidance

If you want, the next step after using these prompts is to save the resulting artifacts back into `docs/product/` as screenshots, export decks, or notes from stakeholder sessions.

# Demo Refinement And Handoff Prompt

## When To Use

Paste this into Claude Design **after** you already have first drafts for the customer prototype, merchant prototype, internal operations prototype, deck, or one-pager.

Use it to unify the artifacts into one coherent demo package and prepare a stronger leadership review.

## Prompt

```text
I already have first-draft artifacts in this workspace for:
- static landing page prototype
- customer mobile prototype
- merchant operations prototype
- internal operations control-plane prototype
- CEO deck
- stakeholder one-pager

Now refine everything so the entire package feels like one polished product story.

Your job is not to invent new scope. Your job is to tighten consistency, clarity, and demo quality.

Please do all of the following:

1. Align visual system
- ensure all artifacts share one design language
- unify colors, typography, spacing, component shape language, and motion tone
- remove anything that feels generic, inconsistent, or obviously AI-generated

2. Strengthen the product story
- landing page should clearly drive download intent without implying web booking
- customer flow should clearly show speed and trust
- merchant flow should clearly show operational control and schedule truth
- internal operations flow should clearly show launch readiness, auditability, and incident manageability
- deck should clearly show why this is a narrow, intelligent launch slice
- one-pager should clearly summarize the strategy without ambiguity

3. Strengthen the key proof points
- static marketing site with direct-to-download CTA only
- routine instant booking
- request-confirm for high-variance cases
- payment protection explanation
- repeat-booking advantage
- merchant canonical schedule
- offline booking capture inside the same system
- internal exception triage and override safety

4. Tighten copy everywhere
- remove hype and vague filler
- sharpen microcopy
- make booking states easy to understand
- make trust copy stronger and calmer
- make deck headlines more executive-quality

5. Improve demo readiness
- choose the best hero screens
- choose the best click path for a live demo
- reduce low-signal screens
- ensure the story can be shown in 5-7 minutes

6. Add stakeholder annotation
- lightly annotate the most important screens and slides with product-decision callouts
- call out where the launch slice is intentionally narrow
- call out what is still a decision gate, not yet validated truth

7. Prepare handoff
- create one concise handoff summary for Claude Code or engineering review later
- identify the most important screen groups, state semantics, and reusable components
- keep this handoff summary high-signal and implementation-oriented, not verbose

Important constraints:
- do not turn the landing page into a web booking or onboarding surface
- do not add waitlist, native reschedule, multi-pet bundles, home service, or broad marketplace complexity
- do not weaken the distinction between provisional and confirmed states
- do not hide payment protection or operational edge cases
- do not make the artifacts prettier at the expense of honesty

Output I want:
- refined static landing page prototype
- refined customer prototype
- refined merchant prototype
- refined internal operations control-plane prototype
- refined CEO deck
- refined stakeholder one-pager
- one "best live demo path" recommendation
- one short handoff summary for engineering / Claude Code

Make the final result feel like a coherent product package that can survive CEO scrutiny and cross-functional stakeholder review.
```

## Good Follow-Ups

- "Give me the single best 6-screen customer path for a live demo."
- "Make the deck and one-pager feel more tightly connected."
- "Prepare a tighter handoff summary for a future Claude Code build."

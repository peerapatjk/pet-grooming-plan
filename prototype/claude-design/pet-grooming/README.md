# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## Current implementation

The customer surface is now implemented as a real Expo Router app.

- App entry: `src/app/`
- Shared customer domain/state: `src/features/customer/`
- Run it: `npm start`
- Web preview: `npm run web`
- Native preview: `npm run ios` or `npm run android`
- Static handoff page: `project/Customer App.html`

The legacy static prototype files in `project/customer/` still exist as design references, but they are no longer the runtime source of truth for the customer app.

## What you should do — IMPORTANT

**Read `pet-grooming/project/Index.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `pet-grooming/README.md` — this file
- `pet-grooming/project/` — the `Pet Grooming` project files (HTML prototypes, assets, components)

## Prototype authoring/runtime

For the shipped static prototype pages under `pet-grooming/project/`:

- The standalone JSX files in `project/customer/`, `project/merchant/`, `project/ops/`, and `project/shared/` are the source of truth.
- The new per-surface `app-entry.jsx` files own the flow metadata, app composition, and mount logic.
- `project/generated/` contains derived build artifacts, including vendored React runtimes and generated app bundles. Do not edit those files by hand.

To regenerate the shipped runtime assets locally:

1. `cd prototype/claude-design/pet-grooming`
2. `npm install`
3. `npm run build`

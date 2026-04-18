# Change-Control Checklist

Use this file whenever scope, policy, authority, or readiness expectations change.

## Purpose

The goal is simple: one decision change should not leave five partially stale folders behind it.

## Promotion Checklist

Before promoting work from one lane to the next, confirm all of the following:

- the problem, constraint, and launch-slice boundary are explicit
- non-goals are stated, not implied
- any still-open questions are documented as open questions, not buried in prose
- the next lane is linked explicitly
- the current authoritative artifact is linked explicitly
- any status snapshot affected by the promotion is updated or marked stale

## Change Triggers

Run this checklist when any of the following changes:

- launch wedge or non-goals
- booking, payment, timeout, or state-machine policy
- prototype brief or prompt-pack scope
- stakeholder-readiness criteria
- ownership, approval path, or waiver process
- folder structure or internal link targets

## Required Update Pass

### 1. Capture the decision

- What changed?
- Why did it change?
- What evidence or stakeholder input justified the change?
- Who approved it?
- What date did it become current?

### 2. Update the highest-authority source first

- scope or shared policy summary: [../launch-canon.md](../launch-canon.md)
- detailed product behavior: [../../spec-driven-development/spec.md](../../spec-driven-development/spec.md)
- stakeholder rubric: [../../spec-driven-development/stakeholder-readiness.md](../../spec-driven-development/stakeholder-readiness.md)
- repo governance or lane rules: this folder

### 3. Update downstream consumers in the same change

Depending on the change, review and update:

- [../../idea-refine/README.md](../../idea-refine/README.md)
- [../product/README.md](../product/README.md)
- [../../prototype-prompts/README.md](../../prototype-prompts/README.md)
- [../../spec-driven-development/plan.md](../../spec-driven-development/plan.md)
- [../../planning-and-task-breakdown/tasks.md](../../planning-and-task-breakdown/tasks.md)
- [../readiness/README.md](../readiness/README.md)
- [../../spec-driven-development/stakeholder-readiness-status.md](../../spec-driven-development/stakeholder-readiness-status.md)

### 4. Reset stale status where needed

- If a changed decision invalidates a status snapshot, update the status file in the same commit.
- If evidence no longer supports a “ready” statement, downgrade it explicitly.
- Do not leave a status artifact sounding current when its inputs changed underneath it.

### 5. Validate

- all repo-internal links remain relative
- no referenced file is missing
- no README restates an old authority rule
- traceability index still points to the correct downstream artifacts

## Minimum Definition Of Done

A documentation change is not complete until:

- the authoritative artifact is updated
- the affected lane README files are updated
- the affected status docs are updated
- broken or dead forward references are eliminated
- the traceability and governance docs still describe the repo accurately

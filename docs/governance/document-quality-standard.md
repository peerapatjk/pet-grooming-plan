# Document Quality Standard

This file defines the minimum quality bar for primary artifacts in:

- `docs/`
- `idea-refine/`
- `spec-driven-development/`
- `planning-and-task-breakdown/`
- `prototype-prompts/`

Use it to keep the repo consistent without forcing every file into the same template.

## Core Principle

High-quality documentation in this repo must do all of the following:

- make authority explicit
- make maturity explicit
- make open questions explicit
- preserve traceability to upstream and downstream artifacts
- separate exploratory thinking from binding requirements and execution work

Polished wording does not compensate for mixed authority or missing decisions.

## Required Metadata For Primary Artifacts

Every primary artifact should make these fields easy to find near the top of the document, either in a dedicated section or through equivalent structured sections already used by the lane:

- `Purpose`
- `Primary audience`
- `Authority boundary` or `Source of truth level`
- `Inputs` or `Upstream inputs`
- `Outputs` or `Downstream consumers`
- `Status`, including maturity and current-state wording
- `Open questions` when unresolved decisions still exist

For live status snapshots, replace narrative outputs with:

- `Update rule`
- `Current status`
- `Blockers`
- `Waivers` when applicable

## Maturity Vocabulary

Use the shared repo maturity model from [../README.md](../README.md):

| Maturity | Meaning | Safe downstream use |
| --- | --- | --- |
| `draft` | working content; structure or decisions may change materially | do not treat as binding without explicit note |
| `reviewed` | internally coherent and ready for downstream review | safe for planning and review, but not final lock |
| `locked` | approved for downstream work unless an explicit decision reopens it | safe as a working contract |
| `evidence-backed` | validated by research, pilot evidence, user testing, or operational review | safe for decision gates and launch review |
| `superseded` | retained for history but no longer authoritative | never use as current truth |

Do not mix maturity states casually. If an artifact is still called `draft`, downstream docs must not speak as if it is locked.

## Artifact-Type Contracts

### Exploratory artifacts

Applies to `idea-refine/**`.

Minimum contract:

- problem or opportunity framing
- target user or stakeholder context
- key hypotheses or assumptions
- evidence so far
- working recommendation
- explicit open risks or decisions still blocked
- next artifact produced

Exploratory artifacts may propose. They must not quietly approve implementation truth on their own.

### Normative product artifacts

Applies to `spec-driven-development/requirements.md` and `spec-driven-development/spec.md`.

Minimum contract:

- scope and non-goals
- requirement families or behavior sections
- constraints and invariants
- open questions still blocked on evidence
- cross-links to plan and task breakdown

Normative artifacts should use neutral, non-first-person language. Implementation hypotheses belong in clearly marked planning sections, not mixed into the behavior contract.

### Planning artifacts

Applies to `spec-driven-development/plan.md` and `planning-and-task-breakdown/tasks.md`.

Minimum contract:

- sequencing logic
- risk posture
- dependencies
- verification intent
- traceability back to requirement families or spec sections

Planning artifacts may decompose approved work. They must not invent new scope or policy.

### Prompt artifacts

Applies to `prototype-prompts/**`.

Every prompt file should include a prompt contract covering:

- prompt purpose
- intended user, workflow, or stakeholder audience
- source documents
- requirement families or policy areas being expressed
- hard constraints and non-goals
- review questions or quality checks

Prompt files are controlled downstream artifacts, not scratchpads.

### Readiness and live-status artifacts

Applies to readiness packets and live status snapshots.

Readiness policy docs should define the rubric.
Status docs should only report current owners, blockers, dates, waivers, and evidence state against that rubric.

Do not restate approval criteria in multiple live files unless the higher-authority policy doc is also updated.

## Terminology Rule

Use [terminology-canon.md](terminology-canon.md) for product nouns and lane terms.

If a concept needs a new canonical term, update the terminology canon in the same change instead of letting synonyms drift across folders.

## Traceability Rule

When you add or materially change a requirement, plan item, or prompt:

1. update the highest-authority artifact first
2. update [traceability-index.md](traceability-index.md) if the mapping changed
3. update downstream consumers in the same change

If a reader cannot trace a major rule from idea -> requirement/spec -> plan/tasks -> prompt or readiness, the change is incomplete.

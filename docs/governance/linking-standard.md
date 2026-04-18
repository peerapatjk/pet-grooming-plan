# Linking Standard

Use this file as the repo rule for Markdown links.

## Rule Set

### Repo-internal links

Use relative links for any file that lives inside this repository.

Examples:

- `../launch-canon.md`
- `../../spec-driven-development/spec.md`
- `stakeholder-readiness-status.md`

Do not use absolute filesystem paths for repo-internal links.

### External web sources

Use full `https://` URLs for public web sources.

Examples:

- `https://restaurants.chope.co/singapore/restaurant-no-show/`
- `https://help.grab.com/merchant/en-th/40001016`

### Local-only references

If a note depends on a machine-local file that is not part of the repo:

- label it clearly as `local-only`
- prefer plain code formatting over a Markdown link
- do not present it as a portable repo dependency

Example:

- `Local-only reference used during ideation: /Users/name/path/to/file.md`

## Quality Bar

The repo is considered portable only when:

- all repo-internal references are relative
- missing targets are removed or created
- local-only references are explicitly marked

Mixed link strategy is a documentation defect, not a style preference.

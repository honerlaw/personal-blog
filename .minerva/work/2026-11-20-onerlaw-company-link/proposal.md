# Proposal: onerlaw-company-link

**Date**: 2026-11-20
**Status**: Draft

## Goal
Make "Onerlaw LLC" in the Projects section link out to the company site, https://www.onerlaw.com, on both the homepage and `/projects`.

## Why
The owner asked: "Onerlaw LLC should also link out to www.onerlaw.com". The redesign shipped in PR #10 left the name unlinked because no URL had been given (knowledge entry `2026-11-20-decision-projects-grouped-by-company-frontmatter`). The URL now exists and responds (https://www.onerlaw.com, HTTP 200).

## Approach
- In `src/components/project-groups.tsx`, add a `COMPANY_URLS` map: `{ "Onerlaw LLC": "https://www.onerlaw.com" }`. It is keyed by the `company` frontmatter value, and a comment notes that coupling.
- `ProjectGroups` renders a company group heading as a link when its company has a URL:
  - the `<a>` sits inside the existing `h2`/`h3`, so the heading outline is unchanged;
  - `target="_blank"` and `rel="noopener noreferrer"`, matching the project cards' external links;
  - the text is "Onerlaw LLC" followed by a "↗" glyph that is hidden from screen readers;
  - a faint underline is always shown so the link is discoverable on touch devices, and it darkens on hover.
- Groups with no URL, including "Run by me directly", render as plain text, as now.
- The intro sentence is unchanged.

### Candidate approaches considered
- **A1. Link the group heading** (chosen). It is the most visible mention, reuses the site's external-link pattern, and works for any company that is given a URL.
- **A2. Link only the intro sentence's "Onerlaw LLC".** This is less visible, because it is inline body text.
- **A3. Link both mentions.** This puts the same destination twice in adjacent lines, which means more surface for no gain.
- **D2. A `companyUrl` frontmatter field on each project.** The URL would be repeated per project, and the copies could disagree.

Criteria: (1) the link is obvious on both pages; (2) it is consistent with existing external links; (3) it adds no copy beyond the owner's words, and the owner's rules hold; (4) it has the smallest surface; (5) it is accessible.

## Success criteria
- The built `/` and `/projects` HTML each contain an `<a href="https://www.onerlaw.com"` with `target="_blank"` and `rel="noopener noreferrer"`, whose text includes "Onerlaw LLC", inside the company group heading element: `h3` on `/`, `h2` on `/projects`.
- In `ProjectGroups`, a group whose company has no `COMPANY_URLS` entry, or the no-company group, renders its heading as plain text with no `<a>`.
- These greps stay empty:
  - `grep -rnw uppercase src/app src/components | grep -v components/ui`;
  - case-sensitive `grep -rn "onerlaw LLC" src content`;
  - `grep -rni "side business" src content`.
- `pnpm build` passes, and `npx tsc --noEmit -p .` reports 0 errors.

## Open Questions
- None. The URL was given by the owner, and the redirect from the bare domain to `www` was confirmed.

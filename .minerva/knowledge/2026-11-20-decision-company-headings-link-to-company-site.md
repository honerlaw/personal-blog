# Project groups are headed by their company, and a company heading links to its website

**Date**: 2026-11-20
**Type**: decision
**Theme**: homepage
**Summary**: `company` frontmatter groups projects; the Onerlaw LLC heading links to www.onerlaw.com via COMPANY_URLS.
**Context**: .minerva/work/2026-11-20-onerlaw-company-link (see git history if the worktree has been cleaned up)

## Context
The redesign grouped projects under the company they run under, using an optional `company` frontmatter field, with both Seekless and SoberJourney under "Onerlaw LLC". It left the company name unlinked because the owner had given no URL. The owner then asked for "Onerlaw LLC" to link out to www.onerlaw.com.

## Finding
- `groupProjects()` in `src/lib/mdx.ts` still groups projects by `company`, and projects with no company go last under "Run by me directly".
- `src/components/project-groups.tsx` holds a `COMPANY_URLS` map (`{ "Onerlaw LLC": "https://www.onerlaw.com" }`), keyed by the exact frontmatter value. When a group's company has an entry, its heading (h3 on the homepage, h2 on `/projects`) wraps the name in an external link:
  - `target="_blank" rel="noopener noreferrer"`;
  - an `aria-hidden` "↗";
  - an always-visible faint underline (`decoration-foreground/40`, matching article links) that darkens on hover.
- Any other group heading is plain text. The intro sentence "Onerlaw LLC is the blanket company that I operate my projects under." is not linked; the heading is the single link.
- The project and repo cards' "↗" glyphs are also `aria-hidden`, so link names read as text only.

## Implications
- A new company gets a link by adding one `COMPANY_URLS` entry whose key matches its `company` frontmatter exactly. A typo in either place silently drops the link.
- A project's group comes from its frontmatter, never from which GitHub account hosts its repo. Omitting `company` puts it under "Run by me directly", and the intro then adds "Some I operate directly myself."
- The spelling is "Onerlaw LLC". It is never described as a "side business" and is never a callout separate from Projects.
- Use https://www.onerlaw.com; the bare domain redirects there.

## Related
- [[2026-11-20-decision-projects-grouped-by-company-frontmatter]] — supersedes
- [[2026-11-20-decision-site-design-shared-chrome-and-neutral-tokens]] — the layout and link styling these headings follow

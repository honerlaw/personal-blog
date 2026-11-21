# Projects are grouped under the company they run under, via a `company` frontmatter field

**Date**: 2026-11-20
**Type**: decision
**Theme**: homepage
**Summary**: Optional `company` frontmatter groups projects; both run under Onerlaw LLC; no separate callout.
**Context**: .minerva/work/2026-11-20-site-redesign-hero-cards (see git history if the worktree has been cleaned up)

## Context
An earlier change added a one-line "onerlaw LLC" mention above the homepage project cards. The owner then asked for it to be more obvious, but not "weirdly called out separate from projects": Onerlaw LLC (capital O) is "the blanket company that I operate my other projects under", and some projects may be run by the owner directly. The owner also confirmed that SoberJourney belongs to the LLC even though its repo sits under the personal `honerlaw` GitHub account.

## Finding
`ProjectFrontmatter` has an optional `company` string. `groupProjects()` in `src/lib/mdx.ts` groups projects by it, with company groups in first-appearance order and projects with no `company` last. `ProjectGroups` (`src/components/project-groups.tsx`) renders each group under a heading: the company name, or "Run by me directly" for the no-company group. `ProjectsIntro` prints "Onerlaw LLC is the blanket company that I operate my projects under." and adds "Some I operate directly myself." only when a no-company group exists. Both `seekless.mdx` and `sober-journey.mdx` carry `company: "Onerlaw LLC"`, so today only the Onerlaw LLC group renders. The homepage groups featured projects; `/projects` groups all of them.

## Implications
- A project's grouping comes from its frontmatter, never from which GitHub account hosts its repo.
- To add a directly-run project, omit `company`; the "Run by me directly" group and the extra intro sentence appear automatically.
- The spelling is "Onerlaw LLC". Never describe it as a "side business", and do not link it until the owner provides a URL.
- A group whose projects have neither `url` nor `github` is skipped, so a heading never renders over an empty grid.

## Related
- [[2026-11-20-decision-onerlaw-llc-line-in-homepage-projects]] — supersedes
- [[2026-11-20-decision-site-design-shared-chrome-and-neutral-tokens]] — the layout these groups render in

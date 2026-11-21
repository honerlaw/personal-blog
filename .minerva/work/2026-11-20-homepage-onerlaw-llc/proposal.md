# Proposal: homepage-onerlaw-llc

**Date**: 2026-11-20
**Status**: Draft

## Goal
Add a short line to the personal blog's homepage (`src/app/page.tsx`) that says Derek owns and runs onerlaw LLC, which ships several projects today as a side business.

## Why
The owner asked for it: "add somewhere on the homepage that I own and run onerlaw LLC which ships several projects today as a side job / side hobby / etc". The homepage already lists projects (Seekless, SoberJourney) but says nothing about the company behind the side work. The spelling "onerlaw" is the owner's and matches the existing GitHub org in `content/projects/seekless.mdx` (`github.com/onerlaw/seekless`), so it is not a typo for "Honerlaw".

## Approach
Add one muted intro paragraph at the top of the homepage's existing **Projects** section, between the `Projects` `<h2>` and the project card list:

```tsx
<p className="text-sm text-muted-foreground leading-relaxed mb-6">
  On the side, I own and run onerlaw LLC, which ships several projects today.
</p>
```

Its styling matches the project-card descriptions (`text-sm text-muted-foreground leading-relaxed`). The `<h2>` drops from `mb-6` to `mb-2` so the label sits tight above the line, and the paragraph carries the `mb-6` gap before the cards.

Copy rules:
- Stay close to the owner's own words. Do not name which projects the LLC ships, link a company URL, or add any claim the owner did not make. The owner's memory says do not invent landing-page copy. Also, `sober-journey` sits under the personal `honerlaw` GitHub account, not `onerlaw`, so saying "these are the LLC's projects" would be a guess.
- No contractions (owner's writing rule).
- Keep "onerlaw" lowercase, as the owner wrote it.

### Candidate approaches considered
- **A. Sidebar line under the headline** (`src/components/sidebar.tsx`). The most prominent spot, above the fold on desktop. But the Sidebar renders on every page (home, /posts, /posts/[slug], /projects), not only the homepage the owner named. It also sits right under the professional headline the owner rewrote one commit ago (851ddc1).
- **B. Intro line in the homepage Projects section** (recommended). Homepage only, as asked. It sits next to the projects it describes. It leaves the deliberately edited sidebar and the removed intro alone. It is less prominent than A: below Recent Writing, so below the fold.
- **C. Restore a homepage intro/about section** mentioning the LLC. This reverses ceef61c ("remove intro section from homepage"), where the owner removed exactly this kind of section a few commits ago.

Criteria: (1) on the homepage, as asked; (2) does not undo the owner's recent deliberate layout and headline edits; (3) sits in a natural context; (4) visible enough to be noticed.

## Success criteria
- `src/app/page.tsx` contains exactly one paragraph mentioning "onerlaw LLC". It sits inside the Projects `<section>`, after its `<h2>` and before the project list. It says the owner owns and runs onerlaw LLC, which ships several projects, framed as side work.
- The copy has no contractions. It names no specific project, URL or claim beyond the owner's request.
- Outside `.minerva/`, the diff touches only `src/app/page.tsx`. `src/components/sidebar.tsx` and the other pages are unchanged.
- `pnpm build` (`next build`) succeeds in the worktree after the change, with dependencies installed via `pnpm install`. If `main` itself fails to build, that failure is the baseline and not a regression; the criterion is then that the change adds no new build or type error.

## Open Questions
- Should "onerlaw LLC" link somewhere (a company site or the `github.com/onerlaw` org)? Deferred: the owner gave no URL, so the line ships as plain text. The final report flags this.

# Scratchpad: site-redesign-hero-cards

> **Ephemeral working memory.** Most of what lands here is noise — small
> decisions that don't matter, dead ends, momentary confusion. At feature
> completion, run `minerva:promote`: significant items get promoted to
> `.minerva/knowledge/`, `proposal.md` gets updated to match reality, and
> the raw scratchpad is archived.

## Decisions 2026-11-20
- [solo] pre-flight: no collision — main in sync with origin (fce79f1); the post worktrees were cleaned up and their PRs merged; stale remote branches for merged PRs are not in flight; no open PRs; peer discovery skipped (no authorization)
- [solo] open-issue match: none — open issues #1–#4 are article ideas
- [reviewed — clean] scope check: one unit, one PR, no phases; Skeptic noted the rationale wording (sidebar is per-page, not in layout) and suggested preview/tsc verification — not load-bearing, criteria already include tsc (tier: reviewer — scrutiny: high blast radius, site-wide auto-deploying change; parallel wave)
- [reviewed — folded] approach: A (shared chrome in root layout + theme tokens); rejected B (per-page chrome, 4x duplication) and C (hard-coded light colours, drops dark mode). Folded C1 (ProjectCard reused by GitHub repo list → repo variant), C2 (no tags on project cards, avoids "Personal" under Onerlaw LLC), C3 (delete unused src/styles/globals.css with teal); declined C4 (keep data-driven "Run by me directly" group, owner said "if it makes sense") (tier: reviewer — scrutiny: existing interface change + knowledge tension; parallel wave)
- [rechecked — clean] approach: fold-audit addressed C1–C3, C5; C4 knowingly declined, not load-bearing
- [reviewed — folded] whole-proposal (first-wave result kept: approach pick unchanged and its fold did not touch Goal/criteria): folded C1 (list new UI microcopy, disclose dropped "other"), C2 (case-sensitive Onerlaw grep), C3 (mobile class criteria + panel closes on click), C4 (honest post-merge verification + revert path), C5 (broaden uppercase grep), C6 (prose link/blockquote styling), C7 (name tsc baseline) (tier: reviewer — solo denied, judgment evidence; parallel wave)
- [rechecked — residual folded] whole-proposal: C3 partially addressed — folded residual (w-full sm:w-auto buttons, photo-first criterion); also folded new low concern on hover affordance with neutral primary
- [reviewed — clean] completion verification: Verifier reproduced C1–C11; noted Geist now actually renders and dates use short months (both within approval) (tier: reviewer floor — Verifier; code review dispatched alongside)
- [solo] review triage: 11 FIX / 0 SUGGEST / 3 IGNORE / 1 MERGE — every FIX has a writable failure scenario and is absorbable; IGNOREs are pre-existing, already documented, or have no test infra; no item had two defensible dispositions (tier: default-solo row)
- [solo] promote partition: 3 PROMOTE (company grouping decision superseding the Onerlaw-line entry; site-design decision; Geist font bug) / 8 MERGE INTO PROPOSAL / 1 DISCARD / 0 TODO — no forward-looking items; entries are add-only (tier: default-solo row)

## Work notes
- Implemented per Approach: SiteHeader (client; mobile panel with aria-expanded/aria-controls, closes on link click) and SiteFooter in root layout; sidebar.tsx, navigation.tsx, src/styles/globals.css deleted; neutral light+dark tokens; PostCard (featured/default), ProjectCard (project/repo variants), ProjectGroups + ProjectsIntro; groupProjects() and formatPostDate() in src/lib/mdx.ts; `company: "Onerlaw LLC"` added to both project MDX files.
- Routine choice (not a divergence): Geist was never actually applied before. next/font generates a hashed family name, so `--font-sans: 'Geist'` fell back to the system font. layout.tsx now sets `variable: --font-geist-sans/-mono` on <html>, and @theme reads those variables.
- Routine choice: formatPostDate renders in UTC with short months ("Nov 20, 2026"); toLocaleDateString on a "YYYY-MM-DD" string is UTC-midnight and would shift a day in US time zones in any client render.
- Routine choice: the hero uses `flex-col md:flex-row-reverse` (photo first in DOM so it leads on mobile, sits right on desktop) rather than `md:flex-row` + order classes.
- Post page: dropped the idea of showing the excerpt under the title, since it would likely duplicate the opening paragraph. Article links are always underlined; blockquote border uses the border token.
- Verification: `pnpm build` passes; `tsc --noEmit` reports 0 errors (baseline 2 removed — the `url || github` hrefs are now guarded); all criteria greps empty; built HTML checked for section order, featured post = newest published, only the "Onerlaw LLC" group, titles "— Derek Honerlaw". Playwright screenshots (390px + 1280px, light + dark) look like the approved B preview; the mobile menu toggles aria-expanded false→true and the panel unmounts after a link click.

## Review triage 2026-11-20
Code review (local-diff mode, fresh-context subagent) + inline minerva audit (spec fidelity OK; knowledge: old Onerlaw placement entry needs superseding at promote).
- F1 [medium] mdx-content hover:prose-a variant order → FIX
- F2 [low] mobile menu stays open on non-panel navigation / no Escape → FIX
- F3 [low] aria-controls points at unmounted id → FIX (keep panel mounted, `hidden`)
- F4/F5 [low] h1→h3 skip on /posts and /projects → FIX (heading-level props)
- F6 [low] whole card is one verbose link → FIX (title link + stretched overlay)
- F7 [low] <time> without dateTime → FIX
- F8 [low] footer year frozen at build → FIX (drop the year)
- F9 [low] `url ?? github` + empty url / empty groups → FIX (`||`, skip empty groups)
- F10 [low] featured-post tie on equal dates is readdir-order dependent → FIX (secondary sort by slug)
- F11 [low] hero row-reverse vs criterion wording → MERGE INTO PROPOSAL at promote
- F12 [low] "All 1 posts" → FIX
- F13 [low, pre-existing] unused getProjectBySlug → IGNORE (no failure scenario, out of scope)
- F14 [low, pre-existing] drafts reachable by URL → IGNORE (already documented in knowledge 2026-11-20-reference-draft-posts-reachable-by-url)
- F15 test coverage → IGNORE (no test infra in repo)
- Review fixes applied (F1–F10, F12): article-link hover variant order; header closes on pathname change + Escape, panel stays mounted with `hidden`; heading-level props on PostCard/ProjectGroups (h2 on /posts and /projects); PostCard title is the link with a stretched ::after overlay (whole card still clickable); <time dateTime>; footer year dropped ("© Derek Honerlaw"); `url || github` and empty groups skipped; same-day posts tie-break by slug; "post"/"posts" pluralization. Re-verified: build passes, tsc 0 errors, criteria greps empty, Playwright: menu Escape/body-link close, card body click navigates, body hover no longer restyles every article link.

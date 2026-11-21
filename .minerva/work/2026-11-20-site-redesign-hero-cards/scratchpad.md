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

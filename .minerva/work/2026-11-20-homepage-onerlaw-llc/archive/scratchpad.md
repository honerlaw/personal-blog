# Scratchpad: homepage-onerlaw-llc

> **Ephemeral working memory.** Most of what lands here is noise — small
> decisions that don't matter, dead ends, momentary confusion. At feature
> completion, run `minerva:promote`: significant items get promoted to
> `.minerva/knowledge/`, `proposal.md` gets updated to match reality, and
> the raw scratchpad is archived.

## Decisions 2026-11-20
- [solo] pre-flight: no collision — sibling worktrees seekless-ad-postmortem-post and sober-journey-sponsor-safety-post are unrelated blog-post drafts; no remote branches besides main; no open PRs; peer discovery skipped (no user authorization to message peers)
- [solo] open-issue match: none — open issues #1–#4 are all article ideas
- [solo] scope check: single unit, one PR (tier: solo predicate — one file src/app/page.tsx, additive paragraph, no interface, knowledge corpus empty, checkable by grep + build; parallel wave)
- [reviewed — clean] approach: B, intro line in homepage Projects section; rejected A (sidebar line: site-wide, under the headline rewritten in 851ddc1) and C (restore intro: reverses ceef61c). Skeptic: ambiguity clause holds but B still wins; noted non-blocking h2 margin detail (adopted: h2 mb-2), visibility cost, "several" next to two cards (tier: reviewer — scrutiny: genuine ambiguity, A vs B on prominence; parallel wave)
- [reviewed — clean] whole-proposal: sound; approach unchanged so no restart. Dismissed as not load-bearing: placing the line above the cards may imply the cards are LLC projects (copy makes no such claim; flagged in final report); criterion 4 clarified to name pnpm and a main-baseline rule (tier: reviewer — solo denied, soundness evidence is judgment not mechanical; parallel wave)
- [reviewed — clean] completion verification: Verifier reproduced C1–C4, including tsc errors pre-existing on main (tier: reviewer floor — Verifier; code review dispatched alongside)
- [solo] review triage: 0 FIX / 1 SUGGEST / 2 IGNORE — IGNORE intro styling vs /posts and /projects intros (mb-6 matches homepage rhythm, leading-relaxed matches card text); IGNORE intro renders over an empty list if nothing is featured (hypothetical, empty heading already did this); SUGGEST pre-existing tsc errors as a standing fact (FIX would breach approved criterion 3 scope) (tier: default-solo row — each item had one dominant disposition)
- [solo] promote partition: 2 PROMOTE (reference: build skips typecheck; decision: LLC line placement + copy grounding) / 1 MERGE (implementation note already matches Approach) / 0 DISCARD / 0 TODO (tier: default-solo row — no entry had two defensible buckets)

## Work notes
- Implemented in src/app/page.tsx: Projects h2 mb-6 → mb-2; new muted <p> with the LLC line (mb-6).
- `pnpm install --frozen-lockfile && pnpm build` passes. next.config.mjs sets `typescript.ignoreBuildErrors: true`, so the build skips types.
- `npx tsc --noEmit` shows 2 errors that already exist on main, on untouched lines: `href={project.frontmatter.url || project.frontmatter.github}` is string|undefined passed to ProjectCard's `href: string`, in src/app/page.tsx and src/app/projects/page.tsx. Not introduced here. Standing fact: types are not enforced by the build.
- Minerva audit (inline): spec fidelity — the diff implements the Approach verbatim and touches only src/app/page.tsx; knowledge compliance — corpus empty, nothing to violate.

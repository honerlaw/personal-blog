# Scratchpad: onerlaw-company-link

## Decisions 2026-11-20
- [solo] pre-flight: no in-flight collision (all units in_flight=False; remote branches all belong to merged PRs; no open PRs) and no open-issue match (open issues #1–#4 are article ideas) (tier: hardcoded check, clean)
- [solo] scope check: one unit, one PR (tier: solo predicate — one component file, additive, verifiable by built-HTML grep, no new public interface, no knowledge conflict; parallel wave)
- [reviewed — clean] approach: A1 link the company group heading via a COMPANY_URLS map; rejected A2 (intro only, less visible), A3 (both, redundant), D2 (per-project frontmatter, duplicated). Skeptic accepted: ambiguity clause held but A1 dominates; non-blocking notes adopted as polish (aria-hidden ↗, persistent faint underline for touch, comment on key coupling, supersede the old entry's "do not link" line at promote) (tier: reviewer — scrutiny: genuine ambiguity; parallel wave)
- [solo] whole-proposal: Approach achieves Goal; criteria are built-HTML greps plus build/tsc; nothing ambiguous (tier: solo predicate — additive, mechanically verifiable, single surface, no new public interface, satisfies rather than conflicts with the knowledge entry's URL condition; parallel wave)

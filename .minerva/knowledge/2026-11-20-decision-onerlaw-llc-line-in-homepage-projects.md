# The onerlaw LLC mention lives in the homepage Projects intro, not the sidebar

**Date**: 2026-11-20
**Type**: decision
**Theme**: homepage
**Summary**: LLC side-business line sits atop homepage Projects; sidebar and removed intro left untouched.
**Context**: .minerva/work/2026-11-20-homepage-onerlaw-llc (see git history if the worktree has been cleaned up)

## Context
The owner asked to say somewhere on the homepage that they own and run onerlaw LLC, which ships several projects as a side business. Three placements were weighed: a line in the sidebar under the headline, an intro line in the homepage Projects section, or a restored homepage intro/about section.

## Finding
The line is a muted paragraph between the homepage Projects `<h2>` and the project cards in `src/app/page.tsx`: "On the side, I own and run onerlaw LLC, which ships several projects today." The sidebar was rejected because `Sidebar` renders on every page, not only the homepage, and sits under the professional headline the owner rewrote in 851ddc1. A restored intro was rejected because the owner removed that section in ceef61c. "onerlaw" (lowercase, no h) is deliberate: it matches the `github.com/onerlaw` org that hosts Seekless.

## Implications
- The copy names no specific projects. SoberJourney's repo lives under the personal `honerlaw` account, not `onerlaw`, so saying which projects belong to the LLC would be a guess. Ask the owner before adding attribution.
- The line is plain text. No company URL was given, so do not link it until the owner provides one.
- The line is below Recent Writing, so it is below the fold. If the owner wants it more visible, moving it is a new decision.

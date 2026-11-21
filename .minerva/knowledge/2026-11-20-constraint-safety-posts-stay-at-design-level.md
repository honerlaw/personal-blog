# Posts about the SoberJourney Sponsor's guardrails stay at design level

**Date**: 2026-11-20
**Type**: constraint
**Theme**: blog-posts
**Summary**: Guardrail posts omit verbatim prompts, fallback text, guard marker lists and exact rate limits.
**Context**: .minerva/work/2026-11-20-sober-journey-sponsor-safety-post (see git history if the worktree has been cleaned up)

## Context
The post on how SoberJourney's AI Sponsor decides when to offer crisis resources describes live safety guardrails. Detailed enough copy would read as a guide to getting around them.

## Finding
The post describes the defenses at design level only: no verbatim system prompt or fallback strings, no list of the reply guard's crisis markers, and no exact rate-limit numbers. Crisis numbers are quoted exactly as the source gives them (988, 911, SAMHSA 1-800-662-4357, with their source meanings), and no absolute safety claim is made — a string test proves wording, not model behaviour.

## Implications
- Later posts on the Sponsor, or on other guardrails, follow the same bar; the work unit's criteria 3 and 6 give greppable checks.
- The SoberJourney repository is public and states some of these details; that is not a reason to repeat them in a post.

## Related
- [[2026-11-20-reference-draft-posts-reachable-by-url]] — a merged draft of such a post is publicly reachable before it is published

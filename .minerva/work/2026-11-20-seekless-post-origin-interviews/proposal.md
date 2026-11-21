# Proposal: seekless-post-origin-interviews

**Date**: 2026-11-20
**Status**: Shipped (2026-11-20)

## Goal
Rephrase the origin paragraph in the published post `content/posts/seekless-ad-postmortem.mdx` so Seekless is described as coming from interviews with friends and coworkers — the problems they had and what they were doing about them — instead of from the author's own job search.

## Why
The owner asked for it directly (2026-11-20): "for the seekless one, rephrase it as I interviewed friends and coworkers and these were the problems they had and what they were doing". The paragraph was added an hour earlier from the owner's Q&A answer, which listed four needs in order: could not find specific jobs (so a crawler that queries company websites directly), used Claude or ChatGPT to tailor each résumé (so tailoring in the same system), wanted to track applications, and wanted to practise interviews in a more real-world setting — "my experience of what I wanted as I went through the cycle of trying to find jobs or help other people find jobs".

## Approach
Replace the one paragraph (line 11 of the post, beginning "I built it out of my own job search.") with:

> I started by interviewing friends and coworkers about their job searches. They were looking for specific jobs and could not find them, so I built a crawler that queries company websites directly. They were using Claude or ChatGPT to tailor each résumé, so I built tailoring into the same system. They wanted a way to track their applications, and when they reached the interview stage, they wanted to practice in a setting closer to the real thing. Those features came from the problems they described and what they were doing about them.

The four needs, their order and the two built responses are the owner's own; only the subject changes from "I" to the people interviewed, per the owner's instruction. No new facts (no counts of interviewees, no timing claims such as "before building", no tools beyond Claude and ChatGPT). "When they reached the interview stage" carries the owner's "while interviewing". Checked: the excerpt, the rest of the post and `content/projects/seekless.mdx` make no other origin claim. Nothing else in the post changes; it stays `published: true` and its date stays 2026-11-20.

### Candidate approaches considered
- **A. Replace the paragraph with the interview framing (chosen).** Matches the instruction "rephrase it as".
- **B. Keep the personal-search framing and add a sentence about interviews.** Contradicts "rephrase", and keeps a claim the owner is replacing.

## Success criteria
1. `git diff main...HEAD -- content/` touches only `content/posts/seekless-ad-postmortem.mdx`, and within it only the origin paragraph.
2. The new paragraph attributes the four needs to friends and coworkers the owner interviewed, and states nothing the owner's instruction and Q&A answer do not contain (no interviewee counts, no timing, no extra tools or workarounds), and it contains no "each piece", "every" or "once" (the owner's "tailor each résumé" is the only "each").
3. No contractions: `grep -niE "n['’]t\b|\b[a-z]+['’](re|ve|ll|m|d)\b|\b(it|that|there|what|here|let|he|she|who|where|how)['’]s\b"` on the post returns nothing.
4. The post still has `published: true`, and the old sentence "I built it out of my own job search." is gone.

## Open Questions
- None. Note for the owner: the post now credits all four needs, including the Claude/ChatGPT workaround, to the people interviewed.

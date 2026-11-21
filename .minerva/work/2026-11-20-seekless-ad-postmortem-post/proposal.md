# Proposal: seekless-ad-postmortem-post

**Date**: 2026-11-20
**Status**: Shipped (2026-11-20)

## Goal
Add one new draft post to the personal blog (`content/posts/seekless-ad-postmortem.mdx`, `published: false`) that tells the story of Seekless's October 2026 paid-acquisition experiment: $614.75 of short-video brand ads across YouTube Shorts, TikTok, Instagram and Reddit that produced 0 sign-ups, set against Google Search ads on the free résumé checker that bought finished checks for a few dollars each (about $3.32 in the first four days, about $5.06 the next week, and about $7.57 across the first Search campaign as a whole), each figure stated with its window. The post also covers how the campaign was run: an AI agent built every campaign paused, dry-ran each change and read it back through the platforms' APIs, and proposed stops either from rules agreed in advance (video D) or from the latest figures (the feeds, YouTube); the owner made every call.

## Why
The owner picked this from a list of article ideas (idea #1, the "spotlight" pick). Founders rarely publish real failed-campaign numbers; the Seekless repo holds a complete dated record (plan, decisions with the owner's reasons, check-in logs with figures and sources, a close-out with lessons), so the post can be fully grounded rather than invented. It also fits the blog's existing AI/engineering themes.

## Approach
Source of truth: the Seekless repo's `marketing/campaigns/2026-10-brand-video/{plan,decisions,log}.md` and `2026-10-search/{plan,log,decisions}.md`. Every figure in the post must trace to one of these files.

Structure as built (approach B; two replans corrected it against the records):
1. Intro and hook: four weeks and $1,500 planned; ads stopped after about two weeks with $614.75 spent; 221,642 impressions, 1,322 clicks, 3 engaged visits, and no sign-ups from sessions that started on an ad.
2. The bet: earlier click campaigns (Reddit $636.92, ChatGPT $427.52) bought no visible sign-ups and a visitor spike that fell back (40–60 to about 230 a week); feeds are low intent, so buy reach and views (YouTube on a low target cost per click, since the API could not buy views); the plan's baseline of 3 to 4 unpaid sign-ups a week and target of 8; budget split; videos A and B, with the owner coming to like B best.
3. What happened: B beat A downstream; week 1 $416.82 → 2 engaged visits; first Search campaign (job sites or a résumé tool) from 10-22; ChatGPT restarted 10-22 at $25/day outside the budget; feeds and ChatGPT stopped 10-26; YouTube C and D; video D paused under the $40 rule; YouTube stopped 11-02, applying its close-out rule two weeks early; final totals.
4. The measure I could not read: unpaid sign-ups flat (2 a week; 3 and 6 before launch), scraper flood of unpaid sessions; the later 44/198 sign-up surge came after every feed ad stopped and is not credited to the video campaign.
5. What Search showed: 43% finished checks (11-13 to 11-17), only 2 accounts; $7.57 per check over 10-26 to 11-12; prank practice calls (34 started, 22 pranked).
6. Why the video campaign failed: the close-out's three lessons (about one view per person; ad and home page said different things; result unreadable).
7. How it was run: the agent ran almost all of it through the APIs (the owner approved switches a safety check blocked and switched Instagram on); built campaigns paused, dry-ran Google Ads changes, read state back after its changes, kept the decision record and check-in log; decision rules in the plan, the two applied ones agreed 10-26; stops proposed from those rules or from the figures, with the owner making every call; platform friction.
8. What I would do next time: the close-out's lessons, and where the budget goes now (Search on the checker and interview practice).

Writing rules: no contractions (memory feedback); no direct chat quotes from the owner (raw quotes carry typos) — paraphrase recorded positions faithfully; no opinions the records do not support; no platform account/campaign/request IDs; no markdown tables or raw HTML (the renderer is plain `react-markdown` with no GFM plugin); voice matches existing posts (first person, plain, short paragraphs, `##` sections). Frontmatter: title, `date: "2026-11-20"`, excerpt, tags (e.g. "Seekless", "Marketing", "AI", "Startups"), `published: false` — matching the repo's add-then-publish commit pattern (e.g. good-engineers-ai added, then published in 735a69b) so the owner reviews voice before it goes live. Note: `published: false` only hides the post from the listing and static params (`src/lib/mdx.ts` getAllPosts); `getPostBySlug` does not filter, so once deployed the draft renders at `/posts/seekless-ad-postmortem` for anyone with the URL. This is the repo's existing behaviour for every draft and is accepted; the PR body must say so plainly so the owner can hold the merge if that matters.

### Candidate approaches considered
- **A. Pure numbers postmortem** — campaign results and lessons only. Simplest, but drops the most distinctive part of the record (agent-run campaign) and the blog's AI theme.
- **B. Postmortem-led, with one section on the agent-run process** (recommended) — keeps the failure story primary and adds the differentiator in one bounded section.
- **C. "Every paid channel I tried"** — Reddit July/Oct, ChatGPT Sep–Oct, brand video, Search, practice. Broader, but the July/ChatGPT data is thinner (plan.md says "0 sign-ups is weak evidence" there) and the post would sprawl.

## Success criteria
1. `content/posts/seekless-ad-postmortem.mdx` exists with frontmatter keys title, date ("2026-11-20"), excerpt, tags, and `published: false`.
2. Every factual claim in the post body — figures, events, decisions, who did what, what a platform or tool can do — traces to a source line, and every dollar amount, count and percentage is listed in the work unit's `scratchpad.md` (committed under `.minerva/work/<unit>/`) with the source file and line it comes from; the only computed figures allowed are simple divisions or sums of listed figures, shown with their inputs. A Verifier can check each listed line with grep. The author's own first-person narration (headings, transitions, framing) is allowed only where it asserts no fact, experience, ranking or verdict the records do not contain. (Tightened in replan 2: the earlier text covered figures only.)
3. No contractions: `grep -niE "n['’]t\b|\b[a-z]+['’](re|ve|ll|m|d)\b|\b(it|that|there|what|here|let|he|she|who|where|how)['’]s\b"` on the post returns nothing, and a human read of the body finds none (possessives are fine).
4. No markdown tables and no raw HTML: `grep -nE '^\s*\|' ` and `grep -nE '<[a-zA-Z/!]'` on the post both return nothing.
5. No platform account, campaign, ad, criterion or request IDs: `grep -nE '[0-9]{6,}|cmpn_|adgrp_|t3_|[A-Za-z0-9_-]{20,}'` on the post body (below the frontmatter) returns nothing.
6. No other file under `content/` or `src/` changes.

## Open Questions
- Title wording and whether the owner wants to name the ad platforms' per-platform spend — default: name them (the records are the owner's own data). The post stays out of the listing until the owner flips the flag, but it is reachable by URL once deployed (see Approach), so the PR body flags this before merge.

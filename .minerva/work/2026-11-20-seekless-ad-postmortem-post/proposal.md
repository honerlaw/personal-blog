# Proposal: seekless-ad-postmortem-post

**Date**: 2026-11-20
**Status**: Draft

## Goal
Add one new draft post to the personal blog (`content/posts/seekless-ad-postmortem.mdx`, `published: false`) that tells the story of Seekless's October 2026 paid-acquisition experiment: $614.75 of short-video brand ads across YouTube Shorts, TikTok, Instagram and Reddit that produced 0 sign-ups, set against Google Search ads on the free résumé checker that bought finished checks for a few dollars each (about $3.32 in the first four days, about $5.06 the next week, and about $7.57 across the first Search campaign as a whole), each figure stated with its window. The post also covers how the campaign was run: an AI agent built every campaign paused, dry-ran each change and read it back through the platforms' APIs, and proposed stops either from rules agreed in advance (video D) or from the latest figures (the feeds, YouTube); the owner made every call.

## Why
The owner picked this from a list of article ideas (idea #1, the "spotlight" pick). Founders rarely publish real failed-campaign numbers; the Seekless repo holds a complete dated record (plan, decisions with the owner's reasons, check-in logs with figures and sources, a close-out with lessons), so the post can be fully grounded rather than invented. It also fits the blog's existing AI/engineering themes.

## Approach
Source of truth: the Seekless repo's `marketing/campaigns/2026-10-brand-video/{plan,decisions,log}.md` and `2026-10-search/{plan,log,decisions}.md`. Every figure in the post must trace to one of these files.

Structure (approach B, see candidates below): postmortem-led narrative with one section on the agent-run process.
1. Hook: the headline result ($614.75, 221,642 impressions, 1,322 clicks, 3 engaged visits, 0 sign-ups).
2. The bet and why: feeds are low intent, so optimize for awareness, not clicks; earlier click campaigns (Reddit $636.92, ChatGPT $427.52) bought no visible sign-ups; $1,500 over 4 weeks with a week-2 read.
3. What ran: two ~22 s videos, hook A ("pile") vs hook B ("Still sending the same résumé to every job?"); four feed platforms at $60/day.
4. What happened, week by week: B beat A on every downstream measure; TikTok cheapest completed views (~$0.04), YouTube cheapest clicks (~$0.26); week 1 $416.82 → 2 engaged visits, 0 sign-ups; feeds stopped 10-26; YouTube B/C/D kept; video D tripped the pre-agreed $40-no-outcome rule and was paused; the owner then chose to stop YouTube on 11-02 when the agent showed it at about $200 per engaged visit (YouTube only, $199.75 over 10-26 to 11-02) against about $5.06 per finished résumé check on Search over 10-27 to 11-02. State each figure's unit and window; make clear the feeds' "0 sign-ups" is counted per ad session (UTM) and that the planned unpaid-sign-up read was unusable (scraper flood).
5. The contrast: Search on the résumé checker (27 finished checks for $89.56 over 10-22 to 10-26, about $3.32 each; about 43% of checker ad sessions finish a check, per the 11-17 check-in) — intent converts, scrolling does not. Honest caveat: checks are not sign-ups either (only 2 checker users made accounts by 11-17), and the interview-practice search ads drew prank sign-ups (22 pranks in 34 practice calls on 11-11 and 11-12). Say explicitly that the later sign-up surge (44 and 198 in the weeks of 11-02 and 11-09, most carrying an ad click id; the close-out credits the Search practice ads, the organic posts and practice-2611, and notes many prank sign-ups) came after every feed ad had stopped and is not credited to the video campaign.
6. Why it failed (the close-out's own lessons): ~1 view per person, not the 3+ awareness needs, so awareness was never actually tested; the home page changed mid-run to a message the ads did not carry; the unpaid-signup metric got swamped by a scraper.
7. How it was run: an agent built every campaign paused, dry-ran every mutation (`validateOnly`), read state back after every change, kept a dated decision log with the owner's reasons, and proposed stops, some from rules agreed in advance (video D's $40-no-outcome rule) and some from the latest figures (the 10-26 feed stop, chosen by the owner from options the agent laid out; the 11-02 YouTube stop, which applied the close-out rule two weeks early); the owner made every call. What that bought (fast, cheap stops; an honest record) and what it did not (it cannot fix the wrong bet).
8. What I would do next time: one platform at 3+ frequency, a landing page that says what the ad says, measure from attribution in the product database, read Search before crediting feeds.

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

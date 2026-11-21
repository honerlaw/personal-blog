# Replan: 2026-11-20-seekless-ad-postmortem-post

## Replan 2026-11-20 — completion Verifier and code review found factual and sourcing errors

### Original plan
Ship `content/posts/seekless-ad-postmortem.mdx` meeting criteria 1–6, every figure traced to the campaign records (criterion 2), no invented opinions or experiences.

### What changed
The completion Verifier returned `revise` (criterion 2 not met) and the provisional code review agreed, adding more items:
- Two factual errors: "four weeks" of ads (excerpt, intro) — the feeds ran one week and YouTube two; "the rules for stopping things were written down before launch" — the $40 and close-out rules were agreed 2026-10-26 (BV/decisions.md:212-229, BV/next-steps.md:8-16).
- Overstatements: "dry-ran each change" (only Google Ads changes have validateOnly); "the whole campaign was run by an AI agent" (the owner switched Instagram on by hand, BV/decisions.md:97-100); "feed ads were set up to buy reach and views, not clicks" (YouTube ran Demand Gen on a target cost per click, BV/decisions.md:44-61); "I liked B best from the start" (owner first preferred A's body, BV/decisions.md:13-19); a later practice campaign listed as lining up with the weeks of 11-02 and 11-09 (it started 11-15); "one automated browser" (one headful scraper with several old browser user agents, BV/log.md:100-102); "a scraper flooded exactly that count" (it flooded unpaid visitor/session counts); "only 2 of the people who finished a check made an account" (2 accounts came from those ads); the 43% figure lacked its window (resume-check campaign, 11-13 to 11-17); "40 to 60 to about 230" reads as a progression; ChatGPT stopped on 10-26 without its 10-22 restart being mentioned; the money now also funds a practice campaign.
- Unsourced experiences or verdicts: "most of what I read about startup marketing…", "a few minutes instead of a weekend of second-guessing", "I stopped spending money … early", "the YouTube campaign type I first wanted", "the part I would keep", "it ran a weak plan carefully…", "the boring explanation is usually the right one", "much harder for a scraper to distort", "less exciting than a brand video".

### New plan
Success criteria unchanged. Rewrite the affected lines to what the records say:
1. Excerpt and intro: four weeks and $1,500 were the plan; the ads were stopped after about two weeks with $614.75 spent.
2. Rules: decision rules were in the plan from the start; the two that were applied (video D's $40 no-outcome rule, YouTube's close-out rule) were agreed on 10-26. When a rule fired or the figures moved, the agent showed the numbers and asked before pausing anything (BV/next-steps.md:8-10). The owner made every call (owner-chosen framing, unchanged).
3. Agent process: an AI agent ran almost all of the campaign through the APIs; Instagram had to be switched on by hand. It built campaigns paused, dry-ran Google Ads changes, and read state back after every change on every platform.
4. Bidding: TikTok, Instagram and Reddit bought reach and views; YouTube could only bid on clicks through the API, so it ran on a low target cost per click, which buys cheap exposure (BV/decisions.md:56-61). Video reach campaigns cannot be created through the Google Ads API (no "type I first wanted").
5. B: "I came to like B best."
6. ChatGPT: mention its restart on 10-22 at $25 a day outside the budget, and its $96.51, 40 clicks, 0 engaged visits when stopped (BV/log.md:237).
7. Sign-up surge: drop the practice campaign from the "lines up with" list. Scraper: "one scraper presenting old Chrome, Firefox and Edge versions"; it flooded the unpaid visitor and session counts the measure was read against.
8. Search: 43% with its window (the résumé checker's own campaign, 11-13 to 11-17); "only 2 accounts came from those ads"; current spend goes to the résumé checker and interview practice.
9. "Between 40 and 60 a week to about 230".
10. Remove the unsourced experiences/verdicts listed above, or replace them with the sourced close-out lessons (BV/log.md:47-66).
11. Then rerun criteria 3–5 greps, update the figure list (add $96.51, 40, 11-13 to 11-17 window, the 2026-02-27 first commit for "this year"), and re-run completion verification and code review.

Standing fact (not a change): `published: false` hides a post from the listing only; the page renders at its URL once deployed and the source is visible in the public repo. This matches the owner's existing draft practice (good-engineers-ai was committed as `published: false` in 5ea9ba4 and published a minute later in 735a69b); the PR body states it.

Accepted with the reviewer's non-blocking notes applied: the read-back claim narrowed to "read the state back after the changes it made" (BV/log.md:52, :171, :182, :250); the unsourced verdicts deleted, not rewritten; the published:false standing fact is put to the owner in the final report rather than presented as matching precedent (5ea9ba4 and 735a69b were 81 seconds apart).

## Replan 2026-11-20 (2) — clarify criterion 2 and close the last gaps

### Original plan
The first replan: correct the factual errors and remove unsourced verdicts; criteria unchanged.

### What changed
The re-run Verifier confirmed every figure and the replan's items resolved, but returned `revise` on criterion 2 for a handful of remaining verdicts ("what the agent could not do was fix the plan itself", "ad groups that did not work", the "Intent beats attention" heading, a narrowed description of the first Search campaign). The code review added: the excerpt implies Search brought sign-ups; two baselines (3–4 vs 3 and 6) read as a contradiction; YouTube's stop is listed under "from the latest figures" right after the close-out rule; the two "one place…" phrasings are not distinguished; "on its own" (Meta) is unsourced; "34 practice calls" is really 34 people who started a call; and the work records commit absolute local paths (the owner's username) to a public repo. Each Verifier pass has removed a further layer of framing, because criterion 2 never said where the author's own narration stops and an unsupported claim starts. That is a criteria ambiguity, not new information about the campaign.

### New plan
1. Clarify criterion 2 in proposal.md: "Every factual claim — figures, events, decisions, who did what, what a platform or tool can do — traces to a cited source line, with computed figures shown with their inputs. The author's own first-person narration (headings, transitions, framing) is allowed only where it asserts no fact, experience, ranking or verdict the records do not contain."
2. Post fixes: excerpt says Search got people to use the free tool, not sign-ups; delete "What the agent could not do was fix the plan itself"; "counting all of the first Search campaign's spend from October 26 to November 12" (drop "that did not work"); heading "What Search showed" and drop "shows what the feeds were missing" and "people who search for a résumé checker want a résumé checker"; first Search campaign described as aimed at people looking for job sites or a résumé tool (SR/plan.md); baselines: the plan's 3 to 4 a week, and the close-out's count of 3 and 6 for the two weeks before launch; agent proposed stops from the agreed rules (video D, and YouTube's close-out rule applied early) or from the figures (the feeds); video B's line "one place for the whole search" vs the campaign message "one place for the whole job search" made explicit; drop "on its own"; "34 people started a practice call on November 11 and 12, and 22 of them pranked the AI interviewer" (SR/log.md:123-125); state that the video "0 sign-ups" counts people who arrived through an ad (session UTM).
3. Replace absolute local paths in this unit's work records with repo-relative ones ("the Seekless repo, marketing/campaigns/…").
4. Rerun greps, update the figure list, re-run Verifier and code review.

Accepted. Reviewer notes adopted: the clarified criterion 2 is recorded as a tightening; "new accounts", "morning of November 12" and "sessions that started on an ad" wording used. Not adopted: removing "I came to like B best" (the owner's recorded preference, BV/decisions.md:13-19) and "I made every call" (the owner-chosen framing).

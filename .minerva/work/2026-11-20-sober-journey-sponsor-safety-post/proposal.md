# Proposal: sober-journey-sponsor-safety-post

**Date**: 2026-11-20
**Status**: Shipped (2026-11-20)

## Goal
Add one new draft post, `content/posts/ai-sponsor-crisis-guardrails.mdx` (`published: false`), titled "Building an AI sponsor that knows when not to reach for a hotline". It explains how SoberJourney's AI Sponsor chat decides when to offer crisis resources: never for ordinary cravings or relapse talk, always on stated or implied acute danger. It also covers how the later abuse hardening (scope rules, a code-fence guard, a rate limit) was built around that crisis behaviour.

## Why
The owner picked this from a list of article ideas (idea #2). The SoberJourney repo records the decisions with the owner's reasons, the rejected alternatives and the code that implements them, so the post can be fully grounded. Few people write about AI safety in a sensitive consumer product at this level of concrete detail, and the topic fits the blog's AI and engineering themes.

## Approach
Sources of truth, in SoberJourney's `.minerva/knowledge/`:
- `2026-10-06-decision-sponsor-chat-crisis-guidance`
- `2026-10-10-decision-sponsor-chat-scope-guard-and-rate-limit`
- `2026-10-06-decision-sponsor-chat-persist-before-generate`
- `2026-10-10-decision-llm-calls-go-through-openrouter`
- `2026-11-03-reference-security-limits-and-residual-risks`

Also `.minerva/work/2026-10-06-sponsor-chat-backend/replan.md`, `.minerva/work/2026-10-10-sponsor-chat-abuse-hardening/proposal.md`, and `packages/server/src/network/rpc/route/conversation/sponsorChat/utils/{fallback,replyGuard}.mts`. Every technical claim must trace to one of these.

Structure as built (approach B, the decision-led narrative; three replans tightened it to the sources):
1. Intro: the app, and the one product question — when the Sponsor should point someone at a crisis line.
2. Two ways to get it wrong: the original prompt offered hotlines only on an explicit crisis statement, so implied danger got nothing; the opposite mistake answers cravings and relapse talk with a hotline. The rule: offer resources, but do not make them easy to trigger.
3. Where the line is: ordinary recovery (check-in urge and mood included) vs stated or clearly implied danger; danger takes precedence; the US mapping (988; 911), the local emergency number elsewhere, and SAMHSA 1-800-662-4357 nested under "when it does point to resources" as a treatment line, not an emergency line.
4. When the model refuses: fixed supportive fallback with a conditional crisis line for harmful-content blocks, neutral reply for other blocks, unrecognized reason codes treated as safety blocks.
5. Saving the message first: the user's message is stored before generation and kept on failure.
6. Keeping it a sponsor: the hello-world Python incident; generous recovery-adjacent scope; crisis guidance before scope rules; role, confidentiality and data-not-instructions rules at design level.
7. The classifier that was not built: three recorded reasons; two deterministic backstops — the fenced-code guard that keeps text mentioning a crisis line, and a best-effort per-user rate limit, with the provider key's spend limit as the cost ceiling.
8. Pinning the crisis section: a sha256 test pins its text; string tests do not prove behaviour, so live-model cases are listed, and a model change is a reason to run them again.
9. Where it ends up: the three sourced protections built around the crisis threshold. No absolute safety claims; the rate limit is not claimed to protect crisis replies.

Sections 4 to 8 stay short and subordinate to the threshold decision so the post stays one readable story.

Safety and writing rules:
- Crisis numbers match the source exactly.
- No verbatim system prompt and no verbatim fallback text (the fallback text also contains contractions).
- No exhaustive list of the guard's crisis markers and no exact rate-limit numbers.
- No contractions anywhere. Possessives are fine.
- No raw chat quotes.
- No markdown tables or raw HTML, because the renderer is plain `react-markdown` without GFM.
- First-person voice matching existing posts.
- Frontmatter: title, `date: "2026-11-20"`, excerpt, tags `["AI", "LLM", "SoberJourney", "Safety"]`, `published: false`.

### Candidate approaches considered
- **A. Technical deep dive on the guardrail stack.** Prompt, guard, rate limit and fallbacks, in code order. Precise, but it buries the product judgment (the crisis threshold) that makes the story worth reading, and it pushes toward publishing implementation details that help evaders.
- **B. Decision-led narrative (recommended).** Lead with the crisis-threshold decision, then show how every later safety layer was built to protect it. Keeps the human judgment primary and holds technical detail at a design level.
- **C. Broader "lessons from building a recovery app".** Encryption, released-app compatibility, Sponsor safety. Covers more of the repo, but dilutes idea #2 into a survey and duplicates idea #5's smaller posts.

## Success criteria
1. `content/posts/ai-sponsor-crisis-guardrails.mdx` exists with frontmatter keys title, date ("2026-11-20"), excerpt, tags, and `published: false`.
2. Every technical or factual claim in the post — behaviour, events, decisions, numbers — traces to a cited source: the work unit's committed `scratchpad.md` lists each claim with its source file (and line where one exists), so a Verifier can check each by grep. The author's own first-person narration (headings, transitions, framing; the owner named in the sources is the author) is allowed only where it asserts no fact, experience, ranking, inference or verdict the sources do not contain. No absolute safety claims. (Tightened in replan 3: the earlier text did not bound narration.)
3. The crisis numbers in the post are exactly 988, 911 and 1-800-662-4357, each used with the meaning the source gives it: `grep -oE '[0-9][0-9-]{2,}'` on the post body lists no number other than these three (in particular not 112 or 999).
4. No contractions: `grep -niE "n['’]t\b|\b[a-z]+['’](re|ve|ll|m|d)\b|\b(it|that|there|what|here|let|he|she|who|where|how|i)['’]s\b"` on the post returns nothing, and a human read of the body finds none (possessives are fine).
5. No markdown tables and no raw HTML: `grep -nE '^\s*\|'` and `grep -nE '<[a-zA-Z/!]'` on the post both return nothing.
6. The post contains no verbatim copy of the system prompt or fallback strings, no exact rate-limit numbers (`grep -niE '\b(20|300)\b|[0-9]+ ?(per|/) ?(min|minute|h|hour)\b'` on the post body returns nothing), and no full list of the guard's crisis markers.
7. No other file under `content/` or `src/` changes.

## Open Questions
- The SoberJourney source has no "not a substitute for professional help" statement, so the post does not claim the app shows one. Whether to add such a line is the owner's call before publishing.

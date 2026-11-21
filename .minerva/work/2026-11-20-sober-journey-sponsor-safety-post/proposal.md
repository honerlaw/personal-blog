# Proposal: sober-journey-sponsor-safety-post

**Date**: 2026-11-20
**Status**: Draft

## Goal
Add one new draft post, `content/posts/ai-sponsor-crisis-guardrails.mdx` (`published: false`), titled "Building an AI sponsor that knows when not to call a hotline". It explains how SoberJourney's AI Sponsor chat decides when to offer crisis resources: never for ordinary cravings or relapse talk, always on stated or implied acute danger. It also covers how the later abuse hardening (scope rules, a code-fence guard, a rate limit) was built so it could never suppress that crisis behaviour.

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

Structure (approach B, the decision-led narrative):
1. Hook: the hardest question was not which model to use. It was when the sponsor should point someone at a crisis line.
2. Two ways to get it wrong:
   - The original prompt offered resources only on an explicit crisis statement, so implied danger got nothing.
   - A trigger-happy fix would answer normal recovery talk (cravings, relapse) with a phone number. This is the owner's recorded position, paraphrased.
3. Where the line is:
   - Acute-danger signs versus ordinary recovery.
   - Danger takes precedence when both appear.
   - Overdose risk after time sober.
   - The US mapping: 988, 911, and SAMHSA 1-800-662-4357 as a treatment line, not an emergency line. Outside the US, the local emergency number.
   - Warm, brief, keep supporting.
4. When the model refuses:
   - Harmful-content safety blocks get a fixed supportive fallback with a conditional crisis line. Other blocks get a neutral reply.
   - An unrecognized or missing provider block code is mapped to the safety category, so it errs toward the crisis-line reply (source: the OpenRouter decision entry, not `fallback.mts`, whose own mapping sends unknown strings to the neutral reply).
   - The user's message is stored before generation, so nothing typed is lost.
5. Keeping it a sponsor: the "python script" incident. Recovery-adjacent asks stay in scope, unrelated tasks get a warm decline, struggle takes precedence, and the instruction hierarchy, confidentiality and journey-names-as-data rules are described at a design level.
6. The classifier I did not build: the pre-generation LLM classifier was rejected because a false "off-topic" on a crisis disclosure would suppress crisis resources. Deterministic backstops replace it:
   - A code-fence guard that replaces a reply containing fenced code with a warm decline, but keeps the prose when it points to crisis resources; warm because a misfire could hit a supportive reply. No claim that it is absolute, and no mention of what it does not cover.
   - A per-user rate limit that is best-effort (in-process, so it is not a hard guarantee). No exact numbers and no characterisation the sources do not make.
   - The OpenRouter key's spend limit as the hard cost ceiling (use the OpenRouter entry's wording, not the stale "Gemini quota" wording in the scope-guard entry).
7. Pinning what matters, and its limit:
   - A test pins the crisis section's sha256, so hardening cannot change it by accident.
   - String tests prove the wording is present, not the behaviour, so live checks with example cases are needed and must be rerun when the model changes.
   - Fallback models get the same prompt.
8. Close: what the work comes down to.

Keep sections 4 to 7 short and subordinate to the threshold decision so the post stays one readable story.

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
2. Every technical claim in the post traces to a cited source file: the work unit's committed `scratchpad.md` lists each claim with its source file (and line where one exists), so a Verifier can check each by grep.
3. The crisis numbers in the post are exactly 988, 911 and 1-800-662-4357, each used with the meaning the source gives it: `grep -oE '[0-9][0-9-]{2,}'` on the post body lists no number other than these three (in particular not 112 or 999).
4. No contractions: `grep -niE "n['’]t\b|\b[a-z]+['’](re|ve|ll|m|d)\b|\b(it|that|there|what|here|let|he|she|who|where|how|i)['’]s\b"` on the post returns nothing, and a human read of the body finds none (possessives are fine).
5. No markdown tables and no raw HTML: `grep -nE '^\s*\|'` and `grep -nE '<[a-zA-Z/!]'` on the post both return nothing.
6. The post contains no verbatim copy of the system prompt or fallback strings, no exact rate-limit numbers (`grep -niE '\b(20|300)\b|[0-9]+ ?(per|/) ?(min|minute|h|hour)\b'` on the post body returns nothing), and no full list of the guard's crisis markers.
7. No other file under `content/` or `src/` changes.

## Open Questions
- The SoberJourney source has no "not a substitute for professional help" statement, so the post does not claim the app shows one. Whether to add such a line is the owner's call before publishing.

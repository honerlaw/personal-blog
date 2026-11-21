# Replan: 2026-11-20-sober-journey-sponsor-safety-post

## Replan 2026-11-20 — completion Verifier found claim-tracing gaps

### Original plan
Ship `content/posts/ai-sponsor-crisis-guardrails.mdx` meeting success criteria 1–7, with every technical claim traced to a cited source in the committed scratchpad (criterion 2).

### What changed
The completion Verifier returned `revise`: criteria 1, 3, 4, 5, 6, 7 met; criterion 2 "unsure" because of five gaps in the draft:
1. The app link is `https://www.soberjourney.app/`; the cited source (SoberJourney README.md:5) gives `https://soberjourney.app`.
2. "The messages most likely to trip [provider filters] are the ones about self-harm or overdose … the model might return nothing" overstates the only source (fallback.mts comment: a safety block "often follows a message about self-harm or danger").
3. "A brake on floods" is a characterisation of the rate limit that no source makes (the Approach forbids unsourced characterisations).
4. "The hardening change touched the system prompt in several places" is unsourced (the scope-guard entry says a "Scope and boundaries" section was added before "Crisis resources").
5. "If the text around the code carries crisis resources" is looser than the source (the guard keeps prose only when it carries a crisis marker such as an emergency number or the words "crisis line", "lifeline", "hotline").
Two narrative lines ("took more work than I expected", "the obvious next step was a separate model call") were judged harmless.

### New plan
Success criteria are unchanged; the gaps are in the draft, not the criteria. Fix the draft:
1. Link to `https://soberjourney.app` (and add README.md:5 to the claim list).
2. Reword to the source's strength: a provider safety block often follows a message about self-harm or danger, so those are the messages where a blocked reply is most likely to matter.
3. Drop "a brake on floods"; keep "best-effort, counts inside the running server, not a hard guarantee" (scope-guard entry:44; security reference:29).
4. Reword to: the hardening added a scope section ahead of the crisis section, and the crisis section had to come through unchanged.
5. Reword to: the prose is kept when it mentions a crisis line or an emergency number — without listing the markers (criterion 6).
Then rerun criteria 3–6 greps, update the claim list, and re-run completion verification (Verifier) and the code review against the revised diff.

## Replan 2026-11-20 (2) — re-verification found an overclaim and unsourced framing

### Original plan
The first replan (above): close five sourcing gaps, criteria unchanged, re-verify.

### What changed
The re-run Verifier confirmed the five gaps closed but returned `revise` on criterion 2, and the regenerated code review agreed:
- Safety overclaim (excerpt and closing): every later layer, including the rate limit, "could not undo" the crisis decision. No source says this of the rate limit — a rate-limited request gets a plain rejection with no crisis line — and "could not" is absolute while the post itself says prompt rules are only string-tested.
- "unless the user explicitly said they were in crisis or asked for them" adds "or asked for them"; "the first version of the system prompt" is not in the source.
- SAMHSA wording ("when substance use is part of the picture") reads as if cravings trigger a helpline; the prompt offers it within the crisis-resources situation when substance use is involved, or when someone asks about treatment (systemPrompt.mts:38).
- "988 is for…/911 is for…" reads as defining the lines, not the app's mapping.
- Unsourced framing: "a small app", "a lot of the work on the Sponsor was technical", "two details turned out to matter a lot", "the exception is the one that matters", "I think it is worth being honest about", "most of the safety work in this chat was not about the model", "should never destroy something a person … just typed"; "I decided against it" attributes a decision the record gives to an approach panel.
- Title "knows when not to call a hotline" implies the Sponsor places calls.
- "fenced code block" hints at what the guard does not cover.

### New plan
Success criteria unchanged. Rewrite to the sources:
1. Excerpt and closing: drop "could not undo"; say the later layers were built around the crisis decision, naming only what the sources show — the crisis section pinned unchanged by a test, crisis guidance taking precedence over the scope rules, and the reply guard keeping text that mentions a crisis line. The rate limit is not claimed as protecting crisis replies.
2. "The system prompt originally told the model not to recommend hotlines unless the user explicitly said they were in crisis."
3. SAMHSA: "When the Sponsor does point to resources and substance use is involved, or when someone asks about treatment, it can also mention the SAMHSA National Helpline … a treatment line, not an emergency line."
4. Mapping: "In the US, the Sponsor points to 988 for suicidal thoughts and self-harm, and to 911 for …".
5. Remove or neutralise each unsourced framing phrase; "That option was rejected" instead of "I decided against it"; "Before this change, a provider outage destroyed what the person had typed" (persist-before-generate entry:10-12).
6. Title: "Building an AI sponsor that knows when not to reach for a hotline".
7. Guard: "If a reply contains a code block" (no "fenced").
8. Then rerun criteria 3–6 greps, update the claim list, re-run Verifier and code review.

Standing facts (not changes): `published: false` hides a post from the listing only (owner's existing draft practice, see 5ea9ba4 → 735a69b), stated in the PR body. The work records in this public repo name the rate-limit numbers and guard markers in their criteria; the SoberJourney repo already states them, so this is accepted.

Accepted with the reviewer's non-blocking notes applied: "fenced" kept (the guard covers fenced code only, and "code block" alone would overstate it); SAMHSA conditions nested under "when it does point to resources"; the "prompt never presents it as one" clause dropped (SAMHSA as a treatment line sourced to the crisis-guidance entry); the closing names only the three sourced protections; a full narrative sweep removed the remaining framing ("the obvious fix", "that sounds reasonable until", "the rule I settled on", "those checks matter more now"); the outage line limited to what the persist-before-generate entry records.

## Replan 2026-11-20 (3) — clarify criterion 2 and close the last gaps

### Original plan
Replan 2: rewrite to the sources with a full framing sweep; criteria unchanged.

### What changed
The third Verifier confirmed every replan item resolved and no absolute safety claims, but returned `revise` on criterion 2 for residual items: "those are the messages where a blocked reply matters most" (source: a block "often follows" such a message), "just like the thing it is guarding" (source: "itself injectable"), "any later change to it has to be deliberate" (inference), the closing's "starts from one line", and first-person narration ("I saw", "What I took away", "The classifier I did not build"). The owner is the blog's author, so "I saw" matches "The owner showed…". The code review found no high or medium issues; its low items include the outage paragraph sitting under the refusal heading, "a new model still needs the same cases run again" implying they were run, the unknown-block sentence read as covering every block, check-ins not explained as recording urge and mood, and the stale Goal in proposal.md. Each pass has removed a further layer of framing because criterion 2 never said where the author's narration stops and an unsupported claim starts — a criteria ambiguity.

### New plan
1. Clarify criterion 2 in proposal.md: "Every technical or factual claim — behaviour, events, decisions, numbers — traces to a cited source. The author's own first-person narration (headings, transitions, framing; the owner is the author) is allowed only where it asserts no fact, experience, ranking, inference or verdict the sources do not contain. No absolute safety claims."
2. Post fixes: "those are the messages where a blocked reply is most likely to matter"; "a classifier built on a language model is itself open to prompt injection"; drop "any later change to it has to be deliberate"; closing heading "Where it ends up" (neutral) and remove "starts from one line" and the double sense of "line" (use "threshold"); keep "I saw" (owner = author); heading "The classifier that was not built"; move the save-before-generate paragraph under its own short heading; "unrecognized block reason code"; "the same cases need to be run against any new model"; check-ins described as recording urge and mood (crisis-guidance entry: "check-in urge/mood levels").
3. Update proposal.md's Goal to the current title and remove "could never suppress"; replace absolute local paths in this unit's records with repo-relative ones.
4. Rerun greps, update the claim list, re-run Verifier and code review.

Accepted. Reviewer notes adopted: the claim-list clause kept in criterion 2 (recorded as a tightening); the rerun on a model change phrased as following from the live-model limit.

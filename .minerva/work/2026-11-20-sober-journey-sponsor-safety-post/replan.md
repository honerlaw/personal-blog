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

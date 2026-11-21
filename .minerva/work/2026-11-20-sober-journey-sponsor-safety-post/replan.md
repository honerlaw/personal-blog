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

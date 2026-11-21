# Scratchpad: sober-journey-sponsor-safety-post

> **Ephemeral working memory.** Most of what lands here is noise — small
> decisions that don't matter, dead ends, momentary confusion. At feature
> completion, run `minerva:promote`: significant items get promoted to
> `.minerva/knowledge/`, `proposal.md` gets updated to match reality, and
> the raw scratchpad is archived.

## Decisions 2026-11-20
- [solo] scope check: single unit, one PR (tier: solo predicate — one new post file plus work records, additive, no interface, no knowledge entries to conflict; parallel wave)
- [reviewed — folded] approach: option B, decision-led narrative; Skeptic flagged guard overclaim ("never drops crisis prose"), rate limit not marked best-effort, unsourced "far above typing speed", wrong source for unknown-block mapping, stale Gemini wording, sections 4–7 sprawl — all folded into Approach; rejected A (technical deep dive: buries the judgment, leans to evasion detail) and C (recovery-app survey: dilutes the idea) (tier: reviewer — scrutiny: genuine ambiguity; parallel wave)
- [rechecked — clean] approach: fold-audit confirmed items 1–6 addressed; two low new notes (writer-facing parentheticals; criterion 6 wording, already fixed by the whole-proposal fold)
- [reviewed — folded] whole-proposal: grep gaps — curly apostrophes, "/min" false match, no digit-string or HTML regex, scratchpad claim list not committed — folded into criteria 2–6 (tier: reviewer — not provably small; parallel wave)
- [rechecked — clean] whole-proposal: fold-audit confirmed items 1–5 addressed; low caveats: run greps on the body only and with LC_ALL=en_US.UTF-8
- note: the run was started by a forked agent that could not dispatch reviewers; the main thread took over the gates. The fork wrote the draft post ahead of review; Phase 2 re-checks it against the final criteria.

## Work notes
- Draft written by the fork (scratchpad/post2), then corrected on the main thread against the final criteria: the Python-script line now says the owner saw the Sponsor answer such a request (source says "The owner showed the Sponsor answering…", not that the owner asked); the rate-limit paragraph drops the unsourced "well above typing speed" and says best-effort / in-process; the classifier paragraph's closing line is now a first-person stance grounded in the recorded rejection reason.
- Greps run with LC_ALL=en_US.UTF-8, body only (below frontmatter): criteria 3–6 clean; digit strings in body are exactly 988, 911, 1-800-662-4357.

## Claim-to-source list
Paths relative to /Users/derekhonerlaw/Development/SoberJourney. K = .minerva/knowledge.
- App has journeys, check-ins, journal, AI Sponsor chat — README.md:7-13
- Original prompt: no hotlines unless the user explicitly said they were in crisis; implied danger (goodbye message, "took too many pills") got nothing — K/2026-10-06-decision-sponsor-chat-crisis-guidance.md:10-12
- Owner position: offer crisis resources but not easy to trigger; relapse/craving talk is common in recovery and does not need a hotline (paraphrased) — same file:12-15
- Ordinary side list (cravings, urges, want to drink/use now, relapsed, general distress, high urge / low mood on a check-in) — same file:19-20; packages/server/src/network/rpc/route/conversation/sponsorChat/utils/systemPrompt.mts:36
- Sponsor support = coping step, reach out to someone they trust, reminders of progress — systemPrompt.mts:36
- Danger list (suicidal thoughts, self-harm, harm to others, overdose incl. after time sober / lower tolerance, severe withdrawal, medical emergency, immediate danger); takes priority over craving/relapse — crisis-guidance.md:21-25
- 988 suicide/self-harm; 911 overdose, severe withdrawal, violence, immediate danger; elsewhere local emergency number; SAMHSA 1-800-662-4357 treatment line, not emergency — crisis-guidance.md:26-28
- Warm, brief, keep supporting — crisis-guidance.md:26
- Harmful-content blocks (SAFETY, PROHIBITED_CONTENT) get the supportive fallback with conditional 988/911 / local emergency line; other blocks (recitation, personal data) get a neutral "try saying it a different way" reply — utils/fallback.mts (SAFETY_FALLBACK_REPLY, BLOCKED_FALLBACK_REPLY, fallbackReplyFor); crisis-guidance.md:30-32
- Unknown or missing block code → SAFETY, erring toward the crisis-line reply — K/2026-10-10-decision-llm-calls-go-through-openrouter.md:34-35
- User message persisted before generation and kept on failure — K/2026-10-06-decision-sponsor-chat-persist-before-generate.md:1,6,17-19
- Python hello-world request answered with code started the hardening — K/2026-10-10-decision-sponsor-chat-scope-guard-and-rate-limit.md:10-13
- In-scope list (Serenity Prayer, amends/apology wording, meetings, journaling, withdrawal/medication, the app); unrelated tasks (code, homework, translations, trivia) get a warm decline; struggle/crisis precede scope; safety questions always answered; role cannot be changed; instructions confidential; journey names are data — scope-guard entry, Finding "Prompt" bullet
- Pre-generation classifier rejected: double latency/cost, itself injectable, false off-topic on a crisis disclosure would suppress crisis resources — scope-guard entry, Finding first paragraph
- Reply guard: fenced code → OFF_TOPIC_REPLY unless remaining prose carries a crisis marker; warm because a misfire could hit a supportive reply; stays in history so distress keeps context — scope-guard entry "Reply guard" and OFF_TOPIC_REPLY bullets; fallback.mts OFF_TOPIC_REPLY comment
- Per-user rate limit, best-effort, in-process — scope-guard entry:44; K/2026-11-03-reference-security-limits-and-residual-risks.md:29
- Hard cost ceiling is the provider (OpenRouter) key's spend limit — openrouter entry:55
- Crisis section pinned by sha256 in a test — scope-guard entry "Prompt" bullet ("a test pins its sha256")
- String tests prove wording only; live checks with the three example cases — crisis-guidance.md Implications (first bullet)
- Model is configuration (OPENROUTER_MODEL); fallback models get the same system prompt — openrouter entry:21 and Implications; README.md (Server environment)

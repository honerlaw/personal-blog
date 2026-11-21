# Geist was loaded through next/font but never applied, because CSS named the family directly

**Date**: 2026-11-20
**Type**: bug
**Theme**: site-design
**Summary**: next/font hashes family names; Geist needs `variable` on <html> and the CSS var in theme.
**Context**: .minerva/work/2026-11-20-site-redesign-hero-cards (see git history if the worktree has been cleaned up)

## Context
`layout.tsx` called `Geist({ subsets: ["latin"] })` and never used the result, and `globals.css` set `--font-sans: 'Geist', 'Geist Fallback'`. The site looked as though it used Geist, but it rendered the system font.

## Finding
next/font self-hosts fonts under a generated, hashed family name, so the literal family `'Geist'` in CSS matches nothing unless Geist happens to be installed locally. The fix:
- create the fonts with `variable: "--font-geist-sans"` and `variable: "--font-geist-mono"`;
- put both `.variable` classes on `<html>`;
- have `@theme inline` read `--font-sans: var(--font-geist-sans), …` and `--font-mono: var(--font-geist-mono), …`.

## Implications
- Any new next/font font must be wired through its CSS variable. Naming the family in CSS only appears to work on machines that have the font installed.
- The redesign therefore also changed the rendered font across the whole site; that is expected, not a regression.

## Related
- [[2026-11-20-decision-site-design-shared-chrome-and-neutral-tokens]] — shipped alongside

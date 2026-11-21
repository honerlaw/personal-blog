# `next build` does not typecheck; two type errors already exist on main

**Date**: 2026-11-20
**Type**: reference
**Theme**: site-build
**Summary**: next.config.mjs sets ignoreBuildErrors, so type errors pass the build; run tsc separately.
**Context**: .minerva/work/2026-11-20-homepage-onerlaw-llc (see git history if the worktree has been cleaned up)

## Context
While verifying the homepage onerlaw LLC change, the production build (`pnpm build`) passed and printed "Skipping validation of types". A separate `npx tsc --noEmit -p .` reported type errors on lines the change did not touch.

## Finding
`next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `next build` (and Vercel deploys) never fail on TypeScript errors. As of 2026-11-20, `main` carries two such errors, both the same shape: `href={project.frontmatter.url || project.frontmatter.github}` is `string | undefined`, passed to `ProjectCard`'s `href: string` prop, in `src/app/page.tsx` and `src/app/projects/page.tsx`. At runtime they are harmless while every project has a `url` or a `github`.

## Implications
- A green build is not evidence that a change typechecks. To verify a change, run `npx tsc --noEmit -p .` and compare its errors against `main`.
- `tsc` writes an untracked `tsconfig.tsbuildinfo` at the repo root, which is not gitignored. Delete it rather than commit it.
- A project MDX with neither `url` nor `github` would render a card whose link has no `href`.

## Related
- [[2026-11-20-decision-onerlaw-llc-line-in-homepage-projects]] — found while verifying this change

# Draft posts are hidden from the listing but still served at their URL

**Date**: 2026-11-20
**Type**: reference
**Theme**: blog-posts
**Summary**: `published: false` only filters the post listing; a deployed draft still renders at /posts/<slug>.
**Context**: .minerva/work/2026-11-20-sober-journey-sponsor-safety-post (see git history if the worktree has been cleaned up)

## Context
Two posts were shipped as drafts (`published: false`) so the owner could review them on main before publishing. Review of the PRs checked what the flag actually does.

## Finding
`getAllPosts` in `src/lib/mdx.ts` filters out posts with `published === false`, so drafts do not appear on the home page or the post list. `getPostBySlug` does not check the flag, and the post route leaves `dynamicParams` at its default, so once a draft is merged and deployed it renders for anyone who opens `/posts/<slug>` directly. The repository is public, so the draft's source is visible on GitHub as well.

## Implications
- Treat a merged draft as publicly reachable. Anything that must not be seen before publishing stays off main.
- A PR that adds a `published: false` post should say so in its body, so the owner accepts the exposure knowingly.
- Making drafts truly private would need `getPostBySlug` (or the route) to return not-found for unpublished posts outside development.

## Related

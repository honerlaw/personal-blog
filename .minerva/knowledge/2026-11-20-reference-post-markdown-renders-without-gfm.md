# Post markdown renders without GFM: no tables or raw HTML

**Date**: 2026-11-20
**Type**: reference
**Theme**: blog-posts
**Summary**: Posts render through plain react-markdown with no remark-gfm, so tables and raw HTML break.
**Context**: .minerva/work/2026-11-20-seekless-ad-postmortem-post (see git history if the worktree has been cleaned up)

## Context
The Seekless postmortem carries many campaign figures, which would naturally go in a table.

## Finding
`src/components/mdx-content.tsx` renders post bodies with `<ReactMarkdown>` and no remark-gfm or rehype-raw plugin. Pipe tables, raw HTML and other GFM-only syntax do not render as intended. Posts use headings, paragraphs, bullet lists, bold, links and quotes instead; figures go in bullet lists.

## Implications
- Check new posts with `grep -nE '^\s*\|'` and `grep -nE '<[a-zA-Z/!]'` on the body.
- Adding tables to posts needs remark-gfm in the renderer first, a `src/` change of its own.

## Related
- [[2026-11-20-decision-posts-from-project-records-trace-every-claim]] — the other convention set by the same post

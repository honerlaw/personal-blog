# The site uses a shared header and footer, neutral theme tokens, and card-based sections

**Date**: 2026-11-20
**Type**: decision
**Theme**: site-design
**Summary**: Shared header/footer in root layout, neutral light/dark tokens, no eyebrow labels, card sections.
**Context**: .minerva/work/2026-11-20-site-redesign-hero-cards (see git history if the worktree has been cleaned up)

## Context
The site had a per-page sticky sidebar and a teal palette inherited from the v0 scaffold's `--primary` token. The owner asked for a more modern layout where sections and articles are easier to tell apart, reviewed three previewed directions on desktop and mobile, and chose "B" (hero + cards). While reviewing, they ruled out teal and the small uppercase "eyebrow" labels above headings.

## Finding
- `src/app/layout.tsx` renders `SiteHeader` (client component) and `SiteFooter` around every page. The sidebar and its navigation component were deleted.
- The header's mobile panel stays mounted and is toggled with the `hidden` attribute, so `aria-controls` always resolves. It closes on a route change (a `pathname` effect), on Escape, and on a link click.
- The homepage is hero, then Projects on a `bg-secondary` band, then Writing (newest post as a featured card plus two cards).
- `PostCard` makes the title the link and stretches it over the card with an `after:absolute after:inset-0` overlay, so the card is clickable while the link's accessible name is only the title. `PostCard` and `ProjectGroups` take a heading level, which keeps each page's outline gap-free.
- `src/app/globals.css` uses neutral tokens in light and dark, and dark mode still follows `prefers-color-scheme`. Hover states use underline or muted-to-foreground shifts rather than a colour change.
- Article links in `mdx-content.tsx` are always underlined.
- Dates render through `formatPostDate()` as short months in UTC, such as "Nov 20, 2026", with a machine-readable `dateTime`.
- Same-day posts are ordered by slug, so the featured post does not depend on `readdirSync` order.

## Implications
- Do not add uppercase eyebrow labels or teal (or any accent hue) without asking the owner; the criteria greps in the work unit's proposal check both.
- Style with theme tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-secondary`), not hard-coded colours, or dark mode breaks.
- Tailwind v4 applies stacked variants left to right: write `prose-a:hover:…`, not `hover:prose-a:…`. The latter styles every link when the article container is hovered.
- The footer has no year on purpose; pages are statically generated, so a computed year would freeze at build time.

## Related
- [[2026-11-20-bug-geist-font-never-applied]] — the font fix that shipped with this redesign

# Proposal: site-redesign-hero-cards

**Date**: 2026-11-20
**Status**: Shipped (2026-11-20)

## Goal
Rebuild the personal site in the owner's chosen "Direction B" (hero + cards). The sidebar is replaced by a shared top header and footer on every page. The homepage becomes hero → Projects (with Onerlaw LLC as the company the projects run under) → Writing (featured newest post + cards). The teal palette is replaced by a neutral one, and the posts list, post page and projects page get the same look, on desktop and mobile.

## Why
The owner asked to "modernize this UI and make it a bit nicer / clearer to understand which article is which and which section is what", and to make Onerlaw LLC more obvious than the current small line. They reviewed three previewed directions (desktop and mobile; design canvas https://claude.ai/artifact/Nvh67b1MqTaFESopf2tMnX) and chose B. Owner rules gathered while reviewing:
- Onerlaw LLC (capital O) is "the blanket company that I operate my other projects under". It belongs inside Projects, not as a separate callout, and is never called a "side business".
- Seekless and SoberJourney are both Onerlaw LLC projects. Some projects may be run directly by the owner; none are today.
- No small uppercase "eyebrow" labels above headings anywhere.
- No teal. Teal came from the existing `--primary` token, not a choice the owner made.
- No invented copy, and no contractions in writing.

## Approach
**Shared chrome in the root layout.**
- `src/app/layout.tsx` renders a new `SiteHeader` and `SiteFooter` around `{children}`.
- The four pages (`/`, `/posts`, `/posts/[slug]`, `/projects`) drop their `Sidebar` grid wrappers. `sidebar.tsx` and `navigation.tsx` are deleted. `social-links.tsx` is reused in the footer.
- `SiteHeader` is a client component: the name links home, and nav links go to Home `/`, Projects `/projects`, Writing `/posts`, with the active page marked.
- Below `md`, the links collapse behind a menu button (`aria-label`, `aria-expanded`, `aria-controls`) that toggles a dropdown panel. The panel stays mounted and is hidden with the `hidden` attribute, so `aria-controls` always resolves. It closes on a link click, on any route change, and on Escape.
- `SiteFooter` shows "© Derek Honerlaw" and the social links. There is no year, because pages are statically generated and a computed year would freeze at build time.

**Homepage (`src/app/page.tsx`).**
- **Hero.** `h1` "Derek Honerlaw"; the existing headline text; the existing headshot (next/image, rounded); buttons "See my projects" (`#projects`) and "Read the writing" (`#writing`). On mobile it stacks: photo first (wide crop), then text, then full-width buttons. The container is `flex-col md:flex-row-reverse`, with the image first in the DOM: it leads on mobile and sits on the right on desktop.
- **Projects** (`id="projects"`), on a light-grey band (`bg-secondary`-style token):
  - `h2` "Projects", then the intro "Onerlaw LLC is the blanket company that I operate my projects under."
  - Projects are grouped by a new optional `company` frontmatter field. Both MDX files get `company: "Onerlaw LLC"`.
  - Group heading `h3` "Onerlaw LLC" over its cards. A second group, `h3` "Run by me directly", holds projects without `company`. It renders only when non-empty, and only then does the intro add "Some I operate directly myself."
  - No company link: the owner gave no URL.
  - The homepage shows featured projects; `/projects` shows all of them.
- **Writing** (`id="writing"`):
  - `h2` "Writing"; the intro "Writing about code, AI, leadership, and the things that keep life interesting." (the site's own meta description); "All N posts →" to `/posts`.
  - The newest post renders as a large featured card, and the next two as cards in a two-column grid (one column on mobile).
  - Every card shows date · reading time (from the existing `reading-time` value), title, excerpt and tags.
  - Dates go through a new `formatPostDate()` helper: short month, rendered in UTC, so a `YYYY-MM-DD` date never shifts a day. Each `<time>` carries the raw date as `dateTime`.
  - The newest post is the first item from `getAllPosts()`, which now breaks same-day ties by slug.
  - The link reads "All N posts →", or "post" when N is 1.

**Shared cards.**
- `post-card.tsx` is rewritten with `featured` and default variants. The title is the link, and an `after:absolute after:inset-0` overlay makes the whole card clickable. The link's accessible name stays just the title. A `headingLevel` prop (`h2` on `/posts`, `h3` on the homepage) keeps each page's heading outline gap-free.
- `project-card.tsx` is rewritten. The default variant has an initials tile, title, description and "Visit <domain> ↗" (domain derived from `url`, falling back to the GitHub URL). It shows no tags, matching the preview, so no "Personal" tag appears under "Onerlaw LLC"; frontmatter stays untouched.
- `variant="repo"` is the compact card for the GitHub repo list on `/projects`: no initials tile; the description only when non-null; the language as one chip when present; the link label "View on GitHub ↗". The repo data and behaviour are unchanged. `groupProjects()` and `company` apply to MDX projects only.
- `groupProjects()` in `src/lib/mdx.ts` does the grouping. `ProjectGroups` and `ProjectsIntro` live in `src/components/project-groups.tsx`. `ProjectGroups` takes a `headingLevel` (`h2` on `/projects`), links to `url || github`, and skips a group with nothing to link.

**Other pages, same look.**
- `/posts`: `h1` "Writing", the existing intro "Thoughts on engineering, leadership, and building things that last.", then all posts as default cards.
- `/projects`: `h1` "Projects", the same Onerlaw LLC intro, grouped cards, then `h2` "More on GitHub" with the existing repo intro "Public repositories, most recently updated first.". The "Featured" eyebrow and its line "Highlighted work I want to call out." are removed, because the grouping replaces them.
- `/posts/[slug]`: a readable centered column with the back link, date · reading time, title and tags. The excerpt is not repeated under the title. The metadata title fixes "— Your Name" to "— Derek Honerlaw". `/posts` and `/projects` also gained "Writing — Derek Honerlaw" and "Projects — Derek Honerlaw" titles. Article links become underlined, since links are no longer coloured.

**Palette (`src/app/globals.css`).** Every teal token (`--primary`, `--accent`, `--ring`, `--chart-*`, `--sidebar-primary`, `--sidebar-ring`, hue 195 / 184 / 227) becomes neutral in both light and dark: near-black primary in light, near-white in dark. The "ocean teal" comments are removed, and the unused `src/styles/globals.css`, which still holds teal tokens and is imported nowhere, is deleted. Components use the theme tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-secondary`), so the automatic dark mode keeps working. Fonts stay Geist. Geist had never actually rendered, because CSS named the family directly while next/font uses a hashed name. It is now wired through `variable` classes on `<html>` and `var(--font-geist-sans)` / `var(--font-geist-mono)` in `@theme`.

**Rules applied.**
- **No eyebrow labels.** Every `text-xs uppercase tracking-wider` section label becomes a real heading.
- **No new descriptive copy.** Intros and descriptions come from the owner's words, existing site copy or content frontmatter.
- **The Projects intro.** It uses the owner's sentence with one word dropped ("my projects" for "my other projects"), as shown in the previews the owner approved.
- **New UI microcopy, listed so the owner can change any of it.** Nav "Home / Projects / Writing"; buttons "See my projects" and "Read the writing" (both from the approved preview); "All N posts →"; "Visit <domain> ↗"; "View on GitHub ↗"; the group heading "Run by me directly" and "Some I operate directly myself." (paraphrasing the owner, and rendered only when a directly-run project exists); "Back to posts" stays.
- **No contractions** in new copy.

**Mobile.** The hero is `flex-col` below `md` and `md:flex-row-reverse` above it; on mobile the photo comes first. Buttons are full width below `sm`. The post-card and project grids are one column below `md` and two at `md` and up. The mobile menu panel closes when a link is clicked.

**Hover states.** With a neutral primary, a hover colour change is barely visible. Card titles, the back link and footer/social links get an underline (or a muted-to-foreground shift) on hover instead of `hover:text-primary`.

**Article styling.** `mdx-content.tsx` uses `prose-a:text-primary` and `prose-blockquote:border-l-primary`. With a neutral primary, article links are always underlined (`prose-a:underline`, darkening on `prose-a:hover:`; the variant order matters in Tailwind v4) and blockquote borders use the border token, so both stay distinguishable.

### Candidate approaches considered
- **A. Shared header/footer in the root layout + theme-token styling** (recommended). One header, one footer, no per-page duplication; keeps the existing automatic dark mode.
- **B. Per-page header/footer, each page owning its chrome.** Matches the current pattern, where each page renders `Sidebar`. It duplicates the chrome four times and risks drift.
- **C. Port the preview's hard-coded colours (light only).** The closest pixel match to the preview, but it silently drops the site's working dark mode and bypasses the token system the shadcn components use.

Criteria: (1) matches Direction B as previewed on desktop and mobile; (2) least duplication and drift; (3) keeps existing behaviour that works (dark mode, reading time, GitHub repo list, redirects); (4) follows the owner's rules above.

## Success criteria
- One shared header renders on `/`, `/posts`, `/posts/[slug]` and `/projects`, with links Home, Projects, Writing. Below `md` the links sit behind a menu button whose `aria-expanded` toggles, and clicking a link in the panel closes it. No page renders `Sidebar`, and `src/components/sidebar.tsx` / `navigation.tsx` are deleted.
- The homepage renders, in order: hero (`h1` name, existing headline, headshot, two buttons), `#projects`, `#writing`, footer. The hero container uses `flex-col` with `md:flex-row-reverse` (shipped form; the photo-first-on-mobile, photo-right-on-desktop intent is unchanged), and the photo comes first on mobile. Hero buttons are `w-full sm:w-auto`. The card grids use `grid-cols-1` with `md:grid-cols-2`.
- The Projects section contains "Onerlaw LLC is the blanket company that I operate my projects under." Seekless and SoberJourney appear under an `h3` "Onerlaw LLC", driven by `company: "Onerlaw LLC"` in their frontmatter. "Run by me directly" is rendered only for projects without `company`, so it is absent from the built homepage HTML today.
- The homepage Writing section renders the newest *published* post (from `getAllPosts`, which skips drafts) as a featured card, and the next two as cards. Each shows date, reading time and tags, and there is a link to `/posts`.
- `/projects` renders the GitHub repo list with the `repo` card variant: "View on GitHub ↗" and no empty description paragraph. MDX project cards render no tag chips. `ProjectFrontmatter.tags` stays in the type, unused by the cards.
- `grep -rnw uppercase src/app src/components --include=*.tsx | grep -v components/ui` returns nothing.
- `grep -rn " 195)\| 184\.\| 227\." src` returns nothing, and `src/styles/globals.css` no longer exists.
- Case-sensitive `grep -rn "onerlaw LLC" src content` returns nothing. "Onerlaw LLC" is the only spelling used.
- `grep -rni "side business" src content` returns nothing.
- `/posts/[slug]` metadata titles end "— Derek Honerlaw".
- `pnpm build` passes. `npx tsc --noEmit -p .` reports no errors beyond the baseline measured on `main` before the change. As of 2026-11-20 that baseline is the two `href={url || github}` `string | undefined` errors, in `src/app/page.tsx` and `src/app/projects/page.tsx`. If the rewrite removes either error, fewer errors is fine.

## Open Questions
- A company URL for Onerlaw LLC: none given, so nothing is linked.
- There is no pre-merge visual review. The orchestrator enables auto-merge, so the redesign goes live once the Vercel preview passes. The owner already chose B from desktop and mobile previews. Verification is after merge, on the live site; a single revert of the squash commit restores the old design. The PR body says this plainly.

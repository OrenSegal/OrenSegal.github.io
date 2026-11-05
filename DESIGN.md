---
name: Oren Segal Portfolio
description: Utility Cutaway — a literal underground utility cross-section. Near-black ground is depth; each section is a vertical hairline spine, the three flagship projects lead with their result and a visual drawn from committed data, and the rest sit in a one-line table.
colors:
  panel: "#0a0b0c"
  line: "#232527"
  ink: "#f2f1ea"
  ink-dim: "#9a9d9f"
  ink-faint: "#7a7d7f"
  accent: "#8fd6a8"
  accent-dim: "#4b7a5d"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "normal"
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
  meta-mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
spacing:
  section-y: "96px"
  spine-gutter: "20px"
  divider-y: "32px"
  nav-h: "64px"
components:
  link-inline:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  link-inline-hover:
    textColor: "{colors.accent}"
  link-list-item:
    textColor: "{colors.ink-dim}"
    typography: "{typography.body}"
    padding: "16px 0"
  link-list-item-hover:
    textColor: "{colors.ink}"
  proof-chip:
    textColor: "{colors.ink-dim}"
    textColorHover: "{colors.accent}"
    borderColor: "{colors.line}"
    typography: "{typography.meta-mono}"
    padding: "4px 10px"
---

# Design System: Oren Segal Portfolio — Utility Cutaway

## Overview

This build supersedes the prior "no governing metaphor" plain system (retired this session; do not resurrect its rules) and, before that, the "Night Flight-Deck" instrument-panel direction (rejected outright, never shipped). The current shipped system stages the page as a literal underground utility cross-section: the near-black ground (`#0a0b0c`) is not just a dark background, it is depth. Every major section — Hero, Work, Checks, More projects, About, Contact — is a vertical cutaway spine (`border-l border-line pl-5`). The rotated depth labels that used to sit in each spine's margin (`DepthTag`: "surface", "shallow utility", "deepest", "resurfacing") were removed on 2026-11-05: they clipped on mobile and read as broken. The spine alone carries the cutaway.

Work shows three flagship blocks (rootcause, litmus, cited), each with one number, a visual built from that repo's committed results (a cost-vs-pass chart, a mutant table, a flagged-claim example), and two links. A "Checks that proved less than they claimed" section lists three PRs. Every other project is one row in the More projects table (title, subtitle, live CI badge, last-push date); Problem/Decisions/Outcome live on the project detail pages only. The in-place expanding project row (`ProjectRow`, connector tick, chevron) was removed with that change. Accent green marks two things: interaction state (hover/focus/selection) and the filled status dot as a binary data affirmative (Hero availability line). It never fills a background or colors a heading.

No fabricated metrics anywhere: every GitHub-derived number and date on the page (per-project star count and last-push date) is sourced at build time from the live GitHub API via `scripts/fetch-github-stats.mjs`, all-or-nothing — there is no invented fallback value if a fetch fails.

**Key Characteristics:**
- Near-black ground (`#0a0b0c`) read as literal depth, not just a background — every home section renders as a `border-l border-line pl-5` cutaway spine, with no margin label
- Two type families with strict division of labor: Space Grotesk for every heading and every sentence of prose; JetBrains Mono confined to machine-sourced facts at 9–14px (proof chips, chart axes, the mutant table, cited tier output, PR refs, last-push dates) — never prose, never headings
- Accent green (`#8fd6a8`) has exactly two jobs: interaction state and the filled `StatusDot` as a static binary data signal
- Flagship visuals are inline SVG or HTML tables drawn from committed result files, each captioned with its source link; no raster images
- One motion curve (`cubic-bezier(0.16, 1, 0.3, 1)`) drives every transform/size transition in the system — Hero's entrance (`rise`, 700ms); color transitions use Tailwind's default ease

## Colors

### Primary
- **Accent Green** (`#8fd6a8`): two jobs, no more. (1) Interaction state — link hover/focus-visible, the `::selection` highlight, proof-chip hover, icon hover on Contact channel rows and the project title arrow. (2) `StatusDot`'s filled state (`fill-accent`) — a static, non-interactive data affirmative, rendered at rest on the Hero availability line.
- **Accent Green, Dim** (`#4b7a5d`): the resting-state companion — underline color on inline links before hover (`decoration-accent-dim`), scrollbar-thumb hover.

### Neutral
- **Panel Black** (`#0a0b0c`): the sole rendered background — body, nav bar (`bg-panel/95`).
- **Line** (`#232527`): every hairline — section seams, spine borders (`border-l`), flagship and table row dividers, proof-chip borders, and the 77-84% band fill in the rootcause chart.
- **Ink** (`#f2f1ea`): headings, primary link/title text, active nav text, channel-row labels.
- **Ink Dim** (`#9a9d9f`): body copy, descriptions, flight-log prose, inactive nav text.
- **Ink Faint** (`#7a7d7f`): chart axes and interval lines, figure captions, last-push dates, the inconclusive verdict, bullet dots, footer copyright, resting icon color.

### Named Rules
**The Accent-as-Signal Rule.** Accent green is spent on exactly two things: interaction (hover/focus/selection) and the filled status dot as a binary data affirmative. It is never a background fill, never a static heading color, and there is no second accent hue. The distinction from the old "hover-only" rule matters: a resting filled `StatusDot` is accent by design (data, not decoration) — do not "fix" it to ink-faint.

## Typography

**Display/Body Font:** Space Grotesk, loaded via `next/font` as `--font-sans` (`app/layout.tsx`). Carries every heading and every sentence of prose on the page — Hero's h1, section headings, category headings, project titles, all body copy.

**Mono Font:** JetBrains Mono, loaded via `next/font` as `--font-mono` (`app/layout.tsx`), mapped in `tailwind.config.ts`. Mono is confined to machine-sourced facts, always small (9–14px) and never prose or a heading:
1. Hero proof chips (`font-mono text-xs tabular`, hairline `border-line`, no fill, accent on hover). Each chip is a number already stated in the profile README or on the site.
2. Flagship visuals: rootcause chart axis and point labels (SVG `text-[9px]`), the litmus mutant table, cited's claim/page labels and before/after tier output.
3. PR refs in the Checks section (`text-sm`) and last-push dates in the More projects table (`text-xs`).
4. The byline line on writing posts.

### Named Rules
**The Scoped Mono Rule.** JetBrains Mono renders only machine-sourced facts: numbers, ids, tool output, dates. It never appears in a heading, in a sentence of prose, or above `text-sm`. Adding mono to a new element requires that element to be a similarly small, machine-sourced fact — not a stylistic accent.

### Hierarchy
- **Display** (Space Grotesk 500, `text-3xl`→`text-4xl`, `leading-[1.15]`): Hero's `<h1>`.
- **Section Heading** (500, `text-2xl`): "Work", "About", "Get in touch".
- **Section lead** (400, `text-xl`→`text-2xl`, `leading-snug`, `text-ink`): Hero's one-sentence finding, under the name and role line.
- **Title/Card Heading** (500, `text-xl`): each flagship's title link, writing-index titles.
- **Flagship number** (500, `text-3xl`, `tabular`, `text-ink`): the one number each flagship leads with, set inline at the start of its finding sentence rather than as a stat tile with a label.
- **Body** (400, `text-base`–`text-lg`, `leading-relaxed`): About's paragraphs, project descriptions, Contact's intro, flight-log problem/outcome copy.
- **Label** (500, `text-sm`, `uppercase`, `tracking-wide`): project-detail sub-headers only (`app/projects/[id]/page.tsx`, unchanged this session — "Problem", "Decisions", "Outcome", "Key features", "Impact", "Tech stack").
- **Meta** (400, `text-sm`, `text-ink-faint`): tech-stack lines, footer copyright, stack list in About.
- **Meta-Mono** (400, `text-[9px]`–`text-sm`, mono, `tabular` where numeric): see Scoped Mono Rule above.

## Layout

Every home section shares one container: `max-w-3xl`, centered, `px-4 sm:px-6` gutters, wrapped again by a `border-l border-line pl-5` spine (the **spine gutter**, 20px). Order: Hero, Work (flagships), Checks, More projects, About, Contact. The project-detail page, the writing posts and the `/writing` index use `max-w-2xl` with no spine.

Sections stack full-bleed, separated by `border-t border-line`, `py-20 sm:py-24` rhythm; nav is a fixed `h-16` bar.

Each flagship is a two-column grid at `sm` (`sm:grid-cols-[1fr_1.15fr]`: title, description, number, links | visual) that stacks on mobile, divided by `border-b border-line` with `py-10`. The More projects table is two cells per row (title + subtitle | CI badge over last-push date) with `border-t border-line` rows; its header row is `sr-only`. Contact's channel rows keep `border-b border-line py-4`.

Hero's availability band (`mt-8 max-w-xl border-y border-line py-4`, top-and-bottom hairline around the availability status line) is a single-use arrangement scoped to the Hero — it is not a reusable "banded" component; describe new similar bands by their `border-y` idiom directly rather than inventing a named component for one instance.

## Elevation & Depth

One flat background tone renders (`panel`, `#0a0b0c`). Depth is conveyed by the hairline `line` divider and the vertical `border-l` spines. There are still no shadows, blur, or gradients anywhere in the shipped code.

### Named Rules
**The One Rendered Surface Rule.** Exactly one background tone is painted on the page (`panel`, `#0a0b0c`). Depth is expressed by hairline dividers and the spines, never by a second background fill, a shadow, or a blur.

## Shapes

No bordered cards or buttons. The one bordered element is the Hero proof chip: square-cornered, 1px `border-line`, no fill. Flagship blocks are hairline-divided rows, not boxes. The only curved shapes are `rounded-full` bullet dots (`h-1 w-1`, `bg-ink-faint`) on the project detail page, the rootcause chart's point markers, and the two `StatusDot` circles (filled `r=4` accent circle vs. outlined `r=3.25` ink-faint circle, `strokeWidth 1.25`) — both small SVGs, not icon-font glyphs. Borders are uniformly 1px solid `line`.

## Components

### StatusDot (`components/StatusDot.tsx`)
An 8×8 SVG circle, two states: filled accent (`fill-accent`) or outlined ink-faint (`stroke-ink-faint`, `strokeWidth 1.25`, no fill). This is a static data indicator, not an interaction or hover state — in Hero it renders filled (availability line). The outlined state is kept in the component for a future binary fact; nothing renders it today. Do not treat this component's accent fill as license to make other static UI accent — its rule (see Accent-as-Signal) is scoped to exactly this binary-data case.

### Flagship (`components/Flagships.tsx`)
Three blocks in fixed order: rootcause, litmus, cited. Each has a title link to its detail page with a trailing `ArrowUpRight`, one line on what it is, one number (`text-3xl tabular`) opening a sentence that says what the number means, two links (Repo, plus the write-up or the result file / PR that backs the number), and a visual. Visuals are drawn in code from committed data, each with a `figcaption` naming its source file: rootcause is an SVG of pass rate against log-scaled cost per solved incident, reusing `ROWS` from `components/RootcauseResults.tsx`; litmus is a mono table of the 12 mutants from rootcause `results/litmus/2026-10-15.md`; cited is the cited#1 regression claim with its missing specifics dotted-underlined and the before/after tier output. A new flagship needs a committed source for its number and visual or it does not get a block.

### Checks (`components/Checks.tsx`)
One row per PR (`font-mono` ref link | one sentence), wording taken from the profile README.

### More projects table (`components/Projects.tsx`)
Every project not in Flagships, in `lib/projects.ts` order (sous first). Title links to the detail page; live GitHub Actions badge from `ciWorkflow`; last-push date from `lib/project-stats.json`. `CATEGORIES` is still exported here for the detail page.

### Writing index (`app/writing/page.tsx`)
One hairline-divided entry per post: title link, one-sentence summary, and an optional figure (number + short label). A post gets a figure only if the post itself states that number, with the post's own caveat carried in the label (Reshet: 17%, year over year, no holdout).

### Links
- **Inline text link:** `text-ink`, `decoration-accent-dim underline-offset-4` at rest, brightening to `decoration-accent` on hover.
- **Action link:** `text-ink`, `text-sm font-medium`, no underline, paired with a Lucide arrow icon nudging `translate-x-1` on hover.
- **List/channel link:** `text-ink-dim`→`text-ink` (nav) or `text-ink`→`text-accent` (Contact channel icon+label together) on hover.

### Navigation & Footer
Fixed top bar, `bg-panel/95`, `border-b border-line`, `h-16`, `max-w-3xl` inner container, plain-text wordmark, no monogram. No spine — Navigation and Footer sit outside the cutaway metaphor as the page's fixed frame, not a stratum. `Navigation.tsx` carries no stray utility classes in the current tree.

## Do's and Don'ts

### Do:
- **Do** confine mono (JetBrains Mono) to machine-sourced facts — chips, chart labels, tables of tool output, refs, dates — always small. Do not use mono for a heading or a sentence of prose.
- **Do** use `border-l border-line pl-5` for any new full-width home section.
- **Do** spend accent green only on the two named jobs (interaction, filled status dot). A new static element does not get accent green unless it is a genuine binary data affirmative like `StatusDot`.
- **Do** draw any new visual from a committed result file and name that file in its caption.
- **Do** respect `prefers-reduced-motion` (`app/globals.css` collapses all animation/transition durations near-zero).

### Don't:
- **Don't** treat `StatusDot`'s resting accent fill as a general license for static accent color elsewhere — it is scoped to genuine binary data indicators, not decoration.
- **Don't** use mono for decoration; mono marks content type (a machine-sourced fact), color marks state.
- **Don't** add a second background/surface tone, a shadow, a blur, or a gradient — still a confirmed rejection of the prior AI-template look and of the flight-deck system, neither of which shipped or should be referenced as current.
- **Don't** box content in bordered cards — the structural unit is the hairline divider inside a spine; the proof chip is the only bordered element.
- **Don't** add a category filter/toggle to the home page; categories show only on detail pages.
- **Don't** bring back the rotated depth labels or replace them with a horizontal eyebrow/kicker above a heading.
- **Don't** treat `panel.face` (`#121315`, added to `tailwind.config.ts` this session) as an active token — grep confirms zero usages across `.tsx`/`.css` in the shipped tree. It is leftover/aspirational, not part of the system; the One Rendered Surface Rule stands as written above it.
- **Don't** treat `lib/projects.ts`'s `image`/`icon` emoji fields or `color: 'from-...-...'` gradient strings as design-system material — neither is rendered anywhere; they are dead legacy data from an earlier data shape, not a glyph-icon or gradient rule for this system.

---
name: Oren Segal Portfolio
description: Utility Cutaway — a literal underground utility cross-section. Near-black ground is depth; each section is a vertical spine with a rotated depth label, and each project is a utility line crossing it that opens in place to its build log.
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
  utility-line-toggle:
    textColor: "{colors.ink-faint}"
    textColorExpanded: "{colors.accent}"
    typography: "{typography.meta-mono}"
---

# Design System: Oren Segal Portfolio — Utility Cutaway

## Overview

This build supersedes the prior "no governing metaphor" plain system (retired this session; do not resurrect its rules) and, before that, the "Night Flight-Deck" instrument-panel direction (rejected outright, never shipped). The current shipped system stages the page as a literal underground utility cross-section: the near-black ground (`#0a0b0c`) is not just a dark background, it is depth. Every major section — Hero, Work, About, Contact — is a vertical cutaway spine (`relative border-l border-line pl-5`), and each spine carries a rotated depth label in its left margin naming how far down that section sits: "surface" (Hero), "shallow utility" (Work), "deepest" (About), "resurfacing" (Contact).

Inside Work, each project is a utility line crossing the spine via a horizontal connector tick. Clicking a project's toggle expands it in place with a tactile grid-height reveal — not an accordion library — showing the project's real Problem/Decisions/Outcome build log where one exists, or Key Features/Impact where it doesn't. Accent green marks exactly three things across the whole system: interaction state (hover/focus/selection, inherited from the prior system), the active/expanded utility line (tick, chevron, toggle text), and the filled status dot as a binary data affirmative (has-a-build-log). It never fills a background or colors a heading.

No fabricated metrics anywhere: every number and date on the page (verified repo count, last-verified date, per-project pushed date, open-source percent) is sourced at build time from the live GitHub API via `scripts/fetch-github-stats.mjs`, all-or-nothing — there is no invented fallback value if a fetch fails.

**Key Characteristics:**
- Near-black ground (`#0a0b0c`) read as literal depth, not just a background — four independent sections (Hero, Projects, About, Contact) render as a `border-l border-line pl-5` cutaway spine with a rotated `-90deg` depth label
- Two type families with strict division of labor: Space Grotesk for every heading and every sentence of prose; JetBrains Mono confined to three machine-sourced-fact sites at 10–12px (depth tags, the Hero verified line, each project's id/date toggle) — never prose, never headings
- Accent green (`#8fd6a8`) has exactly three jobs: interaction state, the expanded project row's active marking, and the filled `StatusDot` as a static binary data signal — it is not restricted to hover-only the way the prior system had it
- Each project is a "utility line": a horizontal connector tick (`w-5`, matching the spine's own `pl-5` gutter exactly, so the line visibly touches the spine) that goes accent when its row is expanded
- Expansion is a tactile `grid-template-rows` reveal (`0fr` → `1fr`, 500ms), not an accordion library — real Problem/Decisions/Outcome or Key Features/Impact copy, never placeholder text
- One motion curve (`cubic-bezier(0.16, 1, 0.3, 1)`) drives every transform/size transition in the system — Hero's entrance (`rise`, 700ms), the row reveal (500ms), and the chevron rotation (300ms); color transitions use Tailwind's default ease

## Colors

### Primary
- **Accent Green** (`#8fd6a8`): three jobs, no more. (1) Interaction state — link hover/focus-visible, the `::selection` highlight, icon hover on Contact channel rows and the project title arrow. (2) The expanded project row's active marking — the connector tick (`bg-accent` vs. resting `bg-line`), the chevron, and the toggle button's own text color all switch to accent together while `expanded` is true. (3) `StatusDot`'s filled state (`fill-accent`) — a static, non-interactive data affirmative meaning "this project has a full build log on file," rendered at rest in both Hero (system status) and every `ProjectRow` toggle.
- **Accent Green, Dim** (`#4b7a5d`): the resting-state companion — underline color on inline links before hover (`decoration-accent-dim`), scrollbar-thumb hover.

### Neutral
- **Panel Black** (`#0a0b0c`): the sole rendered background — body, nav bar (`bg-panel/95`).
- **Line** (`#232527`): every hairline — section seams, spine borders (`border-l`), project-row dividers (`border-b`), the connector tick at rest (`bg-line`), the flight-log inset border (`border-l`).
- **Ink** (`#f2f1ea`): headings, primary link/title text, active nav text, channel-row labels.
- **Ink Dim** (`#9a9d9f`): body copy, descriptions, flight-log prose, inactive nav text.
- **Ink Faint** (`#7a7d7f`): depth-tag labels, the resting toggle text/id/date line, tech-stack lines, bullet dots, footer copyright, resting icon color.

### Named Rules
**The Accent-as-Signal Rule.** Accent green is spent on exactly three things: interaction (hover/focus/selection), the one active utility line's marking (tick, chevron, toggle text while expanded), and the filled status dot as a binary data affirmative. It is never a background fill, never a static heading color, and there is no second accent hue. The distinction from the old "hover-only" rule matters: a resting filled `StatusDot` is accent by design (data, not decoration) — do not "fix" it to ink-faint.

## Typography

**Display/Body Font:** Space Grotesk, loaded via `next/font` as `--font-sans` (`app/layout.tsx`). Carries every heading and every sentence of prose on the page — Hero's h1, section headings, category headings, project titles, all body copy.

**Mono Font:** JetBrains Mono, loaded via `next/font` as `--font-mono` (`app/layout.tsx`), mapped in `tailwind.config.ts`. This is a scoped reintroduction, not the prior system's general type switch — mono is confined to three machine-sourced-fact sites, always small (10–12px) and never prose or a heading:
1. `DepthTag` — the rotated depth label (`font-mono text-[10px] uppercase tracking-widest text-ink-faint`; `tracking-widest` = 0.1em, scoped to this one site).
2. Hero's last-verified line (`font-mono text-xs tabular text-ink-faint`, normal tracking).
3. Each `ProjectRow`'s id + verified-date toggle (`font-mono text-xs tabular`, normal tracking) — note this one is NOT always ink-faint: it goes `text-accent` when its row is expanded, per the Accent-as-Signal Rule. Mono marks *what kind of content it is* (a machine-sourced fact), color marks *state*; the two are independent.

### Named Rules
**The Scoped Mono Rule.** JetBrains Mono renders exactly three things: the depth-tag label, the Hero verified-count timestamp line, and each project's id/date toggle. All three are small, tabular-leaning, machine-sourced facts. Mono never appears in a heading, in prose, or in a label larger than `text-xs`. Adding mono to a new element requires that element to be a similarly small, machine-sourced fact — not a stylistic accent.

### Hierarchy
- **Display** (Space Grotesk 500, `text-3xl`→`text-4xl`, `leading-[1.15]`): Hero's `<h1>`.
- **Section Heading** (500, `text-2xl`): "Work", "About", "Get in touch".
- **Category Heading** (500, `text-lg`, `text-ink-dim`): the four project-category sub-headers inside Work.
- **Title/Card Heading** (500, `text-xl`): each project row's title link.
- **Body** (400, `text-base`–`text-lg`, `leading-relaxed`): About's paragraphs, project descriptions, Contact's intro, flight-log problem/outcome copy.
- **Label** (500, `text-sm`, `uppercase`, `tracking-wide`): project-detail sub-headers only (`app/projects/[id]/page.tsx`, unchanged this session — "Problem", "Decisions", "Outcome", "Key features", "Impact", "Tech stack").
- **Meta** (400, `text-sm`, `text-ink-faint`): tech-stack lines, footer copyright, stack list in About.
- **Meta-Mono** (400, `text-[10px]`–`text-xs`, mono, `tabular` where numeric): depth tags, Hero verified line, project id/date toggle. See Scoped Mono Rule above.

## Layout

Every section shares one container: `max-w-3xl`, centered, `px-4 sm:px-6` gutters, wrapped again by a `border-l border-line pl-5` spine (the **spine gutter**, 20px, consistent across Hero/Work/About/Contact). The project-detail page (`app/projects/[id]/page.tsx`) is unchanged this session and remains the one narrower exception at `max-w-2xl`.

Sections stack full-bleed, separated by `border-t border-line`, `py-24` rhythm; nav is a fixed `h-16` bar. Inside each section's spine, a `DepthTag` sits absolutely positioned at `top-0`, rotated `-90deg` from its origin, in the spine's left margin — see Components below for why this is not a kicker.

Work's project rows and Contact's channel rows share the same divider idiom (`border-b border-line`, `first:pt-0 last:border-b-0`) but at different intervals: project rows are `py-8` (32px, the section's own rhythm), channel rows are `py-4` (16px, a tighter interval for the shorter contact list). Each project row additionally carries a `relative` position and an absolutely-positioned connector tick (`-left-5 top-[15px] h-px w-5`) that visually bridges the row to the spine — the tick's `w-5` exactly matches the spine's `pl-5` gutter, so a utility line reads as physically touching the spine rather than floating beside it.

Hero's verification band (`mt-8 max-w-xl border-y border-line py-4`, top-and-bottom hairline around the status line and last-verified line) is a single-use arrangement scoped to the Hero — it is not a reusable "banded" component; describe new similar bands by their `border-y` idiom directly rather than inventing a named component for one instance.

## Elevation & Depth

One flat background tone renders (`panel`, `#0a0b0c`). Depth is conveyed by two devices working together: the hairline `line` divider (unchanged from the prior system) and, new this build, the literal cutaway-spine metaphor itself — vertical `border-l` spines plus rotated depth labels stand in for a z-axis the flat color alone can't express. There are still no shadows, blur, or gradients anywhere in the shipped code.

### Named Rules
**The One Rendered Surface Rule.** Exactly one background tone is painted on the page (`panel`, `#0a0b0c`). Depth is expressed by hairline dividers and the cutaway-spine device, never by a second background fill, a shadow, or a blur.

## Shapes

No bordered cards, chips, or buttons. The only curved shapes are `rounded-full` bullet dots (`h-1 w-1`, `bg-ink-faint`) preceding flight-log "Decisions"/"Key features" list items, and the two `StatusDot` circles (filled `r=4` accent circle vs. outlined `r=3.25` ink-faint circle, `strokeWidth 1.25`) — both small SVGs, not icon-font glyphs. Borders are uniformly 1px solid `line`, except the connector tick and the active-state tick color, both described above.

## Components

### DepthTag (`components/DepthTag.tsx`)
A rotated (`-rotate-90`, `origin-top-left`), absolutely positioned (`-left-[9px] top-0`), uppercase mono `text-[10px]` label in `text-ink-faint`, `aria-hidden="true"`. Reads: "surface" (Hero), "shallow utility" (Projects), "deepest" (About), "resurfacing" (Contact). This is **not** a kicker/eyebrow: it sits outside the text column entirely (rotated into the spine's own margin, not stacked above a heading), carries no heading-pairing semantics, and is hidden from assistive tech. It is the cutaway's native margin annotation — a survey marking on the cross-section, not a label-above-title device. Do not generalize it into a horizontal eyebrow anywhere else in the system.

### StatusDot (`components/StatusDot.tsx`)
An 8×8 SVG circle, two states: filled accent (`fill-accent`) or outlined ink-faint (`stroke-ink-faint`, `strokeWidth 1.25`, no fill). This is a static data indicator, not an interaction or hover state — in Hero it always renders filled (verified-count line), and in each `ProjectRow` toggle it reflects whether `project.flightLog` exists (filled = full build log on file, outlined = summary only), with an SVG `<title>` carrying the distinction for assistive tech. Do not treat this component's accent fill as license to make other static UI accent — its rule (see Accent-as-Signal) is scoped to exactly this binary-data case.

### Utility Line (project row, `components/ProjectRow.tsx`)
The system's signature interactive pattern, replacing what would otherwise be a card. Structure: title link with trailing `ArrowUpRight` (accent on hover) → mono id/date toggle button with `StatusDot` and `ChevronDown` (whole toggle turns accent while expanded) → description → a `grid-template-rows` reveal (`0fr`→`1fr`, 500ms, `cubic-bezier(0.16,1,0.3,1)`) containing either flight-log Problem/Decisions/Outcome or Key Features/Impact, in a `border-l border-line pl-4` inset → tech-stack meta line with optional "source" link. The horizontal connector tick (`bg-line` resting, `bg-accent` expanded) is the visual joint between this line and the section spine.

### Links
- **Inline text link:** `text-ink`, `decoration-accent-dim underline-offset-4` at rest, brightening to `decoration-accent` on hover.
- **Action link:** `text-ink`, `text-sm font-medium`, no underline, paired with a Lucide arrow icon nudging `translate-x-1` on hover.
- **List/channel link:** `text-ink-dim`→`text-ink` (nav) or `text-ink`→`text-accent` (Contact channel icon+label together) on hover.

### Navigation & Footer
Fixed top bar, `bg-panel/95`, `border-b border-line`, `h-16`, `max-w-3xl` inner container, plain-text wordmark, no monogram. No spine, no depth tag — Navigation and Footer sit outside the cutaway metaphor as the page's fixed frame, not a stratum. `Navigation.tsx` carries no stray utility classes in the current tree.

## Do's and Don'ts

### Do:
- **Do** confine mono (JetBrains Mono) to the three scoped sites — depth tags, Hero's verified line, project id/date toggles — always small and always a machine-sourced fact. Do not use mono for a heading or a sentence of prose.
- **Do** use `border-l border-line pl-5` plus a `DepthTag` for any new full-width section that should read as part of the cutaway — this is the system's section-level pattern now, not just Hero/Work/About/Contact's private choice.
- **Do** spend accent green only on the three named jobs (interaction, active utility line, filled status dot). A new static element does not get accent green unless it is a genuine binary data affirmative like `StatusDot`.
- **Do** keep the connector-tick width (`w-5`) matched to the spine gutter (`pl-5`) if adding new lines crossing a spine — the visual join depends on the two values being equal.
- **Do** respect `prefers-reduced-motion` (`app/globals.css` collapses all animation/transition durations near-zero).

### Don't:
- **Don't** use a `max-height` or opacity-only accordion for a new in-place expansion — the system's technique is a `grid-template-rows` (`0fr`↔`1fr`) reveal, confirmed by `ProjectRow`'s existing implementation.
- **Don't** treat `StatusDot`'s resting accent fill as a general license for static accent color elsewhere — it is scoped to genuine binary data indicators, not decoration.
- **Don't** widen mono past the three scoped sites, and don't let it inherit the color rule from prose — the ProjectRow toggle's mono text still switches ink-faint→accent with expansion state; mono marks content type, not state.
- **Don't** add a second background/surface tone, a shadow, a blur, or a gradient — still a confirmed rejection of the prior AI-template look and of the flight-deck system, neither of which shipped or should be referenced as current.
- **Don't** box content in bordered cards — the structural unit is still the hairline divider plus, now, the spine/tick device for Work's utility lines specifically.
- **Don't** add a category filter/toggle to Work — categories remain a fixed-order stack of headings with no active/inactive UI.
- **Don't** turn `DepthTag` into a horizontal eyebrow/kicker pattern anywhere else — its whole identity is the rotated, margin-set, `aria-hidden` placement described above; a horizontal label above a heading is a different, uncanonized device.
- **Don't** treat `panel.face` (`#121315`, added to `tailwind.config.ts` this session) as an active token — grep confirms zero usages across `.tsx`/`.css` in the shipped tree. It is leftover/aspirational, not part of the system; the One Rendered Surface Rule stands as written above it.
- **Don't** treat `lib/projects.ts`'s `image`/`icon` emoji fields or `color: 'from-...-...'` gradient strings as design-system material — neither is rendered by `ProjectRow` or `Projects.tsx`; they are dead legacy data from an earlier data shape, not a glyph-icon or gradient rule for this system.

---
name: Oren Segal Portfolio
description: Plain, dense, specific — a near-black engineer's page that earns trust with prose and proof, not costume.
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
spacing:
  section-y: "96px"
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
---

# Design System: Oren Segal Portfolio

## Overview

There is no governing metaphor. The previous system ("The Night Flight-Deck") staged the page as cockpit instrumentation — gauges, plate-numbered cards, a boot sequence — and that costume is fully retired. The current build earns trust the way a well-run engineer's own writing does: plain, dense, specific prose, with hierarchy carried by size, weight, and measure rather than by decorative skin. Differentiation lives in information architecture (projects grouped by category, with the projects that have a real build narrative getting inline depth), not in a themed visual device layered on top.

The palette is near-black with warm off-white ink and a single restrained green accent spent almost entirely on hover and link state — never as a fill, a section color, or a badge. One workhorse sans face (Space Grotesk) carries both display and body text at two weights; there is no separate mono face anywhere in the shipped code. Structure is plain hairline dividers between stacked sections and list rows — there is no bordered-card chrome, no tonal surface stack, no shadows, gradients, or blur. This is a direct, confirmed rejection of the site's prior AI-template look (PRODUCT.md's Brand Commitments name the anti-reference explicitly: violet/cyan gradients, glassmorphism, floating blur orbs, gradient text, bounce easing, generic "Sparkles" badges) and, separately, of the flight-deck metaphor that replaced it.

**Key Characteristics:**
- Near-black ground (`#0a0b0c`), warm off-white ink (`#f2f1ea`), no gradients, no tonal surface stack — depth comes from hairline dividers only, not layered panels
- One accent (`#8fd6a8`) restricted to underline/hover/focus/selection state, never a fill or a headline color
- One type family (Space Grotesk) at two weights (400 body, 500 display/label) — no mono face
- Plain `border-b` list rows and section seams stand in for cards; nothing is boxed
- A single entrance motion (`rise`, fade + 10px translate, 700ms) used once, on the Hero, not as a page-wide pattern

## Colors

The palette is almost entirely neutral; the one accent hue is spent sparingly, as a signal for interactive/live state rather than as decoration.

### Primary
- **Accent Green** (`#8fd6a8`): link hover/focus state (Hero's GitHub link, project "source" links, project title arrows, Contact channel rows), the `::selection` highlight, and the `:focus-visible` outline (`app/globals.css`). It never appears at rest as a fill or as static text color.
- **Accent Green, Dim** (`#4b7a5d`): the resting-state companion — the underline decoration color on inline links before hover (`decoration-accent-dim`) and the scrollbar-thumb hover color.

### Neutral
- **Panel Black** (`#0a0b0c`): the sole background — `body`, the nav bar (`bg-panel/95`), and the scroll-to-top button. There is no second, raised surface tone; the build does not use a `panel-face` step (the token was defined once in the old system and is not carried forward — no component references it).
- **Line** (`#232527`): every hairline border — section seams (`border-t border-line`), list-row dividers (`border-b border-line`), nav border, scrollbar track/thumb-rest. The one border color in the system.
- **Ink** (`#f2f1ea`): headings, primary link text, active nav text.
- **Ink Dim** (`#9a9d9f`): body copy, project descriptions, inactive nav text, list-row default text.
- **Ink Faint** (`#7a7d7f`): the dimmest tier — tech-stack lines, timestamps ("updated Mon Year"), uppercase sub-headers on the project detail page, footer copyright, icon default color.

### Named Rules
**The Accent-as-State Rule.** Accent green marks interaction, not identity: link hover, focus-visible, text selection, and icon hover. It never sits on a heading, a section label, or any element at rest. If a new element isn't being hovered, focused, or selected, it does not get accent green.

## Typography

**Display Font:** Space Grotesk (with sans-serif fallback)
**Body Font:** Space Grotesk (with sans-serif fallback) — the same face at a lighter weight; there is one `font-sans` family loaded via `next/font`, no second face.

**Character:** A single geometric sans does every job on the page — headline, body, label, and numeral. The build deliberately carries no mono face; the prior system's IBM Plex Mono (plate IDs, tabular readouts) was retired along with the instruments it labeled.

### Hierarchy
- **Display** (500, `text-3xl` → `text-4xl`, tight `leading-[1.15]`): the Hero `<h1>` — two sentences of prose stating what Oren builds. This is the largest, boldest text on the page; there is no separate, smaller "name placard" — the old system's rule that the name stays smaller than section headers is gone along with the instruments it deferred to.
- **Section Heading** (500, `text-2xl`): "About", "Work", "Get in touch" — the section openers.
- **Category Heading** (500, `text-lg`, `text-ink-dim`): the four project-category sub-headers ("AI Agents", "AI Infrastructure", "Data Engineering", "Developer Tools") inside Work.
- **Title/Card Heading** (500, `text-xl`): each project row's title link.
- **Body** (400, `text-base`–`text-lg`, relaxed `leading-relaxed`): About's narrative paragraphs, project descriptions, Contact's intro line, flight-log problem/outcome copy.
- **Label** (500, `text-sm`, `uppercase`, `tracking-wide`): the project-detail sub-headers only ("Problem", "Decisions", "Outcome", "Key features", "Impact", "Tech stack") — the sole uppercase-tracked text in the system, confined to that one page.
- **Meta** (400, `text-sm`, `text-ink-faint`): tech-stack lines, "updated" timestamps, footer copyright, stack list in About.

### Named Rules
**The One Face Rule.** Every piece of text on the page — headline, body, label, numeral — is Space Grotesk at 400 or 500. There is no mono face and no third family; hierarchy comes from size and weight, never from a costume type switch.

## Layout

Nearly every section shares one container: `max-w-3xl`, centered, with `px-4 sm:px-6` gutters (nav, Hero, About, Work, Contact, Footer). The project-detail page is the one narrower exception at `max-w-2xl`, with prose further capped at `max-w-xl`/`max-w-2xl` inside it. There is no `lg:` gutter step anywhere in the shipped code — don't add one without new evidence.

Sections stack full-bleed and are separated by a hairline `border-t border-line` — there is no card-in-card frame; the line itself is the seam. Section vertical rhythm is a consistent `py-24`; the footer is `py-10`; the nav is a fixed `h-16` bar. Inside Work and Contact, list rows repeat the same divider idiom at a tighter interval — `border-b border-line py-8`, with `first:pt-0 last:border-b-0` so the divider never doubles against the section border above or beneath it. This idiom appears at two independent sites (`Projects.tsx`, `Contact.tsx`) and is the system's one reusable list pattern.

Work's category grouping is a single vertical stack of stacked lists, not a grid or a filterable toggle — projects are grouped by category heading, in a fixed order, with no active/inactive filter UI. Project-detail's Key Features/Impact/Tech Stack pair sits in a `sm:grid-cols-2` two-column layout; everything else on the page is single-column.

## Elevation & Depth

This system has no shadows, no blur, no gradients, and no tonal surface stack. Depth is conveyed by a single hairline divider color (`line`, `#232527`) against one flat background (`panel`, `#0a0b0c`) — there is no second, lighter background tone anywhere in the shipped code. This is flatter than the retired flight-deck system, which layered a three-step tonal stack (`panel` → `panel-face` → recessed readout); that middle "raised card" tone did not carry forward into this world.

### Named Rules
**The One Surface Rule.** There is exactly one background tone on the page. Depth is a 1px `line` divider, never a lighter panel, a shadow, or a blur. If a new component wants to read as "elevated," give it a divider, not a fill.

## Shapes

There are no bordered cards, chips, or buttons to describe a radius strategy for — the build has no `rounded-*` corner language in active use. The only literal curved shapes are small bullet dots (`rounded-full`, `h-1 w-1`, `bg-ink-faint`) preceding each item in the project-detail "Decisions" and "Key features" lists. Borders are uniformly 1px solid `line`; dividers run the width of their container.

## Components

There is no button, card, or chip component library in this build. Interactive elements are plain text links and icon-accompanied text links; structure comes from spacing and dividers, not boxed containers.

### Links
- **Inline text link (in-sentence):** `text-ink`, underlined with `decoration-accent-dim underline-offset-4`, brightening to `decoration-accent` on hover — used for the Hero's GitHub-percentage link and each project's "source" link.
- **Action link (standalone, e.g. "See the work," "Get in touch," "Go home"):** `text-ink`, `text-sm font-medium`, no underline at rest, paired with a Lucide arrow icon (`ArrowRight`/`ArrowUpRight`/`Home`) that nudges `translate-x-1` on hover via `group-hover`.
- **List link (nav, back-link, footer icon):** `text-ink-dim` default → `text-ink` on hover, `transition-colors`, no underline.

### List Rows (signature pattern)
- **Style:** `border-b border-line py-8`, `first:pt-0 last:border-b-0` — used identically for project rows in Work and channel rows in Contact. This is the system's one reusable structural component in place of a card.
- **Contact channel row:** icon (`text-ink-faint` → `text-accent` on hover) + label (`text-ink` → `text-accent` on hover), both transitioning together as one hover target.
- **Project row:** title link with trailing arrow, description, optional flight-log excerpt (Problem/Outcome only, in a `border-l border-line pl-4` inset — the one place a border runs vertically rather than horizontally), then a meta line of tech stack + optional source link.

### Navigation
- Fixed top bar, `bg-panel/95`, `border-b border-line`, `h-16`, `max-w-3xl` inner container. Wordmark is plain text ("Oren Segal," `text-sm font-medium`, no monogram mark). Links are `text-sm text-ink-dim` → `text-ink` on hover, no underline. Mobile collapses to an inline stacked menu under the same bar, no overlay or blur behind it.
- Carries a leftover `backdrop-blur-0` utility class (a no-op paired with the semi-transparent `bg-panel/95`) — this is inert leftover markup, not a blur treatment; do not read it as license to add backdrop blur anywhere, and don't carry it forward if the nav is touched again.

### 404 Page
- `404` (`text-lg font-medium text-ink-faint`) sits directly above the `<h1>` ("Page not found"). This reads as an eyebrow-shaped arrangement but is scoped to this one error screen's numeral-then-heading pairing, not a documented kicker/label-above-heading pattern — do not generalize it into a reusable eyebrow component elsewhere in the system.

## Do's and Don'ts

### Do:
- **Do** keep accent green (`#8fd6a8`/`#4b7a5d`) restricted to interaction state — hover, focus-visible, selection, and the resting underline decoration on inline links. Everywhere else, use ink/ink-dim/ink-faint.
- **Do** keep the page to one background tone (`panel`, `#0a0b0c`) and convey structure with `line` (`#232527`) dividers only.
- **Do** set body copy in Space Grotesk 400 and headings/labels in 500 — do not introduce a second or third type family, including a mono face, for numerals or labels.
- **Do** use the `border-b border-line py-8 first:pt-0 last:border-b-0` divider idiom for any new repeating list of items (projects, channels, etc.) rather than inventing a bordered card.
- **Do** respect `prefers-reduced-motion`: `app/globals.css` collapses all animation/transition durations to near-zero and sets `scroll-behavior: auto` when it's set.
- **Do** reserve uppercase, tracked labels (`text-sm uppercase tracking-wide text-ink-faint`) for the project-detail sub-headers pattern (Problem/Decisions/Outcome/Key features/Impact/Tech stack); it is not used as a general kicker or eyebrow elsewhere on the site, and new eyebrow-style labels should not be added — the 404 page's numeral-above-heading is a one-off, not a precedent.

### Don't:
- **Don't** introduce gradients, glassmorphism/backdrop-blur, drop shadows, or a second background tone — this build is a confirmed, explicit rejection of the site's prior AI-template look (violet/cyan gradients, glassmorphism, floating blur orbs, gradient text, bounce easing — per PRODUCT.md's Brand Commitments) and of the flight-deck system that followed it.
- **Don't** add a second accent hue or use accent green as a fill, a headline color, or a static (non-hover) text color.
- **Don't** revive the retired instrumentation system — `GaugeDial`/`ReadoutWindow`/`StatusFlag` (`components/Instruments.tsx`), the boot sequence (`lib/boot.ts`), the `settle`/`flag-drop` keyframes, IBM Plex Mono, or the `panel-face`/`bezel`/`signal`/`caution` tokens are gone from the shipped code; do not reintroduce them or reference them as current.
- **Don't** box content in bordered cards. The system's structural unit is a hairline divider between stacked rows/sections, not a panel.
- **Don't** add a category filter/toggle to Work — projects are grouped by fixed category headings in document order, with no active/inactive UI state to maintain.
- **Don't** treat the leftover `backdrop-blur-0` class on Navigation as a blur treatment to extend, and don't turn the 404 page's numeral-above-heading arrangement into a reusable eyebrow/kicker component — neither is a system rule, both are as-shipped artifacts of their one screen.

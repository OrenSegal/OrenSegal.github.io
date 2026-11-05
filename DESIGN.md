---
name: Oren Segal Portfolio
description: Metro typographic tiles on pure black. Giant light lowercase headlines cropped off the right edge, flat charcoal and cobalt tiles as the only doors, one sodium-orange strike for the chosen value, zero chrome.
colors:
  panel: "#000000"
  panel-face: "#141414"
  line: "#1f1f1f"
  ink: "#ffffff"
  ink-dim: "rgba(255,255,255,0.72)"
  ink-faint: "rgba(255,255,255,0.45)"
  ink-ghost: "rgba(255,255,255,0.5)"
  accent: "#ff8c1a"
  accent-dim: "#b35f12"
  field: "#1b3ac4"
typography:
  display:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "12.5vw"
    fontWeight: 300
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "6rem"
    fontWeight: 300
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  struck-figure:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "7rem"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.04em"
  tile-title:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  action:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  mono-demo:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "normal"
spacing:
  gutter: "8px"
  tile-pad: "16px"
  tile-pad-lg: "24px"
  section-top: "96px"
  section-top-lg: "128px"
  container: "1152px"
  read-measure: "672px"
  nav-h: "64px"
components:
  tile-live:
    backgroundColor: "{colors.panel-face}"
    textColor: "{colors.ink}"
    padding: "16px"
  tile-live-struck:
    backgroundColor: "{colors.panel-face}"
    textColor: "{colors.accent}"
    padding: "16px"
  tile-cobalt:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    padding: "20px"
  tile-link:
    backgroundColor: "{colors.panel-face}"
    textColor: "{colors.ink}"
    padding: "16px"
  tile-link-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.panel}"
  struck-row-ghost:
    textColor: "{colors.ink-ghost}"
    typography: "{typography.body}"
    padding: "4px 0"
  struck-row-lit:
    textColor: "{colors.accent}"
    typography: "{typography.body}"
    padding: "4px 0"
  action-link:
    textColor: "{colors.ink}"
    typography: "{typography.action}"
  action-link-hover:
    textColor: "{colors.accent}"
  nav-link:
    textColor: "{colors.ink-dim}"
    typography: "{typography.action}"
  nav-link-hover:
    textColor: "{colors.accent}"
  link-inline:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  link-inline-hover:
    textColor: "{colors.accent}"
---

# Design System: Oren Segal Portfolio — Metro Typographic Tiles

## Overview

**Creative North Star: "The Type Is the Interface"**

This system replaces the retired "Utility Cutaway" (spines, depth tags, green accent; do not resurrect its rules) with one world: Metro's typographic tiles. The ground is pure black (`panel`). Every section opens with a giant, light, lowercase Urbanist word set so large that on desktop the Hero headline runs off the right edge on purpose; the crop is the promise of a next pane. Beneath each word the content sits in flat charcoal tiles (`panel-face`) separated only by an 8px black gutter. There is no chrome: no borders, rules, gradients, box-shadows or blur on the home page. Grouping is adjacency.

The struck cathode stack lends exactly one discipline, the ghost/struck state. In the benchmark tile every one of the seven real settings is present as an unlit ghost (`ink-ghost`) and the cheapest-equal one is struck forward in sodium orange with the system's only glow. The same orange is the only live colour anywhere: the struck title of a hovered tile, hovered link, focus ring, selection, scrollbar thumb on hover, caret, and the positive mark in a tile's data demonstration. The footer states the rule in the page's own voice: "orange marks a struck value, nothing else." Transit cobalt (`field`) floods tiles only when the tile's content is Shelfie-derived (the Shelfie tile and the llm-gateway-kit tile); it is content, never decoration.

Mono is JetBrains Mono at 12px (11px inside a data demonstration) and marks machine-sourced figures: dates, costs, pass rates, run counts, availability line. Inside a tile it is always the last line. Motion is one ease (`cubic-bezier(0.16, 1, 0.3, 1)`) for the headline's glide in from the right; everything after that is colour and opacity. A hovered or focused live tile strikes its title and swaps its foot line for the verified strip by opacity; nothing the visitor is reading moves. A press scales the tile 1%. `prefers-reduced-motion` disables all of it.

**Key Characteristics:**
- Pure black ground (`panel`), charcoal tiles (`panel-face`), one 8px gutter; no second structural device
- Giant light lowercase headlines: `12.5vw` desktop / `19vw` two-line phone for the Hero; `6rem` desktop / `16vw` phone for section words; all at `line-height 0.92`, `-0.04em`
- Sodium orange (`accent`) is the only live colour and owns every struck state; the `.struck` text-shadow is the only glow
- Transit cobalt (`field`) floods exactly two content tiles (Shelfie, llm-gateway-kit); no other tile is coloured at rest
- Ghost/struck: all alternatives present at `ink-ghost`, the chosen one struck orange; hover lights a row, leave returns the chosen row
- JetBrains Mono 12px for machine-sourced figures only, always the foot of a tile
- Live tiles size to their content: title, two-sentence blurb, an optional figure copied from the repo, and a mono foot that becomes the verified strip (CI badge, push date, link) on hover or focus

## Colors

A black field with white ink at three alphas, one hot orange and one cold cobalt.

### Primary
- **Sodium Orange** (`accent`): every struck state. The lit benchmark row and the `25x` figure (with the `.struck` glow), a hovered or focused live tile's title (same glow) and its verified strip, tile and link hover, the 2px `:focus-visible` outline, `::selection`, scrollbar-thumb hover, caret. In a tile's data demonstration it marks the positive result only: a killed mutant (litmus has none), a caught planted bug, the MRR point estimate. Never a resting fill on content, never a heading colour at rest.
- **Sodium Orange, Dim** (`accent-dim`): the underline colour on inline prose links at rest (About, ProjectDetail, writing pages); brightens to `accent` on hover.

### Secondary
- **Transit Cobalt** (`field`): a flat content flood. Fills the Shelfie tile and the llm-gateway-kit live tile, both because their content derives from Shelfie. It marks what a tile is about; it is not a hover state, not a category colour, and not available for decoration.

### Neutral
- **Panel Black** (`panel`): body background, the gutter between tiles, nav bar (`bg-panel/95`), scrollbar track, the text colour on any orange surface, and the "could not run" cell in the litmus mutant grid.
- **Panel Face** (`panel-face`): the only tile surface. Every charcoal tile (struck stack, live tiles, About, Contact, "all repos", scroll-to-top button, scrollbar thumb) and the 77-84% band in the results chart.
- **Line** (`line`): one hairline, used once, as the `border-t` above the appendix note on the benchmark writing page. A Read-mode exception, not a home-page device.
- **Ink** (`ink`): headlines, tile titles, action links, wordmark, the "single agent" cost bar and the MRR interval line in demonstrations.
- **Ink Dim** (`ink-dim`): prose, tile blurbs, nav links at rest, ghost rows on hover.
- **Ink Faint** (`ink-faint`): the mono foot of every tile, demonstration labels and captions, tech-stack line, footer, detail-page sub-headers, footer and ProjectDetail icons at rest.
- **Ink Ghost** (`ink-ghost`): the unlit benchmark rows, the "orchestrator" cost bar, and the survived-mutant and uncaught cells in demonstrations: present-but-not-chosen. It sits at 0.5 alpha, between dim and faint; do not "fix" it to faint.

### Named Rules
**The One Live Colour Rule.** Orange is the only colour that responds. It is spent on struck states (chosen value, hover, focus, selection) and on the positive mark of a figure whose alternatives are shown as ghosts. If something is orange at rest, it must be the chosen value of a set whose alternatives are visible as ghosts.

**The Content Flood Rule.** Cobalt floods a tile only because of what the tile contains (Shelfie-derived work). Two tiles carry it. A third needs the same content reason, not a layout one.

## Typography

**Display/Body Font:** Urbanist (with `sans-serif` fallback), loaded via `next/font` as `--font-sans`; weights 300, 400, 500 are used (600 is loaded but unrendered).
**Mono Font:** JetBrains Mono (with `monospace` fallback), loaded via `next/font` as `--font-mono`.

**Character:** Light Urbanist at giant sizes is the identity; the same face at 400 carries prose and at 500 carries lowercase actions. Mono is small and factual and never leads.

### Hierarchy
- **Display** (300, `12.5vw` desktop single line / `19vw` two lines on phones, `0.92`, `-0.04em`, lowercase): the Hero headline "applied ai engineer". On desktop it is `white-space: nowrap` inside an `overflow-hidden` section so the last letters crop off the right edge at 1280-1600 wide.
- **Headline** (300, `6rem` from `sm` / `16vw` below, `0.92`, `-0.04em`, lowercase): the section words "work", "about", "contact".
- **Struck Figure** (300, `7rem` desktop / `5.5rem` phone, `1`, `-0.04em`, `.struck`): the `25x` in the benchmark tile; the unit "x" is `0.55em`.
- **Tile Title** (300, wide tiles `2.25rem`-`3rem`, standard tiles `1.875rem`-`2.25rem`, `1`, `-0.03em`, lowercase): the project name on every live tile, "shelfie", "all repos", and the ProjectDetail h1. On a live tile it goes `accent` with the glow on hover or focus-visible.
- **Body** (400, `1rem`-`1.125rem`, `1.625`): About prose, writing-page prose (`1.125rem`), detail-page copy. Tile blurbs are `0.875rem` (wide tiles `1rem`, `max-w-xl`) at `leading-snug`, `mt-2` under the title. Measure is capped at `max-w-xl` (576px) in tiles and `max-w-2xl` on Read pages.
- **Action** (500, `0.875rem`, lowercase on the home page): "read the benchmark", "resume", "github", nav links, the wordmark. Contact tile labels are the same weight at `1.5rem`.
- **Mono** (JetBrains Mono 400, `0.75rem`, `tabular-nums` where numeric): machine-sourced figures. Sites: the Hero availability line, the struck-stack rows' pass rate and cost, the "rootcause · 525 graded runs · 7 settings" foot, every live tile's "category · updated {date}" foot and its hover-state verified strip ("pushed {date} · open the build log →" in `accent`), "founder · ios · closed beta", the footer, results-table headers and figures, writing-page datelines.
- **Mono Demo** (JetBrains Mono 400, `11px`, `leading-snug`, `ink-faint`, `tabular-nums`): the labels, axis figures and captions inside a tile's data demonstration.

### Named Rules
**The Foot-of-Tile Rule.** Inside a tile, mono is the last line. It never sits above a heading, never sets a heading, never carries a sentence of prose. Mono tells the reader a figure came from a machine (build-time GitHub stats, committed benchmark results, a repo's own README), not from copy.

**The Lowercase Rule.** Every headline, tile title, action and nav item on the home page is lowercase and light (300) or medium (500). Writing-page and detail-page h1/h2 may set 500 at `1.875rem`-`2.25rem` in sentence case; that is the Read-mode register, not the home page's.

## Layout

One container, `max-w-6xl` (1152px) centred with `px-4 sm:px-6` gutters, carries nav, every home section and the footer. Read pages (ProjectDetail, both writing pages) narrow to `max-w-2xl` (672px). The nav is a fixed `h-16` bar in `panel/95`; the Hero starts at `pt-24 sm:pt-32` beneath it and every following section repeats that top rhythm (`pt-24 sm:pt-32`), Contact adding `pb-24`. The footer is `py-10`.

Tiles sit in a CSS grid with an 8px gap (`gap-2`) and no outer border. Hero: `md:grid-cols-2`, the struck stack and the Shelfie tile side by side, both `h-full`. Work: `md:grid-cols-4` with `grid-auto-flow: dense`; live tiles carry no fixed aspect ratio, rows size to content, a featured project spans two columns (`md:col-span-2`) and carries the data demonstration where one exists, and the "all repos" tile (`min-h-[14rem]`) closes the wall. About: two `md:col-span-2` tiles (prose, toolkit). Contact: four `md:aspect-[3/2]` tiles. Below `md` (768px) Hero, Work and About collapse to a single column; Contact keeps two columns of square tiles on phones. Tile padding is `p-4 sm:p-5` on live and contact tiles and `p-5 sm:p-6` on the Hero and About tiles. Inside a live tile the foot is pushed down with `mt-auto pt-5`; the verified strip is absolutely positioned over the meta line so the swap changes nothing in the flow.

Entrance: the Hero headline glides in from `translateX(48px)` over 900ms (`animate-glide`); nothing else animates on load.

## Elevation & Depth

Flat. There are no box-shadows, no blur, no gradients and no second tonal layer beyond the single tile surface (`panel-face`) on black (`panel`). Depth is tile adjacency; the only transform after load is the 1% press scale (`.tile:active { transform: scale(0.99) }`). The one luminous device is the `.struck` text-shadow (`0 0 24px rgba(255,140,26,0.45)`) on the lit benchmark row and figure and on a hovered live tile's title, and it signals a chosen value, not elevation.

### Named Rules
**The One Glow Rule.** The only glow in the system is the `.struck` text-shadow on a struck value. No box-shadow, drop-shadow, blur or gradient anywhere; a tile is flat charcoal, cobalt, or orange.

## Shapes

Hard corners everywhere on the home page: tiles, buttons, the scroll-to-top square, the scrollbar thumb (`border-radius: 0`), the 4px square list bullets in the Shelfie tile (`h-1 w-1 bg-current`), the `h-1.5` cost bars and the 20px square cells of the mutant and planted-bug grids. No borders. The one round shape on the home page is the 8px `rounded-full` point marker in the MRR interval demonstration, matching the results chart's markers. On Read pages: ProjectDetail bullets are `rounded-full` 4px dots, the results chart's pass-rate markers are `rounded-full` 8px dots (orange for the chosen row, white otherwise) with `rounded-r-sm` cost bars, and the benchmark writing page draws one `border-t` in `line` above its appendix. An interval point is round; a count or a bar is square.

## Components

### Live Tile (`components/LiveTile.tsx`)
The system's signature. A `Link` with `.tile`, `flex flex-col p-4 sm:p-5`, `panel-face` (or `field` when `tone: 'cobalt'`), `md:col-span-2` when featured. At rest, top to bottom: light lowercase title (`.tile-title`), the two-sentence `blurb` at `mt-2` in `ink-dim`, an optional `TileDemo` on featured tiles, then the `.tile-foot` (`mt-auto pt-5`) holding the mono meta line "category · updated {date}" in `ink-faint`. On hover or `:focus-visible` the title goes `accent` with the `.struck` glow (200ms) and the meta line fades out (250ms) while the verified strip (`.tile-live`, absolute over the foot, `aria-hidden`) fades in: the live CI badge `<img>` at 20px and "pushed {date} · open the build log →" in mono `accent`. `:active` scales the tile to 0.99. The global 2px orange `:focus-visible` outline applies. The `aria-label` carries title, blurb and updated date. Reduced motion collapses the transitions; the hover states still apply instantly.

### Tile Demo (`components/TileDemo.tsx`)
A data-only figure rendered inside a featured live tile when its repo publishes a number; projects without one get nothing. Four exist: rootcause's single-vs-orchestrator cost bars (`h-1.5` bars, `ink` single, `ink-ghost` orchestrated, 300 runs), litmus's twelve 20px mutant cells (`ink-ghost` survived, `panel` could-not-run, `accent` would mark a kill and there are none), rag-generation's MRR paired-difference interval (`ink-faint` zero line, `ink` interval, `accent` round point), and signal-scout's three planted-bug cells (`accent` caught). Each is a `<figure>` at `mt-4` with an `aria-label`, mono-demo 11px labels and a `figcaption` in `ink-faint`. Every number is copied from the named source and commented in the file.

### Struck Stack (`components/StruckStack.tsx`)
A `panel-face` tile holding the `25x` struck figure beside a one-line claim, then seven `<button aria-pressed>` rows, one per benchmark setting. Rows are `ink-ghost` at rest, `ink-dim` on hover, and the lit row (initially `CHOSEN_INDEX`) carries `.struck`. Hover or focus lights a row (`setLit`), mouse-leave or blur-out returns the chosen row. Each row is label (body `0.875rem`) plus a mono pass-rate and cost pair in `tabular-nums`. An `aria-live="polite"` sentence beneath restates the lit row. Foot: mono "rootcause · 525 graded runs · 7 settings". Colour transitions 200ms.

### Cobalt Tile (`components/ShelfieTile.tsx`)
A `field` anchor tile: light lowercase `shelfie` at `2.25rem`-`3rem`, one-line description, four square-bulleted points, "shelfie.food →" at 500, mono foot "founder · ios · closed beta" in `ink-dim`. On hover the whole tile goes `accent` with `panel` text and the secondary text drops to `panel/80` and `panel/70`.

### Link Tiles (Contact, "all repos", scroll-to-top)
`panel-face` anchors or buttons that invert to `accent`/`panel` on hover (`transition-colors`). Contact tiles: a Lucide icon at 20px top-left, then label at `1.5rem` 500 and value at `0.875rem` `ink-dim` bottom-left, `justify-between`. "all repos": `min-h-[14rem]`, title at tile-title size, "github.com/OrenSegal →", mono foot "everything else". Scroll-to-top: fixed `bottom-8 right-8`, `p-3`, `ArrowUp` at 20px, `ink-dim`.

### Links
- **Action link:** `ink`, `0.875rem`, 500, lowercase on the home page, `hover:text-accent`. Hero's three actions, "read the benchmark →".
- **Inline prose link:** `ink` (or inherited `ink-dim` in the toolkit list), `underline decoration-accent-dim underline-offset-4`, hover to `accent` text and `accent` underline. About, ProjectDetail, both writing pages. The results-source link brightens to `ink`, not `accent`.
- **Back link (Read pages):** `ink-dim` `0.875rem` with a 14px `ArrowLeft` that nudges `-0.5` on hover; hover to `ink`.

### Navigation (`components/Navigation.tsx`)
Fixed `h-16` bar at `panel/95`, no border. Wordmark "oren segal" at `0.875rem` 500 lowercase `ink`. Desktop items `0.875rem` `ink-dim`, `hover:text-accent`, `gap-8`. Below `md` a `Menu`/`X` Lucide toggle opens a `panel` panel listing the items at `1.5rem` light lowercase `ink`, `py-2`.

### Footer (`components/Footer.tsx`)
One mono line in `ink-faint` (copyright, city, and the colour rule) with three 16px Lucide icons at `ink-faint`, `hover:text-accent`.

### Results Chart (`components/RootcauseResults.tsx`, Read page only)
A `<table>` with mono `ink-faint` headers, body rows in `ink-dim`, a `panel-face` band at 77-84%, a 1px `ink-dim` interval line, 8px round markers (`accent` for the chosen row, `ink` otherwise), and `ink-faint` cost bars. Figures beneath each cell in mono `tabular-nums`.

## Do's and Don'ts

### Do:
- **Do** open every home-page section with one giant light lowercase word (`6rem` desktop / `16vw` phone, `0.92`, `-0.04em`) and keep the Hero headline at `12.5vw` nowrap so it crops off the right edge on desktop.
- **Do** build every new home-page surface as a flat `panel-face` tile in the `gap-2` grid, `p-4 sm:p-5` or `p-5 sm:p-6`, sized to its content, with the title at the top, a blurb at `mt-2`, the foot pushed down with `mt-auto`, and the mono figure as the last line.
- **Do** spend orange only on struck states: hover, focus, selection, the chosen value of a visible set, and the positive mark in a figure whose alternatives are ghosts.
- **Do** show every alternative as an `ink-ghost` row or cell when presenting a chosen value, and return the chosen row to lit on mouse-leave or blur-out.
- **Do** use JetBrains Mono at `0.75rem` (`11px` inside a demonstration) for any figure a machine produced (dates, costs, pass rates, counts) and nothing else.
- **Do** keep motion to the one ease `cubic-bezier(0.16, 1, 0.3, 1)` for the 900ms headline glide, 200-250ms colour and opacity transitions for hover states, and the 1% press scale; honour `prefers-reduced-motion`, which collapses the durations.
- **Do** flood a tile cobalt (`field`) only when its content is Shelfie-derived, via `tone: 'cobalt'` in `lib/projects.ts`.
- **Do** give a tile a data demonstration only when its repo publishes the figure, copy the number verbatim, and name the source in a comment; a project without a published figure gets no demo.

### Don't:
- **Don't** add borders, hairline rules, gradients, box-shadows or blur on the home page, and no border-radius beyond the 8px interval point; the single `line` hairline and the round chart dots are Read-page exceptions.
- **Don't** colour a heading, a resting tile or a resting link orange unless it is the struck value of a set whose ghosts are visible.
- **Don't** add a second accent hue, a hover colour other than orange, or a second tile surface tone.
- **Don't** place mono above a heading inside a tile, set a heading in mono, or set prose in mono.
- **Don't** set a home-page headline, tile title or nav item in Title Case or at weight 600; the loaded 600 weight is unrendered.
- **Don't** reintroduce the retired cutaway devices (left-border spines, rotated depth tags, connector ticks, green accent), the "hero sentence plus card list" shape, or the removed 3D tile flip; a hover state changes colour and opacity, never the position of text being read.
- **Don't** bounce or spring; the headline glides once and nothing else translates.
- **Don't** give a tile a fixed aspect ratio that clips its blurb or demonstration.
- **Don't** treat `lib/projects.ts`'s `image`, `icon` or `color` gradient fields as design material; none renders.

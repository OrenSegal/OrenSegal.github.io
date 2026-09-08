---
name: Oren Segal Portfolio
description: A night flight-deck instrument panel — trust earned by calm, cross-checking instruments, not a glowing SaaS hero.
colors:
  panel: "#0a0b0c"
  panel-face: "#131417"
  bezel: "#2b2e33"
  ink: "#f2f1ea"
  ink-dim: "#95989c"
  ink-faint: "#5b5e63"
  signal: "#7cfa9a"
  signal-dim: "#3f7a52"
  caution: "#f5a623"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.15em"
  readout:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  none: "0px"
  dot: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section-y: "80px"
components:
  button-verified-action:
    backgroundColor: "{colors.panel-face}"
    textColor: "{colors.signal}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-verified-action-hover:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.panel}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  filter-toggle-active:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.panel}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  filter-toggle-inactive:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
---

# Design System: Oren Segal Portfolio

## Overview

**Creative North Star: "The Night Flight-Deck"**

The page is instrumentation, not marketing chrome: a matte near-black panel carrying hairline-bezeled gauges, readout windows, and plate-numbered cards that report real values (8 shipped projects, 100% open source, a role, a location, a focus) and hold still once they've settled. Trust is built the way a pilot trusts a cockpit — by instruments that agree with each other and don't editorialize — not by a glowing SaaS hero making a claim. This is the explicit anti-reference to the AI-template-generated dark/purple-gradient/glassmorphism look the site previously shipped (see PRODUCT.md Brand Commitments): no violet/cyan gradients, no glass or blur, no bounce easing, no decorative sparkle.

Density is calm and instrument-panel-literal: every card carries a plate label (`INST-01`, `PLATE 03`) before its content, uppercase mono labels sit beneath every gauge and field, and section headers borrow flight-deck vocabulary (Flight Log, Manifest, Radio Panel, Pre-flight Checklist) as the page's own diegetic voice rather than generic SaaS section names.

**Key Characteristics:**
- Matte near-black ground with three flat tonal steps (panel / panel-face / recessed readout), never a gradient
- One restrained signal-green accent reserved for verified/live state, never decorative
- Aviation-style mono numerals and placard-caps labels on every instrument
- Square hairline-bordered panels throughout; the only curves are small indicator dots
- A single settle-in motion vocabulary (one easing curve, no overshoot) for every state change

## Colors

The palette is almost entirely neutral (near-black ground, warm-white ink, mid-gray bezel); color is spent on exactly two semantic signals, never on decoration.

### Primary
- **Signal Green** (`#7cfa9a`): the "verified/live" signal. Restricted to `StatusFlag`'s ok state (dot + border + text), the active category filter toggle in All Projects, and exactly three verified-action CTAs that each gate a real, checkable claim — Hero's "Cleared for contact", ProjectDetail's "View on GitHub", and Contact's "Let's figure it out." Also carries two accessibility/browser-chrome roles that are not decorative choices: the `::selection` highlight and the `:focus-visible` outline (`app/globals.css`).
- **Signal Green, Dim** (`#3f7a52`): the resting-state companion to Signal Green — used as the border/background on the same three verified-action CTAs before hover, as `StatusFlag`'s ok-state border, and as the scrollbar thumb's hover color.

### Secondary
- **Caution Amber** (`#f5a623`): reserved for the caution state of `StatusFlag` and its dot. Currently shipped on exactly one screen (`app/not-found.tsx`'s "Off Course" flag). It is a reserved semantic state on a reusable primitive, not a one-off; it must never be used decoratively or repurposed as a second accent.

### Neutral
- **Panel Black** (`#0a0b0c`): the base ground — `body` background, nav background, and the base tier of the three-step surface stack.
- **Panel Face** (`#131417`): the raised-relative surface for every bordered card, dial, readout housing, and dropdown — the middle tier.
- **Recessed Readout** (`#0a0b0c` reused, nested inside `panel-face`): `ReadoutWindow`'s inner value field reuses `panel` inside a `panel-face` card, which reads as a recessed dial window rather than a raised chip — the closest thing this system has to a "sunken" surface.
- **Bezel** (`#2b2e33`): every hairline border, divider, and scrollbar track/thumb-rest — the one border color in the system.
- **Ink** (`#f2f1ea`): primary text, headings, needle strokes, dot centers.
- **Ink Dim** (`#95989c`): body copy, secondary labels, inactive nav/filter text.
- **Ink Faint** (`#5b5e63`): the dashed gauge-face guide stroke and scrollbar-track-adjacent chrome; the dimmest text tier the system defines but rarely reaches for.

### Named Rules
**The Verified-Signal Rule.** Signal green marks a claim the visitor can independently check — a live status, an active filter state, or a link to real, running proof (a repo, a contact channel). It never appears as a headline color, a section accent, or a hover flourish on content that isn't itself verifiable. If a new CTA doesn't gate a checkable action, it gets the ghost/ink-dim treatment, not signal green.

## Typography

**Display Font:** Space Grotesk (with sans-serif fallback)
**Body Font:** Space Grotesk (with sans-serif fallback) — the same face; `body` carries `font-display` globally, so this is one type family used at two weights/sizes, not a display/body pairing.
**Label/Mono Font:** IBM Plex Mono (with monospace fallback)

**Character:** A single geometric sans (Space Grotesk) does all prose and heading work, deliberately avoiding a generic system/Inter-as-display face; IBM Plex Mono carries every numeral, plate label, and instrument readout, giving the page its aviation-placard, tabular-numerals texture.

### Hierarchy
- **Section Headline** (600, `text-3xl` → `text-4xl` responsive, tight line-height): section openers — "Flight Log", "Manifest — Signature Works", "Radio Panel". This is the largest text on the page.
- **Name Placard** (600, `text-2xl` → `text-3xl`, tight): the Hero's `<h1>` — deliberately smaller than the section headlines below it, because in this world the name is a placard caption beneath the instrument panel, not the loudest thing on the page. Do not default this to the page's biggest type.
- **Title/Card Heading** (600, `text-xl`, tight): project card and detail titles.
- **Body** (400, `text-sm`–`text-base`, relaxed line-height): descriptive copy, About narrative, project descriptions.
- **Label** (500, `10–11px`, `0.15em`–`0.2em` tracking, uppercase): instrument plate IDs, gauge/readout labels, section eyebrettes on cards ("Entry 01", "Instrument Rating"), tag chips.
- **Readout** (500, `text-sm`–`text-lg`, tabular-nums where numeric): the value shown inside a `ReadoutWindow` or `GaugeDial`.

### Named Rules
**The Placard Restraint Rule.** The visitor's name is set smaller than the section headlines that follow it (`text-2xl`/`text-3xl` vs. `text-3xl`/`text-4xl`). The instruments carry the weight of the first viewport; the name is a caption underneath them, not a hero headline.

**The Tracking Ladder.** Letter-spacing widens with a label's formality: plate IDs and instrument labels sit at `0.2em`/`0.15em`, tag/category chips at `0.1em`, and numeric readouts stay at normal or `tracking-tight`. Wider tracking signals "this is an instrument marking," not body prose.

## Layout

Content is capped at `max-w-6xl` (nav, About, Featured/All Projects, Footer) or narrower (`max-w-3xl`/`max-w-4xl` for Hero, Contact, and project detail) and centered with standard `px-4 sm:px-6 lg:px-8` gutters. Sections stack full-bleed with a hairline `border-t border-bezel` between them — there is no card-in-card page frame; the bezel line itself is the section seam. Vertical rhythm is a consistent `py-20` per section.

The Hero's six-pack (`GaugeDial` ×3, `ReadoutWindow` ×3) is a fixed `grid-cols-3` at every breakpoint — it does not reflow to fewer columns on narrow viewports, so cells compress rather than restack below `sm`. This is the shipped behavior, not a documented responsive strategy; treat it as a known constraint of the six-pack pattern rather than a system rule to reuse elsewhere.

Project grids reflow conventionally: 1 column (mobile) → 2 (`md`, All Projects only) → 3 (`lg`).

## Elevation & Depth

This system has no shadows, no blur, and no gradients anywhere in the shipped code — depth is conveyed entirely through a flat three-step tonal stack (`panel` → `panel-face` → nested `panel` for recessed readouts) plus 1px bezel borders. `ReadoutWindow` is the one place the stack inverts on purpose: its inner value field is `panel` nested inside a `panel-face` card, reading as a recessed dial window rather than a raised element.

### Named Rules
**The Flat Panel Rule.** No `box-shadow`, no gradient fill, no backdrop blur, anywhere. Depth is bezel border + tonal step only. A darker nested surface reads recessed; a lighter one would read raised — this system currently only uses the recessed direction.

## Shapes

Every panel, card, button, chip, and input is a hard rectangle — `rounded` is `0px` project-wide except for a small set of literal indicator dots (`rounded-full`, `h-1.5 w-1.5`–`h-2 w-2`): the needle-center dot, the `StatusFlag` state dot, feature-list bullets, and the Contact channel-row marker. Borders are uniformly 1px solid bezel (`#2b2e33`); there is no border-radius scale to speak of beyond "square" and "dot."

## Components

### Buttons
- **Shape:** square, 1px border, no radius.
- **Verified-action (signal):** `border-signal-dim` + `bg-panel-face`, `text-signal`, mono uppercase label (`0.1em`–`0.15em` tracking), `px-6 py-3`. Reserved for the three verified-action CTAs named in the Colors section — do not add a fourth without a new checkable claim behind it.
- **Ghost (default):** `border-ink-dim` or `border-bezel`, `text-ink` or `text-ink-dim`, no fill; used for "Get in Touch," "Go Home," "Back to Projects."
- **Hover/Focus:** verified-action buttons invert to filled signal green with panel-black text on hover; ghost buttons darken the border to `ink`/`ink-dim`. All transitions use `transition-colors` with no easing override beyond the browser default — no bounce, no scale.

### Chips
- **Style:** 1px bezel border, no fill, mono uppercase text at `10px`/`0.1em` tracking, `px-2 py-1`. Used for category tags, tech-stack tags, and the project category badge.
- **State:** the category filter in All Projects is the one chip-like control with a true selected state — active fills `bg-signal`/`text-panel`; inactive stays `text-ink-dim` on transparent.

### Cards / Containers
- **Corner Style:** square (0px radius) throughout.
- **Background:** `panel-face` on every bordered card (project cards, About's "Instrument Rating" panel, project-detail sub-cards, Contact's channel list).
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px solid `bezel`; project cards brighten the border to `ink-dim` on hover.
- **Internal Padding:** `p-6` (mobile) to `p-8` (`sm:` and up) is the standard card padding.

### Navigation
- Fixed top bar, `bg-panel`, `border-b border-bezel`, `h-16`. Logo mark is a bordered square monogram ("OS") plus the name in uppercase tracked mono-style Space Grotesk. Links use `font-display text-sm`, `ink-dim` default → `ink` on hover, no underline. Mobile collapses to a bezel-bordered dropdown panel on `panel-face`, no overlay/blur behind it.

### Instrument Primitives (signature components)
- **GaugeDial** (`components/Instruments.tsx`): a circular dial with a dashed guide arc (`ink-faint`, `stroke-dasharray`), a single needle that rotates from a resting angle to its true value on mount via an inline `transition: transform 900ms cubic-bezier(0.16,1,0.3,1)`, a tabular-nums mono readout beneath the needle, and a mono plate ID above. This is the shipped "settle" motion (the `settle`/`flagDrop` Tailwind keyframes exist in config but only `flag-drop` is actually invoked via `animate-flag-drop`; the needle settle is driven by the inline transition, not the `settle` keyframe).
- **ReadoutWindow**: the text-value counterpart to GaugeDial — plate ID, a bezel-bordered recessed `panel` field holding the mono value, and a label beneath. Used for non-numeric identity fields (Role, Location, Focus).
- **StatusFlag**: a small bordered pill with a colored dot and uppercase mono label, entering with the `flag-drop` animation (translateY + fade, 500ms, same easing as the needle settle). `tone="ok"` is signal green; `tone="caution"` is amber and currently reserved for off-nominal states (404).
- **Plate Numbering**: every project card and instrument carries a mono plate ID (`INST-01`, `PLATE 03`) as a diegetic identifier, not a decorative eyebrow — it names the instrument, the way a real gauge would.

## Do's and Don'ts

### Do:
- **Do** keep signal green ( `#7cfa9a`/`#3f7a52`) restricted to verified/live state: `StatusFlag` ok, the active filter toggle, the three named verified-action CTAs, and the browser-chrome selection/focus-ring roles. Everywhere else, use ink/ink-dim/bezel.
- **Do** use the single easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`) for every state transition — settle, flag-drop, hover — with no bounce or overshoot.
- **Do** keep every panel, card, chip, and button square (0px radius); reserve `rounded-full` for small literal indicator dots only.
- **Do** set the visitor's name/heading smaller than the section headlines that follow it, consistent with the Placard Restraint Rule — the instruments carry the first viewport, not a hero headline.
- **Do** respect `prefers-reduced-motion`: all animation/transition durations collapse to near-zero and `scroll-behavior` becomes `auto` (`app/globals.css`).

### Don't:
- **Don't** introduce gradients, glassmorphism/backdrop-blur, or drop shadows — this system has none, by design, as the explicit rejection of the prior AI-template look.
- **Don't** add a fourth signal-green CTA without a genuinely new checkable claim behind it; the accent's restriction to a small, named set of uses is the point, not an incidental count.
- **Don't** use caution amber for anything but the reserved caution state on `StatusFlag`; it is not a second decorative accent.
- **Don't** treat the Hero's fixed `grid-cols-3` six-pack as a general responsive-grid pattern — it is a known non-reflowing constraint of that specific composition, not a system rule to copy onto new grids.

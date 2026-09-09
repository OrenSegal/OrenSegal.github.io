---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Surface: app/page.tsx (full site — Hero, About, Projects, Contact, Footer, Nav)

Mode: Persuade. Audience: recruiters + technical interviewers, split evenly between a fast skim and a deep read. Job: leave convinced Oren builds trustworthy AI infrastructure, and click into at least one real repo. Proof/content: 8 real shipped GitHub projects (lib/projects.ts), real contact links, no invented metrics. Constraint: Next.js 14 static export to GitHub Pages, no backend, no image generation available (code-led only).

## Direction contract

THESIS: No governing metaphor. The page earns trust the way a well-run engineer's own writing does — plain, dense, specific, structured so a skimmer gets the shape in ten seconds and a reader who digs in gets rewarded with real depth. The previous flight-deck instrument panel is retired as evidence: costume chrome (gauges, plates, boot sequences) is exactly the AI-portfolio cliché this build refuses.

OWN-WORLD: Near-black ground, warm off-white ink, a single restrained accent used only for links/live state — no gauges, no bezel-framed cards, no mono-as-decoration. One workhorse text face carries both display and body; hierarchy comes from size/weight/measure, not costume type. Structure over skin: differentiation lives in information architecture — projects are ranked and organized by depth of story, not flattened into a uniform filterable grid.

STORY: Visitor lands on a short, specific first line in Oren's own voice (not a role/location/focus readout) → scans a ranked project list where the 3 projects with real build narratives get inline depth and the rest stay dense and scannable, grouped by what they are, not hidden behind a category toggle → reads a short prose About, not a "checklist" card → reaches Contact as a plain, direct ask.

FIRST VIEWPORT: Hero is two sentences of real prose stating what Oren builds and why it's hard, set large, no instrument readouts, no six-pack. One line of plain proof beneath it (project count / OSS repos, stated as a sentence, not staged as a dial) linking straight to GitHub. A single, quiet primary action to view the work. No boot animation.

FORM: Direction pinned by explicit user redirect, overriding the concept-seed roll: two proposed metaphor-driven directions (CI-report ledger, lab-certificate) were rejected as themselves cliché; user asked to draw from what actually works on strong real developer/AI-engineer portfolios and execute better, not costume it. Grounded in research on real standout sites (prose/voice as the differentiator, no decorative metaphor, transparency-as-content, palette/type restraint, structure as the actual craft move) rather than a concept-seed candidate. Seed key: 4b88fda9 (roll overridden by brief pin).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

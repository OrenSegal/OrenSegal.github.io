# orensegal.github.io

Oren Segal's portfolio — a Next.js site (statically exported to GitHub Pages)
showcasing shipped AI agent, LLM infrastructure, and data engineering
projects.

Live at [orensegal.github.io](https://orensegal.github.io).

## Stack

Next.js 14 (App Router, static export), React, TypeScript, Tailwind CSS,
Framer Motion, lucide-react icons.

## Structure

```
app/                    routes (home, 404, /projects/[id] detail pages)
components/             page sections (Hero, About, FeaturedProjects, AllProjects, Contact, Footer, Navigation)
lib/projects.ts         project data — single source of truth for the site's project list
```

Project cards and detail pages are both driven by `lib/projects.ts`; add or
edit a project there rather than in a component.

## Development

```
npm install
npm run dev
```

## Build

```
npm run build
```

Static export goes to `out/`, deployed via `.github/workflows/deploy.yml`
(GitHub Actions → GitHub Pages) on every push to `main`.

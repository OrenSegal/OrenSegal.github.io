# orensegal.github.io

Oren Segal's portfolio: a Next.js site, statically exported to GitHub Pages,
that links each AI agent and eval project to its public repo and writes up the
rootcause benchmark.

Live at [orensegal.github.io](https://orensegal.github.io).

```
npm ci
npm run dev
npm test        # node:test, no network
npm run lint
npm run build   # static export to out/
```

## Stack

Next.js 15 (App Router, static export), React, TypeScript, Tailwind CSS,
lucide-react icons.

## Structure

```
app/                    routes (home, 404, /projects, /projects/[id], /writing and its three posts, sitemap, robots)
components/             page sections (Hero, StruckStack, ShelfieTile, Projects, LiveTile, TileDemo, About, Contact, ProjectDetail, RootcauseResults, Footer, Navigation, ScrollToTop)
lib/projects.ts         project data, the single source of truth for the project list
lib/project-stats.json  star counts and last-push dates, refreshed by scripts/fetch-github-stats.mjs at prebuild
lib/rootcause-results.ts the seven benchmark settings, copied from the rootcause sweep summary
tests/                  the stats merge, and that PROJECT_REPOS matches lib/projects.ts
```

Project tiles and detail pages are both driven by `lib/projects.ts`; add or
edit a project there rather than in a component. A new project also needs its
repo slug in `PROJECT_REPOS` in `scripts/fetch-github-stats.mjs`; `npm test`
fails if the two lists differ.

## Deploy

`.github/workflows/deploy.yml` runs the tests, builds, and deploys `out/` to
GitHub Pages on every push to `main`.

## License

Code is MIT (see [LICENSE](LICENSE)).

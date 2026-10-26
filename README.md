# orensegal.github.io

Oren Segal's portfolio: a Next.js site, statically exported to GitHub Pages,
that links each AI agent and eval project to its public repo and writes up the
rootcause benchmark.

Live at [orensegal.github.io](https://orensegal.github.io).

```
npm ci
npm run dev
npm run build   # static export to out/
```

## Stack

Next.js 14 (App Router, static export), React, TypeScript, Tailwind CSS,
lucide-react icons.

## Structure

```
app/                    routes (home, 404, /projects/[id], /writing/rootcause-benchmark)
components/             page sections (Hero, About, Projects, ProjectRow, ProjectDetail, RootcauseResults, Contact, Footer, Navigation)
lib/projects.ts         project data, the single source of truth for the project list
lib/project-stats.json  star counts and last-push dates, refreshed by scripts/fetch-github-stats.mjs at prebuild
```

Project rows and detail pages are both driven by `lib/projects.ts`; add or
edit a project there rather than in a component. A new project also needs its
repo slug in `PROJECT_REPOS` in `scripts/fetch-github-stats.mjs`.

## Deploy

`.github/workflows/deploy.yml` builds and deploys `out/` to GitHub Pages on
every push to `main`.

## License

Code is MIT (see [LICENSE](LICENSE)).

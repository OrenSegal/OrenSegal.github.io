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

Next.js 15 (App Router, static export), React, TypeScript, Tailwind CSS,
lucide-react icons.

## Structure

```
app/                     routes (home, 404, /projects, /projects/[id], /writing and its posts, /writing/feed.xml)
components/              page sections (Hero, StruckStack, ShelfieTile, Projects, LiveTile, Now, Activity, Experience, About, Contact, Footer, Navigation, CommandPalette)
lib/projects.ts          project data, the single source of truth for the project list
lib/posts.ts             the writing list: drives the index, the RSS feed, the sitemap and the command palette
lib/project-stats.json   star counts and last-push dates, refreshed by scripts/fetch-github-stats.mjs at prebuild
lib/contributions.json   the public contribution calendar, refreshed by the same script when GITHUB_TOKEN is set
lib/rootcause-results.ts the seven benchmark settings, copied from the rootcause sweep summary
```

Project tiles and detail pages are both driven by `lib/projects.ts`; add or
edit a project there rather than in a component. A new project also needs its
repo slug in `PROJECT_REPOS` in `scripts/fetch-github-stats.mjs`. A new post
needs its page under `app/writing/` and an entry in `lib/posts.ts`.

The prebuild fetch never fails the build. Without a token or a network it keeps
the committed JSON, and the activity tile renders only when the calendar has
data. `components/Experience.tsx` restates `public/resume.pdf`; change both together.

Keyboard: `Cmd/Ctrl+K` or `/` opens the command palette on any page.

## Deploy

`.github/workflows/deploy.yml` builds and deploys `out/` to GitHub Pages on
every push to `main`. `.github/workflows/ci.yml` lints and builds every pull
request and branch push.

## License

Code is MIT (see [LICENSE](LICENSE)).

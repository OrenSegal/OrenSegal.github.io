// Build-time only. Pulls a per-repo star count and last-push date for each
// portfolio project card. Unauthenticated REST calls, no secrets.
//
// Never fails the build: on any network/API error this leaves the existing,
// committed lib/project-stats.json (real, previously-fetched values) as is.
// There is no invented-number fallback; the committed file is the baseline.

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const LIB_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'lib')
const PROJECT_STATS_OUT_PATH = path.join(LIB_DIR, 'project-stats.json')
const USER = 'OrenSegal'

// Mirrors the repo slugs in lib/projects.ts. Kept as a plain list rather than
// importing the TS file, since this script runs standalone under plain Node.
const PROJECT_REPOS = [
  'sous',
  'signal-scout',
  'first-to-first-sale',
  'llm-gateway-kit',
  'cited',
  'metropulse-nyc',
  'signal-skills',
  'architecture-lint',
  'scoped',
  'litmus',
]

async function fetchRepoData() {
  return Promise.all(
    PROJECT_REPOS.map(async (repo) => {
      const res = await fetch(`https://api.github.com/repos/${USER}/${repo}`, {
        headers: { Accept: 'application/vnd.github+json' },
      })
      if (!res.ok) throw new Error(`GitHub API responded ${res.status} for ${repo}`)
      const data = await res.json()
      return {
        repo,
        stars: data.stargazers_count ?? 0,
        pushedAt: data.pushed_at ?? null,
      }
    })
  )
}

async function main() {
  try {
    const repos = await fetchRepoData()
    const projectStats = Object.fromEntries(
      repos.map((r) => [r.repo, { stars: r.stars, pushedAt: r.pushedAt }])
    )

    await writeFile(PROJECT_STATS_OUT_PATH, JSON.stringify(projectStats, null, 2) + '\n')
    console.log(`[fetch-github-stats] wrote ${PROJECT_STATS_OUT_PATH}`)
  } catch (err) {
    console.warn(`[fetch-github-stats] skipping update, keeping committed stats file: ${err.message}`)
  }
}

main()

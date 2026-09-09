// Build-time only. Pulls small, honest GitHub stats for the 8 shown
// portfolio repos in one pass: the aggregate license percentage for the
// Hero's "Open Source" gauge, plus a per-repo star count and last-push date
// for each project card. Unauthenticated REST calls, no secrets.
//
// Never fails the build: on any network/API error this leaves the existing,
// committed lib/github-stats.json and lib/project-stats.json (real,
// previously-fetched values) as is. There is no invented-number fallback —
// the committed files are the baseline.

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const LIB_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'lib')
const STATS_OUT_PATH = path.join(LIB_DIR, 'github-stats.json')
const PROJECT_STATS_OUT_PATH = path.join(LIB_DIR, 'project-stats.json')
const USER = 'OrenSegal'

// Mirrors the repo slugs in lib/projects.ts. Kept as a plain list rather than
// importing the TS file, since this script runs standalone under plain Node.
const PROJECT_REPOS = [
  'signal-scout',
  'first-to-first-sale',
  'llm-gateway-kit',
  'verify-before-ship',
  'metropulse-nyc',
  'signal-skills',
  'architecture-lint',
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
        licensed: Boolean(data.license && data.license.key && data.license.key !== 'other'),
        stars: data.stargazers_count ?? 0,
        pushedAt: data.pushed_at ?? null,
      }
    })
  )
}

async function main() {
  try {
    const repos = await fetchRepoData()
    const generatedAt = new Date().toISOString()

    const licensed = repos.filter((r) => r.licensed).length
    const stats = {
      openSourcePercent: Math.round((licensed / PROJECT_REPOS.length) * 100),
      projectCount: PROJECT_REPOS.length,
      generatedAt,
    }

    const projectStats = Object.fromEntries(
      repos.map((r) => [r.repo, { stars: r.stars, pushedAt: r.pushedAt }])
    )

    await writeFile(STATS_OUT_PATH, JSON.stringify(stats, null, 2) + '\n')
    await writeFile(PROJECT_STATS_OUT_PATH, JSON.stringify(projectStats, null, 2) + '\n')
    console.log(`[fetch-github-stats] wrote ${STATS_OUT_PATH}:`, stats)
    console.log(`[fetch-github-stats] wrote ${PROJECT_STATS_OUT_PATH}`)
  } catch (err) {
    console.warn(`[fetch-github-stats] skipping update, keeping committed stats files: ${err.message}`)
  }
}

main()

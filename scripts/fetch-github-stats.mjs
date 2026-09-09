// Build-time only. Pulls a small, honest GitHub stat for the Hero's "Open
// Source" gauge: the percentage of the projects actually shown on this site
// (the same set counted by the adjacent "Projects" readout) that carry a
// real OSS license on GitHub. Scoped to those repos specifically — not the
// whole account — so the two instruments can't be read as disagreeing.
// Unauthenticated REST calls, no secrets.
//
// Never fails the build: on any network/API error this leaves the existing,
// committed lib/github-stats.json (a real, previously-fetched value) as is.
// There is no invented-number fallback — the committed file is the baseline.

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const OUT_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'lib', 'github-stats.json')
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

async function fetchStats() {
  const results = await Promise.all(
    PROJECT_REPOS.map(async (repo) => {
      const res = await fetch(`https://api.github.com/repos/${USER}/${repo}`, {
        headers: { Accept: 'application/vnd.github+json' },
      })
      if (!res.ok) throw new Error(`GitHub API responded ${res.status} for ${repo}`)
      const data = await res.json()
      return Boolean(data.license && data.license.key && data.license.key !== 'other')
    })
  )

  const licensed = results.filter(Boolean).length
  const openSourcePercent = Math.round((licensed / PROJECT_REPOS.length) * 100)

  return {
    openSourcePercent,
    projectCount: PROJECT_REPOS.length,
    generatedAt: new Date().toISOString(),
  }
}

async function main() {
  try {
    const stats = await fetchStats()
    await writeFile(OUT_PATH, JSON.stringify(stats, null, 2) + '\n')
    console.log(`[fetch-github-stats] wrote ${OUT_PATH}:`, stats)
  } catch (err) {
    console.warn(`[fetch-github-stats] skipping update, keeping committed lib/github-stats.json: ${err.message}`)
  }
}

main()

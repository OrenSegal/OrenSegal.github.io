// Build-time only. Pulls a per-repo star count and last-push date for each
// portfolio project card. Read-only REST calls to public repos.
//
// Never fails the build. Each repo is fetched on its own: a repo whose request
// fails keeps its previous value from lib/project-stats.json (real,
// previously-fetched), and the repos that answered are still updated. There is
// no invented-number fallback; the committed file is the baseline.
//
// Sends GITHUB_TOKEN when the environment has one (the deploy workflow passes
// the job token), because unauthenticated calls from shared CI runners are
// rate-limited to 60 an hour per IP and answer 403 once that is spent.

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const LIB_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'lib')
const PROJECT_STATS_OUT_PATH = path.join(LIB_DIR, 'project-stats.json')
const USER = 'OrenSegal'

// Mirrors the repo slugs in lib/projects.ts. Kept as a plain list rather than
// importing the TS file, since this script runs standalone under plain Node.
export const PROJECT_REPOS = [
  'rootcause',
  'sous',
  'signal-scout',
  'cited',
  'architecture-lint',
  'scoped',
  'litmus',
  'rag-generation',
  'llm-gateway-kit',
  'signal-skills',
  'blast-shield',
  'deuce',
  'ny-noise',
]

async function fetchRepo(repo) {
  const headers = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(`https://api.github.com/repos/${USER}/${repo}`, { headers })
  if (!res.ok) throw new Error(`GitHub API responded ${res.status} for ${repo}`)
  const data = await res.json()
  return { stars: data.stargazers_count ?? 0, pushedAt: data.pushed_at ?? null }
}

// previous: the stats file as committed. results: one { repo, status, value | reason }
// per repo. A fulfilled repo replaces its entry; a rejected one keeps what was there.
export function mergeStats(previous, results) {
  const merged = { ...previous }
  for (const r of results) {
    if (r.status === 'fulfilled') merged[r.repo] = r.value
  }
  return merged
}

async function main() {
  let previous = {}
  try {
    previous = JSON.parse(await readFile(PROJECT_STATS_OUT_PATH, 'utf8'))
  } catch {
    // No readable baseline: start empty, and write only what GitHub answers.
  }

  const settled = await Promise.allSettled(PROJECT_REPOS.map(fetchRepo))
  const results = settled.map((s, i) => ({ repo: PROJECT_REPOS[i], ...s }))
  const failures = results.filter((r) => r.status === 'rejected')
  for (const f of failures) {
    console.warn(`[fetch-github-stats] kept previous value: ${f.reason?.message ?? f.reason}`)
  }
  if (failures.length === results.length) {
    console.warn('[fetch-github-stats] no repo answered, keeping committed stats file')
    return
  }

  await writeFile(PROJECT_STATS_OUT_PATH, JSON.stringify(mergeStats(previous, results), null, 2) + '\n')
  console.log(`[fetch-github-stats] wrote ${PROJECT_STATS_OUT_PATH} (${results.length - failures.length}/${results.length} repos fetched)`)
}

// Run only when executed directly, so the tests can import the pure parts.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main()
}

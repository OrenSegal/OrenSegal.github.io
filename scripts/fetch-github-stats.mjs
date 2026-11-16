// Build-time only. Pulls a per-repo star count and last-push date for each
// portfolio project card, and the public contribution calendar for the
// activity tile. REST calls work unauthenticated; the calendar is GraphQL and
// needs GITHUB_TOKEN (the workflow's own token is enough, no extra secret).
//
// Never fails the build: on any network/API error this leaves the existing,
// committed lib/project-stats.json (real, previously-fetched values) as is.
// There is no invented-number fallback; the committed file is the baseline.

import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const LIB_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'lib')
const PROJECT_STATS_OUT_PATH = path.join(LIB_DIR, 'project-stats.json')
const CONTRIBUTIONS_OUT_PATH = path.join(LIB_DIR, 'contributions.json')
const USER = 'OrenSegal'
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || ''
const auth = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}

// Mirrors the repo slugs in lib/projects.ts. Kept as a plain list rather than
// importing the TS file, since this script runs standalone under plain Node.
const PROJECT_REPOS = [
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

async function fetchRepoData() {
  return Promise.all(
    PROJECT_REPOS.map(async (repo) => {
      const res = await fetch(`https://api.github.com/repos/${USER}/${repo}`, {
        headers: { Accept: 'application/vnd.github+json', ...auth },
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

// The last year of the public contribution calendar, one entry per day.
async function fetchContributions() {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }`
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...auth },
    body: JSON.stringify({ query, variables: { login: USER } }),
  })
  if (!res.ok) throw new Error(`GitHub GraphQL responded ${res.status}`)
  const body = await res.json()
  const calendar = body?.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) throw new Error(`no calendar in response: ${JSON.stringify(body?.errors ?? body).slice(0, 200)}`)
  const days = calendar.weeks.flatMap((w) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
  )
  if (days.length < 300) throw new Error(`calendar has only ${days.length} days`)
  return { fetchedAt: new Date().toISOString(), total: calendar.totalContributions, days }
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

  if (!TOKEN) {
    console.warn('[fetch-github-stats] no GITHUB_TOKEN, keeping committed contributions file')
    return
  }
  try {
    const contributions = await fetchContributions()
    await writeFile(CONTRIBUTIONS_OUT_PATH, JSON.stringify(contributions) + '\n')
    console.log(`[fetch-github-stats] wrote ${contributions.days.length} days, ${contributions.total} contributions`)
  } catch (err) {
    console.warn(`[fetch-github-stats] skipping contributions, keeping committed file: ${err.message}`)
  }
}

main()

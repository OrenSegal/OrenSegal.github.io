import projectStats from './project-stats.json'
import { projects } from './projects'

type Stats = Record<string, { stars: number; pushedAt: string | null }>
const STATS: Stats = projectStats

export function getSystemStatus() {
  const dates = projects
    .map((p) => STATS[p.id]?.pushedAt)
    .filter((d): d is string => Boolean(d))
    .sort()

  const verified = dates.length
  const lastVerified = dates[dates.length - 1] ?? null

  return {
    total: projects.length,
    verified,
    lastVerified,
  }
}

export function formatVerifiedDate(iso: string | null) {
  if (!iso) return 'unknown'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

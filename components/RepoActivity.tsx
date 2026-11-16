import activity from '@/lib/repo-activity.json'
import { formatVerifiedDate } from '@/lib/status'

const DATA = activity as {
  fetchedAt: string | null
  weekStarts: string[]
  repos: { repo: string; weeks: number[] }[]
}

export const hasRepoActivity = DATA.repos.length > 0

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const STEPS = ['bg-white/[0.06]', 'bg-white/20', 'bg-white/40', 'bg-white/60', 'bg-white/90']
const PHONE_WEEKS = 26
const GH = 'https://github.com/OrenSegal'
const name = (repo: string) => repo.replace('OrenSegal.github.io', 'this site')

// Which repo took the commits, week by week: one ghost row per repo, and the
// single busiest repo-week struck. Counts are commits on each default branch,
// fetched from GitHub when the site builds; with none, nothing renders.
export function RepoActivity() {
  if (!hasRepoActivity) return null

  const total = (r: { weeks: number[] }) => r.weeks.reduce((a, b) => a + b, 0)
  const repos = DATA.repos.filter((r) => total(r) > 0).sort((a, b) => total(b) - total(a))
  if (!repos.length) return null
  const n = DATA.weekStarts.length
  const phoneCut = n - PHONE_WEEKS

  const active = repos.flatMap((r) => r.weeks).filter((c) => c > 0).sort((a, b) => a - b)
  const q = (f: number) => active[Math.min(active.length - 1, Math.floor(f * active.length))] ?? 1
  const cuts = [q(0.25), q(0.5), q(0.75)]
  const step = (c: number) => (c === 0 ? 0 : c <= cuts[0] ? 1 : c <= cuts[1] ? 2 : c <= cuts[2] ? 3 : 4)

  let peak = { repo: repos[0].repo, week: 0, count: -1 }
  repos.forEach((r) => r.weeks.forEach((c, w) => { if (c > peak.count) peak = { repo: r.repo, week: w, count: c } }))

  const month = (w: number) => new Date(`${DATA.weekStarts[w]}T00:00:00Z`).getUTCMonth()
  const hide = (w: number) => (w < phoneCut ? 'max-sm:hidden' : '')
  const row = 'grid grid-flow-col auto-cols-fr gap-[3px]'

  const summary = `Commits per week on the default branch of ${repos.length} repos over the last year. Busiest: ${peak.repo}, week of ${formatVerifiedDate(DATA.weekStarts[peak.week])}, ${peak.count} commits.`

  return (
    <figure className="bg-panel-face p-5 sm:p-6" aria-label={summary}>
      <p className="max-w-xl text-sm leading-snug text-ink-dim">
        Where the work went, week by week: commits on each repo&apos;s default branch over the last year.
      </p>

      <div className="mt-5 grid grid-cols-[6.5rem_1fr] items-center gap-x-3 gap-y-[3px] sm:grid-cols-[9.5rem_1fr]">
        <span />
        <div className={`${row} font-mono text-[11px] text-ink-faint`} aria-hidden="true">
          {DATA.weekStarts.map((_, w) => (
            <span key={w} className={`h-4 overflow-visible whitespace-nowrap ${hide(w)}`}>
              {w > 0 && month(w) !== month(w - 1) ? MONTHS[month(w)] : ''}
            </span>
          ))}
        </div>

        {repos.map((r) => (
          <div key={r.repo} className="contents">
            <a
              href={`${GH}/${r.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate font-mono text-[11px] lowercase text-ink-dim transition-colors hover:text-accent"
            >
              {name(r.repo)}
            </a>
            <div className={row} aria-hidden="true">
              {r.weeks.map((c, w) => (
                <span
                  key={w}
                  title={`${r.repo}, week of ${formatVerifiedDate(DATA.weekStarts[w])}: ${c}`}
                  className={`h-3 ${hide(w)} ${r.repo === peak.repo && w === peak.week ? 'bg-accent' : STEPS[step(c)]}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <figcaption className="mt-5 font-mono text-xs lowercase text-ink-faint">
        <span className="text-accent">busiest week</span> {name(peak.repo)}, week of {formatVerifiedDate(DATA.weekStarts[peak.week])}, {peak.count} commits
        {DATA.fetchedAt && <> · fetched {formatVerifiedDate(DATA.fetchedAt)}</>}
      </figcaption>
    </figure>
  )
}

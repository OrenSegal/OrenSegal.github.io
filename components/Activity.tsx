import contributions from '@/lib/contributions.json'
import { formatVerifiedDate } from '@/lib/status'

type Day = { date: string; count: number }
const DATA = contributions as { fetchedAt: string | null; total: number | null; days: Day[] }

export const hasActivity = DATA.days.length > 0

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
// Ghost steps for a day's count, lowest to highest. The busiest day is struck instead.
const STEPS = ['bg-white/[0.06]', 'bg-white/20', 'bg-white/40', 'bg-white/60', 'bg-white/90']
const PHONE_WEEKS = 26

const weekday = (iso: string) => new Date(`${iso}T00:00:00Z`).getUTCDay()

// The public contribution calendar as a ghost grid with one struck cell.
// Data is fetched from GitHub when the site builds; with none, nothing renders.
export function Activity() {
  if (!hasActivity) return null
  const days = DATA.days

  // Thresholds from this year's own non-zero days, so the steps spread evenly.
  const active = days.map((d) => d.count).filter((c) => c > 0).sort((a, b) => a - b)
  const q = (f: number) => active[Math.min(active.length - 1, Math.floor(f * active.length))] ?? 1
  const cuts = [q(0.25), q(0.5), q(0.75)]
  const step = (c: number) => (c === 0 ? 0 : c <= cuts[0] ? 1 : c <= cuts[1] ? 2 : c <= cuts[2] ? 3 : 4)

  const busiest = days.reduce((best, d) => (d.count > best.count ? d : best), days[0])
  const activeDays = active.length

  // Weeks start on Sunday. Pad the first and last so every column has 7 cells.
  const cells: (Day | null)[] = [...Array(weekday(days[0].date)).fill(null), ...days]
  while (cells.length % 7 !== 0) cells.push(null)
  const weeks = Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7))
  const phoneCut = weeks.length - PHONE_WEEKS

  const monthOf = (week: (Day | null)[]) => {
    const first = week.find((d) => d !== null) as Day
    return new Date(`${first.date}T00:00:00Z`).getUTCMonth()
  }

  const summary = `${DATA.total ?? activeDays} GitHub contributions in the last year, on ${activeDays} of ${days.length} days. Busiest day: ${formatVerifiedDate(busiest.date)}, ${busiest.count}.`

  return (
    <figure className="flex h-full flex-col bg-panel-face p-5 sm:p-6" aria-label={summary}>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
        <span className="text-5xl font-light leading-none tracking-[-0.04em] text-ink tabular sm:text-6xl">
          {(DATA.total ?? 0).toLocaleString('en-US')}
        </span>
        <p className="mb-1 max-w-[18rem] text-sm leading-snug text-ink-dim">
          contributions on github in the last year, on {activeDays} of {days.length} days
        </p>
      </div>

      <div className="mt-6" aria-hidden="true">
        <div className="grid grid-flow-col auto-cols-fr gap-[3px] font-mono text-[11px] text-ink-faint">
          {weeks.map((week, w) => {
            const m = monthOf(week)
            const show = w === 0 ? false : m !== monthOf(weeks[w - 1])
            return (
              <span key={w} className={`h-4 overflow-visible whitespace-nowrap ${w < phoneCut ? 'max-sm:hidden' : ''}`}>
                {show ? MONTHS[m] : ''}
              </span>
            )
          })}
        </div>
        <div className="grid grid-flow-col grid-rows-7 auto-cols-fr gap-[3px]">
          {weeks.flatMap((week, w) =>
            week.map((d, i) => (
              <span
                key={`${w}-${i}`}
                title={d ? `${formatVerifiedDate(d.date)}: ${d.count}` : undefined}
                className={`aspect-square ${w < phoneCut ? 'max-sm:hidden' : ''} ${
                  d === null ? '' : d.date === busiest.date ? 'bg-accent' : STEPS[step(d.count)]
                }`}
              />
            ))
          )}
        </div>
      </div>

      <figcaption className="mt-auto pt-5 font-mono text-xs lowercase text-ink-faint">
        <span className="text-accent">busiest day</span> {formatVerifiedDate(busiest.date)}, {busiest.count} ·{' '}
        <a
          href="https://github.com/OrenSegal"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          github.com/OrenSegal
        </a>
        {DATA.fetchedAt && <> · fetched {formatVerifiedDate(DATA.fetchedAt)}</>}
      </figcaption>
    </figure>
  )
}

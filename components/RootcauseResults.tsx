import { ROWS, RESULTS_URL, CHOSEN_INDEX } from '@/lib/rootcause-results'

const AXIS_MIN = 60
const AXIS_MAX = 95
const COST_MAX = 0.09
const pct = (v: number) => ((v - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * 100

export function RootcauseResults() {
  return (
    <figure className="mt-10">
      <figcaption className="mb-5 max-w-xl text-sm leading-relaxed text-ink-dim">
        Pass rate with 95% Wilson interval, and cost per solved incident, for
        each setting. 75 runs per setting (25 incidents, three runs each), 525
        in total. The shaded band marks 77-84%, the range every point falls in.
        Orange marks the cheapest setting whose interval overlaps every other.
      </figcaption>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="font-mono text-xs text-ink-faint">
            <th scope="col" className="pb-2 pr-3 text-left font-normal">setting</th>
            <th scope="col" className="pb-2 pr-3 text-left font-normal">
              pass rate, {AXIS_MIN}% to {AXIS_MAX}%
            </th>
            <th scope="col" className="pb-2 text-left font-normal">cost per solved</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => (
            <tr key={r.label} className="align-middle">
              <th scope="row" className="py-2.5 pr-3 text-left font-normal text-ink-dim">
                {r.label}
              </th>
              <td className="w-[38%] py-2.5 pr-3">
                <div
                  className="relative h-4"
                  title={`${r.label}: ${r.pass}% (${r.low}% to ${r.high}%)`}
                  aria-hidden="true"
                >
                  <span
                    className="absolute inset-y-0 bg-panel-face"
                    style={{ left: `${pct(77)}%`, width: `${pct(84) - pct(77)}%` }}
                  />
                  <span
                    className="absolute top-1/2 h-px -translate-y-1/2 bg-ink-dim"
                    style={{ left: `${pct(r.low)}%`, width: `${pct(r.high) - pct(r.low)}%` }}
                  />
                  <span
                    className={`absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${i === CHOSEN_INDEX ? 'bg-accent' : 'bg-ink'}`}
                    style={{ left: `${pct(r.pass)}%` }}
                  />
                </div>
                <span className="mt-1 block font-mono text-xs tabular text-ink-faint">
                  {r.pass}% ({r.low}-{r.high})
                </span>
              </td>
              <td className="py-2.5">
                <div className="h-2" aria-hidden="true" title={`${r.label}: $${r.cost.toFixed(4)} per solved incident`}>
                  <div
                    className="h-2 min-w-[2px] rounded-r-sm bg-ink-faint"
                    style={{ width: `${(r.cost / COST_MAX) * 100}%` }}
                  />
                </div>
                <span className="mt-1 block font-mono text-xs tabular text-ink-faint">
                  ${r.cost.toFixed(4)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-xs leading-relaxed text-ink-faint">
        Source:{' '}
        <a
          href={RESULTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent-dim underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
        >
          rootcause results/sweeps/models-and-retrieval-2026-10-15
        </a>
        . Intervals treat each run as independent; repeats of one incident are
        correlated, so the true uncertainty is somewhat wider.
      </p>
    </figure>
  )
}

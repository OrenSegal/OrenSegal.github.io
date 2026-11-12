'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ROWS, CHOSEN_INDEX } from '@/lib/rootcause-results'

// The benchmark as a cathode stack: every setting present as a ghost, one struck.
export function StruckStack() {
  const [lit, setLit] = useState(CHOSEN_INDEX)
  const row = ROWS[lit]
  const reset = () => setLit(CHOSEN_INDEX)

  return (
    <div
      className="flex h-full flex-col bg-panel-face p-5 sm:p-6"
      onMouseLeave={reset}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) reset()
      }}
    >
      <div className="flex items-end gap-4">
        <span className="struck font-light leading-none tracking-[-0.04em] text-[5.5rem] sm:text-[7rem]">
          25<span className="text-[0.55em]">x</span>
        </span>
        <p className="mb-3 max-w-[16rem] text-sm leading-snug text-ink-dim">
          cost per solved incident, between settings at 77-84% with no detected accuracy difference
        </p>
      </div>

      <ul className="mt-6 flex-1" aria-label="pass rate and cost per solved incident, by setting">
        {ROWS.map((r, i) => {
          const on = i === lit
          return (
            <li key={r.label}>
              <button
                type="button"
                onMouseEnter={() => setLit(i)}
                onFocus={() => setLit(i)}
                aria-pressed={on}
                className={`flex w-full flex-wrap items-baseline gap-x-4 py-1 text-left transition-colors duration-200 ${on ? 'struck' : 'text-ink-ghost hover:text-ink-dim'}`}
              >
                <span className="min-w-[11rem] flex-1 text-sm">{r.label}</span>
                <span className="flex gap-4 whitespace-nowrap font-mono text-xs tabular">
                  <span>
                    {r.pass}% <span className="opacity-70">({r.low}-{r.high})</span>
                  </span>
                  <span>${r.cost.toFixed(4)}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <p className="mt-4 min-h-[2.5rem] text-sm leading-snug text-ink-dim" aria-live="polite">
        {lit === CHOSEN_INDEX
          ? "Under this grader, Haiku 5.5 was not detectably less accurate than Opus 5.5 at high effort, for about one twenty-fifth of the cost. Gaps under about 19 points would not have been detected. Most of the 25x is price per token: Haiku was billed about one thirtieth as much per token and used about 25% more tokens."
          : `${row.label}: ${row.pass}% of incidents solved, $${row.cost.toFixed(4)} per solved incident.`}
      </p>

      <Link
        href="/writing/rootcause-benchmark/"
        className="mt-3 inline-flex w-max text-sm font-medium text-ink transition-colors hover:text-accent"
      >
        read the benchmark →
      </Link>

      <p className="mt-4 font-mono text-xs text-ink-faint">rootcause · 525 graded runs · 7 settings</p>
    </div>
  )
}

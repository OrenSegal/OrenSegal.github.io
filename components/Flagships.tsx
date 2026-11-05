import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ROWS } from '@/components/RootcauseResults'

const GH = 'https://github.com/OrenSegal'
const linkClass =
  'underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'

// rootcause: pass rate against cost per solved incident, log-scaled cost so the 25x spread is visible.
const W = 320
const H = 150
const PAD = { l: 30, r: 8, t: 8, b: 22 }
const COST_LO = Math.log10(0.002)
const COST_HI = Math.log10(0.12)
const x = (cost: number) => PAD.l + ((Math.log10(cost) - COST_LO) / (COST_HI - COST_LO)) * (W - PAD.l - PAD.r)
const y = (pass: number) => PAD.t + ((95 - pass) / (95 - 60)) * (H - PAD.t - PAD.b)

function RootcauseChart() {
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-labelledby="rc-chart-title">
        <title id="rc-chart-title">
          Seven settings: pass rates between 77% and 84% with overlapping intervals, cost per solved incident from $0.0033 to $0.0822.
        </title>
        <rect x={PAD.l} y={y(84)} width={W - PAD.l - PAD.r} height={y(77) - y(84)} className="fill-line" />
        {[60, 77, 84, 95].map((p) => (
          <text key={p} x={PAD.l - 4} y={y(p) + 3} textAnchor="end" className="fill-ink-faint font-mono text-[9px]">
            {p}%
          </text>
        ))}
        {[0.003, 0.01, 0.03, 0.1].map((c) => (
          <text key={c} x={x(c)} y={H - 6} textAnchor="middle" className="fill-ink-faint font-mono text-[9px]">
            ${c}
          </text>
        ))}
        <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} className="stroke-line" />
        {ROWS.map((r) => (
          <g key={r.label}>
            <title>{`${r.label}: ${r.pass}% (${r.low}-${r.high}), $${r.cost.toFixed(4)} per solved`}</title>
            <line x1={x(r.cost)} x2={x(r.cost)} y1={y(r.high)} y2={y(r.low)} className="stroke-ink-faint" />
            <circle cx={x(r.cost)} cy={y(r.pass)} r={3} className="fill-ink" />
          </g>
        ))}
        <text x={x(0.0033) + 6} y={y(67)} className="fill-ink-dim font-mono text-[9px]">Haiku</text>
        <text x={x(0.0325) - 6} y={y(67)} textAnchor="end" className="fill-ink-dim font-mono text-[9px]">Sonnet</text>
        <text x={x(0.0822)} y={y(91) - 4} textAnchor="end" className="fill-ink-dim font-mono text-[9px]">Opus, 5 settings</text>
      </svg>
      <figcaption className="mt-2 text-xs leading-relaxed text-ink-faint">
        Pass rate (95% interval) against cost per solved incident, log scale. Band: 77-84%.{' '}
        <a href={`${GH}/rootcause/tree/main/results/sweeps/models-and-retrieval-2026-10-15`} target="_blank" rel="noopener noreferrer" className={linkClass}>
          summary.json
        </a>
      </figcaption>
    </figure>
  )
}

// litmus: copied from rootcause results/litmus/2026-10-15.md (25 runs each; delete-body-0 errored on all 25).
const MUTANTS: [string, string][] = [
  ['delete-body-0', 'inconclusive'],
  ['delete-instruction-0', 'survived'],
  ['delete-instruction-1', 'survived'],
  ['delete-instruction-2', 'survived'],
  ['delete-instruction-3', 'survived'],
  ['delete-instruction-4', 'survived'],
  ['delete-instruction-5', 'survived'],
  ['invert-rule-0', 'survived'],
  ['invert-rule-1', 'survived'],
  ['truncate-0', 'survived'],
  ['wrong-fact-0', 'survived'],
  ['wrong-fact-1', 'survived'],
]

function LitmusTable() {
  return (
    <figure>
      <table className="w-full border-collapse font-mono text-xs tabular">
        <caption className="sr-only">Twelve mutants of the rootcause investigator brief and their verdicts</caption>
        <thead>
          <tr className="text-ink-faint">
            <th scope="col" className="pb-1.5 text-left font-normal">mutant</th>
            <th scope="col" className="pb-1.5 text-right font-normal">verdict</th>
          </tr>
        </thead>
        <tbody>
          {MUTANTS.map(([id, verdict]) => (
            <tr key={id} className="border-t border-line">
              <td className="py-1 text-ink-dim">{id}</td>
              <td className={`py-1 text-right ${verdict === 'survived' ? 'text-ink' : 'text-ink-faint'}`}>{verdict}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-2 text-xs leading-relaxed text-ink-faint">
        Mutants of rootcause&apos;s investigator brief, one run per scenario, 25 scenarios each.{' '}
        <a href={`${GH}/rootcause/blob/main/results/litmus/2026-10-15.md`} target="_blank" rel="noopener noreferrer" className={linkClass}>
          2026-10-15.md
        </a>
      </figcaption>
    </figure>
  )
}

// cited: the cited#1 regression, rerun through tiering_core.tier_for_claim on current main.
const MISSING = ['$12M', 'Series A', 'Sequoia']

function CitedExample() {
  const claim = 'Acme Robotics raised a $12M Series A led by Sequoia'
  const parts = claim.split(new RegExp(`(${MISSING.map((m) => m.replace('$', '\\$')).join('|')})`))
  return (
    <figure className="space-y-3 text-sm">
      <div>
        <p className="font-mono text-xs text-ink-faint">claim</p>
        <p className="mt-1 text-ink">
          {parts.map((part, i) =>
            MISSING.includes(part) ? (
              <span key={i} className="underline decoration-ink-faint decoration-dotted underline-offset-4">
                {part}
              </span>
            ) : (
              part
            ),
          )}
        </p>
      </div>
      <div>
        <p className="font-mono text-xs text-ink-faint">cited page</p>
        <p className="mt-1 text-ink-dim">
          Acme Robotics builds warehouse automation software for mid-size logistics companies.
        </p>
      </div>
      <dl className="border-t border-line pt-3 font-mono text-xs leading-relaxed">
        <div className="flex gap-3">
          <dt className="w-12 flex-shrink-0 text-ink-faint">before</dt>
          <dd className="text-ink-dim">low_match, topical 0.40, allowed to ship</dd>
        </div>
        <div className="mt-1 flex gap-3">
          <dt className="w-12 flex-shrink-0 text-ink-faint">after</dt>
          <dd className="text-ink">unsupported: 12, 12 million, Series A, Series, Sequoia not on page</dd>
        </div>
      </dl>
      <figcaption className="text-xs leading-relaxed text-ink-faint">
        The regression test from{' '}
        <a href={`${GH}/cited/pull/1`} target="_blank" rel="noopener noreferrer" className={linkClass}>
          cited#1
        </a>
        , rerun on current main. Dotted: specifics the page does not contain.
      </figcaption>
    </figure>
  )
}

const FLAGSHIPS = [
  {
    id: 'rootcause',
    number: '25x',
    finding: 'apart in cost per solved incident, with pass rates flat at 77-84% across seven settings.',
    what: 'Incident root-cause agent with a hand-written loop over MCP, graded against known causes.',
    visual: <RootcauseChart />,
    second: { label: 'Read the write-up', href: '/writing/rootcause-benchmark/' },
  },
  {
    id: 'litmus',
    number: '0 of 12',
    finding: 'broken copies of the rootcause brief were caught by its eval suite. 11 survived, 1 was inconclusive.',
    what: 'Mutation testing for eval suites: it breaks the prompt on purpose and checks whether the evals notice.',
    visual: <LitmusTable />,
    second: { label: 'Mutation results', href: `${GH}/rootcause/blob/main/results/litmus/2026-10-15.md` },
  },
  {
    id: 'cited',
    number: '0.40',
    finding: 'topical score let a made-up funding round pass as a near match. Numbers and names now have to be on the page.',
    what: 'Re-fetches every source an LLM cites and flags claims whose words, numbers or names are not there.',
    visual: <CitedExample />,
    second: { label: 'The fix, cited#1', href: `${GH}/cited/pull/1` },
  },
]

export default function Flagships() {
  return (
    <section id="work" className="border-t border-line px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl border-l border-line pl-5">
        <h2 className="mb-2 text-2xl font-medium text-ink">Work</h2>
        <p className="mb-12 text-ink-dim">Three projects, each with the result it produced.</p>

        <div>
          {FLAGSHIPS.map((f) => (
            <article
              key={f.id}
              id={f.id}
              className="grid scroll-mt-24 gap-8 border-b border-line py-10 first:pt-0 last:border-b-0 sm:grid-cols-[1fr_1.15fr]"
            >
              <div>
                <h3 className="text-xl font-medium">
                  <Link href={`/projects/${f.id}/`} className="group inline-flex items-center gap-1.5 text-ink">
                    {f.id}
                    <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent" />
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{f.what}</p>
                <p className="mt-6 leading-snug text-ink-dim">
                  <span className="mr-1.5 text-3xl font-medium tabular text-ink">{f.number}</span>
                  {f.finding}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink">
                  <a href={`${GH}/${f.id}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Repo
                  </a>
                  <a
                    href={f.second.href}
                    {...(f.second.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={linkClass}
                  >
                    {f.second.label}
                  </a>
                </div>
              </div>
              <div className="min-w-0">{f.visual}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

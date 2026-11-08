// Small, data-only demonstrations for tiles whose repos publish a figure.
// Every number below is copied from the named public source; projects without
// a published figure get no demo rather than an invented one.

// rootcause README, "Hand-written loop against LangGraph": 300 runs, Opus 5.5 high,
// cost per solved incident for a single agent vs an orchestrator with workers.
const ORCHESTRATION = [
  { harness: 'my loop', single: 0.1149, orchestrated: 0.3745 },
  { harness: 'LangGraph', single: 0.1114, orchestrated: 0.343 },
]
const ORCH_MAX = 0.4

// rootcause results/litmus/2026-10-15.md: 12 mutants of the investigator brief,
// 11 survived, 1 inconclusive (the emptied brief could not run), 0 killed.
const LITMUS = { survived: 11, inconclusive: 1, killed: 0 }

// rag-generation README: hybrid vs BM25 on MRR, paired difference with a
// bootstrap interval, 55 labelled queries over 1,365 reviews.
const MRR = { delta: 0.1, low: 0.02, high: 0.18, axisMin: -0.05, axisMax: 0.25 }

// signal-scout#3: three bugs planted in the validation, scoring and
// verification code; CI turned red on each.
const PLANTED = { caught: 3, total: 3 }

const label = 'mt-2 font-mono text-[11px] leading-snug text-ink-faint'

function Orchestration() {
  return (
    <figure className="mt-4" aria-label="cost per solved incident, single agent versus orchestrator with workers">
      <div className="space-y-1.5">
        {ORCHESTRATION.map((h) => (
          <div key={h.harness} className="grid grid-cols-[5.5rem_1fr] items-center gap-x-3 font-mono text-[11px] tabular text-ink-faint">
            <span>{h.harness}</span>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-1.5 bg-ink" style={{ width: `${(h.single / ORCH_MAX) * 100}%` }} />
                <span>${h.single.toFixed(4)} single</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 bg-ink-ghost" style={{ width: `${(h.orchestrated / ORCH_MAX) * 100}%` }} />
                <span>${h.orchestrated.toFixed(4)} orchestrator + workers</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className={label}>cost per solved incident, 300 runs, Opus 5.5 high. Splitting the work cost about 3x; no accuracy gain was detected, though gaps under about 12-15 points would not have been.</figcaption>
    </figure>
  )
}

function Mutants() {
  const cells = [
    ...Array(LITMUS.killed).fill('killed'),
    ...Array(LITMUS.survived).fill('survived'),
    ...Array(LITMUS.inconclusive).fill('inconclusive'),
  ]
  return (
    <figure className="mt-4" aria-label="12 mutants of the rootcause brief: 11 survived, 1 inconclusive, 0 killed">
      <div className="flex gap-1.5">
        {cells.map((state, i) => (
          <span
            key={i}
            title={state}
            className={`h-5 w-5 ${state === 'killed' ? 'bg-accent' : state === 'survived' ? 'bg-ink-ghost' : 'bg-panel'}`}
          />
        ))}
      </div>
      <figcaption className={label}>
        12 broken copies of the rootcause brief, run against its own eval suite: 11 survived, 1 could not run, 0 caught. Orange would mark a catch; there are none.
      </figcaption>
    </figure>
  )
}

function MrrDelta() {
  const pct = (v: number) => ((v - MRR.axisMin) / (MRR.axisMax - MRR.axisMin)) * 100
  return (
    <figure className="mt-4" aria-label="hybrid minus BM25 on MRR: +0.10, interval 0.02 to 0.18">
      <div className="relative h-5">
        <span className="absolute inset-y-0 w-px bg-ink-faint" style={{ left: `${pct(0)}%` }} />
        <span className="absolute top-1/2 h-px -translate-y-1/2 bg-ink" style={{ left: `${pct(MRR.low)}%`, width: `${pct(MRR.high) - pct(MRR.low)}%` }} />
        <span className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" style={{ left: `${pct(MRR.delta)}%` }} />
      </div>
      <div className="flex justify-between font-mono text-[11px] tabular text-ink-faint">
        <span>0</span>
        <span>hybrid minus BM25, MRR: +0.10 (0.02 to 0.18)</span>
      </div>
      <figcaption className={label}>The interval clears zero, so hybrid wins on MRR here. On recall the two tied, so the README calls it the safe default, not the winner.</figcaption>
    </figure>
  )
}

function Planted() {
  return (
    <figure className="mt-4" aria-label="3 planted bugs, 3 caught by CI">
      <div className="flex gap-1.5">
        {Array.from({ length: PLANTED.total }).map((_, i) => (
          <span key={i} className={`h-5 w-5 ${i < PLANTED.caught ? 'bg-accent' : 'bg-ink-ghost'}`} title="caught" />
        ))}
      </div>
      <figcaption className={label}>Three bugs planted in the verification code, one at a time. CI went red on each. That is the whole eval, and it is small.</figcaption>
    </figure>
  )
}

// cited#1: the regression test from that PR, rerun through tier_for_claim on
// current main. "before" is quoted from the PR body; "after" is the tool's output.
const CITED = {
  claim: 'Acme Robotics raised a $12M Series A led by Sequoia',
  missing: ['$12M', 'Series A', 'Sequoia'],
  page: 'Acme Robotics builds warehouse automation software for mid-size logistics companies.',
  before: 'low_match, topical 0.40, allowed to ship',
  after: 'unsupported: 12, 12 million, Series A, Series, Sequoia not on page',
}

function Cited() {
  const parts = CITED.claim.split(new RegExp(`(${CITED.missing.map((m) => m.replace('$', '\\$')).join('|')})`))
  return (
    <figure className="mt-4" aria-label="the cited#1 regression: a made-up funding round, before and after the fix">
      <p className="text-sm text-ink">
        {parts.map((part, i) =>
          CITED.missing.includes(part) ? (
            <span key={i} className="underline decoration-accent decoration-dotted underline-offset-4">{part}</span>
          ) : (
            part
          ),
        )}
      </p>
      <p className="mt-1 text-sm text-ink-faint">cited page: {CITED.page}</p>
      <dl className="mt-2 font-mono text-[11px] leading-relaxed">
        <div className="flex gap-3"><dt className="w-12 flex-shrink-0 text-ink-faint">before</dt><dd className="text-ink-faint">{CITED.before}</dd></div>
        <div className="flex gap-3"><dt className="w-12 flex-shrink-0 text-ink-faint">after</dt><dd className="text-ink">{CITED.after}</dd></div>
      </dl>
      <figcaption className={label}>The regression test from cited#1, rerun on current main. Dotted: the specifics the page does not contain.</figcaption>
    </figure>
  )
}

const DEMOS: Record<string, () => JSX.Element> = {
  rootcause: Orchestration,
  litmus: Mutants,
  cited: Cited,
  'rag-generation': MrrDelta,
  'signal-scout': Planted,
}

export function TileDemo({ id }: { id: string }) {
  const Demo = DEMOS[id]
  return Demo ? <Demo /> : null
}

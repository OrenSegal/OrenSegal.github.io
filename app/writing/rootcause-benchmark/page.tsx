import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { RootcauseResults } from '@/components/RootcauseResults'

const title = 'The benchmark that didn\'t pick a winner'
const description =
  'I ran 525 graded runs of my incident benchmark, rootcause, with Claude Code\'s own agent loop as the investigator, across seven settings. Accuracy stayed at 77-84% with overlapping intervals; cost per solved incident varied 25x.'

export const metadata: Metadata = {
  title: `${title} | Oren Segal`,
  description,
  openGraph: { title, description, type: 'article', images: ['/og-image.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
}

const REPO = 'https://github.com/OrenSegal/rootcause'
const linkClass =
  'text-ink underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'

// Every figure below comes from the rootcause README and its committed results/ files.
const sections: { heading: string; paragraphs: string[] }[] = [
  {
    heading: 'The setup',
    paragraphs: [
      'The eval set is 25 incidents with known causes. Twenty-two are written as code, each around a mistake a responder could make under pressure, like a deploy that lands just before a vendor outage. The other three are real failed CI runs from sous, another of my repos.',
      'The scenarios plant decoys against the obvious heuristic, "blame the last deploy before the first error." That baseline gets three of them right. The ground truth stays out of every fixture the agent can read. The grader checks the category, the service, that every cited id is one a tool returned, and that no rollback hit an innocent deploy.',
      'One good run proves little, so the sweep runs every scenario three times per setting, interleaved across settings. Harness failures (a crash, a timeout, a run served by the wrong model) are retried, never counted as wrong answers. Each setting gets a Wilson interval on its pass rate, pass^3 (all three attempts right, which is what you want from something on call), and cost per solved incident, which includes what the failed runs spent.',
    ],
  },
  {
    heading: 'The result',
    paragraphs: [
      'The sweep covered seven settings: Opus 5.5 at high, medium and low effort, Sonnet 5.5 and Haiku 5.5 at high, and two retrieval variants of Opus at high effort, one with BM25 search and one with a hybrid. So five model and effort settings plus two retrieval variants, 75 runs each, all through Claude Code\'s own agent loop.',
    ],
  },
  {
    heading: '',
    paragraphs: [
      'Every setting landed between 77% and 84%, and every interval overlaps every other one. At 75 runs per setting, a gap under about ten to twelve points is noise. Cost did separate them, by about 25x: from $0.0033 per solved incident for Haiku to $0.081 for Opus at high effort. Opus at medium effort was at least as accurate as Opus at high, for less. The extra reasoning bought nothing I could measure.',
      'The hybrid-search row has the highest point, and it is tempting to credit retrieval for it. I can\'t. With the search tool available and named in the brief, Opus called it in 3 of 75 runs in each retrieval setting.',
    ],
  },
  {
    heading: 'Splitting the work didn\'t pay either',
    paragraphs: [
      'A separate 300-run comparison held the model at Opus 5.5 high and changed the harness instead: my hand-written loop against the same investigation rebuilt as a LangGraph graph, each run as a single agent and as an orchestrator with workers. Everything else was shared, down to the grader.',
      'The two frameworks were indistinguishable. The orchestrator with workers cost about three times as much per solved incident ($0.3745 against $0.1149 in my loop, $0.3430 against $0.1114 in LangGraph) and took about twice as long, for no measurable gain in either harness.',
    ],
  },
  {
    heading: 'Retrieval, measured on its own',
    paragraphs: [
      'Before the agent ever sees a search tool, I score the retrievers by themselves over a corpus of 33 past postmortems. With the alert plus the first error log line as the query, plain BM25 reached recall@5 of 0.94 and MRR of 0.83. Both embedding models and a fused hybrid scored lower on MRR, the transformer model at roughly a thousand times the query latency. Incident text is full of exact tokens like x509 or "No space left on device", and lexical matching handles those directly. The corpus and the scenarios also share an author, which favors it.',
    ],
  },
  {
    heading: 'The brief, mutation-tested',
    paragraphs: [
      'I also mutation-tested the investigator\'s brief with the operators from litmus, my mutation tester for eval suites: delete an instruction, invert a rule, make a fact wrong, truncate it. 0 of 12 mutants were killed: 11 survived and 1 was inconclusive. The 11 survivors had pass rates between 72% and 84%, against 79% for the original. The inconclusive one, an emptied brief, could not run because the API rejects an empty system prompt.',
      'That says more about the suite than about the brief. No scenario depends on any single instruction, so the suite could not catch a regression in one.',
    ],
  },
  {
    heading: 'What it doesn\'t show',
    paragraphs: [
      'The intervals treat each run as independent. Repeats of one scenario are correlated, so the real uncertainty is somewhat wider than the chart shows, which only strengthens the main finding.',
      'There is no held-out set: the scenarios, the corpus and the labels share an author, which limits how far any of this generalizes. Every live run went through Claude Code, with costs as Claude Code reports them at API list prices; the native Anthropic API adapter is tested only against a mocked transport. Some failures are disagreements with a strict grader that accepts one service per scenario, not clear misses.',
    ],
  },
  {
    heading: 'What I take from it',
    paragraphs: [
      'When the accuracy intervals overlap, accuracy is not the axis to choose on. Pick the cheapest setting that sits inside the interval. On this suite that is Haiku 5.5, at about a twenty-fifth of the cost of Opus at high effort.',
      'The more useful next step is a suite that can tell settings apart: scenarios where a single rule of the brief decides the outcome, a grader that accepts more than one defensible service (decided before looking at model answers), and a retrieval step the agent has to take, so search can actually be measured.',
    ],
  },
]

export default function RootcauseBenchmarkPage() {
  return (
    <article className="min-h-screen px-4 pb-20 pt-24 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back home
        </Link>

        <h1 className="text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 font-mono text-xs text-ink-faint">rootcause · sweeps run 2026-10-15</p>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-dim">
          <p>
            I built{' '}
            <a href={REPO} target="_blank" rel="noopener noreferrer" className={linkClass}>
              rootcause
            </a>{' '}
            to find the root cause of production incidents and failed CI runs.
            Before deciding which model it should run on, I wanted a number I
            could defend, so I ran its benchmark 525 times, with Claude Code&apos;s own agent loop
            as the investigator over rootcause&apos;s tools and grader. The number I
            got wasn&apos;t the one I went looking for.
          </p>
        </div>

        {sections.map((section, i) => (
          <section key={i} className={section.heading ? 'mt-12' : 'mt-8'}>
            {section.heading && (
              <h2 className="mb-4 text-2xl font-medium text-ink">{section.heading}</h2>
            )}
            <div className="space-y-5 text-lg leading-relaxed text-ink-dim">
              {section.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
            {section.heading === 'The result' && <RootcauseResults />}
          </section>
        ))}

        <div className="mt-14 border-t border-line pt-8 text-sm leading-relaxed text-ink-dim">
          <p>
            The full tables, per-scenario grades and every diagnosis are in the
            repo:{' '}
            <a href={`${REPO}#results`} target="_blank" rel="noopener noreferrer" className={linkClass}>
              README results
            </a>{' '}
            and{' '}
            <a href={`${REPO}/tree/main/results`} target="_blank" rel="noopener noreferrer" className={linkClass}>
              results/
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  )
}

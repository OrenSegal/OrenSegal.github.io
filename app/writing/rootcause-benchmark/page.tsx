import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { RootcauseResults } from '@/components/RootcauseResults'

const title = 'The benchmark that didn\'t pick a winner'
const description =
  'I ran 525 graded runs of my incident benchmark, rootcause, with Claude Code\'s own agent loop as the investigator, across seven settings. Pass rates stayed at 77-84% with overlapping intervals; cost per solved incident varied 25x.'

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
      'That flat result depends on my grader. Two scenarios fail in every run and make up 42 of the 107 failures, and 53 failures are wrong on the service alone. Drop the service check and Opus at high effort scores 93%, Haiku 85% and Sonnet 83%, with the Opus-Sonnet gap at 3 to 20 points when I resample scenarios. Overlapping intervals did not show the models are equal.',
      'The hybrid-search row has the highest point, and it is tempting to credit retrieval for it. I can\'t. With the search tool available and named in the brief, Opus called it in 3 of 75 runs in each retrieval setting.',
    ],
  },
  {
    heading: 'Splitting the work didn\'t pay either',
    paragraphs: [
      'A separate 300-run comparison held the model at Opus 5.5 high and changed the harness instead: my framework-free loop against the same investigation rebuilt as a LangGraph graph, each run as a single agent and as an orchestrator with workers. Everything else was shared, down to the grader.',
      'I found no detectable difference between the two frameworks, though the single-agent accuracy gap could be anywhere from -8 to +3 points. The orchestrator with workers cost about three times as much per solved incident ($0.3745 against $0.1149 in my loop, $0.3430 against $0.1114 in LangGraph) and took about twice as long, for no measurable gain in either harness.',
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
      'I also mutation-tested the investigator\'s brief with the operators from litmus, my mutation tester for eval suites: delete an instruction, invert a rule, make a fact wrong, truncate it. 0 of 12 mutants were killed: 11 survived and 1 was inconclusive. The 11 survivors had pass rates between 72% and 84%, against 79% for the original. The inconclusive one, an emptied brief, could not run because the API rejects an empty system prompt. Two survivors touch a rule the harness already enforces through its output schema, so they could not fail.',
      'That says more about the suite than about the brief. No scenario depends on any single instruction, so the suite could not catch a regression in one.',
    ],
  },
  {
    heading: 'The follow-up: eight scenarios built to kill mutants',
    paragraphs: [
      'So I built the suite the first run called for. Eight new scenarios, each named for one rule of the brief and designed so that rule decides the outcome. The grader now accepts a set of defensible services per scenario, written before any model answered, with the old single-service grade kept behind a flag. Three scenarios are held out, never used to change the brief or the grader. Every new scenario requires the agent to search past postmortems, so search is a measured step.',
      'Run once at three model tiers, 72 runs: Opus 24 of 24, Sonnet 24 of 24, Haiku 21 of 24. The suite does not separate the top two tiers, and Haiku\'s three misses were all a wrong category with the right service and evidence. Every run searched, but only because the brief now says to and the grader requires it, so that shows instruction-following, not that search helps.',
      'Then I mutation-tested the retrieval brief against the new scenarios: 112 runs, 14 mutants. 2 were killed, 11 survived and 1 was inconclusive. Both kills are the search requirement: delete the search line, or truncate the brief past it, and the grader fails every run because a search it demands is no longer asked for. Deleting or inverting any behavioural rule, such as gather evidence first or finish with the structured answer, survived. Scenarios built around single rules did not catch a single rule being broken. The original problem is half fixed: the suite now catches a brief that stops asking for search, and still cannot catch a regression in a behavioural instruction.',
    ],
  },
  {
    heading: 'What it doesn\'t show',
    paragraphs: [
      'The intervals treat each run as independent. Repeats of one scenario are correlated, so the real uncertainty is somewhat wider than the chart shows, which only strengthens the main finding.',
      'The held-out split in the follow-up controls for tuning, not authorship: the scenarios, the corpus and the labels share an author, which limits how far any of this generalizes. Every live run went through Claude Code, with costs as Claude Code reports them at API list prices; the native Anthropic API adapter is tested only against a mocked transport. In the 525-run sweep, some failures are disagreements with a strict grader that accepts one service per scenario, not clear misses; the accepted-service grade came after, and I did not widen those scenarios, since their answers were already published.',
    ],
  },
  {
    heading: 'What I take from it',
    paragraphs: [
      'If the accuracy your task needs is what this grader scores, overlapping intervals leave cost as the axis to choose on, and the cheapest setting here is Haiku 5.5, at about a twenty-fifth of the cost of Opus at high effort. If you need the category right more than the exact service, Opus earns more of its price. Run the comparison with your own grader before deciding.',
      'A suite that can tell settings apart is harder than it looks. I built the pieces: scenarios aimed at single rules, a pre-registered multi-service grader, a held-out split and a required search step. Mutation testing says it still does not catch a broken behavioural rule. The next try needs harder traps, several runs per mutant, and a weaker model as the baseline.',
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

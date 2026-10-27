import { ArrowRight } from 'lucide-react'
import { StatusDot } from '@/components/StatusDot'
import { DepthTag } from '@/components/DepthTag'

const linkClass =
  'underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'

export default function Hero() {
  return (
    <section className="px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-40">
      <div className="relative mx-auto w-full max-w-3xl animate-rise border-l border-line pl-5">
        <DepthTag label="surface" />

        <h1 className="max-w-2xl text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
          I build AI agents, and the evals that show whether they work.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-dim">
          I ran 525 graded runs of my incident benchmark, rootcause, with
          Claude Code&apos;s own agent loop as the investigator, across seven
          configurations of model, effort and retrieval. Accuracy stayed at{' '}
          <span className="whitespace-nowrap">77-84%</span> with overlapping
          intervals. Cost per solved incident varied 25x.
        </p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink">
          <a href="/writing/rootcause-benchmark/" className={linkClass}>
            Read the benchmark
          </a>
          <a href="/resume.pdf" className={linkClass}>
            Resume (PDF)
          </a>
          <a
            href="https://github.com/OrenSegal/rootcause#results"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            rootcause on GitHub
          </a>
        </div>

        <div className="mt-8 max-w-xl border-y border-line py-4">
          <div className="flex items-start gap-2.5">
            <span className="mt-1.5">
              <StatusDot />
            </span>
            <span className="text-sm text-ink">
              Open to Applied AI Engineer roles · New York or remote · US
              permanent resident, no sponsorship needed
            </span>
          </div>
        </div>

        <a
          href="#work"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink"
        >
          See the work
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}

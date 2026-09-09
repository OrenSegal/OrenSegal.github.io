import { ArrowRight } from 'lucide-react'
import githubStats from '@/lib/github-stats.json'
import { getSystemStatus, formatVerifiedDate } from '@/lib/status'
import { StatusDot } from '@/components/StatusDot'
import { DepthTag } from '@/components/DepthTag'

export default function Hero() {
  const status = getSystemStatus()

  return (
    <section className="flex min-h-screen flex-col justify-center px-4 pt-24 sm:px-6">
      <div className="relative mx-auto w-full max-w-3xl animate-rise border-l border-line pl-5">
        <DepthTag label="surface" />

        <h1 className="max-w-2xl text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
          I build the parts of AI systems that keep them honest once real money
          and real users show up: cost budgets, fact-checking, CI for code an
          LLM wrote.
        </h1>

        <div className="mt-8 max-w-xl border-y border-line py-4">
          <div className="flex items-center gap-2.5">
            <StatusDot />
            <span className="text-sm text-ink">
              {status.verified} of {status.total} repos confirmed live at build time
            </span>
          </div>
          <p className="mt-2 font-mono text-xs tabular text-ink-faint">
            last verified {formatVerifiedDate(status.lastVerified)} ·{' '}
            <a
              href="https://github.com/OrenSegal?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-accent-dim underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
            >
              {githubStats.openSourcePercent}% open source, check it yourself
            </a>
          </p>
        </div>

        <a
          href="#work"
          className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink"
        >
          See the work
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}

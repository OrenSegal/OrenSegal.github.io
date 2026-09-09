import { ArrowRight } from 'lucide-react'
import { projects } from '@/lib/projects'
import githubStats from '@/lib/github-stats.json'

export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col justify-center px-4 pt-24 sm:px-6">
      <div className="mx-auto w-full max-w-3xl animate-rise">
        <h1 className="max-w-2xl text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
          I build the infrastructure that keeps AI agents honest under load — cost
          budgets, fact-checking, and CI for code an LLM wrote.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-dim">
          Not demos. {projects.length} shipped projects, each with a public repo,
          real tests, and green CI —{' '}
          <a
            href="https://github.com/OrenSegal?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-accent-dim underline-offset-4 transition-colors hover:decoration-accent"
          >
            {githubStats.openSourcePercent}% of it open source, verifiable on GitHub
          </a>
          .
        </p>

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

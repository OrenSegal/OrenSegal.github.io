import { DepthTag } from '@/components/DepthTag'

const stack = [
  'Python', 'TypeScript', 'Swift/SwiftUI', 'SQL/PostgreSQL', 'pgvector', 'Supabase',
  'Claude API', 'Claude Code', 'MCP', 'LangGraph', 'OpenTelemetry', 'GitHub Actions',
  'Docker', 'Azure',
]

export default function About() {
  return (
    <section id="about" className="border-t border-line px-4 py-24 sm:px-6">
      <div className="relative mx-auto max-w-3xl border-l border-line pl-5">
        <DepthTag label="deepest" />
        <h2 className="mb-8 text-2xl font-medium text-ink">About</h2>

        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-dim">
          <p>
            I&apos;m an applied AI engineer in Brooklyn. Most of my work is the
            part of an agent system nobody demos: the eval that says how often
            it&apos;s right, what each correct answer costs, and the check that
            stops an agent from reporting work it didn&apos;t do.
          </p>
          <p>
            I&apos;m also building{' '}
            <a
              href="https://shelfie.food"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Shelfie
            </a>
            , a vision-based iOS kitchen app in closed TestFlight beta. You walk
            the camera past your fridge and pantry once, and it builds the
            inventory that meal plans, grocery lists and expiry reminders run
            on. Claude Code agents write most of its code. I own the
            architecture, the review, and the CI that catches work that looks
            finished without being finished.
          </p>
          <p>
            The projects here came out of that work: measuring an incident
            agent, mutation-testing eval suites, checking citations against
            their sources, and keeping parallel agent sessions off the same
            file.
          </p>
          <p>
            Before this I spent five years as a senior data analyst at Reshet
            13, an Israeli TV network, building the Python and SQL pipelines and
            forecasting models the business ran on. I moved to New York in 2023
            and retrained full time in AI/ML before starting Shelfie.
          </p>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-ink-faint">
          {stack.join(' · ')}
        </p>
      </div>
    </section>
  )
}

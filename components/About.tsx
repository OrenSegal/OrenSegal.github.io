import { DepthTag } from '@/components/DepthTag'

const stack = [
  'Swift', 'SwiftUI', 'TypeScript', 'Python', 'SQL', 'PostgreSQL', 'Supabase',
  'Claude Code', 'Gemini', 'Apple Vision', 'GitHub Actions', 'Playwright', 'Docker',
]

export default function About() {
  return (
    <section id="about" className="border-t border-line px-4 py-24 sm:px-6">
      <div className="relative mx-auto max-w-3xl border-l border-line pl-5">
        <DepthTag label="deepest" />
        <h2 className="mb-8 text-2xl font-medium text-ink">About</h2>

        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-dim">
          <p>
            Shelfie is a vision-based iOS kitchen app, now in TestFlight beta.
            You walk the camera past your fridge and pantry once, and it builds
            the inventory that meal plans, grocery lists and expiry reminders
            run on.
          </p>
          <p>
            Claude Code agents write most of its code, which turned a lot of my
            job into review. The harness they work in assumes an agent&apos;s
            report is unproven until a check backs it up, and a merge waits for
            me whenever a review asks for a person. Much of the CI targets work
            that looks finished without being finished, like a test filter that
            matches nothing and still exits green.
          </p>
          <p>
            The projects here came out of that work: checking citations against
            their sources, testing prompt-based skills, keeping parallel agent
            sessions off the same file, and capping what an app spends on model
            calls.
          </p>
          <p>
            Before this I spent five years as a senior data analyst at Reshet
            13, an Israeli TV network, building the Python and SQL pipelines and
            forecasting models the business ran on.
          </p>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-ink-faint">
          {stack.join(' · ')}
        </p>
      </div>
    </section>
  )
}

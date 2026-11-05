import Link from 'next/link'
import { DepthTag } from '@/components/DepthTag'

const stack = [
  'Python', 'TypeScript', 'Swift', 'React', 'SQL', 'Postgres', 'pgvector', 'SQLite', 'Bash',
  'Claude API', 'Claude Code', 'MCP', 'LangGraph', 'OpenTelemetry', 'GitHub Actions',
]

const GH = 'https://github.com/OrenSegal'

// Own work only, each item links to the file or folder in a public repo.
const toolkit: { label: string; items: { name: string; href: string }[] }[] = [
  {
    label: 'Hooks',
    items: [
      { name: 'sous guard', href: `${GH}/sous/blob/main/hooks/sous-guard.sh` },
      { name: 'scoped edit lock', href: `${GH}/scoped/blob/main/hooks/pretool-enforce.mjs` },
    ],
  },
  {
    label: 'Skills',
    items: [
      { name: 'signal-scout', href: `${GH}/signal-scout/tree/main/skills/signal-scout` },
      { name: 'test-audit', href: `${GH}/sous/tree/main/skills/test-audit` },
      { name: 'deuce', href: `${GH}/deuce/tree/main/skills/deuce` },
      { name: 'podcast', href: `${GH}/signal-skills/tree/main/plugins/podcast` },
      { name: 'review-scout', href: `${GH}/signal-skills/tree/main/plugins/review-scout` },
      { name: 'ideation', href: `${GH}/signal-skills/tree/main/plugins/ideation` },
    ],
  },
  {
    label: 'MCP servers',
    items: [
      { name: 'rootcause telemetry', href: `${GH}/rootcause/blob/main/src/rootcause/adapters/mcp_telemetry.py` },
      { name: 'scoped', href: `${GH}/scoped/blob/main/bin/scoped-mcp` },
    ],
  },
  {
    label: 'Commands and subagents',
    items: [
      { name: 'sous commands', href: `${GH}/sous/tree/main/commands` },
      { name: 'sous-reviewer', href: `${GH}/sous/blob/main/agents/sous-reviewer.md` },
    ],
  },
  {
    label: 'Mods',
    items: [
      { name: 'blast-shield (fork)', href: `${GH}/blast-shield` },
      { name: 'sous handoff', href: `${GH}/sous/tree/main/mods/handoff` },
    ],
  },
  {
    label: 'Agent loop and evals',
    items: [
      { name: 'hand-written loop', href: `${GH}/rootcause/blob/main/src/rootcause/application/agent.py` },
      { name: 'litmus result', href: `${GH}/rootcause/blob/main/results/litmus/2026-10-15.md` },
      { name: 'sous evals', href: `${GH}/sous/tree/main/evals` },
      { name: 'cited evals', href: `${GH}/cited/tree/main/evals` },
    ],
  },
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
            on. Claude Code agents write much of its code. I own the
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
            forecasting models the business ran on.{' '}
            <Link href="/writing/reshet-pricing-model/" className="text-ink underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
              How I got a pricing model adopted there
            </Link>
            . I moved to New York in 2023 and retrained full time in AI/ML
            before starting Shelfie.
          </p>
        </div>

        <h3 id="toolkit" className="mb-4 mt-12 text-lg font-medium text-ink-dim">
          Hooks, skills and tools I wrote
        </h3>
        <dl className="max-w-2xl space-y-3 text-sm leading-relaxed">
          {toolkit.map((group) => (
            <div key={group.label} className="sm:flex sm:gap-4">
              <dt className="flex-shrink-0 text-ink-faint sm:w-44">{group.label}</dt>
              <dd className="text-ink-dim">
                {group.items.map((item, i) => (
                  <span key={item.name}>
                    {i > 0 && ' · '}
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-accent-dim underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
                    >
                      {item.name}
                    </a>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-sm leading-relaxed text-ink-faint">
          {stack.join(' · ')}
        </p>
      </div>
    </section>
  )
}

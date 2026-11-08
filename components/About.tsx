import Link from 'next/link'

const stack = [
  'Python', 'TypeScript', 'Swift', 'SQL', 'Postgres', 'pgvector', 'SQLite', 'Bash',
  'Claude API', 'Claude Code', 'Gemini API', 'MCP', 'OpenTelemetry', 'GitHub Actions',
  'pandas', 'scikit-learn', 'regression and forecasting', 'bootstrap intervals and power analysis',
]

const GH = 'https://github.com/OrenSegal'

// Own work only, each item links to the file or folder in a public repo.
const toolkit: { label: string; items: { name: string; href: string }[] }[] = [
  {
    label: 'Hooks',
    items: [
      { name: 'sous guard', href: `${GH}/sous/blob/main/hooks/sous-guard.sh` },
      { name: 'scoped edit lock', href: `${GH}/sous/blob/main/plugins/scoped/hooks/pretool-enforce.mjs` },
    ],
  },
  {
    label: 'Skills',
    items: [
      { name: 'signal-scout', href: `${GH}/signal-scout/tree/main/skills/signal-scout` },
      { name: 'test-audit', href: `${GH}/sous/tree/main/skills/test-audit` },
      { name: 'deuce', href: `${GH}/sous/tree/main/plugins/deuce/skills` },
      { name: 'podcast', href: `${GH}/signal-skills/tree/main/plugins/podcast` },
      { name: 'review-scout', href: `${GH}/signal-skills/tree/main/plugins/review-scout` },
      { name: 'ideation', href: `${GH}/signal-skills/tree/main/plugins/ideation` },
    ],
  },
  {
    label: 'MCP servers',
    items: [
      { name: 'rootcause telemetry', href: `${GH}/rootcause/blob/main/src/rootcause/adapters/mcp_telemetry.py` },
      { name: 'scoped', href: `${GH}/sous/blob/main/plugins/scoped/bin/scoped-mcp` },
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
      { name: 'blast-shield (fork)', href: `${GH}/sous/tree/main/plugins/blast-shield` },
      { name: 'sous handoff', href: `${GH}/sous/tree/main/mods/handoff` },
    ],
  },
  {
    label: 'Agent loop and evals',
    items: [
      { name: 'framework-free loop', href: `${GH}/rootcause/blob/main/src/rootcause/application/agent.py` },
      { name: 'litmus result', href: `${GH}/rootcause/blob/main/results/litmus/2026-10-15.md` },
      { name: 'sous evals', href: `${GH}/sous/tree/main/evals` },
      { name: 'cited evals', href: `${GH}/cited/tree/main/evals` },
    ],
  },
]

const link = 'text-ink underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'

export default function About() {
  return (
    <section id="about" className="px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-[16vw] font-light lowercase leading-[0.92] tracking-[-0.04em] text-ink sm:text-8xl">
          about
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-4">
          <div className="bg-panel-face p-5 md:col-span-2 sm:p-6">
            <div className="max-w-xl space-y-5 text-base leading-relaxed text-ink-dim sm:text-lg">
              <p>
                I&apos;m an applied AI engineer in Brooklyn. Most of my work is the
                part of an LLM system nobody demos: the eval that says how often
                it&apos;s right, what each correct answer costs, and the check that
                stops an agent from reporting work it didn&apos;t do.
              </p>
              <p>
                <a href="https://shelfie.food" target="_blank" rel="noopener noreferrer" className={link}>Shelfie</a>{' '}
                is the product. I own its architecture, the review and the checks,
                across the Swift app, the Postgres and TypeScript backend and CI.
                The open-source projects here came out of that work: measuring an
                incident agent, mutation-testing eval suites, checking citations
                against their sources, and keeping parallel agent sessions off the
                same file.
              </p>
              <p>
                Before this I spent five years as a Senior Data Analyst at Reshet
                13, an Israeli TV network, building the audience analytics system
                and the forecasting and pricing models the business ran on.{' '}
                <Link href="/writing/reshet-pricing-model/" className={link}>
                  How I got a pricing model adopted there
                </Link>
                . I moved to New York in 2023 and retrained full time in AI/ML
                before starting Shelfie.
              </p>
            </div>
          </div>

          <div className="bg-panel-face p-5 md:col-span-2 sm:p-6">
            <h3 className="text-lg font-medium lowercase text-ink">hooks, skills and tools i wrote</h3>
            <dl className="mt-4 space-y-3 text-sm leading-relaxed">
              {toolkit.map((group) => (
                <div key={group.label} className="sm:flex sm:gap-4">
                  <dt className="flex-shrink-0 lowercase text-ink-faint sm:w-44">{group.label}</dt>
                  <dd className="text-ink-dim">
                    {group.items.map((item, i) => (
                      <span key={item.name}>
                        {i > 0 && ' · '}
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
                          {item.name}
                        </a>
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-sm leading-relaxed text-ink-faint">{stack.join(' · ')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

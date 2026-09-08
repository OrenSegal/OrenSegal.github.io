const skills = [
  { category: 'Agent Infrastructure', items: ['LLM Gateways', 'Cost Enforcement', 'Prompt CI', 'Fact-checking', 'Claude Code Skills'] },
  { category: 'Data Engineering', items: ['PostgreSQL', 'Redis', 'PostGIS', 'ETL Pipelines', 'Data Modeling'] },
  { category: 'Backend', items: ['Python', 'FastAPI', 'GraphQL', 'WebSockets', 'REST APIs'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Testing & CI', items: ['pytest', 'GitHub Actions', 'Contract Tests', 'Linting', 'Ratchet Baselines'] },
  { category: 'Cloud & DevOps', items: ['Vercel', 'Railway', 'Docker', 'CI/CD', 'Supabase'] },
]

const checklist = [
  { title: 'Ship the whole system', detail: 'A repo, tests, and green CI — not a notebook or a demo.' },
  { title: 'Verify before claiming', detail: 'An assertion without a check attached does not ship.' },
  { title: 'Cost is a spec, not an afterthought', detail: 'Gateways enforce budgets; they do not just log them.' },
  { title: 'Keep the family consistent', detail: 'Shared tooling across skills, not one-off scripts that drift.' },
]

export default function About() {
  return (
    <section id="about" className="border-t border-bezel bg-panel px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Flight Log — I build the infra agents run on
          </h2>
          <p className="mt-3 max-w-2xl text-ink-dim">
            Not just prompts — the gateways, guardrails, and CI that make agentic systems trustworthy.
          </p>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">Entry 01 — Background</h3>
            <div className="space-y-4 leading-relaxed text-ink-dim">
              <p>
                Most AI demos die the moment they hit a real cost budget or a fabricated citation.
                I'm obsessed with the last mile — the <span className="font-medium text-ink">infrastructure</span> that
                turns a clever prompt into a system you can actually trust in production.
              </p>
              <p>
                I gravitate toward the unglamorous layer underneath agents: <span className="font-medium text-ink">cost
                enforcement, fact-checking, CI for prompt-driven behavior</span>, and shared tooling that keeps a
                whole family of skills consistent instead of drifting apart.
              </p>
              <p>
                My superpower? Shipping <span className="font-medium text-ink">complete, open-source systems</span> end
                to end — not just a notebook or a prototype. Every project on this site has a public repo,
                real tests, and green CI.
              </p>
            </div>
          </div>

          <div className="border border-bezel bg-panel-face p-6 sm:p-8">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
              Instrument Rating — How I Work
            </h3>
            <ul className="space-y-5">
              {checklist.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border border-bezel font-mono text-[10px] text-ink-dim">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-medium text-ink">{item.title}</h4>
                    <p className="text-sm text-ink-dim">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
            Pre-flight Checklist — Technical Skills
          </h3>
          <div className="grid grid-cols-1 divide-y divide-bezel border border-bezel sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill.category} className="p-6">
                <h4 className="mb-3 font-display text-sm font-medium text-ink">{skill.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="border border-bezel px-2 py-1 font-mono text-[11px] text-ink-dim">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

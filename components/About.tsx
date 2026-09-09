const stack = [
  'Python', 'FastAPI', 'GraphQL', 'PostgreSQL', 'Redis', 'PostGIS',
  'React', 'Next.js', 'TypeScript', 'Docker', 'GitHub Actions', 'Claude Code Skills',
]

export default function About() {
  return (
    <section id="about" className="border-t border-line px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-2xl font-medium text-ink">About</h2>

        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-dim">
          <p>
            Most AI demos die the moment they hit a real cost budget or a fabricated
            citation. I care about the layer underneath the prompt — the part that
            turns a clever call to a model into a system you can actually run in
            production and trust.
          </p>
          <p>
            That means cost enforcement instead of usage dashboards, fact-checking
            gates instead of hoping the model didn&apos;t hallucinate, and CI written for
            behavior a script alone can&apos;t verify. Every project on this site ships as
            a complete, open-source system — repo, tests, green CI — not a notebook.
          </p>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-ink-faint">
          {stack.join(' · ')}
        </p>
      </div>
    </section>
  )
}

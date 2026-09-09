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
            Most AI demos fall apart the first time they meet a real cost budget
            or a citation nobody checked. I work on the part underneath the
            prompt: the plumbing that turns a clever model call into something
            you can run in production without babysitting it.
          </p>
          <p>
            In practice that&apos;s enforcing cost limits instead of just logging
            usage, re-verifying citations instead of hoping the model told the
            truth, and writing CI for behavior a script alone can&apos;t check.
            Every project here ships as a full open-source system: repo, tests,
            green CI, not a notebook someone ran once.
          </p>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-ink-faint">
          {stack.join(' · ')}
        </p>
      </div>
    </section>
  )
}

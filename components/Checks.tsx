// Wording follows the profile README's "Pull requests where a check proved less than it claimed".
const PRS = [
  {
    ref: 'scoped#1',
    href: 'https://github.com/OrenSegal/scoped/pull/1',
    line: 'The only concurrency test ran on one connection. Racing real processes let two sessions claim the same file; the PR fixes both causes.',
  },
  {
    ref: 'cited#1',
    href: 'https://github.com/OrenSegal/cited/pull/1',
    line: 'A made-up funding round scored as a near match. Numbers and names in a claim now have to be on the page.',
  },
  {
    ref: 'signal-scout#3',
    href: 'https://github.com/OrenSegal/signal-scout/pull/3',
    line: 'The eval job graded hand-written outputs, so no change could fail it. It now runs the pipeline on fixtures, and three planted bugs each turn it red.',
  },
]

export default function Checks() {
  return (
    <section id="checks" className="scroll-mt-16 border-t border-line px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl border-l border-line pl-5">
        <h2 className="mb-8 text-2xl font-medium text-ink">Checks that proved less than they claimed</h2>
        <ul>
          {PRS.map((pr) => (
            <li key={pr.ref} className="border-b border-line py-4 first:pt-0 last:border-b-0 sm:flex sm:gap-6">
              <a
                href={pr.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 font-mono text-sm tabular text-ink underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent sm:w-36"
              >
                {pr.ref}
              </a>
              <p className="mt-1 max-w-xl leading-relaxed text-ink-dim sm:mt-0">{pr.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

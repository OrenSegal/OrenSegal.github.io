import { StatusDot } from '@/components/StatusDot'

const linkClass =
  'underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'

// Each chip is a number already stated in the profile README and on this site.
const chips = [
  { label: '525 graded runs', href: '#rootcause' },
  { label: 'cost per solve varied 25x', href: '#rootcause' },
  { label: '0 of 12 mutants killed', href: '#litmus' },
]

export default function Hero() {
  return (
    <section className="px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36">
      <div className="mx-auto w-full max-w-3xl animate-rise border-l border-line pl-5">
        <h1 className="text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">Oren Segal</h1>
        <p className="mt-2 max-w-xl text-lg text-ink-dim">
          Applied AI engineer. I build agents, and the evals and CI checks that
          show whether they work.
        </p>

        <p className="mt-8 max-w-2xl text-xl leading-snug text-ink sm:text-2xl">
          Across 525 graded runs on 7 configurations, pass rates stayed within{' '}
          <span className="whitespace-nowrap">77-84%</span> while cost per solved
          incident varied 25x.
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li key={chip.label}>
              <a
                href={chip.href}
                className="inline-block border border-line px-2.5 py-1 font-mono text-xs tabular text-ink-dim transition-colors hover:border-accent-dim hover:text-accent"
              >
                {chip.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink">
          <a href="/resume.pdf" className={linkClass}>
            Resume (PDF)
          </a>
          <a
            href="https://github.com/OrenSegal"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
          <a href="mailto:orenssegal@gmail.com" className={linkClass}>
            orenssegal@gmail.com
          </a>
        </div>

        <div className="mt-8 max-w-xl border-y border-line py-4">
          <div className="flex items-start gap-2.5">
            <span className="mt-1.5">
              <StatusDot />
            </span>
            <span className="text-sm text-ink">
              Open to Applied AI Engineer and Forward Deployed Engineer roles · New York or remote · US
              permanent resident, no sponsorship needed
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

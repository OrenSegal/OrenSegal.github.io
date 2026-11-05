import { StruckStack } from '@/components/StruckStack'
import { ShelfieTile } from '@/components/ShelfieTile'

const action = 'text-sm font-medium lowercase text-ink transition-colors hover:text-accent'

export default function Hero() {
  return (
    <section className="overflow-hidden pt-24 sm:pt-32">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* The headline runs off the right edge on purpose: the next pane is promised, Metro-style. */}
        <h1 className="animate-glide font-light lowercase leading-[0.92] tracking-[-0.04em] text-ink text-[19vw] sm:whitespace-nowrap sm:text-[12.5vw]">
          applied ai engineer
        </h1>

        <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-lg leading-relaxed text-ink-dim sm:text-xl">
            I build LLM products in Python, TypeScript and Swift, and the evals
            that show whether they work. Founder of Shelfie. Before that, five
            years of forecasting and pricing models at Reshet 13.
          </p>
          <nav aria-label="primary" className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/writing/rootcause-benchmark/" className={action}>read the benchmark</a>
            <a href="/resume.pdf" className={action}>resume</a>
            <a href="https://github.com/OrenSegal" target="_blank" rel="noopener noreferrer" className={action}>github</a>
          </nav>
        </div>

        <p className="mt-6 font-mono text-xs text-ink-faint">
          open to applied ai engineer and forward deployed engineer roles · new york or remote · us permanent resident, no sponsorship needed
        </p>

        <div className="mt-10 grid grid-cols-1 gap-2 sm:mt-14 md:grid-cols-2">
          <StruckStack />
          <ShelfieTile />
        </div>
      </div>
    </section>
  )
}

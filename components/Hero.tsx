import { ArrowRight } from 'lucide-react'
import { GaugeDial, ReadoutWindow, StatusFlag } from './Instruments'
import { projects } from '@/lib/projects'
import githubStats from '@/lib/github-stats.json'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <StatusFlag label="Cleared — Available for hire" />

        <div className="mt-10 grid w-full grid-cols-3 gap-3 sm:gap-4">
          <ReadoutWindow plate="INST-01" label="Projects" value={String(projects.length)} />
          <GaugeDial plate="INST-02" label="Skills" value={6} max={10} bootIndex={0} />
          <GaugeDial
            plate="INST-03"
            label="Open Source"
            value={githubStats.openSourcePercent}
            max={100}
            suffix="%"
            bootIndex={1}
          />
          <ReadoutWindow plate="INST-04" label="Role" value="AI Platform Engineer" />
          <ReadoutWindow plate="INST-05" label="Location" value="Remote / NYC" />
          <ReadoutWindow plate="INST-06" label="Focus" value="Agent Infrastructure" />
        </div>

        <div className="mt-10 border-t border-bezel pt-8 text-center">
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Oren Segal</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-dim sm:text-base">
            AI platform engineer building the infrastructure agents actually run on:
            cost-safe LLM gateways, evidence-backed research agents, and CI that
            catches fabricated claims before a human sees them.
          </p>
        </div>

        <a
          href="#contact"
          className="group mt-8 inline-flex items-center gap-2 border border-signal-dim bg-panel-face px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-signal transition-colors hover:bg-signal hover:text-panel"
        >
          Cleared for contact
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}

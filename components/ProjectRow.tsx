'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { Project } from '@/lib/projects'
import { formatVerifiedDate } from '@/lib/status'
import { StatusDot } from '@/components/StatusDot'

export function ProjectRow({ project, pushedAt }: { project: Project; pushedAt: string | null }) {
  const [expanded, setExpanded] = useState(false)
  const hasBuildLog = Boolean(project.flightLog)

  return (
    <div className="relative border-b border-line py-8 first:pt-0 last:border-b-0">
      <span
        className={`absolute -left-5 top-[15px] h-px w-5 transition-colors duration-300 ${expanded ? 'bg-accent' : 'bg-line'}`}
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-xl font-medium">
          <Link
            href={`/projects/${project.id}`}
            className="group inline-flex items-center gap-1.5 text-ink"
          >
            {project.title}
            <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent" />
          </Link>
        </h4>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={`group inline-flex items-center gap-2 font-mono text-xs tabular transition-colors ${expanded ? 'text-accent' : 'text-ink-faint hover:text-ink'}`}
        >
          <StatusDot
            filled={hasBuildLog}
            label={hasBuildLog ? 'full build log on file' : 'summary only, no build log published'}
          />
          {project.id} · verified {formatVerifiedDate(pushedAt)}
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${expanded ? '-rotate-180' : ''}`}
          />
        </button>
      </div>

      <p className="mt-2 max-w-2xl text-ink-dim">{project.description}</p>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          {project.flightLog ? (
            <div className="mt-4 max-w-2xl space-y-4 border-l border-line pl-4 text-sm leading-relaxed text-ink-dim">
              <p>
                <span className="text-ink-faint">Problem: </span>
                {project.flightLog.problem}
              </p>
              <div>
                <span className="text-ink-faint">Decisions: </span>
                <ul className="mt-2 space-y-2">
                  {project.flightLog.decisions.map((decision, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ink-faint" />
                      {decision}
                    </li>
                  ))}
                </ul>
              </div>
              <p>
                <span className="text-ink-faint">Outcome: </span>
                {project.flightLog.outcome}
              </p>
            </div>
          ) : (
            <div className="mt-4 max-w-2xl space-y-2 border-l border-line pl-4 text-sm leading-relaxed text-ink-dim">
              <ul className="space-y-2">
                {project.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ink-faint" />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="pt-1">
                <span className="text-ink-faint">Impact: </span>
                {project.impact}
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-faint">
        {project.techStack.join(', ')}
        {project.demoUrl && (
          <>
            {' · '}
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim underline decoration-accent-dim underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
            >
              source
            </a>
          </>
        )}
      </p>
    </div>
  )
}

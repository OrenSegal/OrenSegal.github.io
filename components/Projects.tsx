import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projects, Project } from '@/lib/projects'
import projectStats from '@/lib/project-stats.json'

const STATS: Record<string, { stars: number; pushedAt: string | null }> = projectStats

export const CATEGORIES: { id: Project['category']; label: string }[] = [
  { id: 'ai-agents', label: 'AI Agents' },
  { id: 'ai-infra', label: 'AI Infrastructure' },
  { id: 'data-engineering', label: 'Data Engineering' },
  { id: 'dev-tools', label: 'Developer Tools' },
]

function updatedLabel(id: string) {
  const pushedAt = STATS[id]?.pushedAt
  if (!pushedAt) return null
  return new Date(pushedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function ProjectRow({ project }: { project: Project }) {
  const updated = updatedLabel(project.id)

  return (
    <div className="border-b border-line py-8 first:pt-0 last:border-b-0">
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
        {updated && <span className="text-sm text-ink-faint">updated {updated}</span>}
      </div>

      <p className="mt-2 max-w-2xl text-ink-dim">{project.description}</p>

      {project.flightLog && (
        <div className="mt-4 max-w-2xl space-y-2 border-l border-line pl-4 text-sm leading-relaxed text-ink-dim">
          <p>
            <span className="text-ink-faint">Problem: </span>
            {project.flightLog.problem}
          </p>
          <p>
            <span className="text-ink-faint">Outcome: </span>
            {project.flightLog.outcome}
          </p>
        </div>
      )}

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

export default function Projects() {
  return (
    <section id="work" className="border-t border-line px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-2xl font-medium text-ink">Work</h2>
        <p className="mb-12 text-ink-dim">
          {projects.length} shipped projects, every one with a public repo.
        </p>

        {CATEGORIES.map((category) => {
          const items = projects.filter((p) => p.category === category.id)
          if (items.length === 0) return null
          return (
            <div key={category.id} className="mb-14 last:mb-0">
              <h3 className="mb-6 text-lg font-medium text-ink-dim">
                {category.label}
              </h3>
              <div>
                {items.map((project) => (
                  <ProjectRow key={project.id} project={project} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

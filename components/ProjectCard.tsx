import Link from 'next/link'
import { Project } from '@/lib/projects'
import { ArrowRight } from 'lucide-react'
import projectStats from '@/lib/project-stats.json'

interface ProjectCardProps {
  project: Project
  index: number
  featured?: boolean
}

const STATS: Record<string, { stars: number; pushedAt: string | null }> = projectStats

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const pushedAt = STATS[project.id]?.pushedAt
  const updated = pushedAt
    ? new Date(pushedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
    : null

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col justify-between border border-bezel bg-panel-face p-6 transition-colors hover:border-ink-dim sm:p-8"
    >
      <div>
        <div className="mb-4 flex items-start justify-between">
          <span className="font-mono text-[11px] text-ink-dim">
            PLATE {String(index + 1).padStart(2, '0')}
          </span>
          <span className="border border-bezel px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-dim">
            {project.category}
          </span>
        </div>

        <h3 className="mb-1 font-display text-xl font-semibold text-ink">
          {project.title}
        </h3>
        <p className="mb-4 text-sm text-ink-dim">{project.subtitle}</p>
        <p className="mb-6 line-clamp-3 text-sm text-ink-dim">{project.description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="border border-bezel px-2 py-1 font-mono text-[10px] text-ink-dim">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 font-mono text-[10px] text-ink-dim">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-bezel pt-4">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
          View Project
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
        {project.demoUrl && (
          <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-dim">
            GitHub{updated && ` · ${updated}`}
          </span>
        )}
      </div>
    </Link>
  )
}

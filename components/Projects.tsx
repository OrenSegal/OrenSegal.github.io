import { projects, Project } from '@/lib/projects'
import projectStats from '@/lib/project-stats.json'
import { DepthTag } from '@/components/DepthTag'
import { ProjectRow } from '@/components/ProjectRow'

const STATS: Record<string, { stars: number; pushedAt: string | null }> = projectStats

export const CATEGORIES: { id: Project['category']; label: string }[] = [
  { id: 'ai-agents', label: 'AI Agents' },
  { id: 'ai-infra', label: 'AI Infrastructure' },
  { id: 'data-engineering', label: 'Data Engineering' },
  { id: 'dev-tools', label: 'Developer Tools' },
]

export default function Projects() {
  return (
    <section id="work" className="border-t border-line px-4 py-24 sm:px-6">
      <div className="relative mx-auto max-w-3xl border-l border-line pl-5">
        <DepthTag label="shallow utility" />

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
                  <ProjectRow
                    key={project.id}
                    project={project}
                    pushedAt={STATS[project.id]?.pushedAt ?? null}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

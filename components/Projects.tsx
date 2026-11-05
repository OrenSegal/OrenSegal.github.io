import Link from 'next/link'
import { projects, Project } from '@/lib/projects'
import projectStats from '@/lib/project-stats.json'
import { formatVerifiedDate } from '@/lib/status'

const STATS: Record<string, { stars: number; pushedAt: string | null }> = projectStats

// Used by the project detail page.
export const CATEGORIES: { id: Project['category']; label: string }[] = [
  { id: 'ai-agents', label: 'AI Agents' },
  { id: 'evals', label: 'Evals and Retrieval' },
  { id: 'ai-infra', label: 'AI Infrastructure' },
  { id: 'dev-tools', label: 'Developer Tools' },
]

// The three flagships render above in Flagships; sous leads the rest (it is next in lib/projects.ts).
const FLAGSHIP_IDS = ['rootcause', 'litmus', 'cited']

export default function Projects() {
  const rest = projects.filter((p) => !FLAGSHIP_IDS.includes(p.id))
  return (
    <section id="more" className="scroll-mt-16 border-t border-line px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl border-l border-line pl-5">
        <h2 className="mb-2 text-2xl font-medium text-ink">More projects</h2>
        <p className="mb-8 text-ink-dim">
          {projects.length} projects in all, every one with a public repo. Build logs are on each project page.
        </p>

        <table className="w-full border-collapse text-sm">
          <thead className="sr-only">
            <tr>
              <th scope="col">Project</th>
              <th scope="col">CI and last push</th>
            </tr>
          </thead>
          <tbody>
            {rest.map((project) => (
              <tr key={project.id} className="border-t border-line align-top first:border-t-0">
                <td className="py-3 pr-4">
                  <Link href={`/projects/${project.id}/`} className="font-medium text-ink transition-colors hover:text-accent">
                    {project.title}
                  </Link>
                  <span className="text-ink-dim"> · {project.subtitle}</span>
                </td>
                <td className="whitespace-nowrap py-3 text-right">
                  {project.ciWorkflow && (
                    <a
                      href={`https://github.com/OrenSegal/${project.id}/actions/workflows/${project.ciWorkflow}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block align-middle"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://github.com/OrenSegal/${project.id}/actions/workflows/${project.ciWorkflow}/badge.svg?branch=main`}
                        alt={`CI status for ${project.id}`}
                        height={20}
                        className="h-5 w-auto"
                        loading="lazy"
                      />
                    </a>
                  )}
                  <span className="mt-1 block font-mono text-xs tabular text-ink-faint">
                    {formatVerifiedDate(STATS[project.id]?.pushedAt ?? null)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

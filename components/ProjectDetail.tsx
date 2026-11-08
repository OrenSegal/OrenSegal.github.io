import { Project } from '@/lib/projects'
import { CATEGORIES } from '@/components/Projects'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { RootcauseResults } from '@/components/RootcauseResults'

const recordLink =
  'text-ink-dim underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="min-h-screen px-4 pb-20 pt-24 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/#work"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to work
        </Link>

        <h1 className="text-4xl font-light lowercase leading-none tracking-[-0.03em] text-ink sm:text-5xl">{project.title}</h1>
        <p className="mt-2 text-lg text-ink-dim">
          {project.subtitle} · {CATEGORIES.find((c) => c.id === project.category)?.label ?? project.category}
        </p>

        <p className="mt-6 max-w-xl leading-relaxed text-ink-dim">{project.description}</p>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
          >
            View source on GitHub
            <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent" />
          </a>
        )}

        {(project.records || project.pageUrl) && (
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {project.pageUrl && (
              <a href={project.pageUrl} target="_blank" rel="noopener noreferrer" className={recordLink}>
                project page
              </a>
            )}
            {project.records?.decisions && (
              <a href={project.records.decisions} target="_blank" rel="noopener noreferrer" className={recordLink}>
                decision records
              </a>
            )}
            {project.records?.limitations && (
              <a href={project.records.limitations} target="_blank" rel="noopener noreferrer" className={recordLink}>
                limitations
              </a>
            )}
          </p>
        )}

        {project.id === 'rootcause' && (
          <div className="mt-14">
            <h2 className="text-xl font-medium lowercase text-ink">results</h2>
            <RootcauseResults />
            <Link
              href="/writing/rootcause-benchmark/"
              className="mt-6 inline-flex text-sm font-medium text-ink underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Read the write-up
            </Link>
          </div>
        )}

        {project.flightLog && (
          <div className="mt-14 space-y-8">
            <h2 className="text-xl font-medium lowercase text-ink">how it was built</h2>
            <div>
              <h3 className="mb-2 text-sm font-medium lowercase text-ink-faint">Problem</h3>
              <p className="max-w-xl leading-relaxed text-ink-dim">{project.flightLog.problem}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium lowercase text-ink-faint">Decisions</h3>
              <ul className="space-y-2.5">
                {project.flightLog.decisions.map((decision, index) => (
                  <li key={index} className="flex items-start gap-2.5 max-w-xl leading-relaxed text-ink-dim">
                    <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-ink-faint" />
                    {decision}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium lowercase text-ink-faint">Outcome</h3>
              <p className="max-w-xl leading-relaxed text-ink-dim">{project.flightLog.outcome}</p>
            </div>
          </div>
        )}

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-medium lowercase text-ink-faint">Key features</h3>
            <ul className="space-y-2.5">
              {project.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2.5 leading-relaxed text-ink-dim">
                  <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-ink-faint" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-sm font-medium lowercase text-ink-faint">Impact</h3>
              <p className="leading-relaxed text-ink-dim">{project.impact}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium lowercase text-ink-faint">Tech stack</h3>
              <p className="leading-relaxed text-ink-dim">{project.techStack.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-2 text-lg font-medium lowercase text-ink">interested in something like this?</h3>
          <a
            href="/#contact"
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-ink"
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>
  )
}

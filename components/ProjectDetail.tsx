import { Project } from '@/lib/projects'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="min-h-screen px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#projects"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to Projects
        </Link>

        <div className="mb-10 border border-bezel bg-panel-face p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{project.title}</h1>
            <span className="border border-bezel px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-dim">
              {project.category}
            </span>
          </div>
          <p className="mb-4 text-sm text-ink-dim">{project.subtitle}</p>
          <p className="mb-6 leading-relaxed text-ink-dim">{project.description}</p>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="border border-bezel px-2 py-1 font-mono text-[10px] text-ink-dim">
                {tag}
              </span>
            ))}
          </div>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-signal-dim px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-signal transition-colors hover:bg-signal hover:text-panel"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View on GitHub
            </a>
          )}
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="border border-bezel bg-panel-face p-6 lg:col-span-2">
            <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">Key Features</h2>
            <ul className="space-y-3">
              {project.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink-dim" />
                  <span className="leading-relaxed text-ink-dim">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="border border-bezel bg-panel-face p-6">
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">Impact</h3>
              <p className="text-sm leading-relaxed text-ink-dim">{project.impact}</p>
            </div>

            <div className="border border-bezel bg-panel-face p-6">
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="border border-bezel px-2 py-1 font-mono text-[10px] text-ink-dim">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border border-bezel bg-panel-face p-8 text-center">
          <h3 className="mb-2 font-display text-lg font-semibold text-ink">Interested in this project?</h3>
          <p className="mb-6 text-sm text-ink-dim">
            Let's discuss how similar solutions could work for your use case.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 border border-ink-dim px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}

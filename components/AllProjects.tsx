'use client'

import { useState } from 'react'
import { projects } from '@/lib/projects'
import ProjectCard from './ProjectCard'

export default function AllProjects() {
  const [filter, setFilter] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-agents', label: 'AI Agents' },
    { id: 'ai-infra', label: 'AI Infra' },
    { id: 'data-engineering', label: 'Data Engineering' },
    { id: 'dev-tools', label: 'Developer Tools' },
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="border-t border-bezel bg-panel px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Manifest — All Projects</h2>
          <p className="mt-3 max-w-2xl text-ink-dim">
            AI agents, LLM infrastructure, data engineering, and developer tooling.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-2 border border-bezel p-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
                filter === category.id
                  ? 'bg-signal text-panel'
                  : 'text-ink-dim hover:text-ink'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-xs text-ink-dim">
            Showing <span className="text-ink">{filteredProjects.length}</span> of{' '}
            <span className="text-ink">{projects.length}</span> projects
          </p>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { projects } from '@/lib/projects'
import ProjectCard from './ProjectCard'
import { Filter } from 'lucide-react'

export default function AllProjects() {
  const [filter, setFilter] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'urban', label: 'Urban Analytics' },
    { id: 'personal', label: 'Personal Tech' },
    { id: 'entertainment', label: 'Entertainment' },
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <Filter className="w-4 h-4 text-primary-400" />
            <span className="text-primary-300 text-sm font-medium">Browse Portfolio</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            All Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From urban intelligence to personalized experiences
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                filter === category.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/50'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-slate-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Count */}
        <div className="text-center mt-12">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filteredProjects.length}</span> of{' '}
            <span className="text-white font-semibold">{projects.length}</span> projects
          </p>
        </div>
      </div>
    </section>
  )
}

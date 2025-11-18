'use client'

import { getFeaturedProjects } from '@/lib/projects'
import ProjectCard from './ProjectCard'
import { Star } from 'lucide-react'

export default function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects()

  return (
    <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">Featured Projects</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Signature Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Innovative AI solutions combining real-world impact with cutting-edge technology
          </p>
        </div>

        {/* Featured projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} featured />
          ))}
        </div>
      </div>
    </section>
  )
}

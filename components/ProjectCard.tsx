'use client'

import Link from 'next/link'
import { Project } from '@/lib/projects'
import { ArrowRight, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  index: number
  featured?: boolean
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const cardClass = featured
    ? 'group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300 hover:-translate-y-2'
    : 'group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1'

  return (
    <div className={cardClass} style={{ animationDelay: `${index * 100}ms` }}>
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

      <div className="relative p-6 sm:p-8">
        {/* Icon & Category */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl">{project.icon}</div>
          <span className="px-3 py-1 rounded-full bg-slate-700/50 text-xs font-medium text-gray-300 capitalize">
            {project.category}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-primary-400 font-medium mb-4">
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-gray-400 mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-slate-700/30 text-xs text-gray-300 border border-slate-600"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 rounded-full bg-slate-700/30 text-xs text-gray-400">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors group/link"
          >
            <span>View Project</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>

          {project.demoUrl && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <ExternalLink className="w-3 h-3" />
              <span>GitHub</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-primary-500/0 group-hover:border-primary-500/50 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
    </div>
  )
}

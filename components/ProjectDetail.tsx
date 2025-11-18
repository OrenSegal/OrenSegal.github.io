'use client'

import { Project } from '@/lib/projects'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Code, Zap, ExternalLink } from 'lucide-react'

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start gap-6 mb-6">
            <div className="text-6xl sm:text-7xl">{project.icon}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-4xl sm:text-5xl font-bold text-white">
                  {project.title}
                </h1>
                <span className="px-3 py-1 rounded-full bg-slate-700/50 text-sm font-medium text-gray-300 capitalize">
                  {project.category}
                </span>
              </div>
              <p className="text-xl text-primary-400 font-medium mb-4">
                {project.subtitle}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-slate-800/50 text-sm text-gray-300 border border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Demo button (if available) */}
        {project.demoUrl && project.id !== 'urban-intelligence' && project.id !== 'metroflex' && (
          <div className="mb-12">
            <a
              href={project.demoUrl}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-primary-500/50"
            >
              <ExternalLink className="w-5 h-5" />
              View Live Demo
            </a>
          </div>
        )}

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Key Features */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Key Features</h2>
              </div>
              <ul className="space-y-4">
                {project.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary-500/20 transition-colors">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact */}
            <div className="bg-gradient-to-br from-primary-500/10 to-purple-500/10 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Impact</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{project.impact}</p>
            </div>

            {/* Tech Stack */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-slate-700/50 text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Architecture visualization placeholder */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">System Architecture</h2>
          <div className="bg-slate-900/50 rounded-xl p-12 border border-slate-700 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-6xl mb-4">{project.icon}</div>
              <p className="text-gray-400">
                Detailed architecture diagram and technical implementation details
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Check the technical specs in the repository for full details
              </p>
            </div>
          </div>
        </div>

        {/* Next project suggestion */}
        <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Interested in this project?
          </h3>
          <p className="text-gray-300 mb-6">
            Let's discuss how similar solutions could work for your use case
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-primary-500/50"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}

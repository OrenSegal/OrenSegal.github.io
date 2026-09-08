import { getFeaturedProjects } from '@/lib/projects'
import ProjectCard from './ProjectCard'

export default function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects()

  return (
    <section id="featured" className="border-t border-bezel bg-panel-face px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Manifest — Signature Works</h2>
          <p className="mt-3 max-w-2xl text-ink-dim">
            Each entry ships with a public repo, real tests, and green CI — verified, not claimed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} featured />
          ))}
        </div>
      </div>
    </section>
  )
}

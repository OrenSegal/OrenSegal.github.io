import { notFound } from 'next/navigation'
import { getProjectById, projects } from '@/lib/projects'
import ProjectDetail from '@/components/ProjectDetail'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = getProjectById(params.id)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Oren Segal`,
    description: project.description,
    keywords: project.tags,
    openGraph: {
      title: `${project.title} | Oren Segal`,
      description: project.description,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Oren Segal`,
      description: project.description,
      images: ['/og-image.png'],
    },
  }
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}

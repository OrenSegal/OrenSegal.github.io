import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { projects } from '@/lib/projects'

const title = 'Projects | Oren Segal'
const description = `All ${projects.length} projects, each linked to its public repo.`

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: './', images: ['/og-image.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
}

export default function ProjectsIndex() {
  return (
    <div className="min-h-screen px-4 pb-20 pt-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#work"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          back to work
        </Link>

        <h1 className="text-[16vw] font-light lowercase leading-[0.92] tracking-[-0.04em] text-ink sm:text-8xl">projects</h1>

        <ul className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.id}>
              <Link href={`/projects/${p.id}/`} className="tile flex h-full flex-col bg-panel-face p-5 sm:p-6">
                <h2 className="tile-title text-2xl font-medium leading-tight text-ink sm:text-3xl">{p.title}</h2>
                <p className="mt-2 max-w-xl leading-relaxed text-ink-dim">{p.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

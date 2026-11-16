import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'
import { posts } from '@/lib/posts'

export const dynamic = 'force-static'

const BASE = 'https://orensegal.github.io'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/` },
    { url: `${BASE}/projects/` },
    { url: `${BASE}/writing/` },
    ...posts.map((p) => ({ url: `${BASE}${p.href}`, lastModified: p.date })),
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.id}/` })),
  ]
}

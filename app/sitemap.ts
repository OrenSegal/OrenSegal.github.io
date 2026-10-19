import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

export const dynamic = 'force-static'

const BASE = 'https://orensegal.github.io'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/` },
    { url: `${BASE}/writing/rootcause-benchmark/` },
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.id}/` })),
  ]
}

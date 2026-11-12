import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

export const dynamic = 'force-static'

const BASE = 'https://orensegal.github.io'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/` },
    { url: `${BASE}/projects/` },
    { url: `${BASE}/writing/` },
    { url: `${BASE}/writing/rootcause-benchmark/` },
    { url: `${BASE}/writing/reshet-pricing-model/` },
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.id}/` })),
  ]
}

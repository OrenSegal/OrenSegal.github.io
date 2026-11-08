import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const title = 'writing'
const description = 'Write-ups by Oren Segal: an incident-agent benchmark, and getting a pricing model adopted at a TV network.'

export const metadata: Metadata = {
  title: `Writing | Oren Segal`,
  description,
  openGraph: { title: 'Writing', description, images: ['/og-image.png'] },
}

// Each figure is stated in the post it links to; a post with no number gets no figure.
const posts: { href: string; title: string; summary: string; figure?: { value: string; label: string } }[] = [
  {
    href: '/writing/rootcause-benchmark/',
    title: "The benchmark that didn't pick a winner",
    summary:
      '525 graded runs of rootcause across seven settings. Cost per solved incident varied 25x; pass rates of 77-84% showed no detected difference, though gaps under about 13-19 points would not have been detected.',
    figure: { value: '25x', label: 'spread in cost per solved incident' },
  },
  {
    href: '/writing/reshet-pricing-model/',
    title: 'Getting a pricing model adopted at Reshet 13',
    summary:
      'A regression that found underpriced primetime ad slots, and the work with the commercial team until they set prices from it.',
    figure: { value: '17%', label: 'gross ad revenue above the prior year, FY2022 against FY2021, no holdout' },
  },
]

export default function WritingIndex() {
  return (
    <div className="min-h-screen px-4 pb-20 pt-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          back home
        </Link>

        <h1 className="text-[16vw] font-light lowercase leading-[0.92] tracking-[-0.04em] text-ink sm:text-8xl">{title}</h1>

        <ul className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.href}>
              <Link href={post.href} className="tile flex h-full flex-col bg-panel-face p-5 sm:p-6">
                <h2 className="tile-title text-2xl font-medium leading-tight text-ink sm:text-3xl">{post.title}</h2>
                <p className="mt-2 max-w-xl leading-relaxed text-ink-dim">{post.summary}</p>
                {post.figure && (
                  <p className="mt-auto flex items-baseline gap-3 pt-6">
                    <span className="text-3xl font-light tabular text-ink">{post.figure.value}</span>
                    <span className="font-mono text-xs text-ink-faint">{post.figure.label}</span>
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const title = 'Writing'
const description = 'Write-ups by Oren Segal: an incident-agent benchmark, and getting a pricing model adopted at a TV network.'

export const metadata: Metadata = {
  title: `${title} | Oren Segal`,
  description,
  openGraph: { title, description, images: ['/og-image.png'] },
}

// Each figure is stated in the post it links to; a post with no number gets no figure.
const posts: { href: string; title: string; summary: string; figure?: { value: string; label: string } }[] = [
  {
    href: '/writing/rootcause-benchmark/',
    title: 'The benchmark that didn\'t pick a winner',
    summary:
      '525 graded runs of rootcause across seven settings. Pass rates stayed at 77-84% with overlapping intervals.',
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
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back home
        </Link>

        <h1 className="text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">{title}</h1>

        <ul className="mt-10">
          {posts.map((post) => (
            <li key={post.href} className="border-t border-line py-8">
              <h2 className="text-xl font-medium">
                <Link href={post.href} className="text-ink transition-colors hover:text-accent">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-xl leading-relaxed text-ink-dim">{post.summary}</p>
              {post.figure && (
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-medium tabular text-ink">{post.figure.value}</span>
                  <span className="text-sm text-ink-faint">{post.figure.label}</span>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

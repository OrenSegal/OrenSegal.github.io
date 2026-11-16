import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { posts } from '@/lib/posts'
import { formatVerifiedDate } from '@/lib/status'

const title = 'writing'
const description = 'Write-ups by Oren Segal: an incident-agent benchmark, checks that could not fail, and getting a pricing model adopted at a TV network.'

export const metadata: Metadata = {
  title: `Writing | Oren Segal`,
  description,
  openGraph: { title: 'Writing', description, url: './', images: ['/og-image.png'] },
  twitter: { card: 'summary_large_image', title: 'Writing', description, images: ['/og-image.png'] },
}

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
                <div className="mt-auto pt-6">
                  {post.figure && (
                    <p className="flex items-baseline gap-3">
                      <span className="text-3xl font-light tabular text-ink">{post.figure.value}</span>
                      <span className="font-mono text-xs text-ink-faint">{post.figure.label}</span>
                    </p>
                  )}
                  <p className="mt-3 font-mono text-xs lowercase text-ink-faint">
                    <time dateTime={post.date}>{formatVerifiedDate(post.date)}</time>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 font-mono text-xs lowercase text-ink-faint">
          <a href="/writing/feed.xml" className="underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
            rss feed
          </a>
        </p>
      </div>
    </div>
  )
}

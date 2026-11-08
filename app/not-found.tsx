import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Not found | Oren Segal',
  robots: { index: false },
}

const action = 'text-sm font-medium lowercase text-ink transition-colors hover:text-accent'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-16 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-xs tabular text-ink-faint">404</p>
        <h1 className="mt-4 font-light lowercase leading-[0.92] tracking-[-0.04em] text-ink text-[16vw] sm:text-8xl">
          not found
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-dim">
          Nothing lives at this address. The work and the writing are one click away.
        </p>
        <nav aria-label="recovery" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/" className={action}>home</Link>
          <Link href="/#work" className={action}>work</Link>
          <Link href="/writing/" className={action}>writing</Link>
        </nav>
      </div>
    </section>
  )
}

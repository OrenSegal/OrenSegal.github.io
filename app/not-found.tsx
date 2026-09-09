'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-start text-left">
        <span className="text-lg font-medium text-ink-faint">404</span>
        <h1 className="mt-2 text-2xl font-medium text-ink sm:text-3xl">Page not found</h1>
        <p className="mt-3 max-w-md text-ink-dim">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex items-center gap-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
          >
            <Home className="h-4 w-4" />
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </div>
  )
}

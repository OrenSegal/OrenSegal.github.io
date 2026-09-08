'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { StatusFlag } from '@/components/Instruments'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <StatusFlag label="Off Course" tone="caution" />

        <div className="mt-8 border border-bezel bg-panel-face px-8 py-6">
          <span className="font-mono text-6xl font-medium tabular text-ink sm:text-7xl">404</span>
        </div>

        <h1 className="mt-8 font-display text-2xl font-semibold text-ink sm:text-3xl">Page Not Found</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-dim">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-ink-dim px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border border-bezel px-6 py-3 text-sm font-medium text-ink-dim transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

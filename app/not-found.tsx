import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        {/* 404 number */}
        <div className="mb-8">
          <span className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-primary-500/50 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all hover:scale-105 border border-white/10 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Fun decoration */}
        <div className="mt-12 text-6xl animate-bounce">
          🔍
        </div>
      </div>
    </div>
  )
}

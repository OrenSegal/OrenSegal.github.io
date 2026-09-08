'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-bezel bg-panel">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-bezel font-mono text-xs font-semibold text-ink">
              OS
            </span>
            <span className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-ink">
              Oren Segal
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-display text-sm font-medium text-ink-dim transition-colors hover:text-ink"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-ink-dim transition-colors hover:text-ink md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-bezel bg-panel-face md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 font-display text-sm font-medium text-ink-dim transition-colors hover:text-ink"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'work', href: '/#work' },
    { name: 'about', href: '/#about' },
    { name: 'writing', href: '/writing/' },
    { name: 'resume', href: '/resume.pdf' },
    { name: 'contact', href: '/#contact' },
  ]

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-panel/95">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-sm font-medium lowercase text-ink">
            oren segal
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const Tag = item.href.endsWith('.pdf') ? 'a' : Link
              return (
                <Tag key={item.name} href={item.href} className="text-sm text-ink-dim transition-colors hover:text-accent">
                  {item.name}
                </Tag>
              )
            })}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-ink-dim transition-colors hover:text-accent md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-panel md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-1">
            {navItems.map((item) => {
              const Tag = item.href.endsWith('.pdf') ? 'a' : Link
              return (
                <Tag
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-2xl font-light lowercase text-ink transition-colors hover:text-accent"
                >
                  {item.name}
                </Tag>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

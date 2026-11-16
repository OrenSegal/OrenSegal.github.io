'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { CommandPalette, PaletteItem } from '@/components/CommandPalette'

const navItems = [
  { name: 'work', href: '/#work' },
  { name: 'experience', href: '/#experience' },
  { name: 'about', href: '/#about' },
  { name: 'writing', href: '/writing/' },
  { name: 'resume', href: '/resume.pdf' },
  { name: 'contact', href: '/#contact' },
]
const SECTIONS = ['work', 'now', 'experience', 'about', 'contact']

export default function Navigation({ paletteItems }: { paletteItems: PaletteItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [section, setSection] = useState<string | null>(null)
  const [mac, setMac] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setMac(/mac|iphone|ipad/i.test(navigator.platform))
  }, [])

  // On the home page, the section under the top of the viewport is the current one.
  useEffect(() => {
    if (pathname !== '/') {
      setSection(null)
      return
    }
    const els = SECTIONS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let current: string | null = null
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id
      setSection(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const isCurrent = (href: string) =>
    (section !== null && href === `/#${section}`) || (href === '/writing/' && pathname.startsWith('/writing'))

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 bg-panel/95">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-sm font-medium lowercase text-ink">
              oren segal
            </Link>

            <div className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => {
                const Tag = item.href.endsWith('.pdf') ? 'a' : Link
                const current = isCurrent(item.href)
                return (
                  <Tag
                    key={item.name}
                    href={item.href}
                    aria-current={current ? 'true' : undefined}
                    className={`text-sm transition-colors hover:text-accent ${current ? 'text-ink' : 'text-ink-dim'}`}
                  >
                    {item.name}
                  </Tag>
                )
              })}
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Search this site"
                aria-keyshortcuts="Meta+K Control+K"
                className="font-mono text-xs lowercase text-ink-faint transition-colors hover:text-accent"
              >
                {mac ? '⌘k' : 'ctrl k'}
              </button>
            </div>

            <div className="flex items-center gap-5 md:hidden">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setPaletteOpen(true)
                }}
                className="font-mono text-xs lowercase text-ink-dim transition-colors hover:text-accent"
              >
                search
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-ink-dim transition-colors hover:text-accent"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
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

      <CommandPalette items={paletteItems} open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  )
}

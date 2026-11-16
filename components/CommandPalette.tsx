'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface PaletteItem {
  group: string
  label: string
  hint?: string
  href?: string
  copy?: string // text to put on the clipboard instead of navigating
}

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)

// One box that reaches every page, project, post and contact channel.
// Opens on Cmd/Ctrl+K or "/", and from the nav. The lit row is the struck one.
export function CommandPalette({
  items,
  open,
  onOpenChange,
}: {
  items: PaletteItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [query, setQuery] = useState('')
  const [lit, setLit] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  const close = useCallback(() => onOpenChange(false), [onOpenChange])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      } else if (e.key === '/' && !open && !isTyping(e.target) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        onOpenChange(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!open) return
    opener.current = document.activeElement as HTMLElement | null
    setQuery('')
    setLit(0)
    setCopied(null)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      opener.current?.focus?.()
    }
  }, [open])

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.length) return items
    return items.filter((item) => {
      const hay = `${item.label} ${item.hint ?? ''} ${item.group}`.toLowerCase()
      return words.every((w) => hay.includes(w))
    })
  }, [items, query])

  useEffect(() => {
    listRef.current?.querySelector('[data-lit="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [lit, results])

  if (!open) return null

  const run = async (item: PaletteItem) => {
    if (item.copy) {
      try {
        await navigator.clipboard.writeText(item.copy)
        setCopied(item.label)
        setTimeout(close, 900)
      } catch {
        window.location.href = `mailto:${item.copy}`
      }
      return
    }
    if (!item.href) return
    close()
    if (/^https?:/.test(item.href)) window.open(item.href, '_blank', 'noopener,noreferrer')
    else window.location.assign(item.href)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setLit((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setLit((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[lit]) run(results[lit])
    } else if (e.key === 'Tab') {
      e.preventDefault() // the input is the only stop; arrows move the list
    }
  }

  let lastGroup = ''

  return (
    <div className="fixed inset-0 z-[60] bg-black/85 px-4" onMouseDown={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="go to anything on this site"
        className="mx-auto mt-[10vh] flex max-h-[75vh] w-full max-w-xl flex-col bg-panel-face"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setLit(0)
          }}
          placeholder="go to"
          aria-label="search this site"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[lit] ? `palette-${lit}` : undefined}
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent px-5 pb-3 pt-5 text-3xl font-light lowercase tracking-[-0.03em] text-ink focus-visible:outline-none placeholder:text-ink-ghost"
        />

        <ul ref={listRef} id="palette-list" role="listbox" className="flex-1 overflow-y-auto px-2 pb-2">
          {results.length === 0 && <li className="px-3 py-3 text-sm text-ink-dim">Nothing here by that name.</li>}
          {results.map((item, i) => {
            const on = i === lit
            const head = item.group !== lastGroup
            lastGroup = item.group
            return (
              <li key={`${item.group}-${item.label}`} role="presentation">
                {head && <p className="px-3 pb-1 pt-3 font-mono text-[11px] lowercase text-ink-faint">{item.group}</p>}
                <button
                  type="button"
                  id={`palette-${i}`}
                  role="option"
                  aria-selected={on}
                  data-lit={on}
                  tabIndex={-1}
                  onMouseMove={() => setLit(i)}
                  onClick={() => run(item)}
                  className={`flex w-full items-baseline justify-between gap-4 px-3 py-1.5 text-left text-sm transition-colors duration-150 ${on ? 'struck' : 'text-ink-dim'}`}
                >
                  <span className="flex-shrink-0 lowercase">{copied === item.label ? 'copied' : item.label}</span>
                  {item.hint && <span className="truncate font-mono text-[11px] lowercase opacity-70">{item.hint}</span>}
                </button>
              </li>
            )
          })}
        </ul>

        <p className="px-5 py-3 font-mono text-[11px] lowercase text-ink-faint">↑↓ move · enter open · esc close</p>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'

interface GaugeDialProps {
  label: string
  value: number
  max: number
  suffix?: string
  plate: string
}

export function GaugeDial({ label, value, max, suffix = '', plate }: GaugeDialProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const pct = Math.min(value / max, 1)
  const rest = -120
  const target = -120 + pct * 240

  return (
    <div className="flex flex-col items-center gap-3 border border-bezel bg-panel-face px-4 py-6">
      <span className="font-mono text-[10px] tracking-[0.2em] text-ink-dim">{plate}</span>
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#2b2e33" strokeWidth="1.5" />
          <path
            d="M 20 76 A 44 44 0 1 1 80 76"
            fill="none"
            stroke="#5b5e63"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center origin-center"
          style={{
            '--needle-rest': `${rest}deg`,
            '--needle-value': `${target}deg`,
            transform: ready ? `rotate(${target}deg)` : `rotate(${rest}deg)`,
            transition: ready ? 'transform 900ms cubic-bezier(0.16,1,0.3,1)' : 'none',
          } as React.CSSProperties}
        >
          <div className="h-9 w-[2px] -translate-y-4 bg-ink" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-ink" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
          <span className="font-mono tabular text-lg font-medium text-ink">
            {value}
            <span className="text-xs text-ink-dim">{suffix}</span>
          </span>
        </div>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-dim">{label}</span>
    </div>
  )
}

interface ReadoutWindowProps {
  label: string
  value: string
  plate: string
}

export function ReadoutWindow({ label, value, plate }: ReadoutWindowProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-bezel bg-panel-face px-4 py-6">
      <span className="font-mono text-[10px] tracking-[0.2em] text-ink-dim">{plate}</span>
      <div className="flex h-24 w-full items-center justify-center border border-bezel bg-panel px-2">
        <span className="font-mono text-sm font-medium tracking-tight text-ink text-center">{value}</span>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-dim">{label}</span>
    </div>
  )
}

interface StatusFlagProps {
  label: string
  tone?: 'ok' | 'caution'
}

export function StatusFlag({ label, tone = 'ok' }: StatusFlagProps) {
  const toneClass = tone === 'ok'
    ? 'border-signal-dim text-signal'
    : 'border-caution text-caution'
  const dotClass = tone === 'ok' ? 'bg-signal' : 'bg-caution'

  return (
    <div className={`inline-flex animate-flag-drop items-center gap-2 border bg-panel-face px-3 py-1.5 ${toneClass}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      <span className="font-mono text-[11px] uppercase tracking-[0.15em]">{label}</span>
    </div>
  )
}

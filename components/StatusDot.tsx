export function StatusDot({ filled = true, label }: { filled?: boolean; label?: string }) {
  if (filled) {
    return (
      <svg width="8" height="8" viewBox="0 0 8 8" className="flex-shrink-0" aria-hidden={!label}>
        {label && <title>{label}</title>}
        <circle cx="4" cy="4" r="4" className="fill-accent" />
      </svg>
    )
  }
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className="flex-shrink-0" aria-hidden={!label}>
      {label && <title>{label}</title>}
      <circle cx="4" cy="4" r="3.25" fill="none" className="stroke-ink-faint" strokeWidth="1.25" />
    </svg>
  )
}

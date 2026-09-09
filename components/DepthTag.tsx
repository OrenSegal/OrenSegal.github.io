export function DepthTag({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9px] top-0 origin-top-left -rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-ink-faint"
    >
      {label}
    </span>
  )
}

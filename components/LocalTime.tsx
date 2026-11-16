'use client'

import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  hour: 'numeric',
  minute: '2-digit',
  timeZoneName: 'short',
})

// The time in New York right now. Rendered only after mount, so the static
// HTML never carries a stale build-time clock.
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()).toLowerCase())
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return <span className="tabular">{now ?? 'eastern time'}</span>
}

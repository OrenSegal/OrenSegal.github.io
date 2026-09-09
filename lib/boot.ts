// Decides once per page load whether the instrument boot-up animation
// should run: only on a visitor's first visit, and never under
// prefers-reduced-motion. Cached at module scope (not React state) so every
// GaugeDial instance mounting in the same commit agrees on the same
// decision, and the "seen" flag is written exactly once.

const BOOT_KEY = 'instruments-boot-seen'

let cached: boolean | null = null

export function getBootDecision(): boolean {
  if (cached !== null) return cached

  if (typeof window === 'undefined') {
    cached = false
    return cached
  }

  try {
    const alreadySeen = window.localStorage.getItem(BOOT_KEY)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    cached = !alreadySeen && !reducedMotion
  } catch {
    cached = false
  }

  if (cached) {
    try {
      window.localStorage.setItem(BOOT_KEY, '1')
    } catch {
      // private browsing / storage disabled — animation still plays this
      // load, it just won't persist as "seen" for next time.
    }
  }

  return cached
}

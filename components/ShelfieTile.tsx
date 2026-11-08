// Every line below is in cv.md and backed by code in the private Shelfie repo (checked
// 2026-11-07). Shelfie is pre-launch: the external TestFlight beta has not opened, and
// no user or usage numbers exist.
const points = [
  'A camera sweep builds a live kitchen inventory that drives expiry tracking, recipe matching, nutrition and grocery restocking.',
  "Recipes rank availability-first, by what's on the shelf and expiring soon, to cut food waste and grocery spend.",
  "Recognition learns from use: each household's corrections feed its priors and tune the auto-save bar.",
  'On-device first, cloud vision only when needed, every cloud call through one gateway with spend limits and caching.',
]

export function ShelfieTile() {
  return (
    <a
      href="https://shelfie.food"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col bg-field p-5 text-ink transition-colors hover:bg-accent hover:text-panel sm:p-6"
    >
      <h2 className="text-4xl font-light lowercase leading-none tracking-[-0.03em] sm:text-5xl">
        shelfie
      </h2>
      <p className="mt-2 text-base text-ink-dim group-hover:text-panel/80">
        A vision-powered kitchen app. Swift on the phone, Postgres and TypeScript behind it.
      </p>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm leading-snug text-ink-dim group-hover:text-panel/80">
        {points.map((p) => (
          <li key={p} className="flex gap-2.5">
            <span className="mt-[0.55em] h-1 w-1 flex-shrink-0 bg-current" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm font-medium">shelfie.food →</p>
      <p className="mt-4 font-mono text-xs text-ink-dim group-hover:text-panel/70">
        founder · ios · pre-launch
      </p>
    </a>
  )
}

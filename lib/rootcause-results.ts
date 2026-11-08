// Every number is copied from the rootcause repo's committed sweep summary,
// results/sweeps/models-and-retrieval-2026-10-15/summary.json (pass_rate,
// ci_low, ci_high from resampling incidents, cost_per_pass), rounded the way its README table prints them.
export const ROWS = [
  { label: 'Opus 5.5, high', pass: 79, low: 63, high: 92, cost: 0.081 },
  { label: 'Opus 5.5, medium', pass: 81, low: 67, high: 95, cost: 0.0686 },
  { label: 'Opus 5.5, low', pass: 79, low: 64, high: 92, cost: 0.0468 },
  { label: 'Sonnet 5.5, high', pass: 80, low: 65, high: 93, cost: 0.0325 },
  { label: 'Haiku 5.5, high', pass: 77, low: 63, high: 91, cost: 0.0033 },
  { label: 'Opus 5.5, high + BM25 search', pass: 77, low: 61, high: 91, cost: 0.0822 },
  { label: 'Opus 5.5, high + hybrid search', pass: 84, low: 71, high: 96, cost: 0.075 },
]

// The row the sweep points at: the cheapest setting, and no other setting was detectably more accurate.
export const CHOSEN_INDEX = 4

export const RESULTS_URL =
  'https://github.com/OrenSegal/rootcause/tree/main/results/sweeps/models-and-retrieval-2026-10-15'

// Every number is copied from the rootcause repo's committed sweep summary,
// results/sweeps/models-and-retrieval-2026-10-15/summary.json (pass_rate,
// ci_low, ci_high, cost_per_pass), rounded the way its README table prints them.
export const ROWS = [
  { label: 'Opus 5.5, high', pass: 79, low: 68, high: 86, cost: 0.081 },
  { label: 'Opus 5.5, medium', pass: 81, low: 71, high: 89, cost: 0.0686 },
  { label: 'Opus 5.5, low', pass: 79, low: 68, high: 86, cost: 0.0468 },
  { label: 'Sonnet 5.5, high', pass: 80, low: 70, high: 87, cost: 0.0325 },
  { label: 'Haiku 5.5, high', pass: 77, low: 67, high: 85, cost: 0.0033 },
  { label: 'Opus 5.5, high + BM25 search', pass: 77, low: 67, high: 85, cost: 0.0822 },
  { label: 'Opus 5.5, high + hybrid search', pass: 84, low: 74, high: 91, cost: 0.075 },
]

// The row the sweep points at: the cheapest setting whose interval overlaps every other.
export const CHOSEN_INDEX = 4

export const RESULTS_URL =
  'https://github.com/OrenSegal/rootcause/tree/main/results/sweeps/models-and-retrieval-2026-10-15'

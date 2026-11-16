// The writing index, the feed and the command palette all read this list.
// Dates are the day each post was first committed to this repo.
// Each figure is stated in the post it links to. A post whose only number is not a
// result it can attribute (Reshet's revenue rise had no holdout) gets no figure.
export interface Post {
  href: string
  title: string
  summary: string
  date: string // YYYY-MM-DD
  figure?: { value: string; label: string }
}

export const posts: Post[] = [
  {
    href: '/writing/rootcause-benchmark/',
    title: "The benchmark that didn't pick a winner",
    summary:
      '525 graded runs of rootcause across seven settings. Cost per solved incident varied 25x; pass rates of 77-84% showed no detected difference, though gaps under about 13-19 points would not have been detected.',
    date: '2026-10-18',
    figure: { value: '25x', label: 'spread in cost per solved incident' },
  },
  {
    href: '/writing/checks-that-could-not-fail/',
    title: "Three checks that passed when they shouldn't have",
    summary:
      'A concurrency test on one connection, a citation matcher that forgave the wrong words, and an eval job that graded its own answers. Before trusting a check, make it fail.',
    date: '2026-11-15',
  },
  {
    href: '/writing/reshet-pricing-model/',
    title: 'Getting a pricing model adopted at Reshet 13',
    summary:
      'A regression that found underpriced primetime ad slots, and the work with the commercial team until they set prices from it.',
    date: '2026-11-04',
  },
]

export const latestPost = () => [...posts].sort((a, b) => b.date.localeCompare(a.date))[0]

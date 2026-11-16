import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const title = "Three checks that passed when they shouldn't have"
const description =
  'A concurrency test, a citation matcher and an eval job all went green while proving less than they claimed. What each one missed, and the rule I took from it: before trusting a check, make it fail.'

export const metadata: Metadata = {
  title: `${title} | Oren Segal`,
  description,
  openGraph: { title, description, type: 'article', url: './', images: ['/og-image.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
}

const GH = 'https://github.com/OrenSegal'
const linkClass =
  'text-ink underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'

// Each case is described in the linked pull request; nothing here goes beyond it.
const cases: { heading: string; pr: { label: string; href: string }; paragraphs: string[] }[] = [
  {
    heading: '1. The concurrency test that ran on one connection',
    pr: { label: 'scoped#1', href: `${GH}/scoped/pull/1` },
    paragraphs: [
      'scoped stops two Claude Code sessions from editing the same file: an MCP lock server plus a hook that blocks the edit. Its test suite had a concurrency test, and it passed.',
      'The test ran every "session" over a single connection, so the requests were serialized before they reached the lock. It could not observe a race, because none was possible. When I raced real processes instead, two sessions edited the same file. The fix addressed both causes of the race, and the test now uses separate processes, so it can fail.',
    ],
  },
  {
    heading: '2. The made-up funding round that matched',
    pr: { label: 'cited#1', href: `${GH}/cited/pull/1` },
    paragraphs: [
      'cited re-fetches every page an LLM cites and flags claims the page does not support. A claim about a funding round that never happened scored as a near match, because most of its words were on the page. The words that made it false, the amount and the name, were the ones the fuzzy match forgave.',
      'Numbers and names in a claim now have to appear on the page. On cited\'s own 29-claim benchmark it catches 10 of 15 unsupported claims; swapped ordinary words still get through, and the README says so.',
    ],
  },
  {
    heading: '3. The eval job that graded its own answers',
    pr: { label: 'signal-scout#3', href: `${GH}/signal-scout/pull/3` },
    paragraphs: [
      'signal-scout\'s CI had an eval job, and it was green. It graded hand-written example outputs, not outputs the pipeline produced, so no change to the pipeline could make it fail.',
      'It now runs the pipeline on fixtures. To prove the job can fail, I planted three bugs, one at a time, and each one turns CI red.',
    ],
  },
]

export default function ChecksPage() {
  return (
    <article className="min-h-screen px-4 pb-20 pt-24 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back home
        </Link>

        <h1 className="text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 font-mono text-xs text-ink-faint">scoped · cited · signal-scout</p>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-dim">
          <p>
            A green check means one of two things: the code works, or the check cannot see the problem. These are
            three times it was the second, all in my own repos, all caught after the check had been passing for a
            while.
          </p>
        </div>

        {cases.map((c) => (
          <section key={c.heading} className="mt-12">
            <h2 className="mb-1 text-2xl font-medium text-ink">{c.heading}</h2>
            <p className="mb-4 font-mono text-xs">
              <a href={c.pr.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {c.pr.label}
              </a>
            </p>
            <div className="space-y-5 text-lg leading-relaxed text-ink-dim">
              {c.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-medium text-ink">The rule</h2>
          <div className="space-y-5 text-lg leading-relaxed text-ink-dim">
            <p>
              Before I trust a check, I make it fail once. For code that means a planted bug that has to turn CI red.
              For prompts and evals it means{' '}
              <a href={`${GH}/litmus`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                litmus
              </a>
              , which mutates the prompt under test and lists the broken copies the suite missed. Pointed at my
              incident agent&apos;s eval suite, it found that the suite killed 0 of 12 mutants. That one is in{' '}
              <Link href="/writing/rootcause-benchmark/" className={linkClass}>
                the benchmark write-up
              </Link>
              .
            </p>
            <p>
              My coding agents run inside{' '}
              <a href={`${GH}/sous`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                sous
              </a>
              , which applies the same rule to them: a green run that executed no tests, or weakened one, fails.
            </p>
          </div>
        </section>
      </div>
    </article>
  )
}

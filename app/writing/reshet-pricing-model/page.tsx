import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const title = 'Getting a pricing model adopted at Reshet 13'
const description =
  'At an Israeli TV network I built a regression that found underpriced primetime ad slots, then worked with the commercial team until they set prices from it. How the model was built, and what the team changed in it.'

export const metadata: Metadata = {
  title: `${title} | Oren Segal`,
  description,
  openGraph: { title, description, type: 'article', url: './', images: ['/og-image.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
}

const sections: { heading: string; paragraphs: string[] }[] = [
  {
    heading: 'The problem',
    paragraphs: [
      'Reshet 13\'s commercial team priced primetime ad slots with legacy heuristics. Nobody had a systematic way to tell which slots were priced below what demand would support.',
    ],
  },
  {
    heading: 'What I built',
    paragraphs: [
      'A regression model that flagged underpriced primetime slots. The model was the smaller part of the job. The team owned revenue and had their own market knowledge, so I checked the model\'s output against it with them, then turned the result into a pricing model they could use without reading the regression.',
    ],
  },
  {
    heading: 'What the team pushed on',
    paragraphs: [
      'They wanted to see the logic, and they raised concerns I had to answer. Three changes came out of that. I adjusted the model to the specific metadata of the slots they sold and went looking for patterns in how those slots behaved. I checked the model\'s logic against advertising regulations, so the prices it suggested could be used. And in some cases the right price still depended on the old price, so the model had to account for that.',
      'Once they could follow the logic and their concerns were addressed, they used the prices. They rarely overrode them.',
    ],
  },
  {
    heading: 'After launch',
    paragraphs: ['I maintained the model myself, and the commercial team set prices from its output.'],
  },
  {
    heading: 'What happened',
    paragraphs: [
      'The new pricing model went live in FY2022. Gross ad revenue that year finished 17% above FY2021. That is a before-and-after number with no holdout and no counterfactual, so it cannot separate the model from everything else that changed that year, and it does not show how much of the rise, if any, the model caused. What I can say is narrower: the team adopted the prices and rarely overrode them.',
    ],
  },
  {
    heading: 'The same pattern, a second time',
    paragraphs: [
      'I replaced 70+ weekly Excel reports with Python and SQL pipelines, adopted across the network and its news company, and mentored four junior analysts so the pipelines had owners. QlikView was the reporting layer on top of the pipelines. I ran the pipelines alongside the Excel reports and reconciled the differences before the cutover. The 70 hours a week saved is the analysts\' own estimate of time before and after, not tracked hours.',
    ],
  },
  {
    heading: 'What I took from it',
    paragraphs: [
      'Building the regression was maybe a third of the work. The rest was sitting with a team that owned the revenue, learning their constraints, and packaging a statistical result as something they could trust. That is the same motion as embedding with a customer to ship something they will keep using.',
    ],
  },
]

export default function ReshetPricingModelPage() {
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
        <p className="mt-3 font-mono text-xs text-ink-faint">Reshet 13 · Senior Data Analyst · 2018-2023</p>

        {sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="mb-4 text-2xl font-medium text-ink">{section.heading}</h2>
            <div className="space-y-5 text-lg leading-relaxed text-ink-dim">
              {section.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}

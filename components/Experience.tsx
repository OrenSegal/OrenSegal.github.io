import Link from 'next/link'

// Every line here restates the one-page resume at /resume.pdf. When a fact
// changes there, change it here.
const ROLES: {
  years: string
  current?: boolean
  org: string
  role: string
  place?: string
  line: string
  more?: { label: string; href: string }
}[] = [
  {
    years: '2025-present',
    current: true,
    org: 'Shelfie',
    role: 'Founder and full-stack AI engineer',
    place: 'New York',
    line: 'A vision-powered kitchen app for iOS. I built the Swift app and the Postgres backend that turn a camera walk-through of the kitchen into a live inventory, kept cloud vision cost per item low by cropping items on the phone and sending up to nine in one call, and routed every cloud model call through one gateway with a semantic cache, a circuit breaker and a daily spend cap.',
    more: { label: 'shelfie.food', href: 'https://shelfie.food' },
  },
  {
    years: '2025-2026',
    org: 'KashCash',
    role: 'Analytics engineer, part-time',
    place: 'Remote',
    line: 'A consumer transactions business. Working directly with the owner, I replaced a manual spreadsheet routine with a BigQuery warehouse that loads daily with no one in the loop, and a pretrained time-series model that forecasts sales and flags unusual days on a live dashboard. Over a million transactions to date.',
  },
  {
    years: '2026',
    org: 'Cohort NYC',
    role: 'Growth work, volunteer',
    place: 'New York',
    line: 'A community nonprofit. I built agents that draft event copy, target its distribution and build core audiences, and an SQL and Python pipeline tying each Luma registration to its source. Over two months followers grew 61% and average event attendance rose 83%.',
  },
  {
    years: '2023-2025',
    org: 'Relocation and retraining',
    role: 'Career break',
    place: 'New York',
    line: 'Moved to the U.S. and retrained in AI/ML: Duke MLOps and LLMOps (2025), DeepLearning.AI Deep Learning (2024).',
  },
  {
    years: '2018-2023',
    org: 'Reshet 13',
    role: 'Senior data analyst',
    place: 'Tel Aviv',
    line: 'A national TV network. I replaced Excel reporting with pandas and SQL pipelines that saved about 70 work hours a week across the network and its news company, and mentored four analysts through the rollout. With the commercial team I built the regression model that replaced pricing heuristics, and the Power BI audience analytics and forecasting model behind content acquisition and greenlight decisions.',
    more: { label: 'how the pricing model got adopted', href: '/writing/reshet-pricing-model/' },
  },
  {
    years: '2014-2018',
    org: 'The Academic College of Tel Aviv-Yaffo',
    role: 'B.Sc. Information Systems',
    place: 'Tel Aviv',
    line: '',
  },
]

const link = 'text-ink underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'

export default function Experience() {
  return (
    <section id="experience" className="px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-[16vw] font-light lowercase leading-[0.92] tracking-[-0.04em] text-ink sm:text-8xl">
          experience
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-dim">
          The same history as the{' '}
          <a href="/resume.pdf" className={link}>one-page resume</a>, newest first.
        </p>

        <ol className="mt-10 space-y-2">
          {ROLES.map((r) => (
            <li key={r.org} className="grid grid-cols-1 gap-x-8 gap-y-3 bg-panel-face p-5 sm:p-6 md:grid-cols-[9rem_16rem_1fr]">
              <p className={`font-mono text-xs lowercase tabular md:pt-2 ${r.current ? 'text-accent' : 'text-ink-faint'}`}>{r.years}</p>
              <div>
                <h3 className="text-2xl font-light lowercase leading-none tracking-[-0.03em] text-ink sm:text-3xl">{r.org}</h3>
                <p className="mt-2 text-sm leading-snug text-ink-dim">{r.role}</p>
                {r.place && <p className="mt-1 font-mono text-xs lowercase text-ink-faint">{r.place}</p>}
              </div>
              {(r.line || r.more) && (
                <div className="max-w-2xl text-sm leading-relaxed text-ink-dim">
                  {r.line && <p>{r.line}</p>}
                  {r.more &&
                    (r.more.href.startsWith('/') ? (
                      <Link href={r.more.href} className={`mt-3 inline-block ${link}`}>{r.more.label} →</Link>
                    ) : (
                      <a href={r.more.href} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-block ${link}`}>
                        {r.more.label} →
                      </a>
                    ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

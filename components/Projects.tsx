import { projects, Project } from '@/lib/projects'
import projectStats from '@/lib/project-stats.json'
import { LiveTile } from '@/components/LiveTile'

const STATS: Record<string, { stars: number; pushedAt: string | null }> = projectStats

export const CATEGORIES: { id: Project['category']; label: string }[] = [
  { id: 'ai-agents', label: 'AI Agents' },
  { id: 'evals', label: 'Evals and Retrieval' },
  { id: 'ai-infra', label: 'AI Infrastructure' },
  { id: 'dev-tools', label: 'Developer Tools' },
]

// The wall shows the work that carries the thesis. The rest stays public and
// reachable: the sous parts ship from the sous marketplace, and the others are
// listed below the wall by name.
const WALL = ['rootcause', 'sous', 'litmus', 'cited', 'llm-gateway-kit', 'signal-scout']
const SOUS_PARTS = ['scoped', 'deuce', 'blast-shield']
const MORE = ['rag-generation', 'architecture-lint', 'signal-skills']

// Wording follows the profile README's "Pull requests where a check proved less than it claimed".
const CHECKS = [
  {
    ref: 'scoped#1',
    href: 'https://github.com/OrenSegal/scoped/pull/1',
    line: 'The only concurrency test ran on one connection. Racing real processes let two sessions edit the same file; the PR fixes both causes.',
  },
  {
    ref: 'cited#1',
    href: 'https://github.com/OrenSegal/cited/pull/1',
    line: 'A made-up funding round scored as a near match. Numbers and names in a claim now have to be on the page.',
  },
  {
    ref: 'signal-scout#3',
    href: 'https://github.com/OrenSegal/signal-scout/pull/3',
    line: 'The eval job graded hand-written outputs, so no change could fail it. It now runs the pipeline on fixtures, and three planted bugs each turn it red.',
  },
]

const byId = (id: string) => projects.find((p) => p.id === id)!
const RECORDED = projects.filter((p) => p.records?.decisions).map((p) => p.id)
const LIMITED = projects.filter((p) => p.records?.limitations).map((p) => p.id)
const inline = 'text-ink underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'

export default function Projects() {
  const wall = WALL.map(byId)
  return (
    <section id="work" className="px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-[16vw] font-light lowercase leading-[0.92] tracking-[-0.04em] text-ink sm:text-8xl">
          work
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-dim">
          Six projects carry the argument; all {projects.length} are public, with CI in each repo or in sous.
          Each tile opens its build log. The figures on them are copied from each
          repo&apos;s own results, and the push dates are fetched from GitHub when
          the site builds.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-4" style={{ gridAutoFlow: 'dense' }}>
          {wall.map((project) => (
            <LiveTile
              key={project.id}
              project={project}
              pushedAt={STATS[project.id]?.pushedAt ?? null}
              parts={project.id === 'sous' ? SOUS_PARTS.map(byId) : undefined}
            />
          ))}
        </div>

        <h3 className="mt-14 text-2xl font-light lowercase leading-none tracking-[-0.03em] text-ink sm:text-3xl">
          checks that proved less than they claimed
        </h3>
        <p className="mt-2 max-w-xl text-sm text-ink-dim">
          Three pull requests where my own test or eval turned out not to test anything, and what each one does now.
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-3">
          {CHECKS.map((pr) => (
            <li key={pr.ref}>
              <a href={pr.href} target="_blank" rel="noopener noreferrer" className="tile flex h-full flex-col bg-panel-face p-4 sm:p-5">
                <p className="text-sm leading-snug text-ink-dim">{pr.line}</p>
                <p className="tile-title mt-auto pt-4 font-mono text-xs text-ink">{pr.ref} →</p>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-dim">
          Each repo keeps its own record of what it does not show. Decision
          records, with the alternatives I rejected:{' '}
          {RECORDED.map((id, i) => (
            <span key={id}>
              {i > 0 && ', '}
              <a href={byId(id).records!.decisions} target="_blank" rel="noopener noreferrer" className={inline}>
                {id}
              </a>
            </span>
          ))}
          . Limitations sections:{' '}
          {LIMITED.map((id, i) => (
            <span key={id}>
              {i > 0 && ', '}
              <a href={byId(id).records!.limitations} target="_blank" rel="noopener noreferrer" className={inline}>
                {id}
              </a>
            </span>
          ))}
          .
        </p>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-dim">
          Also on GitHub:{' '}
          {MORE.map((id, i) => {
            const p = byId(id)
            return (
              <span key={id}>
                {i > 0 && ', '}
                <a href={`/projects/${id}/`} className={inline}>
                  {p.title.toLowerCase()}
                </a>{' '}
                ({p.subtitle.toLowerCase()})
              </span>
            )
          })}
          . Everything else is at{' '}
          <a href="https://github.com/OrenSegal" target="_blank" rel="noopener noreferrer" className={inline}>
            github.com/OrenSegal
          </a>
          .
        </p>
      </div>
    </section>
  )
}

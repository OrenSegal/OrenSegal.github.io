import Link from 'next/link'
import projectStats from '@/lib/project-stats.json'
import { projects } from '@/lib/projects'
import { latestPost } from '@/lib/posts'
import { formatVerifiedDate } from '@/lib/status'
import { Activity, hasActivity } from '@/components/Activity'
import { RepoActivity, hasRepoActivity } from '@/components/RepoActivity'
import { LocalTime } from '@/components/LocalTime'

const STATS: Record<string, { stars: number; pushedAt: string | null }> = projectStats
const link = 'text-ink underline decoration-accent-dim underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'

// What is current, with the machine-sourced parts fetched at build: the last
// push across the project repos, the newest post and the contribution calendar.
export default function Now() {
  const lastPush = Object.entries(STATS)
    .filter(([, s]) => s.pushedAt)
    .sort((a, b) => (b[1].pushedAt as string).localeCompare(a[1].pushedAt as string))[0]
  const pushed = lastPush && projects.find((p) => p.id === lastPush[0])
  const post = latestPost()

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: 'building',
      value: (
        <>
          <a href="https://shelfie.food" target="_blank" rel="noopener noreferrer" className={link}>Shelfie</a>, in closed beta
        </>
      ),
    },
    ...(pushed
      ? [{
          label: 'last push',
          value: (
            <>
              <Link href={`/projects/${pushed.id}/`} className={link}>{pushed.title.toLowerCase()}</Link>
              <span className="font-mono text-xs text-ink-faint"> · {formatVerifiedDate(lastPush[1].pushedAt).toLowerCase()}</span>
            </>
          ),
        }]
      : []),
    {
      label: 'last post',
      value: (
        <>
          <Link href={post.href} className={link}>{post.title}</Link>
          <span className="font-mono text-xs text-ink-faint"> · {formatVerifiedDate(post.date).toLowerCase()}</span>
        </>
      ),
    },
    { label: 'open to', value: 'applied AI engineer and forward deployed engineer roles, New York or remote' },
    {
      label: 'where',
      value: (
        <>
          Brooklyn, NY<span className="font-mono text-xs text-ink-faint"> · <LocalTime /></span>
        </>
      ),
    },
  ]

  return (
    <section id="now" className="px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-[16vw] font-light lowercase leading-[0.92] tracking-[-0.04em] text-ink sm:text-8xl">
          now
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-5">
          {hasActivity && (
            <div className="md:col-span-3">
              <Activity />
            </div>
          )}
          <div className={`bg-panel-face p-5 sm:p-6 ${hasActivity ? 'md:col-span-2' : 'md:col-span-5'}`}>
            <dl className={`text-sm leading-relaxed ${hasActivity ? 'space-y-3' : 'grid gap-x-10 gap-y-3 md:grid-cols-2'}`}>
              {rows.map((row) => (
                <div key={row.label} className="flex gap-4">
                  <dt className="w-20 flex-shrink-0 lowercase text-ink-faint">{row.label}</dt>
                  <dd className="text-ink-dim">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          {hasRepoActivity && (
            <div className="md:col-span-5">
              <RepoActivity />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

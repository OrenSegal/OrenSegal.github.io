import Link from 'next/link'
import { Project } from '@/lib/projects'
import { formatVerifiedDate } from '@/lib/status'
import { CATEGORIES } from '@/components/Projects'
import { TileDemo } from '@/components/TileDemo'

// A Metro live tile. At rest: title, blurb, an optional data demonstration, and
// the category and push date at the foot. On hover or focus the title is struck
// in orange and the foot shows the verified strip: the live CI badge and the link.
export function LiveTile({
  project,
  pushedAt,
  parts,
}: {
  project: Project
  pushedAt: string | null
  parts?: Project[] // plugins that ship from this project's marketplace
}) {
  const category = CATEGORIES.find((c) => c.id === project.category)?.label ?? project.category
  const wide = project.featured
  const cobalt = project.tone === 'cobalt'

  return (
    <Link
      href={`/projects/${project.id}/`}
      className={`tile relative flex flex-col p-4 sm:p-5 ${cobalt ? 'bg-field' : 'bg-panel-face'} ${wide ? 'md:col-span-2' : ''}`}
      aria-label={`${project.title}: ${project.blurb} Updated ${formatVerifiedDate(pushedAt)}.`}
    >
      <h3 className={`tile-title font-light lowercase leading-none tracking-[-0.03em] text-ink ${wide ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>
        {project.title}
      </h3>
      <p className={`mt-2 leading-snug text-ink-dim ${wide ? 'max-w-xl text-base' : 'text-sm'}`}>
        {project.blurb}
      </p>
      {wide && <TileDemo id={project.id} />}
      {parts && (
        <p className="mt-4 text-sm leading-snug text-ink-dim">
          Ships with{' '}
          {parts.map((p, i) => (
            <span key={p.id}>
              {i > 0 && (i === parts.length - 1 ? ' and ' : ', ')}
              <span className="text-ink">{p.title.toLowerCase()}</span> ({p.subtitle.toLowerCase().replace(/\.$/, '')})
            </span>
          ))}
          , from the same marketplace.
        </p>
      )}

      <div className="tile-foot mt-auto pt-5">
        <p className={`tile-meta font-mono text-xs lowercase ${cobalt ? 'text-ink-dim' : 'text-ink-faint'}`}>
          {category} · updated {formatVerifiedDate(pushedAt)}
        </p>
        <p className="tile-live flex items-center gap-3 font-mono text-xs text-accent" aria-hidden="true">
          {project.ciWorkflow && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://github.com/OrenSegal/${project.id}/actions/workflows/${project.ciWorkflow}/badge.svg?branch=main`}
              alt=""
              height={20}
              className="h-5 w-auto"
            />
          )}
          <span>pushed {formatVerifiedDate(pushedAt)} · open the build log →</span>
        </p>
      </div>
    </Link>
  )
}

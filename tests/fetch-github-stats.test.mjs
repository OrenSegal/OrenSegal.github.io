import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { PROJECT_REPOS, mergeStats } from '../scripts/fetch-github-stats.mjs'

const settled = (repo, value) => ({ repo, status: 'fulfilled', value })
const failed = (repo) => ({ repo, status: 'rejected', reason: new Error(`GitHub API responded 403 for ${repo}`) })

test('one failed repo does not discard the repos that were fetched', () => {
  const previous = {
    rootcause: { stars: 0, pushedAt: '2026-11-05T06:15:52Z' },
    sous: { stars: 0, pushedAt: '2026-11-05T06:25:41Z' },
  }
  const merged = mergeStats(previous, [
    settled('rootcause', { stars: 1, pushedAt: '2026-11-19T05:50:50Z' }),
    failed('sous'),
  ])
  assert.deepEqual(merged.rootcause, { stars: 1, pushedAt: '2026-11-19T05:50:50Z' })
  // The failed repo keeps its last real value; nothing is invented.
  assert.deepEqual(merged.sous, previous.sous)
})

test('a repo that failed and has no previous value stays absent', () => {
  const merged = mergeStats({}, [failed('ny-noise')])
  assert.equal('ny-noise' in merged, false)
})

test('PROJECT_REPOS lists exactly the project ids in lib/projects.ts', async () => {
  const src = await readFile(new URL('../lib/projects.ts', import.meta.url), 'utf8')
  const ids = [...src.matchAll(/^\s{4}id: '([^']+)',$/gm)].map((m) => m[1])
  assert.ok(ids.length > 0)
  assert.deepEqual([...PROJECT_REPOS].sort(), ids.sort())
})

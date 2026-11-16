// One-off generator for the per-post share cards in public/og/.
// Not run at build time. Re-run by hand after adding or retitling a post:
//   node scripts/generate-post-cards.mjs
// Needs Playwright with Chromium on the machine and network access to Google
// Fonts; neither is a dependency of the site itself.

import { readFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createRequire } from 'node:module'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'public', 'og')
const { chromium } = createRequire(import.meta.url)('playwright')

// lib/posts.ts is the one post list; read the fields the card needs from it.
async function readPosts() {
  const src = await readFile(path.join(ROOT, 'lib', 'posts.ts'), 'utf8')
  const blocks = src.split(/\n  \{\n/).slice(1)
  return blocks.map((b) => {
    const str = (key) => {
      const m = b.match(new RegExp(`${key}:\\s*(?:"([^"]*)"|'([^']*)')`))
      return m ? (m[1] ?? m[2]) : null
    }
    const fig = b.match(/figure:\s*\{\s*value:\s*'([^']*)',\s*label:\s*'([^']*)'/)
    return {
      slug: str('href').split('/').filter(Boolean).pop(),
      title: str('title'),
      date: str('date'),
      figure: fig ? { value: fig[1], label: fig[2] } : null,
    }
  })
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const fmtDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).toLowerCase()

const html = (post) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;500&family=JetBrains+Mono&display=block" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #000; color: #fff; font-family: Urbanist, sans-serif; padding: 64px 72px; display: flex; flex-direction: column; }
  .who { font-size: 26px; font-weight: 500; }
  h1 { margin-top: 44px; font-size: ${post.title.length > 42 ? 82 : 96}px; font-weight: 300; line-height: 0.98; letter-spacing: -0.04em; text-transform: lowercase; max-width: 1040px; }
  .foot { margin-top: auto; display: flex; align-items: flex-end; justify-content: space-between; }
  .fig { display: flex; align-items: baseline; gap: 20px; }
  .val { font-size: 104px; font-weight: 300; line-height: 0.9; letter-spacing: -0.04em; color: #ff8c1a; text-shadow: 0 0 24px rgba(255,140,26,0.45); }
  .foot > p { white-space: nowrap; }
  .mono { font-family: 'JetBrains Mono', monospace; font-size: 22px; color: rgba(255,255,255,0.6); }
</style></head><body>
  <p class="who">oren segal</p>
  <h1>${esc(post.title)}</h1>
  <div class="foot">
    <div class="fig">${post.figure ? `<span class="val">${esc(post.figure.value)}</span><span class="mono">${esc(post.figure.label)}</span>` : ''}</div>
    <p class="mono">${fmtDate(post.date)} · orensegal.github.io/writing</p>
  </div>
</body></html>`

const posts = await readPosts()
await mkdir(OUT_DIR, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
for (const post of posts) {
  await page.setContent(html(post), { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const out = path.join(OUT_DIR, `${post.slug}.png`)
  await page.screenshot({ path: out })
  console.log(`[generate-post-cards] wrote ${out}`)
}
await browser.close()

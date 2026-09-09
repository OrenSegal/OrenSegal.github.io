// One-off generator for public/og-image.png — the static OG/Twitter card.
// Not run at build time (the handoff calls for a static asset, not a
// dynamically generated one under `output: 'export'`). Re-run manually with
// `node scripts/generate-og-image.mjs` if the card needs to change.
//
// Renders a hand-authored SVG matching the site's plain, prose-led tokens
// (no chrome, no diegetic instrument metaphor, one workhorse display face)
// with the real brand font embedded as a base64 data URI, then rasterizes
// with rsvg-convert.

import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import https from 'node:https'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC_DIR = path.join(ROOT, 'public')
const OUT_SVG = path.join(ROOT, 'scripts', '.og-image-source.svg')
const OUT_PNG = path.join(PUBLIC_DIR, 'og-image.png')

const COLORS = {
  panel: '#0a0b0c',
  line: '#232527',
  ink: '#f2f1ea',
  inkDim: '#9a9d9f',
  inkFaint: '#7a7d7f',
  accent: '#8fd6a8',
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'og-image-generator' } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(fetchBuffer(res.headers.location))
        return
      }
      if (res.statusCode !== 200) {
        reject(new Error(`GET ${url} -> ${res.statusCode}`))
        return
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function main() {
  const [spaceGroteskRegular, spaceGroteskBold] = await Promise.all([
    fetchBuffer('https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsj.ttf'),
    fetchBuffer('https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf'),
  ])

  const sgRegularB64 = spaceGroteskRegular.toString('base64')
  const sgBoldB64 = spaceGroteskBold.toString('base64')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <style>
    @font-face { font-family: 'OGDisplay'; font-weight: 500; src: url(data:font/ttf;base64,${sgRegularB64}) format('truetype'); }
    @font-face { font-family: 'OGDisplay'; font-weight: 700; src: url(data:font/ttf;base64,${sgBoldB64}) format('truetype'); }
  </style>
</defs>

<rect x="0" y="0" width="1200" height="630" fill="${COLORS.panel}" />

<text x="80" y="120" font-family="OGDisplay" font-weight="500" font-size="24" fill="${COLORS.ink}">Oren Segal</text>

<text x="80" y="270" font-family="OGDisplay" font-weight="700" font-size="56" fill="${COLORS.ink}">
  <tspan x="80" dy="0">I build the infrastructure that</tspan>
  <tspan x="80" dy="66">keeps AI agents honest under load.</tspan>
</text>

<text x="80" y="410" font-family="OGDisplay" font-weight="500" font-size="26" fill="${COLORS.inkDim}">Cost budgets, fact-checking, and CI for code an LLM wrote.</text>

<line x1="80" y1="480" x2="1120" y2="480" stroke="${COLORS.line}" stroke-width="1" />

<text x="80" y="536" font-family="OGDisplay" font-weight="500" font-size="22" fill="${COLORS.accent}">8 shipped projects</text>
<text x="80" y="568" font-family="OGDisplay" font-weight="400" font-size="20" fill="${COLORS.inkFaint}">orensegal.github.io</text>
</svg>
`

  await mkdir(PUBLIC_DIR, { recursive: true })
  await writeFile(OUT_SVG, svg)
  execFileSync('rsvg-convert', ['-w', '1200', '-h', '630', '-o', OUT_PNG, OUT_SVG])
  console.log(`[generate-og-image] wrote ${OUT_PNG}`)
}

main().catch((err) => {
  console.error('[generate-og-image] failed:', err)
  process.exit(1)
})

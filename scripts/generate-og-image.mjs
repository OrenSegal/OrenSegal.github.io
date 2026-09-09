// One-off generator for public/og-image.png — the static OG/Twitter card.
// Not run at build time (the handoff calls for a static asset, not a
// dynamically generated one under `output: 'export'`). Re-run manually with
// `node scripts/generate-og-image.mjs` if the card needs to change.
//
// Renders a hand-authored SVG matching DESIGN.md's flight-deck tokens
// (no gradients/blur/shadows, square corners, hairline bezel borders, one
// restrained signal-green accent) with the real brand fonts embedded as
// base64 data URIs, then rasterizes with rsvg-convert.

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
  panelFace: '#131417',
  bezel: '#2b2e33',
  ink: '#f2f1ea',
  inkDim: '#95989c',
  inkFaint: '#5b5e63',
  signal: '#7cfa9a',
  signalDim: '#3f7a52',
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
  const [spaceGroteskRegular, spaceGroteskBold, plexMono] = await Promise.all([
    fetchBuffer('https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsj.ttf'),
    fetchBuffer('https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf'),
    fetchBuffer('https://github.com/google/fonts/raw/main/ofl/ibmplexmono/IBMPlexMono-Medium.ttf'),
  ])

  const sgRegularB64 = spaceGroteskRegular.toString('base64')
  const sgBoldB64 = spaceGroteskBold.toString('base64')
  const pmB64 = plexMono.toString('base64')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <style>
    @font-face { font-family: 'OGDisplay'; font-weight: 400; src: url(data:font/ttf;base64,${sgRegularB64}) format('truetype'); }
    @font-face { font-family: 'OGDisplay'; font-weight: 700; src: url(data:font/ttf;base64,${sgBoldB64}) format('truetype'); }
    @font-face { font-family: 'OGMono'; src: url(data:font/ttf;base64,${pmB64}) format('truetype'); }
  </style>
</defs>

<rect x="0" y="0" width="1200" height="630" fill="${COLORS.panelFace}" />

<!-- ghost instrument arcs: diegetic texture, not decoration -->
<circle cx="1120" cy="40" r="220" fill="none" stroke="${COLORS.inkFaint}" stroke-width="1" stroke-dasharray="2 5" opacity="0.18" />
<circle cx="30" cy="610" r="200" fill="none" stroke="${COLORS.inkFaint}" stroke-width="1" stroke-dasharray="2 5" opacity="0.18" />

<!-- outer bezel frame -->
<rect x="32" y="32" width="1136" height="566" fill="none" stroke="${COLORS.bezel}" stroke-width="1.5" />

<!-- plate id -->
<text x="64" y="78" font-family="OGMono" font-size="12" letter-spacing="3" fill="${COLORS.inkFaint}">PLATE OG-01</text>

<!-- monogram + name, echoing Navigation -->
<rect x="64" y="98" width="34" height="34" fill="none" stroke="${COLORS.inkDim}" stroke-width="1" />
<text x="81" y="121" font-family="OGMono" font-size="14" fill="${COLORS.ink}" text-anchor="middle">OS</text>
<text x="112" y="121" font-family="OGMono" font-size="13" letter-spacing="3" fill="${COLORS.inkDim}">OREN SEGAL</text>

<!-- status flag: real claim carried over from Hero -->
<rect x="856" y="98" width="280" height="34" fill="${COLORS.panel}" stroke="${COLORS.signalDim}" stroke-width="1" />
<circle cx="876" cy="115" r="4" fill="${COLORS.signal}" />
<text x="890" y="120" font-family="OGMono" font-size="11" letter-spacing="2" fill="${COLORS.signal}">CLEARED &#8212; AVAILABLE FOR HIRE</text>

<!-- name placard -->
<text x="64" y="320" font-family="OGDisplay" font-weight="700" font-size="88" fill="${COLORS.ink}">Oren Segal</text>
<text x="66" y="368" font-family="OGDisplay" font-weight="400" font-size="30" fill="${COLORS.inkDim}">AI Platform Engineer &#8212; Agent Infrastructure</text>

<!-- three brand-pillar plates, bottom row -->
<g font-family="OGMono" font-size="12" letter-spacing="1.5" fill="${COLORS.inkDim}">
  <rect x="64" y="486" width="330" height="64" fill="none" stroke="${COLORS.bezel}" stroke-width="1" />
  <text x="84" y="514">COST-SAFE</text>
  <text x="84" y="534">LLM GATEWAYS</text>

  <rect x="418" y="486" width="330" height="64" fill="none" stroke="${COLORS.bezel}" stroke-width="1" />
  <text x="438" y="514">EVIDENCE-BACKED</text>
  <text x="438" y="534">RESEARCH AGENTS</text>

  <rect x="772" y="486" width="330" height="64" fill="none" stroke="${COLORS.bezel}" stroke-width="1" />
  <text x="792" y="514">FABRICATION-CATCHING</text>
  <text x="792" y="534">CI</text>
</g>

<!-- footer -->
<text x="1068" y="580" font-family="OGMono" font-size="12" letter-spacing="2" fill="${COLORS.inkFaint}" text-anchor="end">orensegal.github.io</text>
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

import { posts } from '@/lib/posts'

export const dynamic = 'force-static'

const BASE = 'https://orensegal.github.io'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export function GET() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))
  const items = sorted
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${BASE}${p.href}</link>
      <guid isPermaLink="true">${BASE}${p.href}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Oren Segal: writing</title>
    <link>${BASE}/writing/</link>
    <atom:link href="${BASE}/writing/feed.xml" rel="self" type="application/rss+xml" />
    <description>Write-ups on agent evals, checks that can fail, and getting models adopted.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(`${sorted[0].date}T12:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}

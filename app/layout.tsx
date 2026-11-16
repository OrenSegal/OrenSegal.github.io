import type { Metadata } from 'next'
import { Urbanist, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import type { PaletteItem } from '@/components/CommandPalette'
import { projects } from '@/lib/projects'
import { posts } from '@/lib/posts'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Oren Segal | Applied AI Engineer',
  description: 'Applied AI engineer. I build LLM products and the evals that show whether they work: Shelfie, a vision-powered iOS kitchen app in closed beta, and open-source tools like rootcause, sous and litmus.',
  keywords: ['Applied AI Engineer', 'AI Agents', 'LLM Evals', 'MCP', 'Claude Code', 'Python'],
  authors: [{ name: 'Oren Segal' }],
  metadataBase: new URL('https://orensegal.github.io'),
  alternates: {
    canonical: './',
    types: { 'application/rss+xml': [{ url: '/writing/feed.xml', title: 'Oren Segal: writing' }] },
  },
  openGraph: {
    title: 'Oren Segal | Applied AI Engineer',
    description: 'Applied AI engineer. I build LLM products and the evals that show whether they work: Shelfie, a vision-powered iOS kitchen app in closed beta, and open-source tools like rootcause, sous and litmus.',
    type: 'website',
    url: './',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Oren Segal, Applied AI Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oren Segal | Applied AI Engineer',
    description: 'Applied AI engineer. I build LLM products and the evals that show whether they work: Shelfie, a vision-powered iOS kitchen app in closed beta, and open-source tools like rootcause, sous and litmus.',
    images: ['/og-image.png'],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Oren Segal',
  jobTitle: 'Applied AI Engineer',
  url: 'https://orensegal.github.io',
  sameAs: ['https://github.com/OrenSegal', 'https://linkedin.com/in/oren-segal'],
  knowsAbout: ['LLM evaluation', 'AI agents', 'Model Context Protocol', 'Python', 'TypeScript', 'Swift', 'forecasting'],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'The Academic College of Tel Aviv-Yaffo' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brooklyn',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
}

const EMAIL = 'orenssegal@gmail.com'

// Everything the command palette can reach, slimmed to labels and links.
const paletteItems: PaletteItem[] = [
  { group: 'pages', label: 'work', href: '/#work' },
  { group: 'pages', label: 'now', href: '/#now' },
  { group: 'pages', label: 'experience', href: '/#experience' },
  { group: 'pages', label: 'about', href: '/#about' },
  { group: 'pages', label: 'writing', href: '/writing/' },
  { group: 'pages', label: 'all projects', href: '/projects/' },
  { group: 'pages', label: 'resume', hint: 'one page, pdf', href: '/resume.pdf' },
  ...posts.map((p) => ({ group: 'writing', label: p.title, href: p.href })),
  ...projects.map((p) => ({ group: 'projects', label: p.title, hint: p.subtitle, href: `/projects/${p.id}/` })),
  { group: 'contact', label: 'copy email address', hint: EMAIL, copy: EMAIL },
  { group: 'contact', label: 'github', hint: 'github.com/OrenSegal', href: 'https://github.com/OrenSegal' },
  { group: 'contact', label: 'linkedin', hint: 'linkedin.com/in/oren-segal', href: 'https://linkedin.com/in/oren-segal' },
  { group: 'contact', label: 'rss feed', hint: '/writing/feed.xml', href: '/writing/feed.xml' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${urbanist.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-panel min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navigation paletteItems={paletteItems} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

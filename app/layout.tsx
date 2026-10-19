import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Oren Segal | Applied AI Engineer',
  description: 'Applied AI engineer. I build agents and the evals and CI checks that show whether they work: rootcause, sous, litmus, and Shelfie, an iOS app in closed beta.',
  keywords: ['Applied AI Engineer', 'AI Agents', 'LLM Evals', 'MCP', 'Claude Code', 'Python'],
  authors: [{ name: 'Oren Segal' }],
  metadataBase: new URL('https://orensegal.github.io'),
  openGraph: {
    title: 'Oren Segal | Applied AI Engineer',
    description: 'Applied AI engineer. I build agents and the evals and CI checks that show whether they work: rootcause, sous, litmus, and Shelfie, an iOS app in closed beta.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Oren Segal, Applied AI Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oren Segal | Applied AI Engineer',
    description: 'Applied AI engineer. I build agents and the evals and CI checks that show whether they work: rootcause, sous, litmus, and Shelfie, an iOS app in closed beta.',
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
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brooklyn',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-panel min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

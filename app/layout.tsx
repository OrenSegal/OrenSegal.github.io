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
  title: 'Oren Segal | AI Engineer',
  description: 'AI engineer building Shelfie with Claude Code agents, plus open-source tools that check what agents and LLMs produce.',
  keywords: ['AI', 'Machine Learning', 'Data Engineering', 'Portfolio', 'Claude Code', 'LLM'],
  authors: [{ name: 'Oren Segal' }],
  metadataBase: new URL('https://orensegal.github.io'),
  openGraph: {
    title: 'Oren Segal | AI Engineer',
    description: 'Shelfie, and open-source tools that check what agents and LLMs produce',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Oren Segal, AI Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oren Segal | AI Engineer',
    description: 'Shelfie, and open-source tools that check what agents and LLMs produce',
    images: ['/og-image.png'],
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
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

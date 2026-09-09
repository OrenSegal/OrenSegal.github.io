import type { Metadata } from 'next'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Oren Segal | AI Platform Engineer',
  description: 'Portfolio of shipped AI agent, LLM infrastructure, and data engineering projects by Oren Segal.',
  keywords: ['AI', 'Machine Learning', 'Data Engineering', 'Portfolio', 'Claude Code', 'LLM'],
  authors: [{ name: 'Oren Segal' }],
  metadataBase: new URL('https://orensegal.github.io'),
  openGraph: {
    title: 'Oren Segal | AI Platform Engineer',
    description: 'Shipped AI agent, LLM infrastructure, and data engineering projects',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Oren Segal — AI Platform Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oren Segal | AI Platform Engineer',
    description: 'Shipped AI agent, LLM infrastructure, and data engineering projects',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${plexMono.variable}`}>
      <body className="font-display bg-panel min-h-screen">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

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
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

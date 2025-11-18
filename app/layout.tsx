import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Oren Segal | AI & Data Science Portfolio',
  description: 'Portfolio showcasing innovative AI and data science projects by Oren Segal, including Urban Intelligence, MetroFlex, and more.',
  keywords: ['AI', 'Machine Learning', 'Data Science', 'Portfolio', 'NYC', 'Urban Analytics'],
  authors: [{ name: 'Oren Segal' }],
  openGraph: {
    title: 'Oren Segal | AI & Data Science Portfolio',
    description: 'Innovative AI and data science projects',
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

'use client'

import { useState, useEffect } from 'react'
import { ArrowDown, Sparkles, Brain, Code, ChevronRight } from 'lucide-react'

const typingTexts = [
  'Urban Analytics',
  'Predictive Models',
  'Smart Recommendations',
  'Data Visualization',
]

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentTextIndex])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-purple-900/20 to-pink-900/20 animate-gradient"></div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 animate-slide-down">
          <Sparkles className="w-4 h-4 text-primary-400" />
          <span className="text-primary-300 text-sm font-medium">
            AI & Data Science Portfolio
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
          Building Intelligent
          <span className="block mt-2 h-[1.2em]">
            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {displayedText}
            </span>
            <span className="animate-pulse text-primary-400">|</span>
          </span>
          <span className="block mt-2">Systems</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
          Hi, I'm <span className="text-white font-semibold">Oren Segal</span> —
          I create data-driven solutions that make cities smarter and experiences more personalized.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-12">
          <div className="group flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-primary-500/50 transition-all">
            <div className="text-3xl sm:text-4xl font-bold text-primary-400 mb-1 group-hover:scale-110 transition-transform">8</div>
            <div className="text-xs sm:text-sm text-gray-400">Projects</div>
          </div>
          <div className="group flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/50 transition-all">
            <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-1 group-hover:scale-110 transition-transform">200+</div>
            <div className="text-xs sm:text-sm text-gray-400">ML Features</div>
          </div>
          <div className="group flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-green-500/50 transition-all">
            <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-1 group-hover:scale-110 transition-transform">$0</div>
            <div className="text-xs sm:text-sm text-gray-400">Stack Cost</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="group px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-primary-500/50 flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            View Projects
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all hover:scale-105 border border-white/10 flex items-center gap-2"
          >
            <Code className="w-5 h-5" />
            About Me
          </a>
        </div>

        {/* Scroll indicator */}
        <a href="#about" className="inline-flex flex-col items-center text-gray-400 hover:text-primary-400 transition-colors">
          <span className="text-xs mb-2">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  )
}

'use client'

import { ArrowDown, Sparkles, Brain, Code } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-purple-900/20 to-pink-900/20 animate-gradient"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

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
          <span className="block bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Urban & Personal
          </span>
          <span className="block">Systems with AI</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
          Hi, I'm <span className="text-white font-semibold">Oren Segal</span> —
          I create data-driven solutions that make cities smarter and experiences more personalized.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary-400 mb-2">8</div>
            <div className="text-sm text-gray-400">Projects</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">4</div>
            <div className="text-sm text-gray-400">ML Models</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-pink-400 mb-2">100%</div>
            <div className="text-sm text-gray-400">Free Stack</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="group px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-primary-500/50 flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all hover:scale-105 border border-white/10 flex items-center gap-2"
          >
            <Code className="w-5 h-5" />
            Get in Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </section>
  )
}

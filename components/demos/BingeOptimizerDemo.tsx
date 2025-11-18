'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Tv, Users, Moon, Zap } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

// Viewing contexts
const viewingContexts = [
  {
    id: 'solo_chill',
    name: 'Solo Chill',
    icon: '🛋️',
    color: 'from-blue-500 to-cyan-500',
    description: 'Relaxing alone after a long day',
    recommendations: [
      { title: 'The Office', match: 95, bingeScore: 88, type: 'Comedy' },
      { title: 'Planet Earth III', match: 92, bingeScore: 75, type: 'Documentary' },
      { title: 'Brooklyn Nine-Nine', match: 89, bingeScore: 90, type: 'Comedy' },
    ],
    weights: { comfort: 0.4, length: 0.2, intensity: -0.3, familiarity: 0.3 }
  },
  {
    id: 'social',
    name: 'Social Gathering',
    icon: '🎉',
    color: 'from-purple-500 to-pink-500',
    description: 'Watching with friends or family',
    recommendations: [
      { title: 'Squid Game', match: 94, bingeScore: 95, type: 'Thriller' },
      { title: 'The Bear', match: 91, bingeScore: 82, type: 'Drama' },
      { title: 'Stranger Things', match: 88, bingeScore: 92, type: 'Sci-Fi' },
    ],
    weights: { groupAppeal: 0.5, discussion: 0.3, intensity: 0.2, length: -0.1 }
  },
  {
    id: 'focus',
    name: 'Deep Focus',
    icon: '🎯',
    color: 'from-orange-500 to-red-500',
    description: 'Ready for complex, engaging content',
    recommendations: [
      { title: 'True Detective', match: 96, bingeScore: 78, type: 'Crime Drama' },
      { title: 'Severance', match: 93, bingeScore: 85, type: 'Thriller' },
      { title: 'Dark', match: 90, bingeScore: 80, type: 'Sci-Fi' },
    ],
    weights: { complexity: 0.5, quality: 0.3, intensity: 0.2, length: 0.1 }
  },
  {
    id: 'background',
    name: 'Background Viewing',
    icon: '💼',
    color: 'from-green-500 to-emerald-500',
    description: 'Something on while multitasking',
    recommendations: [
      { title: 'Great British Bake Off', match: 93, bingeScore: 70, type: 'Reality' },
      { title: 'Friends', match: 90, bingeScore: 85, type: 'Sitcom' },
      { title: 'Queer Eye', match: 87, bingeScore: 72, type: 'Reality' },
    ],
    weights: { rewatchability: 0.4, simplicity: 0.3, familiarity: 0.2, length: 0.1 }
  },
]

export default function BingeOptimizerDemo() {
  const [selectedContext, setSelectedContext] = useState(viewingContexts[0])

  // Prepare chart data
  const chartData = selectedContext.recommendations.map(rec => ({
    name: rec.title.length > 12 ? rec.title.substring(0, 12) + '...' : rec.title,
    match: rec.match,
    binge: rec.bingeScore,
  }))

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">📺</div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Binge Optimizer
              </h1>
              <p className="text-xl text-primary-400">
                Context-Aware Streaming Recommendations
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Detects your viewing context (solo chill, social gathering, deep focus) and
            recommends content optimized for that specific moment, not just your general taste.
          </p>
        </div>

        {/* Demo notice */}
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-300 text-sm">
            <strong>Interactive Demo:</strong> Select a viewing context to see personalized recommendations.
          </p>
        </div>

        {/* Context selector */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4">What's Your Viewing Moment?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {viewingContexts.map((context) => (
              <button
                key={context.id}
                onClick={() => setSelectedContext(context)}
                className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                  selectedContext.id === context.id
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                }`}
              >
                <div className="text-3xl mb-2">{context.icon}</div>
                <div className="text-white font-semibold mb-1">{context.name}</div>
                <div className="text-xs text-gray-400">{context.description}</div>
                {selectedContext.id === context.id && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Recommendation list */}
          <div className={`bg-gradient-to-br ${selectedContext.color} bg-opacity-10 backdrop-blur-sm border border-slate-700 rounded-xl p-6`}>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Tv className="w-5 h-5" />
              Optimized Recommendations
            </h3>
            <div className="space-y-4">
              {selectedContext.recommendations.map((rec, index) => (
                <div
                  key={rec.title}
                  className="bg-slate-900/50 rounded-lg p-4 border border-slate-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">#{index + 1}</span>
                        <span className="text-white font-medium">{rec.title}</span>
                      </div>
                      <span className="text-xs text-gray-400">{rec.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{rec.match}%</div>
                      <div className="text-xs text-gray-500">match</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Binge Score:</span>
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${rec.bingeScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white">{rec.bingeScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Match chart */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Match vs Binge Score</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#ffffff60" fontSize={11} />
                <YAxis stroke="#ffffff60" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="match" fill="#10b981" name="Match %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="binge" fill="#f43f5e" name="Binge Score" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span className="text-xs text-gray-300">Match %</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-rose-500"></div>
                <span className="text-xs text-gray-300">Binge Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization weights */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-12">
          <h3 className="text-lg font-bold text-white mb-4">Context Optimization Weights</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(selectedContext.weights).map(([key, value]) => (
              <div key={key} className="bg-slate-900/50 rounded-lg p-4">
                <div className="text-xs text-gray-400 capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className={`text-xl font-bold ${value > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {value > 0 ? '+' : ''}{(value * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features and Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">Viewing context detection (time, device, patterns)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">Binge-worthiness scoring based on narrative structure</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">Fatigue-aware session management</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'Collaborative Filtering', 'Random Forest'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-slate-700/50 text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-300 text-sm">
                <strong>Impact:</strong> Reduces "what to watch" decision time by 70%
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Want Context-Aware Recommendations?
          </h3>
          <p className="text-gray-300 mb-6">
            Let's discuss how this approach could enhance your streaming platform
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-red-500/50"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}

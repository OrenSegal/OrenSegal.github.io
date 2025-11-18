'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, TrendingUp, Zap, Coffee, Plane } from 'lucide-react'

// Mock trip contexts
const tripContexts = [
  {
    id: 'morning_commute',
    name: 'Morning Commute',
    icon: '☕',
    color: 'from-blue-500 to-cyan-500',
    weights: { time: 0.5, reliability: 0.3, crowding: -0.1, transfers: -0.1 },
    description: 'Optimized for speed and reliability during rush hour'
  },
  {
    id: 'leisure',
    name: 'Leisure Trip',
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
    weights: { time: 0.2, comfort: 0.4, scenic_value: 0.3, cost: 0.1 },
    description: 'Prioritizes comfort and experience over speed'
  },
  {
    id: 'tourist',
    name: 'Tourist Mode',
    icon: '📸',
    color: 'from-yellow-500 to-orange-500',
    weights: { scenic_value: 0.5, ease_of_use: 0.3, time: 0.2 },
    description: 'Shows landmarks and simplifies navigation'
  },
  {
    id: 'emergency',
    name: 'Emergency',
    icon: '🚨',
    color: 'from-red-500 to-pink-500',
    weights: { time: 1.0 },
    description: 'Fastest route possible, no compromise'
  },
]

export default function MetroFlexDemo() {
  const [selectedContext, setSelectedContext] = useState(tripContexts[0])

  // Mock route data
  const routes = {
    morning_commute: {
      totalTime: 32,
      transfers: 1,
      crowding: 0.75,
      reliability: 0.88,
      route: 'L Train → G Train'
    },
    leisure: {
      totalTime: 45,
      transfers: 2,
      crowding: 0.35,
      reliability: 0.92,
      route: 'Walk → F Train → Walk'
    },
    tourist: {
      totalTime: 52,
      transfers: 3,
      crowding: 0.45,
      reliability: 0.85,
      route: 'Walk → Brooklyn Bridge → Subway'
    },
    emergency: {
      totalTime: 28,
      transfers: 0,
      crowding: 0.85,
      reliability: 0.75,
      route: 'Express A Train (direct)'
    },
  }

  const currentRoute = routes[selectedContext.id as keyof typeof routes]

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
            <div className="text-5xl">🚇</div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                MetroFlex
              </h1>
              <p className="text-xl text-primary-400">
                Context-Aware Dynamic Transit Routing
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Applies Binge Optimizer's context detection methodology to NYC transit.
            Automatically detects trip purpose and optimizes routes for your actual needs.
          </p>
        </div>

        {/* Demo notice */}
        <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-300 text-sm">
            <strong>Demo Mode:</strong> This is a simplified visualization. Full implementation includes
            real-time MTA data, interactive maps with Leaflet, and ML-based context detection.
          </p>
        </div>

        {/* Context selector */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Select Your Trip Context</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tripContexts.map((context) => (
              <button
                key={context.id}
                onClick={() => setSelectedContext(context)}
                className={`relative p-6 rounded-xl border-2 transition-all ${
                  selectedContext.id === context.id
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                }`}
              >
                <div className="text-4xl mb-3">{context.icon}</div>
                <div className="text-white font-semibold mb-2">{context.name}</div>
                <div className="text-xs text-gray-400">{context.description}</div>
                {selectedContext.id === context.id && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-primary-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Route results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Route visualization */}
          <div className="lg:col-span-2">
            <div className={`bg-gradient-to-br ${selectedContext.color} bg-opacity-10 backdrop-blur-sm border border-slate-700 rounded-xl p-8`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">{selectedContext.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Optimized Route</h3>
                  <p className="text-gray-300 text-sm">{selectedContext.description}</p>
                </div>
              </div>

              {/* Route path */}
              <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-xl font-mono text-primary-400 mb-2">
                    {currentRoute.route}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{currentRoute.totalTime} minutes</span>
                    <span className="mx-2">•</span>
                    <span>{currentRoute.transfers} {currentRoute.transfers === 1 ? 'transfer' : 'transfers'}</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Travel Time</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{currentRoute.totalTime} min</div>
                </div>

                <div className="bg-slate-900/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-gray-400">Crowding</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{(currentRoute.crowding * 100).toFixed(0)}%</div>
                </div>

                <div className="bg-slate-900/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">Reliability</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{(currentRoute.reliability * 100).toFixed(0)}%</div>
                </div>

                <div className="bg-slate-900/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-400">Transfers</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{currentRoute.transfers}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Optimization weights */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Optimization Weights</h3>
            <div className="space-y-4">
              {Object.entries(selectedContext.weights).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-300 capitalize">{key.replace('_', ' ')}</span>
                    <span className="text-white font-medium">
                      {value > 0 ? '+' : ''}{(value * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        value > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
                      }`}
                      style={{ width: `${Math.abs(value) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
              <p className="text-primary-300 text-sm">
                Weights are automatically detected based on time of day, location, and user patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">Trip context classification (8 contexts: commute, leisure, tourist, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">Real-time crowding prediction and dynamic rerouting</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">GPT-4 explainable route recommendations</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'React', 'React-Leaflet', 'MTA GTFS-RT', 'Random Forest', 'A* Pathfinding'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-slate-700/50 text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-300 text-sm">
                <strong>100% Free APIs:</strong> MTA GTFS-RT + OpenWeather + OSM Nominatim
              </p>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Interactive Route Visualization</h3>
          <div className="bg-slate-900/50 rounded-xl p-12 border border-slate-700 flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-gray-300 text-lg mb-2">
                Full implementation includes:
              </p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Interactive Leaflet map with NYC transit system</li>
                <li>• Route polylines colored by mode (subway, bus, walk)</li>
                <li>• Real-time crowding heatmap at stations</li>
                <li>• Alternative routes comparison</li>
                <li>• OpenStreetMap tiles (100% free, no API key)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Interested in MetroFlex?
          </h3>
          <p className="text-gray-300 mb-6">
            Let's discuss how context-aware routing could work for your transit system
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-primary-500/50"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}

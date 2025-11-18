'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, AlertCircle, Map, BarChart3, Activity } from 'lucide-react'

// Mock data for demo
const mockNeighborhoods = [
  {
    id: 'williamsburg',
    name: 'Williamsburg',
    currentMood: 0.72,
    vitalityScore: 0.85,
    priceChange18mo: 12.5,
    displacementRisk: 0.65,
    transformationType: 'rapid gentrification',
    confidence: 0.88
  },
  {
    id: 'bushwick',
    name: 'Bushwick',
    currentMood: 0.68,
    vitalityScore: 0.78,
    priceChange18mo: 18.3,
    displacementRisk: 0.72,
    transformationType: 'emerging creative hub',
    confidence: 0.82
  },
  {
    id: 'bedstuy',
    name: 'Bedford-Stuyvesant',
    currentMood: 0.65,
    vitalityScore: 0.71,
    priceChange18mo: 15.7,
    displacementRisk: 0.68,
    transformationType: 'steady appreciation',
    confidence: 0.79
  },
]

export default function UrbanIntelligenceDemo() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(mockNeighborhoods[0])

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
            <div className="text-5xl">🏙️</div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Urban Intelligence
              </h1>
              <p className="text-xl text-primary-400">
                Real-time Sentiment + 18-Month Predictive Analytics
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Combining CityPulse real-time sentiment analysis with NextHood predictive analytics
            to forecast neighborhood transformation 18-24 months ahead using 200+ engineered features.
          </p>
        </div>

        {/* Demo notice */}
        <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-300 text-sm">
            <strong>Demo Mode:</strong> This is a simplified visualization. Full implementation includes
            real-time data integration, interactive maps with Leaflet, and ML predictions.
          </p>
        </div>

        {/* Main demo interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Neighborhood selector */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-primary-400" />
                Select Neighborhood
              </h3>
              <div className="space-y-2">
                {mockNeighborhoods.map((neighborhood) => (
                  <button
                    key={neighborhood.id}
                    onClick={() => setSelectedNeighborhood(neighborhood)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedNeighborhood.id === neighborhood.id
                        ? 'bg-primary-500/20 border-2 border-primary-500'
                        : 'bg-slate-700/30 border-2 border-transparent hover:border-slate-600'
                    }`}
                  >
                    <div className="text-white font-medium">{neighborhood.name}</div>
                    <div className="text-sm text-gray-400">
                      Vitality: {(neighborhood.vitalityScore * 100).toFixed(0)}%
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <div className="text-sm text-gray-400">Current Mood</div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {(selectedNeighborhood.currentMood * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500">Based on 1,247 posts</div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  <div className="text-sm text-gray-400">Vitality Score</div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {(selectedNeighborhood.vitalityScore * 100).toFixed(0)}
                </div>
                <div className="text-xs text-gray-500">200+ features analyzed</div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <div className="text-sm text-gray-400">18-Month Forecast</div>
                </div>
                <div className="text-3xl font-bold text-green-400 mb-1">
                  +{selectedNeighborhood.priceChange18mo.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">Price appreciation</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-400" />
                  <div className="text-sm text-gray-400">Displacement Risk</div>
                </div>
                <div className="text-3xl font-bold text-orange-400 mb-1">
                  {(selectedNeighborhood.displacementRisk * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500">
                  {selectedNeighborhood.displacementRisk > 0.7 ? 'HIGH' : 'MEDIUM'}
                </div>
              </div>
            </div>

            {/* Prediction */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">Transformation Prediction</h3>
              <div className="text-2xl font-semibold text-purple-300 capitalize mb-3">
                {selectedNeighborhood.transformationType}
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Confidence</span>
                  <span className="text-white font-medium">
                    {(selectedNeighborhood.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${selectedNeighborhood.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Based on 200+ signals including real-time sentiment, economic activity,
                infrastructure development, and cultural vibrancy indicators.
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
                <span className="text-gray-300">Multi-source data fusion (Twitter, Reddit, Yelp, real estate)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">200+ engineered features combining sentiment + economic signals</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">SHAP explainability + GPT-4 natural language explanations</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'Next.js', 'React-Leaflet', 'PostgreSQL', 'Redis', 'SHAP', 'scikit-learn'].map((tech) => (
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
                <strong>100% Free Stack:</strong> React-Leaflet + OpenStreetMap (no API keys needed)
              </p>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Interactive Map Visualization</h3>
          <div className="bg-slate-900/50 rounded-xl p-12 border border-slate-700 flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-gray-300 text-lg mb-2">
                Full implementation includes:
              </p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Interactive Leaflet map with NYC neighborhoods</li>
                <li>• Real-time mood heatmap with CircleMarkers</li>
                <li>• Neighborhood boundary polygons colored by vitality</li>
                <li>• Click neighborhoods for detailed analytics</li>
                <li>• OpenStreetMap tiles (100% free, no API key)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Interested in Urban Intelligence?
          </h3>
          <p className="text-gray-300 mb-6">
            Let's discuss how predictive urban analytics could work for your city or use case
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

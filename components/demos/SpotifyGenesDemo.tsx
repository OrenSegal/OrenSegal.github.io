'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Music, Dna, Sparkles } from 'lucide-react'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

// Mock user musical DNA profiles
const userProfiles = [
  {
    id: 'energetic',
    name: 'Energetic Explorer',
    description: 'High energy, danceable tracks with strong beats',
    audioFeatures: [
      { feature: 'Energy', value: 85 },
      { feature: 'Danceability', value: 78 },
      { feature: 'Valence', value: 72 },
      { feature: 'Acousticness', value: 25 },
      { feature: 'Instrumentalness', value: 15 },
    ],
    topGenres: [
      { name: 'Electronic', value: 35 },
      { name: 'Pop', value: 28 },
      { name: 'Hip Hop', value: 22 },
      { name: 'Dance', value: 15 },
    ],
    evolution: [
      { month: 'Jan', energy: 75, valence: 65 },
      { month: 'Feb', energy: 78, valence: 68 },
      { month: 'Mar', energy: 82, valence: 70 },
      { month: 'Apr', energy: 80, valence: 72 },
      { month: 'May', energy: 85, valence: 75 },
      { month: 'Jun', energy: 85, valence: 72 },
    ]
  },
  {
    id: 'chill',
    name: 'Chill Connoisseur',
    description: 'Relaxed, acoustic-driven music with emotional depth',
    audioFeatures: [
      { feature: 'Energy', value: 45 },
      { feature: 'Danceability', value: 52 },
      { feature: 'Valence', value: 58 },
      { feature: 'Acousticness', value: 78 },
      { feature: 'Instrumentalness', value: 42 },
    ],
    topGenres: [
      { name: 'Indie', value: 32 },
      { name: 'Folk', value: 28 },
      { name: 'Acoustic', value: 25 },
      { name: 'Jazz', value: 15 },
    ],
    evolution: [
      { month: 'Jan', energy: 50, valence: 55 },
      { month: 'Feb', energy: 48, valence: 58 },
      { month: 'Mar', energy: 45, valence: 56 },
      { month: 'Apr', energy: 42, valence: 60 },
      { month: 'May', energy: 45, valence: 58 },
      { month: 'Jun', energy: 45, valence: 58 },
    ]
  },
  {
    id: 'eclectic',
    name: 'Eclectic Audiophile',
    description: 'Diverse taste spanning multiple genres and moods',
    audioFeatures: [
      { feature: 'Energy', value: 65 },
      { feature: 'Danceability', value: 62 },
      { feature: 'Valence', value: 60 },
      { feature: 'Acousticness', value: 55 },
      { feature: 'Instrumentalness', value: 48 },
    ],
    topGenres: [
      { name: 'Rock', value: 25 },
      { name: 'Electronic', value: 22 },
      { name: 'Classical', value: 18 },
      { name: 'World', value: 18 },
      { name: 'Jazz', value: 17 },
    ],
    evolution: [
      { month: 'Jan', energy: 60, valence: 55 },
      { month: 'Feb', energy: 65, valence: 62 },
      { month: 'Mar', energy: 70, valence: 58 },
      { month: 'Apr', energy: 62, valence: 65 },
      { month: 'May', energy: 68, valence: 60 },
      { month: 'Jun', energy: 65, valence: 60 },
    ]
  },
]

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

export default function SpotifyGenesDemo() {
  const [selectedProfile, setSelectedProfile] = useState(userProfiles[0])

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
            <div className="text-5xl">🧬</div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Spotify Genes
              </h1>
              <p className="text-xl text-primary-400">
                Discover Your Musical DNA
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Analyzes your Spotify listening history to identify your "musical DNA" -
            the core audio features that define your taste across genres, moods, and eras.
          </p>
        </div>

        {/* Demo notice */}
        <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-300 text-sm">
            <strong>Interactive Demo:</strong> Select a musical profile to see the DNA analysis and visualizations.
          </p>
        </div>

        {/* Profile selector */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Select Your Musical Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {userProfiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile)}
                className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                  selectedProfile.id === profile.id
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                }`}
              >
                <div className="text-2xl mb-2">
                  {profile.id === 'energetic' ? '⚡' : profile.id === 'chill' ? '🌙' : '🎭'}
                </div>
                <div className="text-white font-semibold mb-1">{profile.name}</div>
                <div className="text-xs text-gray-400">{profile.description}</div>
                {selectedProfile.id === profile.id && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Audio Features Radar */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Dna className="w-5 h-5 text-green-400" />
              Audio DNA Profile
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={selectedProfile.audioFeatures}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="feature" stroke="#ffffff80" fontSize={12} />
                <Radar
                  dataKey="value"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Genre Distribution */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-400" />
              Genre Affinity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={selectedProfile.topGenres}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {selectedProfile.topGenres.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {selectedProfile.topGenres.map((genre, index) => (
                <div key={genre.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs text-gray-300">{genre.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Taste Evolution */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-12">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Taste Evolution Over Time
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={selectedProfile.evolution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="month" stroke="#ffffff60" fontSize={12} />
              <YAxis stroke="#ffffff60" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="energy" fill="#8b5cf6" name="Energy" radius={[4, 4, 0, 0]} />
              <Bar dataKey="valence" fill="#10b981" name="Valence" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-500"></div>
              <span className="text-xs text-gray-300">Energy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              <span className="text-xs text-gray-300">Valence (Happiness)</span>
            </div>
          </div>
        </div>

        {/* Features and Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">Audio feature extraction (danceability, energy, valence)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">Dimensionality reduction (PCA/t-SNE) for core dimensions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">Personalized playlist generation based on genetic profile</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Spotify API', 'scikit-learn', 'Next.js', 'Recharts', 'PCA', 't-SNE'].map((tech) => (
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
                <strong>Impact:</strong> Increases music exploration by 40% through taste-aligned discovery
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Want to Discover Your Musical DNA?
          </h3>
          <p className="text-gray-300 mb-6">
            Let's discuss how personalized music analysis could enhance your platform
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-green-500/50"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, AlertTriangle, Activity, Zap } from 'lucide-react'
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

// Mock fitness data
const fitnessProfiles = [
  {
    id: 'strength',
    name: 'Strength Training',
    icon: '🏋️',
    currentPhase: 'Progressive Overload',
    plateauRisk: 0.15,
    recoveryScore: 85,
    nextWorkout: 'Upper Body Push',
    adaptation: '+12% since month start',
    performanceHistory: [
      { week: 'W1', performance: 72, predicted: 70 },
      { week: 'W2', performance: 75, predicted: 73 },
      { week: 'W3', performance: 78, predicted: 76 },
      { week: 'W4', performance: 82, predicted: 80 },
      { week: 'W5', performance: 85, predicted: 83 },
      { week: 'W6', performance: 88, predicted: 86 },
    ],
    muscleRecovery: [
      { muscle: 'Chest', recovery: 95 },
      { muscle: 'Back', recovery: 88 },
      { muscle: 'Shoulders', recovery: 92 },
      { muscle: 'Legs', recovery: 75 },
      { muscle: 'Arms', recovery: 98 },
    ]
  },
  {
    id: 'endurance',
    name: 'Endurance Running',
    icon: '🏃',
    currentPhase: 'Base Building',
    plateauRisk: 0.35,
    recoveryScore: 72,
    nextWorkout: 'Easy 5K Recovery',
    adaptation: '+8% VO2 improvement',
    performanceHistory: [
      { week: 'W1', performance: 65, predicted: 65 },
      { week: 'W2', performance: 68, predicted: 67 },
      { week: 'W3', performance: 70, predicted: 69 },
      { week: 'W4', performance: 71, predicted: 71 },
      { week: 'W5', performance: 72, predicted: 72 },
      { week: 'W6', performance: 73, predicted: 74 },
    ],
    muscleRecovery: [
      { muscle: 'Quads', recovery: 68 },
      { muscle: 'Hamstrings', recovery: 72 },
      { muscle: 'Calves', recovery: 65 },
      { muscle: 'Core', recovery: 88 },
      { muscle: 'Hip Flexors', recovery: 70 },
    ]
  },
  {
    id: 'hybrid',
    name: 'Hybrid Athlete',
    icon: '🔄',
    currentPhase: 'Periodization',
    plateauRisk: 0.22,
    recoveryScore: 78,
    nextWorkout: 'HIIT + Core',
    adaptation: 'Balanced progress',
    performanceHistory: [
      { week: 'W1', performance: 68, predicted: 68 },
      { week: 'W2', performance: 72, predicted: 70 },
      { week: 'W3', performance: 75, predicted: 73 },
      { week: 'W4', performance: 77, predicted: 76 },
      { week: 'W5', performance: 80, predicted: 78 },
      { week: 'W6', performance: 82, predicted: 81 },
    ],
    muscleRecovery: [
      { muscle: 'Upper Body', recovery: 85 },
      { muscle: 'Lower Body', recovery: 78 },
      { muscle: 'Core', recovery: 90 },
      { muscle: 'Cardio System', recovery: 72 },
      { muscle: 'Flexibility', recovery: 82 },
    ]
  },
]

export default function TrainBrainDemo() {
  const [selectedProfile, setSelectedProfile] = useState(fitnessProfiles[0])

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
            <div className="text-5xl">💪</div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                TrainBrain
              </h1>
              <p className="text-xl text-primary-400">
                Adaptive Fitness Intelligence
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Learns from your workout performance to automatically adjust training plans,
            preventing plateaus and optimizing progress based on recovery and adaptation patterns.
          </p>
        </div>

        {/* Demo notice */}
        <div className="mb-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <p className="text-indigo-300 text-sm">
            <strong>Interactive Demo:</strong> Select a training type to see adaptive recommendations.
          </p>
        </div>

        {/* Profile selector */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Training Type</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {fitnessProfiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile)}
                className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                  selectedProfile.id === profile.id
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                }`}
              >
                <div className="text-3xl mb-2">{profile.icon}</div>
                <div className="text-white font-semibold mb-1">{profile.name}</div>
                <div className="text-xs text-gray-400">{profile.currentPhase}</div>
                {selectedProfile.id === profile.id && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-indigo-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-green-400" />
              <div className="text-sm text-gray-400">Recovery</div>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">
              {selectedProfile.recoveryScore}%
            </div>
            <div className="text-xs text-gray-500">Ready to train</div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <div className="text-sm text-gray-400">Plateau Risk</div>
            </div>
            <div className={`text-3xl font-bold mb-1 ${
              selectedProfile.plateauRisk > 0.3 ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {(selectedProfile.plateauRisk * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-500">
              {selectedProfile.plateauRisk > 0.3 ? 'Adjustment needed' : 'On track'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              <div className="text-sm text-gray-400">Next Workout</div>
            </div>
            <div className="text-lg font-bold text-indigo-400 mb-1">
              {selectedProfile.nextWorkout}
            </div>
            <div className="text-xs text-gray-500">AI optimized</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <div className="text-sm text-gray-400">Adaptation</div>
            </div>
            <div className="text-lg font-bold text-purple-400 mb-1">
              {selectedProfile.adaptation}
            </div>
            <div className="text-xs text-gray-500">Progress rate</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Performance trend */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={selectedProfile.performanceHistory}>
                <defs>
                  <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="week" stroke="#ffffff60" fontSize={12} />
                <YAxis stroke="#ffffff60" fontSize={12} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="performance"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#performanceGradient)"
                  name="Actual"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#10b981"
                  strokeDasharray="5 5"
                  name="Predicted"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-indigo-500"></div>
                <span className="text-xs text-gray-300">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 border-t-2 border-dashed border-green-500"></div>
                <span className="text-xs text-gray-300">Predicted</span>
              </div>
            </div>
          </div>

          {/* Recovery status */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Recovery Status</h3>
            <div className="space-y-4">
              {selectedProfile.muscleRecovery.map((muscle) => (
                <div key={muscle.muscle}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-300">{muscle.muscle}</span>
                    <span className={`font-medium ${
                      muscle.recovery >= 85 ? 'text-green-400' :
                      muscle.recovery >= 70 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {muscle.recovery}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        muscle.recovery >= 85 ? 'bg-green-500' :
                        muscle.recovery >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${muscle.recovery}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features and Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">Performance trend analysis and plateau detection</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">Adaptive workout difficulty adjustment</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                </div>
                <span className="text-gray-300">Recovery prediction and injury risk assessment</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'Next.js', 'Time Series Analysis', 'Prophet', 'PostgreSQL'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-slate-700/50 text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <p className="text-indigo-300 text-sm">
                <strong>Impact:</strong> Reduces training plateaus by 45%
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Want Adaptive Fitness Intelligence?
          </h3>
          <p className="text-gray-300 mb-6">
            Let's discuss how AI-powered training adaptation could enhance your fitness platform
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-indigo-500/50"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}

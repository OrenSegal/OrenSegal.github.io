'use client'

import { Code2, Database, Brain, LineChart, Globe, Cpu } from 'lucide-react'

const skills = [
  {
    category: 'Machine Learning',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    items: ['scikit-learn', 'XGBoost', 'SHAP', 'Prophet', 'NLP/Transformers']
  },
  {
    category: 'Data Engineering',
    icon: Database,
    color: 'from-blue-500 to-cyan-500',
    items: ['PostgreSQL', 'Redis', 'PostGIS', 'ETL Pipelines', 'Data Modeling']
  },
  {
    category: 'Backend',
    icon: Cpu,
    color: 'from-green-500 to-emerald-500',
    items: ['Python', 'FastAPI', 'GraphQL', 'WebSockets', 'REST APIs']
  },
  {
    category: 'Frontend',
    icon: Code2,
    color: 'from-orange-500 to-red-500',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  {
    category: 'Visualization',
    icon: LineChart,
    color: 'from-yellow-500 to-orange-500',
    items: ['D3.js', 'Recharts', 'Leaflet', 'Mapbox', 'Plotly']
  },
  {
    category: 'Cloud & DevOps',
    icon: Globe,
    color: 'from-indigo-500 to-purple-500',
    items: ['Vercel', 'Railway', 'Docker', 'CI/CD', 'Supabase']
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <Brain className="w-4 h-4 text-primary-400" />
            <span className="text-primary-300 text-sm font-medium">About Me</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            The Mind Behind the Code
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Turning complex data into actionable intelligence
          </p>
        </div>

        {/* Bio section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">
              Hi, I'm Oren Segal
            </h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I'm an AI & Data Science professional passionate about building systems that make
                real-world impact. My work focuses on <span className="text-primary-400 font-medium">urban analytics</span>,
                <span className="text-primary-400 font-medium"> personalization engines</span>, and
                <span className="text-primary-400 font-medium"> intelligent recommendation systems</span>.
              </p>
              <p>
                I believe in the power of data to transform how we experience cities, consume content,
                and make decisions. Every project I build combines rigorous machine learning with
                intuitive user experiences.
              </p>
              <p>
                Currently exploring the intersection of <span className="text-white font-medium">real-time sentiment analysis</span> and
                <span className="text-white font-medium"> predictive analytics</span> to help people and
                organizations make better decisions.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="text-2xl font-bold text-primary-400">8+</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="text-2xl font-bold text-purple-400">ML</div>
                <div className="text-xs text-gray-400">Focused</div>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="text-2xl font-bold text-green-400">NYC</div>
                <div className="text-xs text-gray-400">Based</div>
              </div>
            </div>
          </div>

          {/* Approach */}
          <div className="bg-gradient-to-br from-primary-500/10 to-purple-500/10 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">My Approach</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Problem-First</h4>
                  <p className="text-gray-400 text-sm">Start with real user problems, not cool technology</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🔬</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Data-Driven</h4>
                  <p className="text-gray-400 text-sm">Let the data guide decisions, not assumptions</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎨</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">User-Centric</h4>
                  <p className="text-gray-400 text-sm">Complex ML should feel simple to users</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Ship Fast</h4>
                  <p className="text-gray-400 text-sm">Iterate quickly, learn from real usage</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div>
          <h3 className="text-2xl font-bold text-white text-center mb-8">Technical Skills</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => {
              const Icon = skill.icon
              return (
                <div
                  key={skill.category}
                  className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-primary-500/50 transition-all hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`}></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${skill.color} bg-opacity-20 rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-white font-semibold">{skill.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-1 rounded-md bg-slate-700/50 text-xs text-gray-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { Mail, Github, Linkedin, Send } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <Send className="w-4 h-4 text-primary-400" />
            <span className="text-primary-300 text-sm font-medium">Get in Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Got a Problem Worth Solving?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            I'm always hunting for interesting challenges — the weirder the data, the better.
            Let's talk.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <a
            href="mailto:contact@example.com"
            className="group p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl hover:border-primary-500 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
              <Mail className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <p className="text-gray-400 text-sm">contact@example.com</p>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl hover:border-primary-500 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
              <Github className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">GitHub</h3>
            <p className="text-gray-400 text-sm">View my code</p>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl hover:border-primary-500 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
              <Linkedin className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
            <p className="text-gray-400 text-sm">Connect professionally</p>
          </a>
        </div>

        {/* CTA */}
        <div className="text-center p-8 bg-gradient-to-br from-primary-500/10 to-purple-500/10 backdrop-blur-sm border border-primary-500/20 rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ideas welcome. Vague ideas too.
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Sometimes the best projects start with "I have this data but don't know what to do with it"
            or "I keep doing this manually and it's driving me crazy."
            Those are my favorite conversations.
          </p>
          <a
            href="mailto:contact@example.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-primary-500/50"
          >
            <Mail className="w-5 h-5" />
            Let's figure it out
          </a>
        </div>
      </div>
    </section>
  )
}

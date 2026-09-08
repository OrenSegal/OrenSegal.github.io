'use client'

import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/OrenSegal', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/oren-segal', icon: Linkedin },
    { name: 'Email', href: 'mailto:orenssegal@gmail.com', icon: Mail },
  ]

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Oren Segal</h3>
            <p className="text-gray-400 text-sm">
              AI platform engineer building the infrastructure agents run on:
              cost-safe LLM gateways, evidence-backed research agents, and
              CI for prompt-driven systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#projects" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Oren Segal. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

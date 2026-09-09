import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/OrenSegal', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/oren-segal', icon: Linkedin },
    { name: 'Email', href: 'mailto:orenssegal@gmail.com', icon: Mail },
  ]

  return (
    <footer className="border-t border-bezel bg-panel">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-display text-sm font-medium text-ink">Oren Segal</h3>
            <p className="text-sm text-ink-dim">
              AI platform engineer building the infrastructure agents run on:
              cost-safe LLM gateways, evidence-backed research agents, and
              CI for prompt-driven systems.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-medium text-ink">Index</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#projects" className="text-sm text-ink-dim transition-colors hover:text-ink">
                  Projects
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-sm text-ink-dim transition-colors hover:text-ink">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-medium text-ink">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-dim transition-colors hover:text-ink"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-bezel pt-8 text-center">
          <p className="font-mono text-xs text-ink-dim">© {currentYear} Oren Segal</p>
        </div>
      </div>
    </footer>
  )
}

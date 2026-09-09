import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/OrenSegal', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/oren-segal', icon: Linkedin },
    { name: 'Email', href: 'mailto:orenssegal@gmail.com', icon: Mail },
  ]

  return (
    <footer className="border-t border-line px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-faint">© {currentYear} Oren Segal</p>
        <div className="flex gap-5">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-faint transition-colors hover:text-ink"
                aria-label={link.name}
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

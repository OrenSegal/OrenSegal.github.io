import { Mail, Github, Linkedin } from 'lucide-react'

const channels = [
  { label: 'Email', value: 'orenssegal@gmail.com', href: 'mailto:orenssegal@gmail.com', icon: Mail },
  { label: 'GitHub', value: 'github.com/OrenSegal', href: 'https://github.com/OrenSegal', icon: Github, external: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/oren-segal', href: 'https://linkedin.com/in/oren-segal', icon: Linkedin, external: true },
]

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-3 text-2xl font-medium text-ink">Get in touch</h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-ink-dim">
          Have a problem worth solving, or just want to talk shop about agent
          infrastructure? Email is the fastest way to reach me.
        </p>

        <div>
          {channels.map((channel) => {
            const Icon = channel.icon
            return (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 border-b border-line py-4 first:pt-0 last:border-b-0"
              >
                <Icon className="h-4 w-4 flex-shrink-0 text-ink-faint transition-colors group-hover:text-accent" />
                <span className="text-ink transition-colors group-hover:text-accent">
                  {channel.value}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

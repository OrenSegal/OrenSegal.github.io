import { Mail, Github, Linkedin } from 'lucide-react'

const channels = [
  { label: 'Email', value: 'orenssegal@gmail.com', href: 'mailto:orenssegal@gmail.com', icon: Mail },
  { label: 'GitHub', value: 'View my code', href: 'https://github.com/OrenSegal', icon: Github, external: true },
  { label: 'LinkedIn', value: 'Connect professionally', href: 'https://linkedin.com/in/oren-segal', icon: Linkedin, external: true },
]

export default function Contact() {
  return (
    <section id="contact" className="border-t border-bezel bg-panel-face px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Radio Panel — Got a problem worth solving?
          </h2>
          <p className="mt-3 max-w-2xl text-ink-dim">
            I'm always hunting for interesting challenges — the weirder the data, the better. Let's talk.
          </p>
        </div>

        <div className="mb-12 divide-y divide-bezel border border-bezel">
          {channels.map((channel) => {
            const Icon = channel.icon
            return (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-panel"
              >
                <div className="flex items-center gap-4">
                  <Icon className="h-4 w-4 text-ink-dim transition-colors group-hover:text-ink" />
                  <div>
                    <div className="font-medium text-ink">{channel.label}</div>
                    <div className="text-sm text-ink-dim">{channel.value}</div>
                  </div>
                </div>
                <span className="h-2 w-2 rounded-full border border-bezel transition-colors group-hover:border-ink" />
              </a>
            )
          })}
        </div>

        <div className="border border-bezel bg-panel p-8 text-center">
          <h3 className="mb-3 font-display text-xl font-semibold text-ink">Ideas welcome. Vague ideas too.</h3>
          <p className="mx-auto mb-6 max-w-2xl text-ink-dim">
            Sometimes the best projects start with "I have this data but don't know what to do with it"
            or "I keep doing this manually and it's driving me crazy." Those are my favorite conversations.
          </p>
          <a
            href="mailto:orenssegal@gmail.com"
            className="inline-flex items-center gap-2 border border-signal-dim px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-signal transition-colors hover:bg-signal hover:text-panel"
          >
            <Mail className="h-4 w-4" />
            Let's figure it out
          </a>
        </div>
      </div>
    </section>
  )
}

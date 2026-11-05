import { Mail, Github, Linkedin, FileText } from 'lucide-react'

const channels = [
  { label: 'email', value: 'orenssegal@gmail.com', href: 'mailto:orenssegal@gmail.com', icon: Mail },
  { label: 'github', value: 'github.com/OrenSegal', href: 'https://github.com/OrenSegal', icon: Github, external: true },
  { label: 'linkedin', value: 'linkedin.com/in/oren-segal', href: 'https://linkedin.com/in/oren-segal', icon: Linkedin, external: true },
  { label: 'resume', value: 'one page, pdf', href: '/resume.pdf', icon: FileText },
]

export default function Contact() {
  return (
    <section id="contact" className="px-4 pb-24 pt-24 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-[16vw] font-light lowercase leading-[0.92] tracking-[-0.04em] text-ink sm:text-8xl">
          contact
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-dim">
          Email is the fastest way to reach me. Happy to talk shop about evals, gateways, or anything to do with kitchens.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4">
          {channels.map((channel) => {
            const Icon = channel.icon
            return (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                className="group flex aspect-square flex-col justify-between bg-panel-face p-4 text-ink transition-colors hover:bg-accent hover:text-panel sm:p-5 md:aspect-[3/2]"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <div>
                  <p className="text-2xl font-medium leading-tight">{channel.label}</p>
                  <p className="mt-1 break-all text-sm text-ink-dim group-hover:text-panel/80">{channel.value}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

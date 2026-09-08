# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters, hiring managers, and technical interviewers evaluating Oren Segal for AI/ML engineering roles (primary target: AI Platform Engineer, also AI Solutions Architect). They arrive from a resume/LinkedIn link or a job application, split evenly between a fast top-level skim (positioning + proof in seconds) and a deeper technical review (clicking into project repos and code).

## Product Purpose

A personal portfolio site whose job is to get Oren Segal interviews and offers, by making his real, shipped work legible and credible fast. Success is a visitor forming an accurate, positive impression within seconds and clicking through to at least one real GitHub repo.

## Positioning

Every project shown is real, shipped, open-source, with a public repo, tests, and green CI — not speculative demos or notebook prototypes. The mechanism is specific and unglamorous-by-design: cost-safe LLM gateways, evidence-backed research agents, and CI that catches fabricated AI claims before a human sees them. This is infrastructure-for-agents work, not a chatbot-wrapper portfolio.

## Operating Context

Deployed as a static export (Next.js 14 App Router, `output: 'export'`) to GitHub Pages at `OrenSegal.github.io` — no backend, no server runtime. Content (all 8 projects) is sourced from `lib/projects.ts` as the single source of truth, driving both the list views and per-project detail pages via `generateStaticParams`. Each project's "GitHub" link points to its real public repo.

## Capabilities and Constraints

- Static site only — no server, no database, no forms that submit anywhere real (contact is `mailto:`/external profile links only).
- Must build cleanly under Next.js static export (a prior real bug: any `onClick`/event handler in a Server Component without `'use client'` silently breaks the entire static export).
- 8 real projects currently listed, categorized as `ai-agents`, `ai-infra`, `data-engineering`, `dev-tools`.
- `react/no-unescaped-entities` ESLint errors are currently silenced via `ignoreDuringBuilds: true` in `next.config.js` — open TODO, not yet fixed.

## Brand Commitments

- Name: Oren Segal.
- Target title/framing: "AI Platform Engineer" (sourced from career-ops `config/profile.yml` `target_roles.primary`), not "AI & Data Science."
- Visual identity is explicitly **open for full replacement** — the current dark/purple-gradient/glassmorphism look was AI-template-generated and should be treated as anti-reference only, not preserved.

## Evidence on Hand

Real shipped projects, sourced from `lib/projects.ts` (each has a real public GitHub repo as `demoUrl`):
- `signal-scout` — evidence-backed GTM research agent
- `first-to-first-sale` — prospect report → outreach/briefs/pitches
- `llm-gateway-kit` — Swift LLM gateway, cost enforcement
- `verify-before-ship` — fact-checking gate for AI citations
- `metropulse-nyc` — NYC subway station archetypes, serverless lakehouse
- `signal-skills` — 6-skill Claude Code family
- `architecture-lint` — module boundary linter with ratchet baseline
- `litmus` — red/green CI for prompt-ware

No testimonials, press, or case-study metrics exist and none should be invented. Contact: `orenssegal@gmail.com`, `github.com/OrenSegal`, `linkedin.com/in/oren-segal`.

## Product Principles

1. Prove, don't claim — every assertion of quality should be backed by a real repo, test, or CI badge the visitor can click into.
2. Fast skim, real depth — the top of the page must land the positioning in seconds; project detail pages must reward someone who actually digs in.
3. No template tells — avoid the visual signature of AI-generated SaaS templates (violet/cyan gradients on slate-950, glassmorphism, floating blur orbs, gradient text, bounce easing, generic "Sparkles" badges).
4. Infrastructure-for-agents identity — the visual and verbal tone should read as an engineer who builds serious, unglamorous plumbing, not a hype-driven AI demo.

## Accessibility & Inclusion

No specific standard mandated by the user; hold to WCAG AA as a baseline (this was also flagged in the prior technical audit pass).

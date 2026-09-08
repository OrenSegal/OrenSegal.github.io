export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  category: 'ai-agents' | 'ai-infra' | 'data-engineering' | 'dev-tools'
  image: string
  demoUrl?: string
  featured: boolean
  color: string
  icon: string
  keyFeatures: string[]
  techStack: string[]
  impact: string
}

export const projects: Project[] = [
  {
    id: 'signal-scout',
    title: 'Signal Scout',
    subtitle: 'Evidence-Backed Go-to-Market Research Agent',
    description: 'A Claude Code / OpenCode skill that turns a startup URL into an evidence-backed shortlist of first customers, market segments, and companies to pitch, using public signals only.',
    tags: ['AI Agents', 'Market Research', 'Claude Code', 'LLM'],
    category: 'ai-agents',
    image: '🎯',
    demoUrl: 'https://github.com/OrenSegal/signal-scout',
    featured: true,
    color: 'from-purple-500 to-pink-500',
    icon: '🎯',
    keyFeatures: [
      'Turns a startup URL into a ranked shortlist of prospects, segments, and companies',
      'Every claim is backed by a public, checkable source — no fabricated signals',
      'Shared, deterministic report renderer reused across the whole skill family',
      'Ships as a standalone Claude Code / OpenCode plugin',
    ],
    techStack: ['Python', 'Claude Code Skills', 'OpenCode'],
    impact: 'Cuts first-customer research from days of manual digging to one evidence-backed report.',
  },
  {
    id: 'first-to-first-sale',
    title: 'First to First Sale',
    subtitle: 'Prospect Report → Outreach, Briefs, and BD Pitches',
    description: 'Takes a signal-scout prospect report and turns it into the right next action per prospect type: outreach sequences for individuals, content/GTM briefs for segments, BD pitches for companies. Never sends anything automatically.',
    tags: ['AI Agents', 'Outreach', 'Sales', 'Claude Code'],
    category: 'ai-agents',
    image: '📨',
    demoUrl: 'https://github.com/OrenSegal/first-to-first-sale',
    featured: true,
    color: 'from-blue-500 to-cyan-500',
    icon: '📨',
    keyFeatures: [
      'Routes each prospect type (individual, segment, company) to the right output format',
      'Drafts outreach sequences, content briefs, and BD pitches from real research, not templates',
      'Human-in-the-loop by design — drafts only, nothing is sent automatically',
      'Companion skill to signal-scout, packaged as its own plugin (signal-outreach)',
    ],
    techStack: ['Python', 'Claude Code Skills'],
    impact: 'Closes the loop from "who should we talk to" to "here is the draft to send."',
  },
  {
    id: 'llm-gateway-kit',
    title: 'LLM Gateway Kit',
    subtitle: 'Cost-Safe LLM Gateway for Swift Apps',
    description: 'Semantic and vision response caching, tiered circuit breakers, and hard cost-budget enforcement for Swift LLM apps — so a runaway prompt loop can’t blow through your API budget.',
    tags: ['LLM Infra', 'Swift', 'Cost Control', 'Reliability'],
    category: 'ai-infra',
    image: '🛡️',
    demoUrl: 'https://github.com/OrenSegal/llm-gateway-kit',
    featured: true,
    color: 'from-green-500 to-emerald-500',
    icon: '🛡️',
    keyFeatures: [
      'Semantic and vision response caching to cut redundant LLM calls',
      'Tiered circuit breakers that degrade gracefully under provider failure',
      'Hard cost-budget enforcement, not just usage logging after the fact',
      'Built for native Swift/iOS apps calling LLM APIs directly',
    ],
    techStack: ['Swift'],
    impact: 'Prevents a single misbehaving client or feedback loop from exceeding a hard cost ceiling.',
  },
  {
    id: 'verify-before-ship',
    title: 'Verify Before Ship',
    subtitle: 'Catches AI-Fabricated Claims Before a Human Sees Them',
    description: 'Re-fetches every cited source and verifies containment before an AI-generated claim reaches a human reviewer — a fact-checking gate for anything an LLM writes with citations.',
    tags: ['AI Reliability', 'Fact-Checking', 'Python'],
    category: 'ai-infra',
    image: '🔍',
    demoUrl: 'https://github.com/OrenSegal/verify-before-ship',
    featured: true,
    color: 'from-orange-500 to-red-500',
    icon: '🔍',
    keyFeatures: [
      'Re-fetches every source an LLM cites and checks the claim is actually contained in it',
      'Flags fabricated or unsupported citations before they reach a human',
      'Runs as a pre-publish gate, not a post-hoc audit',
    ],
    techStack: ['Python'],
    impact: 'Turns "the model cited a source" into a verified, checkable claim before it ships.',
  },
  {
    id: 'metropulse-nyc',
    title: 'MetroPulse NYC',
    subtitle: 'Behavioral Archetypes for NYC Subway Stations',
    description: 'Segments every NYC subway station into behavioral archetypes using a serverless lakehouse — real ridership, geospatial, and demographic data, no synthetic inputs.',
    tags: ['Data Engineering', 'Geospatial', 'Lakehouse'],
    category: 'data-engineering',
    image: '🚇',
    demoUrl: 'https://github.com/OrenSegal/metropulse-nyc',
    featured: true,
    color: 'from-indigo-500 to-purple-500',
    icon: '🚇',
    keyFeatures: [
      'Serverless lakehouse pipeline: Dagster orchestration, DuckDB + Polars for transforms',
      'FastAPI service layer over the resulting station archetypes',
      'Fully geospatial — every station segmented on real MTA + neighborhood data',
    ],
    techStack: ['Python', 'Dagster', 'DuckDB', 'Polars', 'FastAPI'],
    impact: 'Turns raw transit + geospatial data into station-level behavioral segments end to end.',
  },
  {
    id: 'signal-skills',
    title: 'Signal Skills',
    subtitle: 'A Family of Research-Mining Claude Code Skills',
    description: 'Six Claude Code / Codex CLI skills that mine podcasts and app reviews for findings, track falsifiable predictions, and turn accumulated signal into prioritized, cited build proposals.',
    tags: ['Claude Code', 'Skills', 'Research Automation'],
    category: 'ai-agents',
    image: '📡',
    demoUrl: 'https://github.com/OrenSegal/signal-skills',
    featured: false,
    color: 'from-cyan-500 to-blue-500',
    icon: '📡',
    keyFeatures: [
      'Mines podcasts (Apple, Spotify, RSS, YouTube) and app/store reviews into a queryable corpus',
      'Tracks falsifiable predictions across episodes and scores guests on hit rate over time',
      'A shared, SSOT-verified report renderer keeps all six plugins visually consistent',
    ],
    techStack: ['Python', 'Claude Code Skills'],
    impact: 'Turns "mine this when I remember to ask" into a compounding, queryable corpus.',
  },
  {
    id: 'architecture-lint',
    title: 'Architecture Lint',
    subtitle: 'Config-Driven Module Boundary Linter',
    description: 'A config-driven module boundary linter with a ratchet baseline — enforce architecture rules on a legacy codebase without a big-bang cleanup first.',
    tags: ['Developer Tools', 'Static Analysis', 'CI/CD'],
    category: 'dev-tools',
    image: '🧱',
    demoUrl: 'https://github.com/OrenSegal/architecture-lint',
    featured: false,
    color: 'from-yellow-500 to-orange-500',
    icon: '🧱',
    keyFeatures: [
      'Ratchet baseline: only new violations fail CI, existing debt is grandfathered in and shrinks over time',
      'Module boundaries defined declaratively in config, no code annotations required',
      'Drop-in CLI, works in any CI pipeline',
    ],
    techStack: ['Shell', 'CLI'],
    impact: 'Lets a team turn on architecture enforcement today, on a codebase with years of existing debt.',
  },
  {
    id: 'litmus',
    title: 'Litmus',
    subtitle: 'Red/Green CI for Prompt-Ware',
    description: 'Deterministic checks wrapped around self-graded model output — CI for the behavior a skill’s scripts alone can’t verify.',
    tags: ['AI Testing', 'CI/CD', 'Python'],
    category: 'dev-tools',
    image: '🧪',
    demoUrl: 'https://github.com/OrenSegal/litmus',
    featured: false,
    color: 'from-pink-500 to-rose-500',
    icon: '🧪',
    keyFeatures: [
      'Red/green test framework purpose-built for prompt-driven behavior, not just deterministic code',
      'Combines deterministic assertions with self-graded model checks',
      'Designed to run in CI alongside normal unit tests',
    ],
    techStack: ['Python'],
    impact: 'Gives prompt-based skills the same red/green CI discipline as regular code.',
  },
]

export const getFeaturedProjects = () => projects.filter(p => p.featured)

export const getProjectsByCategory = (category: string) =>
  projects.filter(p => p.category === category)

export const getProjectById = (id: string) =>
  projects.find(p => p.id === id)

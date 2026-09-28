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
  flightLog?: {
    problem: string
    decisions: string[]
    outcome: string
  }
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
      'Every claim is backed by a public, checkable source, so nothing in the report is fabricated',
      'Shared, deterministic report renderer reused across the whole skill family',
      'Ships as a standalone Claude Code / OpenCode plugin',
    ],
    techStack: ['Python', 'Claude Code Skills', 'OpenCode'],
    impact: 'Cuts first-customer research from days of manual digging to one evidence-backed report.',
    flightLog: {
      problem: 'LLM-generated market research reads well but is routinely wrong: a model will confidently name a "prospect" or cite a "signal" that isn\'t actually there when you go look. For go-to-market research specifically, a fabricated lead costs real outreach time before anyone notices.',
      decisions: [
        'Built verify_sources.py as a hard gate: it re-fetches every cited source and confirms the claimed evidence is actually on the page before a claim is allowed into the report. Nothing ships unchecked.',
        'Extracted the report rendering into a shared, deterministic component reused across the whole skill family, so formatting bugs and prompt drift get fixed once instead of per-skill.',
        'Shipped as a standalone Claude Code / OpenCode plugin rather than a hosted service, so it runs against a user\'s own Claude Code session with no separate backend to operate.',
      ],
      outcome: 'The verification step became the template for catching AI fabrication elsewhere: its containment-checking approach was later generalized into its own standalone tool, verify-before-ship.',
    },
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
      'Human-in-the-loop by design: it only drafts, it never sends anything on its own',
      'Companion skill to signal-scout, packaged as its own plugin (signal-outreach)',
    ],
    techStack: ['Python', 'Claude Code Skills'],
    impact: 'Closes the loop from "who should we talk to" to "here is the draft to send."',
  },
  {
    id: 'llm-gateway-kit',
    title: 'LLM Gateway Kit',
    subtitle: 'Cost-Safe LLM Gateway for Swift Apps',
    description: 'Semantic and vision response caching, tiered circuit breakers, and hard cost-budget enforcement for Swift LLM apps, built so a runaway prompt loop can’t blow through your API budget.',
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
    flightLog: {
      problem: 'An iOS app calling LLM APIs directly has no natural circuit breaker: a retry storm, a redundant vision call, or a provider outage can burn through a monthly budget in hours, and usage dashboards only tell you after the money is gone.',
      decisions: [
        'Added semantic and vision response caching so near-duplicate prompts and images don\'t re-trigger a full paid call.',
        'Built tiered circuit breakers that fall back tier by tier when a provider misbehaves, instead of a binary up/down switch.',
        'Enforced cost budgets as a hard ceiling in the gateway itself, not as a downstream alert on a usage log, so the limit holds even if nobody is watching.',
      ],
      outcome: 'A hard budget cap stops runaway spend before it happens. The patterns were extracted from the LLM gateway in an iOS app that is in TestFlight beta, and there is no published cost benchmark yet.',
    },
  },
  {
    id: 'verify-before-ship',
    title: 'Verify Before Ship',
    subtitle: 'Catches AI-Fabricated Claims Before a Human Sees Them',
    description: 'A fact-checking gate for anything an LLM writes with citations: re-fetches every cited source and verifies the claim is actually there before it reaches a human reviewer.',
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
    impact: '"The model cited a source" becomes a verified, checkable claim before it ships, not an assumption.',
    flightLog: {
      problem: 'Signal Scout\'s source-verification step proved the pattern worked for one skill, but every other project generating AI text with citations needed the same guarantee, and copy-pasting the check into each one meant fixing the same fabrication bugs repeatedly.',
      decisions: [
        'Generalized the containment-checking methodology out of signal-scout into a standalone tool, so any LLM-writing pipeline can adopt it as a dependency instead of reimplementing it.',
        'Made it a pre-publish gate rather than a post-hoc audit: a flagged citation blocks the claim before a human reviewer sees it, not after.',
        'Kept the check narrow and deterministic: re-fetch the source, confirm the claim is actually in it, rather than asking another model to grade the first model\'s honesty.',
      ],
      outcome: 'Any project that generates cited claims can now pull in a reusable, pre-publish fact-checking gate instead of bolting a one-off script onto a single skill.',
    },
  },
  {
    id: 'metropulse-nyc',
    title: 'MetroPulse NYC',
    subtitle: 'Behavioral Archetypes for NYC Subway Stations',
    description: 'Segments every NYC subway station into behavioral archetypes using a serverless lakehouse: real ridership, geospatial, and demographic data, no synthetic inputs.',
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
      'Fully geospatial: every station segmented on real MTA and neighborhood data',
    ],
    techStack: ['Python', 'Dagster', 'DuckDB', 'Polars', 'FastAPI'],
    impact: 'Handles the full pipeline from raw transit and geospatial data to station-level behavioral segments.',
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
    impact: 'Replaces "mine this when I remember to ask" with a corpus that keeps compounding on its own.',
  },
  {
    id: 'architecture-lint',
    title: 'Architecture Lint',
    subtitle: 'Module Boundary Linter with a Ratchet',
    description: 'A single bash script that checks module boundaries in TypeScript and Swift codebases, with a count-based baseline so you can turn it on before cleaning up existing violations.',
    tags: ['Developer Tools', 'Static Analysis', 'CI/CD'],
    category: 'dev-tools',
    image: '🧱',
    demoUrl: 'https://github.com/OrenSegal/architecture-lint',
    featured: false,
    color: 'from-yellow-500 to-orange-500',
    icon: '🧱',
    keyFeatures: [
      'Baseline records how many violations each rule has today; CI fails when a count goes up',
      'Boundary rules live in one list at the top of the script, with no annotations in your code',
      'Needs only bash, grep and xargs; tested on Linux CI and macOS',
    ],
    techStack: ['Shell', 'CLI'],
    impact: 'Lets a team turn on architecture enforcement today, on a codebase with years of existing debt.',
    flightLog: {
      problem: 'Architecture rules are easy to agree on and hard to enforce retroactively: turning on a boundary linter for the first time on a real codebase means it immediately fails on years of pre-existing violations, so teams either skip enforcement entirely or burn a sprint on a big-bang cleanup before CI can go green.',
      decisions: [
        'Record a per-rule violation count at adoption time and fail CI only when a count rises. It counts rather than tracks individual violations, so fixing one and adding another in the same change still passes; I chose the simpler version and wrote that trade-off down.',
        'Kept boundary rules in one list inside the script instead of per-file annotations, so adopting it doesn\'t touch application code.',
        'Kept it to one bash script with no dependencies to install, and made it fail loudly if it\'s pointed at the wrong folder instead of silently reporting clean.',
      ],
      outcome: 'You can turn on boundary checks the same day, on a codebase with existing violations, and CI stops the count from growing while you pay the debt down.',
    },
  },
  {
    id: 'scoped',
    title: 'Scoped',
    subtitle: 'File Locks for Concurrent Claude Code Sessions',
    description: 'An MCP server plus a PreToolUse hook that stops two Claude Code sessions from editing the same file at once. The hook blocks the edit itself, so it works even when the model never calls the tools.',
    tags: ['MCP', 'Claude Code', 'Multi-Agent', 'SQLite'],
    category: 'ai-infra',
    image: '🔒',
    demoUrl: 'https://github.com/OrenSegal/scoped',
    featured: false,
    color: 'from-emerald-500 to-teal-500',
    icon: '🔒',
    keyFeatures: [
      'A PreToolUse hook denies an Edit or Write on a file another session has claimed, and auto-claims unclaimed files',
      'A claim tool reserves files before a multi-file change; release, check and status free them early and show who holds what',
      'Claims live in local SQLite; a unique index on the file path gives each race exactly one winner',
    ],
    techStack: ['Node.js', 'SQLite', 'MCP'],
    impact: 'Several agent sessions can work in one repo without one overwriting a file another has claimed through Claude Code\'s edit tools.',
    flightLog: {
      problem: 'Running a Claude Code session per issue or per worktree is normal now, and nothing stops two of them from editing the same file. An advisory lock API only helps if the model remembers to call it.',
      decisions: [
        'Enforced in a PreToolUse hook rather than relying on tool calls, and made the hook fail open so a bug in the coordinator never blocks real work.',
        'Kept the lock in local SQLite and posted Linear comments only for visibility, since a network call with no compare-and-swap is the wrong place for the atomic part.',
        'Tested the race with real OS processes sharing one database. Claims made one after another on a single connection passed; the multi-process tests exposed a check-then-insert race and a hook that ignored the insert result.',
      ],
      outcome: 'In the process race tests, every round has exactly one winner and no errors. It has not been measured on a real multi-session fleet yet, and the README says so.',
    },
  },
  {
    id: 'litmus',
    title: 'Litmus',
    subtitle: 'Red/Green CI for Prompt-Ware',
    description: 'Tests for prompt-based skills: deterministic checks wherever possible, and a model judge only where it has been checked against known good and bad examples.',
    tags: ['AI Testing', 'CI/CD', 'Python'],
    category: 'dev-tools',
    image: '🧪',
    demoUrl: 'https://github.com/OrenSegal/litmus',
    featured: false,
    color: 'from-pink-500 to-rose-500',
    icon: '🧪',
    keyFeatures: [
      'Red/green test framework purpose-built for prompt-driven behavior, not just deterministic code',
      'A judge check stays inconclusive until its rubric has both a passing and a failing example, and the judge agrees with them',
      'Designed to run in CI alongside normal unit tests',
    ],
    techStack: ['Python'],
    impact: 'Prompt-based skills get the same red/green CI discipline as regular code.',
    flightLog: {
      problem: 'Standard unit tests assume deterministic output, but a prompt-driven skill\'s behavior can vary run to run: a regular assertion either false-fails on harmless variation or gets loosened until it stops catching real regressions.',
      decisions: [
        'Kept deterministic assertions for everything that is actually deterministic (inputs, outputs, file writes) rather than routing every check through a model.',
        'Used a model judge only for the subjective parts, and refused to trust it until it correctly grades known pass and fail examples. A judge that says PASS to everything agrees with pass-only examples, so both kinds are required.',
        'Designed it to run as a normal red/green suite inside existing CI, so a broken skill fails the build the same way a broken function does.',
      ],
      outcome: 'Prompt-based skills get a red/green suite instead of "looked fine when I tried it once", and a judge can\'t turn a check green unless it has shown it can tell good output from bad.',
    },
  },
]

export const getFeaturedProjects = () => projects.filter(p => p.featured)

export const getProjectsByCategory = (category: string) =>
  projects.filter(p => p.category === category)

export const getProjectById = (id: string) =>
  projects.find(p => p.id === id)

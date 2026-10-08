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
    id: 'sous',
    title: 'sous',
    subtitle: 'Checks What Coding Agents Actually Do',
    description: 'A Claude Code harness you install in one command, plus a doctor that checks it still holds. It blocks destructive commands and secret reads, fails a green test run that executed nothing, flags the edit that made tests pass by weakening them, and names any plugin that changed since you approved it.',
    tags: ['Claude Code', 'Agent Safety', 'CI', 'Bash', 'Python'],
    category: 'ai-infra',
    image: '🧂',
    demoUrl: 'https://github.com/OrenSegal/sous',
    featured: true,
    color: 'from-amber-500 to-orange-500',
    icon: '🧂',
    keyFeatures: [
      'A PreToolUse guard that stops the spellings deny rules miss, such as /bin/rm -rf, sh -c and git -C . push -f',
      'tests-ran exits 1 when a test log shows zero executed tests; tests-weakened reads a diff and flags deleted, skipped or loosened tests',
      'sous lint maps each "never" line in CLAUDE.md to a real control, or names it as unenforced',
      'sous accept records each plugin\'s hooks and scripts, so doctor names a change even when the version did not move',
    ],
    techStack: ['Bash', 'Python', 'Claude Code hooks', 'GitHub Actions'],
    impact: 'An agent that reports green has to show the tests ran and were not weakened to get there.',
    flightLog: {
      problem: 'Agents are asked for a green build, and a green build is easy to fake by accident: xcodebuild reports success when a filter matches nothing, pytest, Vitest and Jest stay green when every test is skipped, and deny rules match the command text, so /bin/rm walks past a rule written for rm.',
      decisions: [
        'Paired every guard rule with a command it must block and a near-miss it must allow, and made the suite fail when a block message has no pair.',
        'Counted executed tests from the log instead of trusting the exit code, and reported the largest count rather than a sum, so it is a zero-detector and not a coverage number.',
        'Listed the known gaps in the test corpus itself (a command built in a variable passes the guard), so the docs go red if the behavior changes.',
      ],
      outcome: 'Each claim in the README is backed by a test you can run. The OS sandbox is still the real boundary; sous covers what text matching and exit codes miss.',
    },
  },
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
    id: 'cited',
    title: 'cited',
    subtitle: 'Checks Cited Claims Against Their Sources',
    description: 'A fact-checking gate for anything an LLM writes with citations: fetches every cited page and flags any claim whose words, numbers or names it cannot find there, so a reviewer looks at those before anything is published.',
    tags: ['AI Reliability', 'Fact-Checking', 'Python'],
    category: 'ai-infra',
    image: '🔍',
    demoUrl: 'https://github.com/OrenSegal/cited',
    featured: true,
    color: 'from-orange-500 to-red-500',
    icon: '🔍',
    keyFeatures: [
      'Re-fetches every source an LLM cites and checks that the claim\'s key words, numbers and names appear in it',
      'Flags unsupported citations for a person to confirm or cut',
      'Runs before publication, not as an audit afterwards',
    ],
    techStack: ['Python'],
    impact: '"The model cited a source" gets checked against the actual page before it ships, not assumed.',
    flightLog: {
      problem: 'Signal Scout\'s source-verification step proved the pattern worked for one skill, but every other project generating AI text with citations needed the same guarantee, and copy-pasting the check into each one meant fixing the same fabrication bugs repeatedly.',
      decisions: [
        'Generalized the containment-checking methodology out of signal-scout into a standalone tool, so any LLM-writing pipeline can adopt it as a dependency instead of reimplementing it.',
        'Made it run before publication rather than as an audit afterwards: flagged claims go to a person to confirm or cut before anything ships.',
        'Kept the check narrow and deterministic: re-fetch the source, confirm the claim is actually in it, rather than asking another model to grade the first model\'s honesty.',
      ],
      outcome: 'Any project that generates cited claims can now pull in a reusable pre-publish citation check instead of bolting a one-off script onto a single skill.',
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
    subtitle: 'Mutation Testing for Eval Suites',
    description: 'Asks whether an eval suite can fail. It breaks the skill under test on purpose (deletes an instruction, inverts a rule, swaps tool names, plants a wrong number), runs the evals against each broken copy, and reports how many they caught.',
    tags: ['LLM Evals', 'Mutation Testing', 'Claude Code', 'Python'],
    category: 'dev-tools',
    image: '🧪',
    demoUrl: 'https://github.com/OrenSegal/litmus',
    featured: true,
    color: 'from-pink-500 to-rose-500',
    icon: '🧪',
    keyFeatures: [
      'litmus vacuity finds graders that cannot fail, offline and for free, before any run is paid for',
      'litmus mutate reports a mutation score and lists every surviving mutant with its diff, so you see which part of the prompt nothing tests',
      'A crashed, partial or rate-limited run is inconclusive and never counts as a catch',
      'Runs on top of claude plugin eval; it does not replace the runner',
    ],
    techStack: ['Python', 'Claude Code plugin evals'],
    impact: 'A green eval suite has to show it would have gone red on a broken skill.',
    flightLog: {
      problem: 'An eval suite that never goes red tells you nothing. A grader such as "tool used at least zero times" passes on any run, and a case can stay green on an empty reply, so a suite can look complete while testing very little.',
      decisions: [
        'Used deterministic mutation operators that skip code fences, so the same mutants can be replayed byte for byte after a model release.',
        'Counted a mutant as caught only when a trusted run shows it. A baseline that was never green stops the run instead of producing a score.',
        'Put the free checks (vacuity, and audit of results you already have) first, so they fit on every PR, and left paid mutation runs for a schedule.',
      ],
      outcome: 'The bundled demo replays recorded results with no model calls, and its survivors point at the rules nothing in that suite checks. There is no published score on a real third-party suite yet.',
    },
  },
]

export const getFeaturedProjects = () => projects.filter(p => p.featured)

export const getProjectsByCategory = (category: string) =>
  projects.filter(p => p.category === category)

export const getProjectById = (id: string) =>
  projects.find(p => p.id === id)

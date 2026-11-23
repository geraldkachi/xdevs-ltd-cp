// Copy for Our Story, Process, Case Studies and Blog.
// Carried over from the previous XDEVS site — review figures before going live.

export const timeline = [
  { year: '2016', title: 'Founded', body: 'XDEVS starts with a shared vision: build software differently from the mediocre, overpriced solutions we saw in the market.' },
  { year: '2017', title: 'First product launch', body: 'Our first SaaS platform ships — proof that a small team can deliver a product end to end.' },
  { year: '2018', title: 'First enterprise client', body: 'We deliver a data platform for a large insurer and learn what enterprise-grade really means.' },
  { year: '2019', title: 'AI practice', body: 'A dedicated AI/ML practice forms, taking predictive models from notebooks into production.' },
  { year: '2021', title: 'Remote-first, global', body: 'We go remote-first and start serving clients across the US, UK, EU and Africa from our Lagos HQ.' },
  { year: '2023', title: 'Growing the bench', body: 'Data, cloud and BI join software as core services — six practices under one roof.' },
  { year: 'Today', title: 'XDEVS Academy', body: 'We open the Academy to train and mentor the next generation of African engineers, designers and analysts.' },
]

export const processSteps = [
  { num: '01', title: 'Discover', body: 'We listen first. Goals, constraints, users and competitive landscape — mapped through rigorous analysis before a line of code.', points: ['Stakeholder interviews', 'User & market research', 'Scope and success metrics'] },
  { num: '02', title: 'Architect', body: 'Scalable systems are designed before they are built. Every technical blueprint documents its trade-offs explicitly.', points: ['System design & data model', 'Tech stack decision record', 'Delivery plan & milestones'] },
  { num: '03', title: 'Build', body: 'Agile sprints with weekly demos, clean code, automated tests and continuous integration. You see progress every week.', points: ['Weekly demo', 'CI on every commit', 'Shared project board'] },
  { num: '04', title: 'Review', body: 'Code reviews, security audits, performance testing and accessibility checks catch issues before your users do.', points: ['Peer code review', 'Security & load testing', 'Accessibility checks'] },
  { num: '05', title: 'Deploy', body: 'Zero-downtime releases through automated pipelines, with monitoring and one-click rollback.', points: ['Blue-green / canary releases', 'Monitoring & alerting', 'Rollback plan'] },
  { num: '06', title: 'Evolve', body: 'Launch is the beginning. Post-release support, performance monitoring and iterative improvement.', points: ['SLA-backed support', 'Usage analytics', 'Quarterly roadmap reviews'] },
]

export const caseStudies = [
  { slug: 'fraud-detection', category: 'AI & ML', title: 'Real-time fraud detection engine', client: 'Global FinTech', challenge: 'Catch fraud across 50,000 transactions per second without blocking good customers.', solution: 'A multi-model scoring service with streaming features and sub-10ms inference.', metrics: [['89%', 'fewer false positives'], ['$12M', 'annual savings'], ['<10ms', 'latency']] },
  { slug: 'data-lake-migration', category: 'Data Engineering', title: 'Enterprise data lake migration', client: 'Retail enterprise', challenge: 'A slow, expensive legacy Hadoop estate holding 8 petabytes of data.', solution: 'Phased migration to a modern cloud lakehouse with automated validation.', metrics: [['12x', 'faster queries'], ['60%', 'lower infra cost'], ['0', 'data lost']] },
  { slug: 'zero-downtime', category: 'Cloud & DevOps', title: 'Zero-downtime global deployment', client: 'SaaS platform', challenge: 'Risky, manual releases across three regions slowing the product team down.', solution: 'A redesigned CI/CD pipeline supporting 50+ safe deployments a day.', metrics: [['99.99%', 'uptime'], ['40%', 'faster deploys'], ['50+', 'deploys / day']] },
  { slug: 'executive-dashboard', category: 'Business Intelligence', title: 'Executive analytics dashboard', client: 'Healthcare network', challenge: 'Leadership data scattered across 12 disconnected source systems.', solution: 'A real-time BI platform with one trusted semantic layer for the C-suite.', metrics: [['12', 'sources unified'], ['40%', 'faster decisions'], ['Real-time', 'reporting']] },
  { slug: 'patient-engagement', category: 'Software Engineering', title: 'Patient engagement platform', client: 'Digital health startup', challenge: 'Ship a HIPAA-compliant mobile product from zero, fast.', solution: 'A mobile app and API platform taken from idea to production in five months.', metrics: [['3x', 'user retention'], ['100K+', 'daily active users'], ['5 mo', 'to launch']] },
  { slug: 'marketplace-api', category: 'API & Integrations', title: 'Marketplace API ecosystem', client: 'E-commerce platform', challenge: 'A growing partner network with brittle one-off integrations.', solution: 'A versioned API gateway with self-serve onboarding for partners.', metrics: [['200+', 'integrations'], ['5B+', 'API calls / month'], ['99.9%', 'reliability']] },
]

export type Post = { slug: string; title: string; category: string; date: string; read: string; excerpt: string; body: string[] }

export const posts: Post[] = [
  { slug: 'production-ready-llm-apps', title: 'Building production-ready LLM applications: lessons from the field', category: 'AI & ML', date: 'Feb 2026', read: '8 min',
    excerpt: 'Running LLMs in production is very different from building a demo. Here is what we learned.',
    body: ['A demo needs to work once. A product needs to work every time, for every user, at a cost you can afford. That gap is where most LLM projects stall.', 'Start with evaluation, not prompts. Collect real inputs, write down what a good answer looks like, and score every change against that set. Without it you are tuning by feel.', 'Treat the model as an unreliable dependency: validate structured output, set timeouts, cache aggressively, and always have a non-AI fallback path.', 'Finally, watch your costs and latency per request from day one. They are product features, not afterthoughts.'] },
  { slug: 'why-your-data-pipeline-is-failing', title: 'Why your data pipeline is failing (and how to fix it)', category: 'Data Engineering', date: 'Jan 2026', read: '6 min',
    excerpt: 'The five most common architectural mistakes we see — and the patterns that correct them.',
    body: ['Most broken pipelines are not broken by bad code. They are broken by missing contracts between the people who produce data and the people who use it.', 'The usual suspects: no schema validation at ingestion, transformations nobody owns, no idempotency, no data tests, and dashboards reading straight from raw tables.', 'The fixes are boring and effective: data contracts, a layered warehouse (raw → staging → marts), dbt tests on every model, and alerting on freshness.'] },
  { slug: 'zero-downtime-deployments', title: 'Zero-downtime deployments at scale: a practical guide', category: 'Cloud & DevOps', date: 'Jan 2026', read: '10 min',
    excerpt: 'Blue-green, canary and feature flags compared — and when to use each.',
    body: ['Blue-green gives you an instant rollback by keeping two full environments. It is simple and safe, but doubles infrastructure during a release.', 'Canary releases send a small share of traffic to the new version first. Pair them with good metrics and automatic rollback and they catch most regressions early.', 'Feature flags separate deploying code from releasing features. Use them for risky product changes — and clean them up, or they become debt.'] },
  { slug: 'microservices-vs-monolith', title: 'Microservices vs monolith in 2026: what actually matters', category: 'Architecture', date: 'Dec 2025', read: '7 min',
    excerpt: 'The choice depends less on architecture style and more on team structure and deployment speed.',
    body: ['Microservices solve an organisational problem: many teams needing to ship independently. If you have one team, you probably have a monolith problem, not a microservices one.', 'A well-structured modular monolith gives you clear boundaries today and an easy path to split services later, when the pain is real.', 'Optimise for how fast you can safely ship a change. Pick the architecture that makes that number go up.'] },
  { slug: 'modern-bi-stack', title: 'The modern BI stack: dbt, Snowflake and Looker in practice', category: 'BI', date: 'Dec 2025', read: '5 min',
    excerpt: 'How we build semantic layers analysts find useful and executives can navigate.',
    body: ['The warehouse stores data; the semantic layer gives it meaning. Define every metric once — revenue, active user, churn — and reuse that definition everywhere.', 'dbt handles transformation and testing, the warehouse handles scale, and the BI tool should be the thinnest layer of all.', 'Executives do not want more dashboards. They want three numbers they trust, and a way to drill in when one moves.'] },
  { slug: 'how-we-run-engineering', title: 'How we run engineering at XDEVS: principles that scale', category: 'Culture', date: 'Nov 2025', read: '4 min',
    excerpt: 'The principles, rituals and anti-patterns we learned shipping products for clients.',
    body: ['Engineering-first means quality is the baseline, not a phase. Every change is reviewed, tested and deployable.', 'We demo every week. Nothing builds trust with a client faster than seeing working software on a regular rhythm.', 'We write things down: decisions, trade-offs and runbooks. The best teams are the ones that do not rely on memory.'] },
]

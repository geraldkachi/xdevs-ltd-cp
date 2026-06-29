import type { Metadata } from 'next'
import ServicePageLayout from '@/components/ServicePageLayout'
export const metadata: Metadata = {
  title: 'Software Engineering', description: 'Full-stack web and mobile software engineering from XDEVS.',
  alternates: { canonical: 'https://xdevs.io/services/software-engineering' },
}
export default function Page() {
  return <ServicePageLayout index="01" tag="DEVELOPMENT" title="SOFTWARE ENGINEERING"
    tagline="From idea to production-ready product."
    description="We build scalable, maintainable web and mobile applications using modern frameworks and engineering best practices. Whether you need a new product from scratch or help scaling an existing codebase, we have you covered."
    capabilities={[
      { title: 'Frontend Development', body: 'React, Next.js, and TypeScript applications with pixel-perfect UIs, accessibility, and performance optimization.' },
      { title: 'Backend Development', body: 'RESTful APIs, microservices, and server-side logic built on Node.js, Python, or your preferred stack.' },
      { title: 'Mobile Development', body: 'Cross-platform React Native apps with native performance and polished UX on iOS and Android.' },
      { title: 'Architecture Design', body: 'Scalable system design that balances current speed with future growth — no over-engineering, no technical debt.' },
      { title: 'Code Review & Audits', body: 'Thorough reviews of existing codebases to identify risks, bottlenecks, and opportunities for improvement.' },
      { title: 'Testing & QA', body: 'Unit, integration, and end-to-end test suites that give your team confidence to ship fast without breaking things.' },
    ]}
    technologies={['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'React Native', 'PostgreSQL', 'Redis', 'Docker', 'Jest', 'Cypress', 'Prisma']}
  />
}

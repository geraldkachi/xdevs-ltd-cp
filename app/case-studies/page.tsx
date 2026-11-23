import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import { PageHero } from '@/components/ui'
import { caseStudies } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Selected XDEVS work across AI, data engineering, cloud, BI, software and APIs — and the results it delivered.',
  alternates: { canonical: 'https://xdevs.io/case-studies' },
}

const tone: Record<string, string> = {
  'AI & ML': '#6d5bd0', 'Data Engineering': '#76803f', 'Cloud & DevOps': '#1f5fbf',
  'Business Intelligence': '#b5651d', 'Software Engineering': '#444', 'API & Integrations': '#2f7f78',
}

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          crumbs={[{ label: 'Case Studies', href: '/case-studies' }]}
          eyebrow="Selected work"
          title="Results, not just releases."
          intro="A selection of engagements across our six practices. Client names are withheld under NDA."
        />
        <section className="border-b border-[var(--border-col)]">
          {caseStudies.map((c, i) => (
            <article key={c.slug} id={c.slug} className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] border-b last:border-b-0 border-[var(--border-col)] scroll-mt-32">
              <div className="px-6 lg:px-10 py-10 lg:border-r border-[var(--border-col)] flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1.5 text-[12px] font-body font-semibold tracking-wider uppercase text-white" style={{ background: tone[c.category] }}>{c.category}</span>
                  <span className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3">{String(i + 1).padStart(2, '0')} · {c.client}</span>
                </div>
                <h2 className="font-display font-extrabold text-fg uppercase tracking-tight leading-[1.05]" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)' }}>{c.title}</h2>
                <dl className="mt-8 grid sm:grid-cols-2 gap-6">
                  <div><dt className="text-[11px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-2">Challenge</dt><dd className="font-body text-[15px] text-fg-2 leading-relaxed">{c.challenge}</dd></div>
                  <div><dt className="text-[11px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-2">What we built</dt><dd className="font-body text-[15px] text-fg-2 leading-relaxed">{c.solution}</dd></div>
                </dl>
              </div>
              <div className="grid grid-cols-3 border-t lg:border-t-0 border-[var(--border-col)]">
                {c.metrics.map(([n, l], j) => (
                  <div key={l} className={`px-5 lg:px-8 py-10 flex flex-col justify-end ${j < 2 ? 'border-r border-[var(--border-col)]' : ''} ${j === 0 ? 'bg-[var(--bg-2)]' : ''}`}>
                    <span className="font-display font-extrabold text-fg tracking-tight leading-none" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 3.25rem)' }}>{n}</span>
                    <span className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3 mt-3">{l}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}

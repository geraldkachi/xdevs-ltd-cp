import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import { PageHero, SectionHead } from '@/components/ui'
import { processSteps } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Our Process',
  description: 'Discover, architect, build, review, deploy, evolve — how XDEVS takes software from idea to production and beyond.',
  alternates: { canonical: 'https://xdevs.io/process' },
}

const models = [
  ['Fixed scope', 'A clearly defined product or feature with an agreed budget and timeline. Best for MVPs and well-understood projects.'],
  ['Dedicated team', 'A cross-functional XDEVS squad embedded in your roadmap, billed monthly. Best for ongoing product development.'],
  ['Advisory & audit', 'Architecture reviews, code and security audits, and technical due diligence. Best before big decisions.'],
]

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          crumbs={[{ label: 'Our Process', href: '/process' }]}
          eyebrow="How we work"
          title="Our process"
          intro="Six stages, one rhythm: weekly demos, clear decisions, and no surprises. Small projects take 4–8 weeks; enterprise platforms usually 3–6 months."
        />

        <div className="overflow-hidden border-b border-[var(--border-col)] py-6" aria-hidden>
          <div className="marquee-track flex w-max">
            {[0, 1].map((k) => (
              <span key={k} className="font-display font-extrabold text-[var(--bg-3)] uppercase tracking-tight whitespace-nowrap pr-8" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
                {processSteps.map((s) => s.title).join(' · ')} ·&nbsp;
              </span>
            ))}
          </div>
        </div>

        <section className="border-b border-[var(--border-col)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-col)]">
            {processSteps.map((s) => (
              <article key={s.num} className="bg-[var(--bg)] p-8 lg:p-10 flex flex-col">
                <span className="font-display font-light text-[var(--fg-3)] opacity-40 text-7xl lg:text-8xl leading-none">{s.num}</span>
                <h2 className="font-display font-extrabold text-fg uppercase tracking-tight text-2xl mt-8">{s.title}</h2>
                <p className="font-body text-[15px] text-fg-2 leading-relaxed mt-3 flex-1">{s.body}</p>
                <ul className="mt-6 pt-6 border-t border-[var(--border-col)] space-y-2">
                  {s.points.map((p) => <li key={p} className="flex gap-3 text-[14px] font-body text-fg-3"><span>→</span>{p}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-[var(--border-col)]">
          <SectionHead title="Ways to work with us" href="/contact" linkLabel="Start a project" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border-col)]">
            {models.map(([t, b], i) => (
              <div key={t} className={`p-8 lg:p-10 ${i === 1 ? 'bg-fg text-[var(--bg)]' : 'bg-[var(--bg)]'}`}>
                <p className={`text-[12px] font-body font-semibold tracking-widest uppercase mb-4 ${i === 1 ? 'opacity-60' : 'text-fg-3'}`}>{i === 1 ? 'Most popular' : `Option ${i + 1}`}</p>
                <p className={`font-display font-extrabold uppercase tracking-tight text-xl ${i === 1 ? '' : 'text-fg'}`}>{t}</p>
                <p className={`font-body text-[15px] leading-relaxed mt-3 ${i === 1 ? 'opacity-80' : 'text-fg-3'}`}>{b}</p>
              </div>
            ))}
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}

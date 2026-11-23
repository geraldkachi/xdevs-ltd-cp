import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import { PageHero, SectionHead } from '@/components/ui'
import { timeline } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'How XDEVS grew from a small team of engineers in Lagos into a software, data and AI engineering company — and a tech academy.',
  alternates: { canonical: 'https://xdevs.io/our-story' },
}

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          crumbs={[{ label: 'Our Story', href: '/our-story' }]}
          eyebrow="Origin story"
          title="Built by engineers who wanted to build differently."
          intro="We started XDEVS because we kept seeing businesses pay too much for software that didn't work. We believed a small, senior, honest team could do better — and we've spent every year since proving it."
        />

        <section className="border-b border-[var(--border-col)]">
          <SectionHead title="Timeline" />
          <ol>
            {timeline.map((t, i) => (
              <li key={t.year} className="grid grid-cols-[88px_1fr] md:grid-cols-[220px_1fr_1.4fr] border-b last:border-b-0 border-[var(--border-col)] group hover:bg-[var(--bg-2)] transition-colors">
                <div className="px-6 lg:px-10 py-8 border-r border-[var(--border-col)] flex items-start">
                  <span className="font-display font-extrabold text-fg tracking-tight text-2xl md:text-4xl">{t.year}</span>
                </div>
                <div className="px-6 lg:px-10 pt-8 md:pb-8 md:border-r border-[var(--border-col)]">
                  <p className="text-[12px] font-body font-semibold text-fg-3 mb-2">{String(i + 1).padStart(2, '0')}</p>
                  <p className="font-display font-extrabold text-fg uppercase tracking-tight text-lg md:text-xl">{t.title}</p>
                </div>
                <p className="col-start-2 md:col-start-auto px-6 lg:px-10 pb-8 md:pt-8 font-body text-[15px] lg:text-base text-fg-2 leading-relaxed">{t.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-b border-[var(--border-col)] grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-fg text-[var(--bg)] px-6 lg:px-12 py-14">
            <p className="font-display font-extrabold uppercase tracking-tight leading-[1.02]" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}>
              &ldquo;The best technology is invisible. It just works — reliably, elegantly, at every scale.&rdquo;
            </p>
            <p className="mt-8 text-[12px] font-body font-semibold tracking-widest uppercase opacity-70">Our engineering philosophy</p>
          </div>
          <div className="px-6 lg:px-12 py-14 flex flex-col justify-between gap-8">
            <p className="font-body text-base lg:text-lg text-fg-2 leading-relaxed">
              Today XDEVS is led by Adimora Augustine Onyekachi (Founder &amp; CEO) and Cynthia Ebere Chimoma (COO), with a growing bench of
              engineers and mentors. We build for clients across industries, and through XDEVS Academy we&apos;re training the next generation of
              African tech talent.
            </p>
            <Link href="/team" className="self-start px-7 py-4 bg-fg text-[var(--bg)] text-[12px] font-body font-bold tracking-widest uppercase">Meet the team →</Link>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}

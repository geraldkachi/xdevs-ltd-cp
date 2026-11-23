import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PageHero } from '@/components/ui'
import { posts } from '@/lib/content'
import Newsletter from '@/components/Newsletter'

export const metadata: Metadata = {
  title: 'Blog — Engineering Notes',
  description: 'Notes from the XDEVS team on AI, data engineering, cloud, architecture, BI and engineering culture.',
  alternates: { canonical: 'https://xdevs.io/blog' },
}

export default function BlogPage() {
  const [lead, ...rest] = posts
  return (
    <>
      <Navbar />
      <main>
        <PageHero crumbs={[{ label: 'Blog', href: '/blog' }]} eyebrow="Latest news" title="Engineering notes" intro="What we learn shipping software, data and AI for clients — written by the people doing the work." />

        <section className="border-b border-[var(--border-col)]">
          <Link href={`/blog/${lead.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 border-b border-[var(--border-col)]">
            <div className="relative min-h-[280px] lg:min-h-[420px] bg-fg overflow-hidden flex items-end p-8 lg:p-12">
              <span className="absolute -right-6 -top-10 font-display font-extrabold text-[var(--bg)] opacity-[0.07] leading-none select-none" style={{ fontSize: '22rem' }}>AI</span>
              <span className="relative px-3 py-1.5 bg-[var(--bg)] text-fg text-[12px] font-body font-semibold tracking-wider uppercase">{lead.category}</span>
            </div>
            <div className="px-6 lg:px-12 py-10 flex flex-col justify-between gap-8 group-hover:bg-[var(--bg-2)] transition-colors">
              <div>
                <p className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3">{lead.date} · {lead.read} read</p>
                <h2 className="font-display font-extrabold text-fg uppercase tracking-tight leading-[1.05] mt-5" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)' }}>{lead.title}</h2>
                <p className="font-body text-base text-fg-2 leading-relaxed mt-5">{lead.excerpt}</p>
              </div>
              <span className="text-[12px] font-body font-bold tracking-widest uppercase text-fg">Read article →</span>
            </div>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-col)]">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-[var(--bg)] p-8 flex flex-col justify-between gap-8 min-h-[300px] hover:bg-[var(--bg-2)] transition-colors">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1.5 bg-[var(--bg-3)] text-fg text-[11px] font-body font-semibold tracking-wider uppercase">{p.category}</span>
                    <span className="text-[12px] font-body text-fg-3">{p.read}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-fg uppercase tracking-tight text-xl leading-tight mt-6">{p.title}</h3>
                  <p className="font-body text-[15px] text-fg-3 leading-relaxed mt-3">{p.excerpt}</p>
                </div>
                <p className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3">{p.date} <span className="ml-2 text-fg group-hover:ml-3 transition-all">→</span></p>
              </Link>
            ))}
            <div className="bg-[var(--bg-2)] p-8 flex flex-col justify-between gap-8 min-h-[300px]">
              <div>
                <p className="font-display font-extrabold text-fg uppercase tracking-tight text-xl leading-tight">Get new articles by email</p>
                <p className="font-body text-[15px] text-fg-3 leading-relaxed mt-3">One short email when we publish. No spam.</p>
              </div>
              <Newsletter />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

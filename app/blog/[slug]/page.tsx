import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import { posts } from '@/lib/content'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = posts.find((x) => x.slug === params.slug)
  if (!p) return {}
  return { title: p.title, description: p.excerpt, alternates: { canonical: `https://xdevs.io/blog/${p.slug}` } }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const i = posts.findIndex((x) => x.slug === params.slug)
  if (i < 0) notFound()
  const p = posts[i]
  const next = posts[(i + 1) % posts.length]
  return (
    <>
      <Navbar />
      <main>
        <article className="border-b border-[var(--border-col)]">
          <header className="px-6 lg:px-12 pt-10 pb-12 border-b border-[var(--border-col)]">
            <Link href="/blog" className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3 hover:text-fg">← All articles</Link>
            <div className="flex items-center gap-4 mt-8">
              <span className="px-3 py-1.5 bg-fg text-[var(--bg)] text-[12px] font-body font-semibold tracking-wider uppercase">{p.category}</span>
              <span className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3">{p.date} · {p.read} read</span>
            </div>
            <h1 className="font-display font-extrabold text-fg uppercase tracking-tight leading-[1.02] mt-6 max-w-5xl" style={{ fontSize: 'clamp(2rem, 4.4vw, 4rem)' }}>{p.title}</h1>
          </header>
          <div className="px-6 lg:px-12 py-12 max-w-3xl">
            <p className="font-body text-xl text-fg leading-relaxed mb-8">{p.excerpt}</p>
            <div className="space-y-6">
              {p.body.map((para, k) => <p key={k} className="font-body text-[17px] text-fg-2 leading-[1.75]">{para}</p>)}
            </div>
            <p className="mt-12 pt-6 border-t border-[var(--border-col)] text-[13px] font-body text-fg-3">Written by the XDEVS engineering team.</p>
          </div>
        </article>
        <Link href={`/blog/${next.slug}`} className="group flex items-center justify-between gap-6 px-6 lg:px-12 py-10 border-b border-[var(--border-col)] hover:bg-[var(--bg-2)] transition-colors">
          <div>
            <p className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3">Next article</p>
            <p className="font-display font-extrabold text-fg uppercase tracking-tight text-xl lg:text-2xl mt-2">{next.title}</p>
          </div>
          <span className="text-3xl text-fg group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <CTA />
      </main>
      <Footer />
    </>
  )
}

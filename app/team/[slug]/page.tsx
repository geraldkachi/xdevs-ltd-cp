import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import TeamCard, { JoinCard, PhotoPlaceholder, directionColor } from '@/components/TeamCard'
import { team, getMember } from '@/lib/team'

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = getMember(params.slug)
  if (!m) return {}
  return {
    title: `${m.name} — ${m.roles.join(', ')}`,
    description: m.intro,
    alternates: { canonical: `https://xdevs.io/team/${m.slug}` },
    openGraph: m.image ? { images: [{ url: m.image }] } : undefined,
  }
}

export default function MemberPage({ params }: { params: { slug: string } }) {
  const m = getMember(params.slug)
  if (!m) notFound()
  const others = team.filter((t) => t.slug !== m.slug)

  return (
    <>
      <Navbar />
      <main>
        {/* Profile — mirrors the UNITED24 ambassador page layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[var(--border-col)] bg-[#0a0a0a] text-white">
          <div className="order-2 lg:order-1 flex flex-col lg:border-r border-white/10">
            <div className="px-6 lg:px-10 pt-8 pb-10 border-b border-white/10">
              <Link href="/team" aria-label="Back to team" className="inline-flex text-3xl text-white/70 hover:text-white transition-colors mb-10">←</Link>
              <h1 className="font-display font-bold uppercase tracking-tight leading-[1.02]" style={{ fontSize: 'clamp(2rem, 3.6vw, 3.4rem)' }}>
                {m.name}
              </h1>
              <p className="mt-4 text-[14px] font-body font-semibold tracking-widest uppercase text-white/80">{m.title}</p>

              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
                <div>
                  <p className="text-[12px] font-body tracking-widest uppercase text-white/50 mb-2">Direction</p>
                  <span className="inline-block px-4 py-2.5 text-[13px] font-body font-semibold tracking-wider uppercase" style={{ background: directionColor[m.direction] ?? '#444' }}>{m.direction}</span>
                </div>
                <div>
                  <p className="text-[12px] font-body tracking-widest uppercase text-white/50 mb-2">Roles</p>
                  <div className="flex flex-wrap gap-2">
                    {m.roles.map((r) => (
                      <span key={r} className="inline-block px-4 py-2.5 bg-white/10 text-[13px] font-body font-semibold tracking-wider uppercase">{r}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-body tracking-widest uppercase text-white/50 mb-2">Based in</p>
                  <span className="inline-block px-4 py-2.5 bg-white/10 text-[13px] font-body font-semibold tracking-wider uppercase">Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            <div className="px-6 lg:px-10 py-10 flex-1">
              <div className="space-y-5 max-w-2xl">
                {m.bio.map((p, i) => (
                  <p key={i} className="font-body text-[17px] lg:text-lg leading-relaxed text-white/90">{p}</p>
                ))}
              </div>

              <p className="mt-12 text-[12px] font-body tracking-widest uppercase text-white/50 mb-4">Focus areas</p>
              <ul className="flex flex-wrap gap-2">
                {m.focus.map((f) => (
                  <li key={f} className="px-4 py-2 border border-white/20 text-[12px] font-body font-semibold tracking-wider uppercase text-white/85">{f}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 border-t border-white/10">
              {m.links.map((l, i) => (
                <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className={`px-6 lg:px-10 py-5 flex items-center justify-between text-[13px] font-body font-bold tracking-widest uppercase hover:bg-white/5 transition-colors ${i === 0 ? 'border-r border-white/10' : ''}`}>
                  {l.label}<span>↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative bg-[#7d7d7d] min-h-[460px] lg:min-h-[760px] overflow-hidden">
            <div className="absolute inset-0 lg:inset-y-16 lg:inset-x-[12%]">
              {m.image
                ? <Image src={m.image} alt={m.name} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" style={{ objectPosition: m.imagePosition ?? '50% 30%' }} />
                : <PhotoPlaceholder name={m.name} big />}
            </div>
          </div>
        </section>

        {/* Other members */}
        <section className="border-b border-[var(--border-col)]">
          <div className="flex items-stretch justify-between border-b border-[var(--border-col)]">
            <h2 className="px-6 lg:px-10 py-6 font-display font-extrabold text-fg tracking-tight uppercase text-2xl lg:text-3xl">Other team members</h2>
            <Link href="/team" className="flex items-center px-6 lg:px-10 border-l border-[var(--border-col)] text-[12px] font-body font-bold tracking-widest uppercase text-fg hover:bg-[var(--bg-2)]">All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-col)]">
            {others.map((o) => <TeamCard key={o.slug} m={o} />)}
            <JoinCard />
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}

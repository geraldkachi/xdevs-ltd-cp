import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import TeamCard, { JoinCard } from '@/components/TeamCard'
import { team } from '@/lib/team'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the people leading XDEVS — engineers, operators and mentors building software and tech talent from Lagos.',
  alternates: { canonical: 'https://xdevs.io/team' },
}

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] border-b border-[var(--border-col)]">
          <div className="px-6 lg:px-12 py-14 lg:border-r border-[var(--border-col)]">
            <p className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-6">The team</p>
            <h1 className="font-display font-extrabold text-fg tracking-tight uppercase leading-[1]" style={{ fontSize: 'clamp(2rem, 4.2vw, 3.75rem)' }}>
              Engineers, operators and mentors building what&apos;s next.
            </h1>
          </div>
          <div className="px-6 lg:px-12 py-14 flex items-end">
            <p className="font-body text-base lg:text-lg text-fg-2 leading-relaxed max-w-xl">
              XDEVS is led by people who still do the work. Our leadership writes code, runs infrastructure and mentors the next
              generation through XDEVS Academy — so every client project and every student gets senior attention.
            </p>
          </div>
        </section>

        <section className="border-b border-[var(--border-col)]">
          <h2 className="px-6 lg:px-10 py-6 border-b border-[var(--border-col)] font-display font-extrabold text-fg tracking-tight uppercase text-2xl lg:text-3xl">All team members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-col)]">
            {team.map((m, i) => <TeamCard key={m.slug} m={m} priority={i < 2} />)}
            <div className="sm:col-span-2 lg:col-span-1"><JoinCard /></div>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RolesList from '@/components/RolesList'
import { PageHero, SectionHead } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Careers — Open Roles',
  description: 'Join XDEVS. Remote-first engineering, data and cloud roles from Lagos. Sign in and apply in minutes.',
  alternates: { canonical: 'https://xdevs.io/careers' },
}

const perks = [
  ['Remote-first', 'Work from anywhere. We hire for talent, not postcode.'],
  ['Learning budget', 'Courses, conferences and books — plus free XDEVS Academy tracks.'],
  ['Real client work', 'Ship production systems for companies across industries.'],
  ['Flexible time off', 'Rest when you need it. We care about output, not hours.'],
  ['Mentorship', 'Senior engineers review your work and invest in your growth.'],
  ['Room to grow', 'Small enough for impact, ambitious enough to scale your career.'],
]

const steps = [
  ['Apply', 'Sign in, pick a role and send your CV — it takes about five minutes.'],
  ['Intro call', 'A 30-minute conversation about you, the role and how we work.'],
  ['Practical task', 'A short task close to the real job — a few hours, never weeks.'],
  ['Team chat', 'Meet the people you would work with and ask anything.'],
  ['Offer', 'A clear offer, usually within a week of your final chat.'],
]

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          crumbs={[{ label: 'Careers', href: '/careers' }]}
          eyebrow="Join XDEVS"
          title="Do the best work of your career."
          intro="We hire people who care deeply about their craft. Remote-first, ambitious and collaborative — create an account, apply in minutes and track your application from your dashboard."
        />

        <div className="overflow-hidden border-b border-[var(--border-col)] py-6" aria-hidden>
          <div className="marquee-track flex w-max">
            {[0, 1].map((k) => (
              <span key={k} className="font-display font-extrabold text-[var(--bg-3)] uppercase tracking-tight whitespace-nowrap pr-8" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
                Join us · Grow · Build · Impact · Thrive · Lead ·&nbsp;
              </span>
            ))}
          </div>
        </div>

        <section className="border-b border-[var(--border-col)]">
          <SectionHead id="roles" title="Open roles" />
          <RolesList />
        </section>

        <section className="border-b border-[var(--border-col)]">
          <SectionHead title="Why XDEVS" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-col)]">
            {perks.map(([t, b], i) => (
              <div key={t} className="bg-[var(--bg)] p-8 lg:p-10">
                <p className="text-[12px] font-body font-semibold text-fg-3 mb-4">{String(i + 1).padStart(2, '0')}</p>
                <p className="font-display font-extrabold text-fg uppercase tracking-tight text-lg">{t}</p>
                <p className="font-body text-[15px] text-fg-3 leading-relaxed mt-2">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[var(--border-col)]">
          <SectionHead title="How hiring works" />
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[var(--border-col)]">
            {steps.map(([t, b], i) => (
              <li key={t} className="bg-[var(--bg)] p-7">
                <p className="font-display font-extrabold text-[var(--bg-3)] text-5xl">{String(i + 1).padStart(2, '0')}</p>
                <p className="font-display font-extrabold text-fg uppercase tracking-tight mt-4">{t}</p>
                <p className="font-body text-[14px] text-fg-3 leading-relaxed mt-2">{b}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  )
}

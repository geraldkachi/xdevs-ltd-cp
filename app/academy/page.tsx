import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EnrolForm, { EnrolButton } from '@/components/EnrolForm'
import { SectionHead } from '@/components/ui'
import { diplomas, preorders, careerPaths, naira, PREORDER_PRICE, SCHEDULE } from '@/lib/academy'

export const metadata: Metadata = {
  title: 'XDEVS Academy — Tech Courses, Career Paths & Mentorship',
  description:
    'Learn UI/UX Design, Digital Marketing, Frontend, Backend and Data Analysis with XDEVS Academy in Lagos. Classes 3 times a week, mentor-led, from ₦90,000. Pre-order Python, JavaScript, React, NodeJS, Web3 and AWS for ₦5,000.',
  alternates: { canonical: 'https://xdevs.io/academy' },
}

const categoryColor: Record<string, string> = { Design: '#6d5bd0', Marketing: '#b5651d', Engineering: '#1f5fbf', Data: '#76803f' }

const faqs = [
  ['How often are classes?', 'Classes run three times a week. We share the exact days and times when you reserve your seat.'],
  ['Do I need experience?', 'No. Every diploma starts from the fundamentals at Level 1 and builds up to job-ready projects by the final level.'],
  ['What does a pre-order mean?', `Pre-order tracks are upcoming short courses. Paying ${naira(PREORDER_PRICE)} reserves your seat and you are first to know when the cohort starts.`],
  ['Do I get a certificate?', 'Yes — you receive an XDEVS Academy certificate for each level you complete, plus a portfolio of real projects.'],
  ['Can I pay in instalments?', 'Talk to us. Reserve your seat with the form and we will share the payment options available for your course.'],
]

export default function AcademyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] border-b border-[var(--border-col)]">
          <div className="px-6 lg:px-12 pt-12 pb-12 lg:border-r border-[var(--border-col)]">
            <p className="text-[12px] font-body font-semibold tracking-[0.25em] uppercase text-fg-3 mb-6">XDEVS Academy</p>
            <h1 className="font-display font-extrabold text-fg tracking-tight uppercase leading-[0.98]" style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.75rem)' }}>
              Learn tech skills.<br />Launch a tech career.
            </h1>
            <p className="font-body text-base lg:text-lg text-fg-2 leading-relaxed max-w-xl mt-8">
              Mentor-led diplomas taught by the engineers who build for XDEVS clients. Real projects, small classes, and a clear path from
              beginner to your first role in tech.
            </p>
            <div className="flex flex-wrap gap-0 mt-10">
              <a href="#courses" className="px-7 py-4 bg-fg text-[var(--bg)] text-[12px] font-body font-bold tracking-widest uppercase hover:opacity-85">See courses & pricing</a>
              <a href="#enrol" className="px-7 py-4 border border-[var(--border-col)] text-fg text-[12px] font-body font-bold tracking-widest uppercase hover:bg-[var(--bg-2)]">Reserve a seat</a>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-[var(--bg-2)]">
            {[
              ['3×', 'Classes a week'],
              ['5', 'Diploma programmes'],
              ['6', 'Upcoming tracks'],
              ['1:1', 'Mentorship'],
            ].map(([n, l], i) => (
              <div key={l} className={`px-6 lg:px-10 py-10 flex flex-col justify-end ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b' : ''} border-[var(--border-col)]`}>
                <span className="font-display font-extrabold text-fg tracking-tight" style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}>{n}</span>
                <span className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3 mt-2">{l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Diplomas */}
        <section className="border-b border-[var(--border-col)]">
          <SectionHead id="courses" title="Diploma courses" />
          <div className="px-6 lg:px-10 py-4 border-b border-[var(--border-col)] bg-[var(--bg-2)] text-[12px] font-body font-semibold tracking-widest uppercase text-fg-2">
            {SCHEDULE} · Certificates at every level · Portfolio projects included
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[var(--border-col)]">
            {diplomas.map((c) => (
              <article key={c.slug} id={c.slug} className="bg-[var(--bg)] flex flex-col scroll-mt-32">
                <div className="px-7 pt-7 flex items-center justify-between">
                  <span className="px-3 py-1.5 text-[12px] font-body font-semibold tracking-wider uppercase text-white" style={{ background: categoryColor[c.category] }}>{c.category}</span>
                  <span className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3">{c.duration} · {c.levels}</span>
                </div>
                <div className="px-7 pt-6 pb-7 flex-1 flex flex-col">
                  <h3 className="font-display font-extrabold text-fg uppercase tracking-tight text-2xl leading-tight">{c.title}</h3>
                  <p className="font-body text-[15px] text-fg-2 leading-relaxed mt-3">{c.summary}</p>
                  <ul className="mt-6 space-y-2.5">
                    {c.curriculum.map((x, i) => (
                      <li key={x} className="flex gap-3 text-[14px] font-body text-fg-2">
                        <span className="text-fg-3 font-semibold tabular-nums">{String(i + 1).padStart(2, '0')}</span>{x}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3">Leads to: <span className="text-fg">{c.careers.join(' · ')}</span></p>
                </div>
                <div className="flex items-stretch border-t border-[var(--border-col)]">
                  <div className="flex-1 px-7 py-5">
                    <p className="font-display font-extrabold text-fg text-3xl tracking-tight">{naira(c.price)}</p>
                    <p className="text-[12px] font-body text-fg-3 mt-0.5">Full programme fee</p>
                  </div>
                  <EnrolButton course={c.title} className="px-8" />
                </div>
              </article>
            ))}
            {/* Mentorship tile fills the grid */}
            <article className="bg-fg text-[var(--bg)] flex flex-col justify-between p-7">
              <div>
                <span className="px-3 py-1.5 text-[12px] font-body font-semibold tracking-wider uppercase bg-[var(--bg)] text-fg">Mentorship</span>
                <h3 className="font-display font-extrabold uppercase tracking-tight text-2xl leading-tight mt-6">Not sure where to start?</h3>
                <p className="font-body text-[15px] opacity-80 leading-relaxed mt-3">
                  Book a free career-path call. We&apos;ll look at your background and goals and recommend the right track.
                </p>
              </div>
              <EnrolButton course="Mentorship" label="Book a call →" className="!bg-[var(--bg)] !text-fg mt-8 self-start" />
            </article>
          </div>
        </section>

        {/* Pre-orders */}
        <section className="border-b border-[var(--border-col)]">
          <SectionHead id="preorder" title="Upcoming tracks — pre-order" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr]">
            <div className="px-6 lg:px-10 py-10 lg:border-r border-b lg:border-b-0 border-[var(--border-col)] bg-[var(--bg-2)]">
              <p className="font-display font-extrabold text-fg tracking-tight" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>{naira(PREORDER_PRICE)}</p>
              <p className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3 mt-2">Per track · reserves your seat</p>
              <p className="font-body text-[15px] text-fg-2 leading-relaxed mt-6 max-w-sm">
                Short, focused courses launching soon. Pre-order to lock in your place and be first to hear when the cohort opens.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--border-col)]">
              {preorders.map((p) => (
                <div key={p.slug} className="bg-[var(--bg)] p-6 lg:p-8 flex flex-col justify-between min-h-[200px] group">
                  <div>
                    <p className="font-display font-extrabold text-fg uppercase tracking-tight text-2xl lg:text-3xl">{p.title}</p>
                    <p className="font-body text-[14px] text-fg-3 mt-2">{p.note}</p>
                  </div>
                  <EnrolButton course={p.title} label="Pre-order →" className="!bg-transparent !text-fg border border-[var(--border-col)] group-hover:!bg-fg group-hover:!text-[var(--bg)] mt-6 self-start !px-5 !py-3" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career paths */}
        <section className="border-b border-[var(--border-col)]">
          <SectionHead title="Tech career paths" />
          <div>
            {careerPaths.map((p, i) => (
              <div key={p.title} className="grid grid-cols-1 md:grid-cols-[260px_1fr] border-b last:border-b-0 border-[var(--border-col)]">
                <div className="px-6 lg:px-10 py-6 md:border-r border-[var(--border-col)] flex items-center gap-4">
                  <span className="text-[12px] font-body font-semibold text-fg-3 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display font-extrabold text-fg uppercase tracking-tight text-lg">{p.title}</span>
                </div>
                <div className="px-6 lg:px-10 py-6 flex flex-wrap items-center gap-3">
                  {p.path.map((s, j) => (
                    <span key={s} className="flex items-center gap-3">
                      <span className={`px-4 py-2 text-[13px] font-body font-semibold tracking-wider uppercase ${j === p.path.length - 1 ? 'bg-fg text-[var(--bg)]' : 'border border-[var(--border-col)] text-fg-2'}`}>{s}</span>
                      {j < p.path.length - 1 && <span className="text-fg-3">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mentorship */}
        <section className="border-b border-[var(--border-col)] grid grid-cols-1 lg:grid-cols-2">
          <div className="px-6 lg:px-12 py-12 lg:border-r border-b lg:border-b-0 border-[var(--border-col)]">
            <p className="text-[12px] font-body font-semibold tracking-[0.25em] uppercase text-fg-3 mb-5">Mentorship</p>
            <h2 className="font-display font-extrabold text-fg uppercase tracking-tight leading-[1.02]" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}>
              Learn from engineers who ship for real clients.
            </h2>
            <p className="font-body text-base text-fg-2 leading-relaxed mt-6 max-w-lg">
              Every student is paired with a mentor from the XDEVS team. You get code reviews, portfolio feedback, mock interviews and an
              honest view of what the job actually looks like.
            </p>
            <Link href="/team" className="inline-flex mt-8 text-[12px] font-body font-bold tracking-widest uppercase text-fg underline underline-offset-4">Meet the mentors →</Link>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border-col)]">
            {[
              ['Code & design reviews', 'Line-by-line feedback on your projects from working engineers.'],
              ['Portfolio building', 'Ship real projects you can show employers and clients.'],
              ['Interview prep', 'Mock interviews, CV reviews and LinkedIn polish.'],
              ['Career guidance', 'Choose the right track and plan your first role in tech.'],
            ].map(([t, b]) => (
              <li key={t} className="bg-[var(--bg)] p-8">
                <p className="font-display font-bold text-fg uppercase tracking-tight">{t}</p>
                <p className="font-body text-[15px] text-fg-3 leading-relaxed mt-2">{b}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Enrol + FAQ */}
        <section className="border-b border-[var(--border-col)] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
          <div id="enrol" className="px-6 lg:px-12 py-12 lg:border-r border-b lg:border-b-0 border-[var(--border-col)] scroll-mt-32">
            <h2 className="font-display font-extrabold text-fg uppercase tracking-tight text-3xl mb-2">Reserve your seat</h2>
            <p className="font-body text-fg-3 mb-8">Pick a course, tell us a little about you, and we&apos;ll be in touch.</p>
            <EnrolForm />
          </div>
          <div className="px-6 lg:px-12 py-12">
            <h2 className="font-display font-extrabold text-fg uppercase tracking-tight text-3xl mb-8">FAQ</h2>
            <div className="border-t border-[var(--border-col)]">
              {faqs.map(([q, a]) => (
                <details key={q} className="group border-b border-[var(--border-col)]">
                  <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-body font-semibold text-fg">
                    {q}<span className="text-xl text-fg-3 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="pb-5 font-body text-[15px] text-fg-2 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

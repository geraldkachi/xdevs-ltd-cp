import Link from 'next/link'
import { diplomas, naira, PREORDER_PRICE, SCHEDULE } from '@/lib/academy'
import { SectionHead } from '@/components/ui'

export default function AcademyTeaser() {
  return (
    <section className="border-b border-[var(--border-col)]">
      <SectionHead title="XDEVS Academy" href="/academy" linkLabel="All courses" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr]">
        <div className="bg-fg text-[var(--bg)] px-6 lg:px-10 py-10 flex flex-col justify-between gap-10">
          <div>
            <p className="text-[12px] font-body font-semibold tracking-[0.25em] uppercase opacity-60 mb-5">Tech careers · Mentorship</p>
            <p className="font-display font-extrabold uppercase tracking-tight leading-[1.02]" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.6rem)' }}>
              We don&apos;t just build tech. We teach it.
            </p>
            <p className="font-body text-[15px] opacity-75 leading-relaxed mt-5 max-w-md">
              {SCHEDULE}, taught by XDEVS engineers. Pre-order Python, JavaScript, React, NodeJS, Web3 and AWS for {naira(PREORDER_PRICE)}.
            </p>
          </div>
          <Link href="/academy#enrol" className="self-start px-7 py-4 bg-[var(--bg)] text-fg text-[12px] font-body font-bold tracking-widest uppercase hover:opacity-85">
            Reserve a seat →
          </Link>
        </div>
        <ul className="divide-y divide-[var(--border-col)]">
          {diplomas.map((d) => (
            <li key={d.slug}>
              <Link href={`/academy#${d.slug}`} className="group grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] items-center gap-4 px-6 lg:px-10 py-5 hover:bg-[var(--bg-2)] transition-colors">
                <span className="font-display font-extrabold text-fg uppercase tracking-tight text-lg lg:text-xl">{d.title}</span>
                <span className="hidden sm:block text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3">{d.duration} · {d.levels}</span>
                <span className="font-display font-extrabold text-fg text-lg lg:text-xl tabular-nums w-28 text-right">{naira(d.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

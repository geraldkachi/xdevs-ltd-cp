import Link from 'next/link'
import { team } from '@/lib/team'
import TeamCard, { JoinCard } from '@/components/TeamCard'

export default function TeamSection() {
  return (
    <section className="border-b border-[var(--border-col)] bg-[var(--bg)]">
      <div className="flex items-stretch justify-between border-b border-[var(--border-col)]">
        <h2 className="px-6 lg:px-10 py-6 font-display font-extrabold text-fg tracking-tight uppercase" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 3rem)' }}>
          Our leadership
        </h2>
        <Link href="/team" className="flex items-center px-6 lg:px-10 border-l border-[var(--border-col)] text-[12px] font-body font-bold tracking-widest uppercase text-fg hover:bg-[var(--bg-2)] transition-colors">
          Meet the team →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-col)]">
        {team.map((m) => <TeamCard key={m.slug} m={m} />)}
        <div className="sm:col-span-2 lg:col-span-1"><JoinCard /></div>
      </div>
      <Link href="/team" className="flex items-center justify-center py-5 border-t border-[var(--border-col)] text-[13px] font-body font-bold tracking-widest uppercase text-fg hover:bg-[var(--bg-2)] transition-colors">
        Show all team members
      </Link>
    </section>
  )
}

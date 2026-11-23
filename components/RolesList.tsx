'use client'
import Link from 'next/link'
import { useOpenRoles } from '@/lib/useRoles'
import { supabaseReady } from '@/lib/supabase'

/** Open roles table in UNITED24 list style. `limit` trims it for the home page. */
export default function RolesList({ limit }: { limit?: number }) {
  const { roles, loading, error } = useOpenRoles()
  const shown = limit ? roles.slice(0, limit) : roles

  if (loading) {
    return (
      <div className="divide-y divide-[var(--border-col)]">
        {[0, 1, 2].map((i) => <div key={i} className="h-[76px] px-6 lg:px-10 flex items-center"><div className="h-4 w-1/3 bg-[var(--bg-3)] animate-pulse" /></div>)}
      </div>
    )
  }

  if (!supabaseReady || error || shown.length === 0) {
    return (
      <div className="px-6 lg:px-10 py-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <p className="font-display font-extrabold text-fg uppercase tracking-tight text-xl">No open roles right now</p>
          <p className="font-body text-fg-3 mt-2 max-w-lg">
            We&apos;re always happy to meet great engineers, designers and operators. Create an account so you&apos;re ready to apply the moment a role opens, or send us your CV.
          </p>
        </div>
        <div className="flex flex-wrap gap-0">
          <Link href="/login?mode=signup&next=/careers" className="px-6 py-3.5 bg-fg text-[var(--bg)] text-[12px] font-body font-bold tracking-widest uppercase">Create account</Link>
          <a href="mailto:jobs@xdevs.io" className="px-6 py-3.5 border border-[var(--border-col)] text-fg text-[12px] font-body font-bold tracking-widest uppercase">jobs@xdevs.io</a>
        </div>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-[var(--border-col)]">
      <li className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 lg:px-10 py-3 bg-[var(--bg-2)] text-[11px] font-body font-semibold tracking-widest uppercase text-fg-3">
        <span>Role</span><span>Team</span><span>Location</span><span>Type</span><span className="w-24" />
      </li>
      {shown.map((r) => (
        <li key={r.id}>
          <Link href={`/careers/${r.id}`} className="group grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-1 md:gap-4 items-center px-6 lg:px-10 py-5 hover:bg-[var(--bg-2)] transition-colors">
            <span className="font-display font-extrabold text-fg uppercase tracking-tight text-lg">{r.title}{r.level && <span className="ml-2 text-[11px] font-body font-semibold tracking-widest text-fg-3 align-middle">{r.level}</span>}</span>
            <span className="text-[13px] font-body text-fg-2">{r.team}</span>
            <span className="text-[13px] font-body text-fg-2">{r.location}</span>
            <span className="text-[13px] font-body text-fg-2">{r.type}</span>
            <span className="w-24 text-right text-[12px] font-body font-bold tracking-widest uppercase text-fg group-hover:translate-x-1 transition-transform">Apply →</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

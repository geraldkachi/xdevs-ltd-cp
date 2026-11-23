'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAuth } from '@/components/AuthProvider'
import { getSupabase, type Application } from '@/lib/supabase'

const statusStyle: Record<string, string> = {
  received: 'bg-[var(--bg-3)] text-fg',
  reviewing: 'bg-[#1f5fbf] text-white',
  interview: 'bg-[#6d5bd0] text-white',
  offer: 'bg-emerald-600 text-white',
  rejected: 'bg-[var(--bg-3)] text-fg-3',
}

export default function AccountPage() {
  const router = useRouter()
  const { user, profile, loading, signOut } = useAuth()
  const [apps, setApps] = useState<Application[] | null>(null)

  useEffect(() => { if (!loading && !user) router.replace('/login?next=/account') }, [loading, user, router])

  useEffect(() => {
    const sb = getSupabase()
    if (!sb || !user) return
    sb.from('applications').select('*, roles(title)').eq('user_id', user.id).order('created_at', { ascending: false })
      .then(({ data }) => setApps((data as Application[]) ?? []))
  }, [user])

  if (loading || !user) return (<><Navbar /><main className="min-h-[60vh]" /><Footer /></>)

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-[var(--border-col)] grid grid-cols-1 md:grid-cols-[1fr_auto]">
          <div className="px-6 lg:px-12 py-12">
            <p className="text-[12px] font-body font-semibold tracking-[0.25em] uppercase text-fg-3 mb-4">My account</p>
            <h1 className="font-display font-extrabold text-fg uppercase tracking-tight text-3xl lg:text-5xl">{profile?.full_name || user.email}</h1>
            <p className="font-body text-fg-3 mt-3">{user.email}</p>
          </div>
          <div className="flex md:flex-col border-t md:border-t-0 md:border-l border-[var(--border-col)]">
            {profile?.is_admin && <Link href="/admin" className="flex-1 flex items-center px-8 py-5 bg-fg text-[var(--bg)] text-[12px] font-body font-bold tracking-widest uppercase">Admin panel →</Link>}
            <Link href="/careers" className="flex-1 flex items-center px-8 py-5 text-[12px] font-body font-bold tracking-widest uppercase text-fg hover:bg-[var(--bg-2)] border-r md:border-r-0 md:border-b border-[var(--border-col)]">Browse roles</Link>
            <button onClick={async () => { await signOut(); router.replace('/') }} className="flex-1 flex items-center px-8 py-5 text-[12px] font-body font-bold tracking-widest uppercase text-fg-3 hover:text-fg hover:bg-[var(--bg-2)]">Sign out</button>
          </div>
        </section>

        <section className="border-b border-[var(--border-col)]">
          <h2 className="px-6 lg:px-10 py-6 border-b border-[var(--border-col)] font-display font-extrabold text-fg uppercase tracking-tight text-2xl">My applications</h2>
          {apps === null ? (
            <div className="px-6 lg:px-10 py-8"><div className="h-4 w-1/3 bg-[var(--bg-3)] animate-pulse" /></div>
          ) : apps.length === 0 ? (
            <div className="px-6 lg:px-10 py-12">
              <p className="font-body text-fg-3">You haven&apos;t applied for any roles yet.</p>
              <Link href="/careers" className="inline-flex mt-6 px-6 py-3.5 bg-fg text-[var(--bg)] text-[12px] font-body font-bold tracking-widest uppercase">See open roles →</Link>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--border-col)]">
              {apps.map((a) => (
                <li key={a.id} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 sm:gap-8 items-center px-6 lg:px-10 py-5">
                  <Link href={`/careers/${a.role_id}`} className="font-display font-extrabold text-fg uppercase tracking-tight text-lg hover:underline">{a.roles?.title ?? 'Role'}</Link>
                  <span className="text-[13px] font-body text-fg-3">Applied {new Date(a.created_at).toLocaleDateString('en-GB')}</span>
                  <span className={`justify-self-start px-3 py-1.5 text-[11px] font-body font-bold tracking-widest uppercase ${statusStyle[a.status]}`}>{a.status}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

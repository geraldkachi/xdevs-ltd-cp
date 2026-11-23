'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAuth } from '@/components/AuthProvider'
import { getSupabase, supabaseReady, type Role, type Application } from '@/lib/supabase'
import { lines } from '@/lib/useRoles'
import { Field, inputCls, Button, Notice, BackendMissing } from '@/components/ui'

const MAX_CV = 5 * 1024 * 1024

export default function RolePage() {
  const { id } = useParams<{ id: string }>()
  const { user, profile, loading: authLoading } = useAuth()
  const [role, setRole] = useState<Role | null>(null)
  const [loading, setLoading] = useState(true)
  const [existing, setExisting] = useState<Application | null>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const sb = getSupabase()
    if (!sb) { setLoading(false); return }
    sb.from('roles').select('*').eq('id', id).maybeSingle().then(({ data }) => { setRole(data as Role | null); setLoading(false) })
  }, [id])

  useEffect(() => {
    const sb = getSupabase()
    if (!sb || !user) { setExisting(null); return }
    sb.from('applications').select('*').eq('role_id', id).eq('user_id', user.id).maybeSingle().then(({ data }) => setExisting(data as Application | null))
  }, [id, user])

  async function apply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const sb = getSupabase()
    if (!sb || !user || !role) return
    const f = new FormData(e.currentTarget)
    const cv = f.get('cv') as File | null
    setMsg(null)
    if (cv && cv.size > MAX_CV) { setMsg({ tone: 'error', text: 'CV must be 5 MB or smaller.' }); return }
    setBusy(true)
    try {
      let cv_path: string | null = null
      if (cv && cv.size > 0) {
        const safe = cv.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        cv_path = `${user.id}/${Date.now()}-${safe}`
        const { error: upErr } = await sb.storage.from('cvs').upload(cv_path, cv, { upsert: false, contentType: cv.type || undefined })
        if (upErr) throw upErr
      }
      const { data, error } = await sb.from('applications').insert({
        role_id: role.id,
        user_id: user.id,
        full_name: String(f.get('full_name')).trim(),
        email: String(f.get('email')).trim(),
        phone: String(f.get('phone') || '').trim() || null,
        linkedin: String(f.get('linkedin') || '').trim() || null,
        portfolio: String(f.get('portfolio') || '').trim() || null,
        cover_letter: String(f.get('cover_letter') || '').trim() || null,
        cv_path,
      }).select().single()
      if (error) throw error
      setExisting(data as Application)
      setMsg({ tone: 'ok', text: 'Application sent! You can follow its status from your account.' })
    } catch (err) {
      setMsg({ tone: 'error', text: err instanceof Error ? err.message : 'Could not send application' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {loading ? (
          <div className="px-6 lg:px-12 py-24"><div className="h-10 w-2/3 bg-[var(--bg-3)] animate-pulse" /></div>
        ) : !role ? (
          <section className="px-6 lg:px-12 py-20 border-b border-[var(--border-col)]">
            {!supabaseReady && <div className="mb-6"><BackendMissing /></div>}
            <h1 className="font-display font-extrabold text-fg uppercase tracking-tight text-4xl">Role not found</h1>
            <p className="font-body text-fg-3 mt-4">This role may have been filled or closed.</p>
            <Link href="/careers" className="inline-flex mt-8 px-6 py-3.5 bg-fg text-[var(--bg)] text-[12px] font-body font-bold tracking-widest uppercase">See open roles →</Link>
          </section>
        ) : (
          <>
            <section className="border-b border-[var(--border-col)]">
              <div className="px-6 lg:px-12 pt-10 pb-10">
                <Link href="/careers" className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3 hover:text-fg">← All roles</Link>
                <h1 className="font-display font-extrabold text-fg uppercase tracking-tight leading-[1] mt-8" style={{ fontSize: 'clamp(2.25rem, 5vw, 4.25rem)' }}>{role.title}</h1>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 border-t border-[var(--border-col)]">
                {[['Team', role.team], ['Location', role.location], ['Type', role.type], ['Level', role.level || '—'], ['Salary', role.salary || 'Competitive']].map(([k, v], i) => (
                  <div key={k} className={`px-6 lg:px-8 py-5 border-[var(--border-col)] ${i < 4 ? 'border-r' : ''} ${i < 3 ? 'border-b md:border-b-0' : ''}`}>
                    <p className="text-[11px] font-body font-semibold tracking-widest uppercase text-fg-3">{k}</p>
                    <p className="font-body font-semibold text-fg mt-1">{v}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] border-b border-[var(--border-col)]">
              <div className="px-6 lg:px-12 py-12 lg:border-r border-b lg:border-b-0 border-[var(--border-col)] space-y-10">
                {role.summary && <p className="font-body text-lg text-fg-2 leading-relaxed">{role.summary}</p>}
                {lines(role.responsibilities).length > 0 && (
                  <div>
                    <h2 className="font-display font-extrabold text-fg uppercase tracking-tight text-xl mb-4">What you&apos;ll do</h2>
                    <ul className="space-y-3">{lines(role.responsibilities).map((l) => <li key={l} className="flex gap-3 font-body text-fg-2"><span className="text-fg-3">→</span>{l}</li>)}</ul>
                  </div>
                )}
                {lines(role.requirements).length > 0 && (
                  <div>
                    <h2 className="font-display font-extrabold text-fg uppercase tracking-tight text-xl mb-4">What we&apos;re looking for</h2>
                    <ul className="space-y-3">{lines(role.requirements).map((l) => <li key={l} className="flex gap-3 font-body text-fg-2"><span className="text-fg-3">→</span>{l}</li>)}</ul>
                  </div>
                )}
              </div>

              <div id="apply" className="px-6 lg:px-12 py-12 bg-[var(--bg-2)]">
                <h2 className="font-display font-extrabold text-fg uppercase tracking-tight text-2xl mb-6">Apply for this role</h2>
                {authLoading ? null : !user ? (
                  <div className="space-y-5">
                    <p className="font-body text-fg-2">Sign in or create a free account to apply. You&apos;ll be able to track your application status afterwards.</p>
                    <div className="flex flex-wrap gap-0">
                      <Link href={`/login?next=/careers/${role.id}`} className="px-6 py-3.5 bg-fg text-[var(--bg)] text-[12px] font-body font-bold tracking-widest uppercase">Sign in to apply</Link>
                      <Link href={`/login?mode=signup&next=/careers/${role.id}`} className="px-6 py-3.5 border border-[var(--fg)] text-fg text-[12px] font-body font-bold tracking-widest uppercase">Create account</Link>
                    </div>
                  </div>
                ) : existing ? (
                  <div className="space-y-5">
                    {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
                    <Notice>
                      You applied on {new Date(existing.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}. Status:{' '}
                      <strong className="text-fg uppercase tracking-wider">{existing.status}</strong>
                    </Notice>
                    <Link href="/account" className="inline-flex px-6 py-3.5 bg-fg text-[var(--bg)] text-[12px] font-body font-bold tracking-widest uppercase">My applications →</Link>
                  </div>
                ) : (
                  <form onSubmit={apply} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Full name" required><input name="full_name" required defaultValue={profile?.full_name ?? ''} className={inputCls} /></Field>
                      <Field label="Email" required><input name="email" type="email" required defaultValue={user.email ?? ''} className={inputCls} /></Field>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Phone"><input name="phone" className={inputCls} placeholder="+234…" /></Field>
                      <Field label="LinkedIn"><input name="linkedin" type="url" className={inputCls} placeholder="https://linkedin.com/in/…" /></Field>
                    </div>
                    <Field label="Portfolio / GitHub"><input name="portfolio" type="url" className={inputCls} placeholder="https://…" /></Field>
                    <Field label="CV" hint="PDF or Word, up to 5 MB">
                      <input name="cv" type="file" accept=".pdf,.doc,.docx" className={inputCls + ' file:mr-4 file:border-0 file:bg-fg file:text-[var(--bg)] file:px-3 file:py-1.5 file:text-xs file:font-bold file:uppercase file:tracking-widest'} />
                    </Field>
                    <Field label="Why this role?"><textarea name="cover_letter" rows={5} className={inputCls} placeholder="A few lines about you and why you'd be great here" /></Field>
                    {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
                    <Button disabled={busy} className="w-full">{busy ? 'Sending…' : 'Submit application →'}</Button>
                  </form>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

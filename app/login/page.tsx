'use client'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAuth } from '@/components/AuthProvider'
import { getSupabase, supabaseReady } from '@/lib/supabase'
import { Field, inputCls, Button, Notice, BackendMissing } from '@/components/ui'

type Mode = 'signin' | 'signup' | 'forgot'

function LoginInner() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/account'
  const { user, loading } = useAuth()
  const [mode, setMode] = useState<Mode>(params.get('mode') === 'signup' ? 'signup' : 'signin')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null)

  useEffect(() => { if (!loading && user) router.replace(next) }, [user, loading, next, router])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const sb = getSupabase()
    if (!sb) return
    const f = new FormData(e.currentTarget)
    const email = String(f.get('email')).trim()
    const password = String(f.get('password') || '')
    setBusy(true); setMsg(null)
    try {
      if (mode === 'signin') {
        const { error } = await sb.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.replace(next)
      } else if (mode === 'signup') {
        const { data, error } = await sb.auth.signUp({
          email, password,
          options: { data: { full_name: String(f.get('full_name')).trim() }, emailRedirectTo: `${window.location.origin}${next}` },
        })
        if (error) throw error
        if (data.session) router.replace(next)
        else setMsg({ tone: 'ok', text: 'Account created. Check your email to confirm your address, then sign in.' })
      } else {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
        if (error) throw error
        setMsg({ tone: 'ok', text: 'If that email has an account, a reset link is on its way.' })
      }
    } catch (err) {
      setMsg({ tone: 'error', text: err instanceof Error ? err.message : 'Something went wrong' })
    } finally {
      setBusy(false)
    }
  }

  const title = mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Reset password'

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[var(--border-col)] min-h-[70vh]">
      <div className="hidden lg:flex flex-col justify-between bg-fg text-[var(--bg)] px-12 py-12">
        <p className="text-[12px] font-body font-semibold tracking-[0.25em] uppercase opacity-60">XDEVS Careers</p>
        <p className="font-display font-extrabold uppercase tracking-tight leading-[1]" style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}>
          One account.<br />Apply in minutes.<br />Track every application.
        </p>
        <p className="font-body opacity-70 max-w-sm">Sign in to apply for open roles at XDEVS and follow your application status.</p>
      </div>
      <div className="px-6 lg:px-16 py-12 flex flex-col justify-center max-w-xl w-full mx-auto">
        <div className="flex border border-[var(--border-col)] mb-10">
          {(['signin', 'signup'] as Mode[]).map((m) => (
            <button key={m} type="button" onClick={() => { setMode(m); setMsg(null) }}
              className={`flex-1 py-3.5 text-[12px] font-body font-bold tracking-widest uppercase transition-colors ${mode === m ? 'bg-fg text-[var(--bg)]' : 'text-fg-3 hover:text-fg'}`}>
              {m === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          ))}
        </div>
        <h1 className="font-display font-extrabold text-fg uppercase tracking-tight text-3xl mb-8">{title}</h1>
        <form onSubmit={submit} className="space-y-5">
          {!supabaseReady && <BackendMissing />}
          {mode === 'signup' && <Field label="Full name" required><input name="full_name" required className={inputCls} autoComplete="name" /></Field>}
          <Field label="Email" required><input name="email" type="email" required className={inputCls} autoComplete="email" /></Field>
          {mode !== 'forgot' && (
            <Field label="Password" required hint={mode === 'signup' ? 'At least 8 characters' : undefined}>
              <input name="password" type="password" required minLength={mode === 'signup' ? 8 : undefined} className={inputCls} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} />
            </Field>
          )}
          {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
          <Button disabled={!supabaseReady || busy} className="w-full">{busy ? 'Please wait…' : `${title} →`}</Button>
        </form>
        <div className="mt-6 flex justify-between text-[13px] font-body text-fg-3">
          {mode === 'forgot'
            ? <button type="button" onClick={() => setMode('signin')} className="hover:text-fg">← Back to sign in</button>
            : <button type="button" onClick={() => { setMode('forgot'); setMsg(null) }} className="hover:text-fg">Forgot password?</button>}
          <Link href="/careers" className="hover:text-fg">View open roles</Link>
        </div>
      </div>
    </section>
  )
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main><Suspense><LoginInner /></Suspense></main>
      <Footer />
    </>
  )
}

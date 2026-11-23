'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getSupabase } from '@/lib/supabase'
import { Field, inputCls, Button, Notice } from '@/components/ui'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const password = String(new FormData(e.currentTarget).get('password'))
    const sb = getSupabase()
    if (!sb) return
    setBusy(true)
    const { error } = await sb.auth.updateUser({ password })
    setBusy(false)
    if (error) setMsg({ tone: 'error', text: error.message })
    else { setMsg({ tone: 'ok', text: 'Password updated. Taking you to your account…' }); setTimeout(() => router.replace('/account'), 1200) }
  }

  return (
    <>
      <Navbar />
      <main className="px-6 py-16 border-b border-[var(--border-col)]">
        <div className="max-w-md mx-auto">
          <h1 className="font-display font-extrabold text-fg uppercase tracking-tight text-3xl mb-8">Choose a new password</h1>
          <form onSubmit={submit} className="space-y-5">
            <Field label="New password" required hint="At least 8 characters">
              <input name="password" type="password" minLength={8} required className={inputCls} autoComplete="new-password" />
            </Field>
            {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
            <Button disabled={busy} className="w-full">{busy ? 'Saving…' : 'Save password →'}</Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

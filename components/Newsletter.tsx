'use client'
import { useState } from 'react'
import { getSupabase } from '@/lib/supabase'

export default function Newsletter() {
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = String(new FormData(form).get('email')).trim().toLowerCase()
    const sb = getSupabase()
    if (!sb) { window.location.href = `mailto:hello@xdevs.io?subject=Newsletter&body=${encodeURIComponent(`Please subscribe ${email}`)}`; return }
    setState('busy')
    const { error } = await sb.from('newsletter').insert({ email })
    // A duplicate email means they are already subscribed — treat as success
    if (error && error.code !== '23505') { setState('error'); return }
    form.reset(); setState('done')
  }

  if (state === 'done') return <p className="border border-[var(--border-col)] px-4 py-3 text-xs font-body tracking-widest uppercase text-fg">✓ You&apos;re subscribed</p>

  return (
    <form onSubmit={submit} className="flex border border-[var(--border-col)]">
      <input name="email" type="email" required placeholder="ENTER YOUR E-MAIL" aria-label="Email address"
        className="flex-1 min-w-0 bg-transparent px-4 py-3 text-xs font-body tracking-widest text-fg placeholder:text-fg-3 focus:outline-none" />
      <button disabled={state === 'busy'} className="bg-fg text-[var(--bg)] font-body font-bold text-[10px] tracking-widest uppercase px-5 hover:opacity-85 transition-opacity disabled:opacity-50">
        {state === 'error' ? 'RETRY' : 'SUBSCRIBE'}
      </button>
    </form>
  )
}

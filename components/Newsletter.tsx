'use client'
import { useState } from 'react'
import { getSupabase } from '@/lib/supabase'

export default function Newsletter({ variant = 'default' }: { variant?: 'default' | 'footer' }) {
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

  if (variant === 'footer') {
    if (state === 'done') return <p className="px-6 lg:px-10 py-6 font-body uppercase text-white">✓ You&apos;re subscribed — thank you</p>
    return (
      <form onSubmit={submit} className="flex">
        <input name="email" type="email" required placeholder="ENTER YOUR E-MAIL" aria-label="Email address"
          className="flex-1 min-w-0 bg-transparent px-6 lg:px-10 py-6 font-body text-lg uppercase text-white placeholder:text-white/45 focus:outline-none" />
        <button disabled={state === 'busy'} className="w-[38%] bg-[#262626] text-white font-body text-lg uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-50">
          {state === 'error' ? 'Retry' : 'Subscribe'}
        </button>
      </form>
    )
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

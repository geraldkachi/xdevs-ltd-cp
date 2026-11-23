'use client'
import { useState } from 'react'
import { getSupabase, supabaseReady } from '@/lib/supabase'
import { Field, inputCls, Button, Notice } from '@/components/ui'

const services = ['Software Engineering', 'Data Engineering', 'Business Intelligence', 'AI & ML Integration', 'API & Integrations', 'Cloud & DevOps', 'Academy / Training', 'Something else']
const budgets = ['Under $10k', '$10k – $50k', '$50k – $150k', '$150k+', 'Not sure yet']

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [err, setErr] = useState('')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const row = {
      name: String(f.get('name')).trim(),
      email: String(f.get('email')).trim(),
      company: String(f.get('company') || '').trim() || null,
      service: String(f.get('service')),
      budget: String(f.get('budget')),
      message: String(f.get('message')).trim(),
    }
    const sb = getSupabase()
    if (!sb) {
      // No backend yet: fall back to the visitor's email app
      const body = `${row.message}\n\n— ${row.name}${row.company ? `, ${row.company}` : ''}\nService: ${row.service}\nBudget: ${row.budget}`
      window.location.href = `mailto:hello@xdevs.io?subject=${encodeURIComponent(`Project enquiry — ${row.service}`)}&body=${encodeURIComponent(body)}`
      return
    }
    setState('sending')
    const { error } = await sb.from('contact_messages').insert(row)
    if (error) { setErr(error.message); setState('error'); return }
    form.reset()
    setState('done')
  }

  if (state === 'done') return <Notice tone="ok"><strong className="text-fg">Message received.</strong> We reply within 24 hours on business days.</Notice>

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" required><input name="name" required className={inputCls} autoComplete="name" /></Field>
        <Field label="Email" required><input name="email" type="email" required className={inputCls} autoComplete="email" /></Field>
      </div>
      <Field label="Company"><input name="company" className={inputCls} autoComplete="organization" /></Field>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Service" required>
          <select name="service" required className={inputCls}>{services.map((s) => <option key={s} className="bg-[var(--bg)]">{s}</option>)}</select>
        </Field>
        <Field label="Budget" required>
          <select name="budget" required className={inputCls}>{budgets.map((s) => <option key={s} className="bg-[var(--bg)]">{s}</option>)}</select>
        </Field>
      </div>
      <Field label="Tell us about your project" required><textarea name="message" required rows={6} className={inputCls} /></Field>
      {state === 'error' && <Notice tone="error">Could not send: {err}</Notice>}
      <Button disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message →'}</Button>
      {!supabaseReady && <p className="text-[12px] font-body text-fg-3">This opens your email app until the site backend is connected.</p>}
    </form>
  )
}

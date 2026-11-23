'use client'
import { useEffect, useState } from 'react'
import { diplomas, preorders, naira, PREORDER_PRICE } from '@/lib/academy'
import { getSupabase, supabaseReady } from '@/lib/supabase'
import { Field, inputCls, Button, Notice, BackendMissing } from '@/components/ui'
import Select from '@/components/Select'

const options = [
  ...diplomas.map((d) => ({ value: d.title, label: `${d.title} — ${naira(d.price)} (${d.duration})`, kind: 'diploma' })),
  ...preorders.map((p) => ({ value: p.title, label: `${p.title} pre-order — ${naira(PREORDER_PRICE)}`, kind: 'preorder' })),
  { value: 'Mentorship', label: 'One-to-one mentorship', kind: 'mentorship' },
]

export default function EnrolForm() {
  const [course, setCourse] = useState(options[0].value)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [err, setErr] = useState('')

  // Course buttons elsewhere on the page dispatch this event to preselect a course
  useEffect(() => {
    const pick = (e: Event) => setCourse((e as CustomEvent<string>).detail)
    window.addEventListener('xdevs:enrol', pick)
    return () => window.removeEventListener('xdevs:enrol', pick)
  }, [])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const sb = getSupabase()
    if (!sb) return
    setState('sending'); setErr('')
    const kind = options.find((o) => o.value === course)?.kind ?? 'diploma'
    const { error } = await sb.from('enrollments').insert({
      course, kind,
      full_name: String(f.get('full_name')).trim(),
      email: String(f.get('email')).trim(),
      phone: String(f.get('phone') || '').trim() || null,
      experience: String(f.get('experience') || ''),
      message: String(f.get('message') || '').trim() || null,
    })
    if (error) { setState('error'); setErr(error.message); return }
    form.reset()
    setState('done')
  }

  if (state === 'done') {
    return (
      <div className="space-y-4">
        <Notice tone="ok"><strong className="text-fg">You&apos;re on the list.</strong> We&apos;ll email you within 48 hours with payment details, start dates and your class schedule.</Notice>
        <Button type="button" variant="outline" onClick={() => setState('idle')}>Register another</Button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {!supabaseReady && <BackendMissing />}
      <Field label="Course" required>
        <Select value={course} onChange={setCourse} options={options} searchable ariaLabel="Course" />
      </Field>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" required><input name="full_name" required className={inputCls} placeholder="Your name" /></Field>
        <Field label="Email" required><input name="email" type="email" required className={inputCls} placeholder="you@email.com" /></Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Phone / WhatsApp"><input name="phone" className={inputCls} placeholder="+234…" /></Field>
        <Field label="Experience">
          <Select name="experience" defaultValue="Complete beginner" options={['Complete beginner', 'Some self-taught basics', 'Working in tech, switching tracks']} ariaLabel="Experience" />
        </Field>
      </div>
      <Field label="Anything we should know?"><textarea name="message" rows={3} className={inputCls} placeholder="Goals, preferred class times, questions…" /></Field>
      {state === 'error' && <Notice tone="error">Something went wrong: {err}</Notice>}
      <Button disabled={!supabaseReady || state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Reserve my seat →'}</Button>
      <p className="text-[12px] font-body text-fg-3">No payment is taken here — we confirm your seat and send payment details by email.</p>
    </form>
  )
}

export function EnrolButton({ course, label = 'Enrol →', className = '' }: { course: string; label?: string; className?: string }) {
  return (
    <a
      href="#enrol"
      onClick={() => window.dispatchEvent(new CustomEvent('xdevs:enrol', { detail: course }))}
      className={`inline-flex items-center justify-center px-6 py-3.5 text-[12px] font-body font-bold tracking-widest uppercase bg-fg text-[var(--bg)] hover:opacity-85 transition-opacity ${className}`}
    >
      {label}
    </a>
  )
}

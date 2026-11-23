'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAuth } from '@/components/AuthProvider'
import { getSupabase, STATUSES, type Role, type Application } from '@/lib/supabase'
import { Field, inputCls, Button, Notice } from '@/components/ui'
import Select from '@/components/Select'

type Tab = 'roles' | 'applications' | 'academy' | 'messages'
type Enrollment = { id: string; course: string; kind: string; full_name: string; email: string; phone: string | null; experience: string | null; message: string | null; created_at: string }
type Message = { id: string; name: string; email: string; company: string | null; service: string | null; budget: string | null; message: string; created_at: string }

const emptyRole: Partial<Role> = { title: '', team: 'Engineering', location: 'Remote', type: 'Full-time', level: '', salary: '', summary: '', responsibilities: '', requirements: '', is_open: true }
const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

export default function AdminPage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [tab, setTab] = useState<Tab>('roles')

  useEffect(() => { if (!loading && !user) router.replace('/login?next=/admin') }, [loading, user, router])

  if (loading || !user || !profile) return (<><Navbar /><main className="min-h-[60vh]" /><Footer /></>)

  if (!profile.is_admin) {
    return (
      <>
        <Navbar />
        <main className="px-6 lg:px-12 py-20 border-b border-[var(--border-col)]">
          <h1 className="font-display font-extrabold text-fg uppercase tracking-tight text-4xl">Admins only</h1>
          <p className="font-body text-fg-3 mt-4 max-w-lg">Your account doesn&apos;t have admin access. If you run this site, mark your profile as admin in Supabase (see SETUP.md).</p>
          <Link href="/account" className="inline-flex mt-8 px-6 py-3.5 bg-fg text-[var(--bg)] text-[12px] font-body font-bold tracking-widest uppercase">My account →</Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-[var(--border-col)] px-6 lg:px-12 pt-10 pb-0">
          <p className="text-[12px] font-body font-semibold tracking-[0.25em] uppercase text-fg-3 mb-3">Admin</p>
          <h1 className="font-display font-extrabold text-fg uppercase tracking-tight text-3xl lg:text-5xl mb-8">Dashboard</h1>
          <div className="flex overflow-x-auto -mx-6 lg:-mx-12 border-t border-[var(--border-col)]">
            {(['roles', 'applications', 'academy', 'messages'] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-6 lg:px-10 py-4 text-[12px] font-body font-bold tracking-widest uppercase border-r border-[var(--border-col)] whitespace-nowrap ${tab === t ? 'bg-fg text-[var(--bg)]' : 'text-fg-3 hover:text-fg hover:bg-[var(--bg-2)]'}`}>
                {t === 'academy' ? 'Academy sign-ups' : t}
              </button>
            ))}
          </div>
        </section>
        {tab === 'roles' && <RolesAdmin />}
        {tab === 'applications' && <ApplicationsAdmin />}
        {tab === 'academy' && <SimpleTable<Enrollment> table="enrollments" cols={[['course', 'Course'], ['kind', 'Type'], ['full_name', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['experience', 'Experience'], ['message', 'Notes']]} />}
        {tab === 'messages' && <SimpleTable<Message> table="contact_messages" cols={[['name', 'Name'], ['email', 'Email'], ['company', 'Company'], ['service', 'Service'], ['budget', 'Budget'], ['message', 'Message']]} />}
      </main>
      <Footer />
    </>
  )
}

/* ---------------- Roles ---------------- */
function RolesAdmin() {
  const [roles, setRoles] = useState<Role[]>([])
  const [editing, setEditing] = useState<Partial<Role> | null>(null)
  const [msg, setMsg] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    const { data } = await getSupabase()!.from('roles').select('*').order('created_at', { ascending: false })
    setRoles((data as Role[]) ?? [])
  }, [])
  useEffect(() => { load() }, [load])

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!editing) return
    const sb = getSupabase()!
    const f = new FormData(e.currentTarget)
    const row = {
      title: String(f.get('title')).trim(),
      team: String(f.get('team')).trim(),
      location: String(f.get('location')).trim(),
      type: String(f.get('type')),
      level: String(f.get('level') || '').trim() || null,
      salary: String(f.get('salary') || '').trim() || null,
      summary: String(f.get('summary') || '').trim() || null,
      responsibilities: String(f.get('responsibilities') || '').trim() || null,
      requirements: String(f.get('requirements') || '').trim() || null,
      is_open: f.get('is_open') === 'on',
    }
    setBusy(true)
    const { error } = editing.id ? await sb.from('roles').update(row).eq('id', editing.id) : await sb.from('roles').insert(row)
    setBusy(false)
    if (error) { setMsg({ tone: 'error', text: error.message }); return }
    setMsg({ tone: 'ok', text: editing.id ? 'Role updated.' : 'Role published — it is now live on /careers.' })
    setEditing(null)
    load()
  }

  async function toggle(r: Role) {
    await getSupabase()!.from('roles').update({ is_open: !r.is_open }).eq('id', r.id)
    load()
  }

  async function remove(r: Role) {
    if (!confirm(`Delete "${r.title}" and all its applications? This cannot be undone.`)) return
    await getSupabase()!.from('roles').delete().eq('id', r.id)
    load()
  }

  return (
    <section className="border-b border-[var(--border-col)]">
      <div className="flex items-center justify-between px-6 lg:px-10 py-5 border-b border-[var(--border-col)]">
        <h2 className="font-display font-extrabold text-fg uppercase tracking-tight text-xl">Roles ({roles.length})</h2>
        <Button type="button" onClick={() => { setEditing({ ...emptyRole }); setMsg(null) }}>+ New role</Button>
      </div>
      {msg && <div className="px-6 lg:px-10 pt-5"><Notice tone={msg.tone}>{msg.text}</Notice></div>}

      {editing && (
        <form key={editing.id ?? 'new'} onSubmit={save} className="px-6 lg:px-10 py-8 border-b border-[var(--border-col)] bg-[var(--bg-2)] space-y-5">
          <h3 className="font-display font-extrabold text-fg uppercase tracking-tight">{editing.id ? 'Edit role' : 'New role'}</h3>
          <div className="grid md:grid-cols-3 gap-5">
            <Field label="Title" required><input name="title" required defaultValue={editing.title} className={inputCls} placeholder="e.g. Frontend Engineer" /></Field>
            <Field label="Team" required><input name="team" required defaultValue={editing.team} className={inputCls} /></Field>
            <Field label="Location" required><input name="location" required defaultValue={editing.location} className={inputCls} /></Field>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Field label="Type">
              <Select name="type" defaultValue={editing.type ?? 'Full-time'} options={['Full-time', 'Part-time', 'Contract', 'Internship']} ariaLabel="Type" />
            </Field>
            <Field label="Level"><input name="level" defaultValue={editing.level ?? ''} className={inputCls} placeholder="Junior / Mid / Senior" /></Field>
            <Field label="Salary"><input name="salary" defaultValue={editing.salary ?? ''} className={inputCls} placeholder="Optional, e.g. ₦600k–₦900k / month" /></Field>
          </div>
          <Field label="Summary"><textarea name="summary" rows={2} defaultValue={editing.summary ?? ''} className={inputCls} /></Field>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Responsibilities" hint="One per line"><textarea name="responsibilities" rows={5} defaultValue={editing.responsibilities ?? ''} className={inputCls} /></Field>
            <Field label="Requirements" hint="One per line"><textarea name="requirements" rows={5} defaultValue={editing.requirements ?? ''} className={inputCls} /></Field>
          </div>
          <label className="flex items-center gap-3 font-body text-fg">
            <input type="checkbox" name="is_open" defaultChecked={editing.is_open ?? true} className="w-4 h-4 accent-current" /> Open — show on the careers page
          </label>
          <div className="flex gap-3">
            <Button disabled={busy}>{busy ? 'Saving…' : editing.id ? 'Save changes' : 'Publish role'}</Button>
            <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </form>
      )}

      {roles.length === 0 ? (
        <p className="px-6 lg:px-10 py-10 font-body text-fg-3">No roles yet. Click “New role” to post your first one.</p>
      ) : (
        <ul className="divide-y divide-[var(--border-col)]">
          {roles.map((r) => (
            <li key={r.id} className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-center px-6 lg:px-10 py-5">
              <div>
                <p className="font-display font-extrabold text-fg uppercase tracking-tight text-lg">{r.title}</p>
                <p className="text-[13px] font-body text-fg-3 mt-1">{r.team} · {r.location} · {r.type} · posted {fmt(r.created_at)}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => toggle(r)} className={`px-3 py-2 text-[11px] font-body font-bold tracking-widest uppercase ${r.is_open ? 'bg-emerald-600 text-white' : 'bg-[var(--bg-3)] text-fg-3'}`}>{r.is_open ? 'Open' : 'Closed'}</button>
                <Link href={`/careers/${r.id}`} className="px-3 py-2 border border-[var(--border-col)] text-[11px] font-body font-bold tracking-widest uppercase text-fg">View</Link>
                <button onClick={() => { setEditing(r); setMsg(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="px-3 py-2 border border-[var(--border-col)] text-[11px] font-body font-bold tracking-widest uppercase text-fg">Edit</button>
                <button onClick={() => remove(r)} className="px-3 py-2 border border-red-500/40 text-[11px] font-body font-bold tracking-widest uppercase text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/* ---------------- Applications ---------------- */
function ApplicationsAdmin() {
  const [apps, setApps] = useState<Application[]>([])
  const [roles, setRoles] = useState<Pick<Role, 'id' | 'title'>[]>([])
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState<string | null>(null)

  const load = useCallback(async () => {
    const sb = getSupabase()!
    const [{ data: a }, { data: r }] = await Promise.all([
      sb.from('applications').select('*, roles(title)').order('created_at', { ascending: false }),
      sb.from('roles').select('id,title').order('created_at', { ascending: false }),
    ])
    setApps((a as Application[]) ?? [])
    setRoles((r as Pick<Role, 'id' | 'title'>[]) ?? [])
  }, [])
  useEffect(() => { load() }, [load])

  async function setStatus(id: string, status: string) {
    await getSupabase()!.from('applications').update({ status }).eq('id', id)
    setApps((xs) => xs.map((x) => (x.id === id ? { ...x, status: status as Application['status'] } : x)))
  }

  async function openCv(path: string) {
    const { data, error } = await getSupabase()!.storage.from('cvs').createSignedUrl(path, 120)
    if (error) return alert(error.message)
    window.open(data.signedUrl, '_blank', 'noopener')
  }

  const shown = filter === 'all' ? apps : apps.filter((a) => a.role_id === filter)

  return (
    <section className="border-b border-[var(--border-col)]">
      <div className="flex flex-wrap gap-4 items-center justify-between px-6 lg:px-10 py-5 border-b border-[var(--border-col)]">
        <h2 className="font-display font-extrabold text-fg uppercase tracking-tight text-xl">Applications ({shown.length})</h2>
        <div className="w-64"><Select compact searchable value={filter} onChange={setFilter} options={[{ value: 'all', label: 'All roles' }, ...roles.map((r) => ({ value: r.id, label: r.title }))]} ariaLabel="Filter by role" /></div>
      </div>
      {shown.length === 0 ? (
        <p className="px-6 lg:px-10 py-10 font-body text-fg-3">No applications yet.</p>
      ) : (
        <ul className="divide-y divide-[var(--border-col)]">
          {shown.map((a) => (
            <li key={a.id} className="px-6 lg:px-10 py-5">
              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_auto_auto] gap-3 lg:gap-6 items-center">
                <button onClick={() => setOpen(open === a.id ? null : a.id)} className="text-left">
                  <p className="font-display font-extrabold text-fg uppercase tracking-tight">{a.full_name}</p>
                  <p className="text-[13px] font-body text-fg-3">{a.email}{a.phone ? ` · ${a.phone}` : ''}</p>
                </button>
                <p className="text-[13px] font-body text-fg-2">{a.roles?.title ?? '—'} <span className="text-fg-3">· {fmt(a.created_at)}</span></p>
                <div className="flex gap-2">
                  {a.cv_path && <button onClick={() => openCv(a.cv_path!)} className="px-3 py-2 border border-[var(--border-col)] text-[11px] font-body font-bold tracking-widest uppercase text-fg">CV ↗</button>}
                  <button onClick={() => setOpen(open === a.id ? null : a.id)} className="px-3 py-2 border border-[var(--border-col)] text-[11px] font-body font-bold tracking-widest uppercase text-fg">{open === a.id ? 'Hide' : 'Details'}</button>
                </div>
                <div className="w-44"><Select compact value={a.status} onChange={(v) => setStatus(a.id, v)} options={STATUSES.map((s) => ({ value: s, label: s }))} ariaLabel="Status" /></div>
              </div>
              {open === a.id && (
                <div className="mt-4 p-5 bg-[var(--bg-2)] space-y-2 text-[14px] font-body text-fg-2">
                  {a.linkedin && <p>LinkedIn: <a href={a.linkedin} target="_blank" rel="noopener noreferrer" className="underline">{a.linkedin}</a></p>}
                  {a.portfolio && <p>Portfolio: <a href={a.portfolio} target="_blank" rel="noopener noreferrer" className="underline">{a.portfolio}</a></p>}
                  <p className="whitespace-pre-wrap">{a.cover_letter || <span className="text-fg-3">No cover note.</span>}</p>
                  <a href={`mailto:${a.email}?subject=${encodeURIComponent(`Your application — ${a.roles?.title ?? 'XDEVS'}`)}`} className="inline-flex mt-2 text-[12px] font-bold tracking-widest uppercase text-fg underline">Email candidate →</a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/* ---------------- Generic read-only table (academy, messages) ---------------- */
function SimpleTable<T extends { id: string; created_at: string }>({ table, cols }: { table: string; cols: [keyof T & string, string][] }) {
  const [rows, setRows] = useState<T[] | null>(null)
  useEffect(() => {
    getSupabase()!.from(table).select('*').order('created_at', { ascending: false }).then(({ data }) => setRows((data as T[]) ?? []))
  }, [table])

  function exportCsv() {
    if (!rows) return
    const head = ['created_at', ...cols.map((c) => c[0])]
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csv = [head.join(','), ...rows.map((r) => head.map((h) => esc((r as Record<string, unknown>)[h])).join(','))].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a'); a.href = url; a.download = `${table}.csv`; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <section className="border-b border-[var(--border-col)]">
      <div className="flex items-center justify-between px-6 lg:px-10 py-5 border-b border-[var(--border-col)]">
        <h2 className="font-display font-extrabold text-fg uppercase tracking-tight text-xl">{rows?.length ?? 0} entries</h2>
        <Button type="button" variant="outline" onClick={exportCsv}>Export CSV</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px] font-body">
          <thead className="bg-[var(--bg-2)] text-[11px] uppercase tracking-widest text-fg-3">
            <tr><th className="px-6 py-3 font-semibold">Date</th>{cols.map(([k, l]) => <th key={k} className="px-4 py-3 font-semibold">{l}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-col)]">
            {(rows ?? []).map((r) => (
              <tr key={r.id} className="align-top">
                <td className="px-6 py-3 text-fg-3 whitespace-nowrap">{fmt(r.created_at)}</td>
                {cols.map(([k]) => <td key={k} className="px-4 py-3 text-fg-2 max-w-xs whitespace-pre-wrap">{String((r as Record<string, unknown>)[k] ?? '—')}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        {rows && rows.length === 0 && <p className="px-6 lg:px-10 py-10 font-body text-fg-3">Nothing here yet.</p>}
      </div>
    </section>
  )
}

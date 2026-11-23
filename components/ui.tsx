// Small shared UI pieces: section headers, form fields, notices.
import Link from 'next/link'

export function SectionHead({ title, href, linkLabel, id }: { title: string; href?: string; linkLabel?: string; id?: string }) {
  return (
    <div id={id} className="flex items-stretch justify-between border-b border-[var(--border-col)] scroll-mt-32">
      <h2 className="px-6 lg:px-10 py-6 font-display font-extrabold text-fg tracking-tight uppercase" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)' }}>{title}</h2>
      {href && (
        <Link href={href} className="flex items-center px-6 lg:px-10 border-l border-[var(--border-col)] text-[12px] font-body font-bold tracking-widest uppercase text-fg hover:bg-[var(--bg-2)] transition-colors whitespace-nowrap">
          {linkLabel ?? 'View all'} →
        </Link>
      )}
    </div>
  )
}

export function PageHero({ eyebrow, title, intro, crumbs }: { eyebrow: string; title: React.ReactNode; intro?: React.ReactNode; crumbs?: { label: string; href: string }[] }) {
  return (
    <section className="border-b border-[var(--border-col)]">
      <div className="px-6 lg:px-12 pt-10 pb-12">
        {crumbs && (
          <nav className="flex items-center gap-2 text-[13px] font-body text-fg-3 mb-8">
            <Link href="/" className="hover:text-fg">Home</Link>
            {crumbs.map((c) => (
              <span key={c.href} className="flex items-center gap-2"><span>/</span><Link href={c.href} className="hover:text-fg">{c.label}</Link></span>
            ))}
          </nav>
        )}
        <p className="text-[12px] font-body font-semibold tracking-[0.25em] uppercase text-fg-3 mb-5">{eyebrow}</p>
        <h1 className="font-display font-extrabold text-fg tracking-tight uppercase leading-[1] max-w-5xl" style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)' }}>
          {title}
        </h1>
        {intro && <div className="font-body text-base lg:text-lg text-fg-2 leading-relaxed max-w-2xl mt-8">{intro}</div>}
      </div>
    </section>
  )
}

export const inputCls =
  'w-full bg-transparent border border-[var(--border-col)] px-4 py-3.5 text-[15px] font-body text-fg placeholder:text-fg-3 focus:outline-none focus:border-[var(--fg)] transition-colors'

export function Field({ label, children, hint, required }: { label: string; children: React.ReactNode; hint?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-2">
        {label}{required && <span className="text-fg"> *</span>}
      </span>
      {children}
      {hint && <span className="block text-[12px] font-body text-fg-3 mt-1.5">{hint}</span>}
    </label>
  )
}

export function Button({ children, disabled, type = 'submit', onClick, variant = 'solid', className = '' }: { children: React.ReactNode; disabled?: boolean; type?: 'submit' | 'button'; onClick?: () => void; variant?: 'solid' | 'outline'; className?: string }) {
  const base = 'inline-flex items-center justify-center gap-2 px-7 py-4 text-[12px] font-body font-bold tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed'
  const v = variant === 'solid' ? 'bg-fg text-[var(--bg)] hover:opacity-85' : 'border border-[var(--fg)] text-fg hover:bg-fg hover:text-[var(--bg)]'
  return <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${v} ${className}`}>{children}</button>
}

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'ok' | 'error'; children: React.ReactNode }) {
  const c = tone === 'ok' ? 'border-emerald-600/40 bg-emerald-500/10' : tone === 'error' ? 'border-red-600/40 bg-red-500/10' : 'border-[var(--border-col)] bg-[var(--bg-2)]'
  return <div className={`border px-4 py-3 text-sm font-body text-fg-2 ${c}`}>{children}</div>
}

export function BackendMissing() {
  return (
    <Notice>
      <strong className="text-fg">Backend not connected yet.</strong> Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
      <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your environment (see SETUP.md) to turn this on.
    </Notice>
  )
}

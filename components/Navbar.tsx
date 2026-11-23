'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/ThemeProvider'
import { useAuth } from '@/components/AuthProvider'

type Item = { label: string; href: string; children?: { label: string; href: string }[] }

const nav: Item[] = [
  {
    label: 'Services', href: '/#services',
    children: [
      { label: 'Software Engineering', href: '/services/software-engineering' },
      { label: 'Data Engineering', href: '/services/data-engineering' },
      { label: 'Business Intelligence', href: '/services/business-intelligence' },
      { label: 'AI & ML Integration', href: '/services/ai-ml' },
      { label: 'API & Integrations', href: '/services/api-integrations' },
      { label: 'Cloud & DevOps', href: '/services/cloud-devops' },
    ],
  },
  {
    label: 'Company', href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/our-story' },
      { label: 'Our Process', href: '/process' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  { label: 'Team', href: '/team' },
  { label: 'Academy', href: '/academy' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

function Dropdown({ item, active }: { item: Item; active: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])
  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`h-11 px-4 flex items-center gap-1.5 text-[12px] font-body font-semibold tracking-widest uppercase transition-colors ${active || open ? 'text-fg' : 'text-fg-3 hover:text-fg'}`}
      >
        {item.label}
        <svg width="9" height="9" viewBox="0 0 10 10" className={`transition-transform ${open ? 'rotate-180' : ''}`}><path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.12 }}
            className="absolute left-0 top-full z-50 min-w-[260px] bg-[var(--bg)] border border-[var(--border-col)] shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
          >
            {item.children!.map((c) => (
              <li key={c.href}>
                <Link href={c.href} onClick={() => setOpen(false)} className="flex items-center justify-between px-5 py-3.5 border-b last:border-b-0 border-[var(--border-col)] text-[12px] font-body font-semibold tracking-widest uppercase text-fg-2 hover:text-fg hover:bg-[var(--bg-2)] transition-colors group">
                  {c.label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const { user, profile } = useAuth()
  const pathname = usePathname()

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (i: Item) =>
    i.children ? i.children.some((c) => pathname === c.href) : pathname === i.href || (i.href !== '/' && pathname.startsWith(i.href))

  const accountHref = user ? (profile?.is_admin ? '/admin' : '/account') : '/login'
  const accountLabel = user ? (profile?.is_admin ? 'Admin' : 'My account') : 'Sign in'

  return (
    <>
      {/* Info strip — like UNITED24's "official website" bar */}
      <div className="w-full bg-[#0a0a0a] text-white text-[11px] font-body font-semibold tracking-widest uppercase px-6 py-2.5 flex items-center justify-between gap-4 border-b border-white/10">
        <span className="flex items-center gap-3 truncate">
          <span className="w-2 h-4 bg-white inline-block" /><span className="w-2 h-4 bg-[#9a9a9a] inline-block -ml-3" />
          <span className="truncate">Technology partner for forward-thinking companies</span>
        </span>
        <Link href="/academy" className="hidden sm:flex items-center gap-2 whitespace-nowrap">
          Now enrolling: <span className="underline underline-offset-4 decoration-white/40 hover:decoration-white">XDEVS Academy →</span>
        </Link>
      </div>

      <header className="sticky top-0 z-50 w-full bg-[var(--bg)] border-b border-[var(--border-col)]">
        {/* Row 1 — logo · stat · CTA block */}
        <div className="flex items-stretch justify-between h-16 border-b border-[var(--border-col)]">
          <Link href="/" className="flex items-center px-6 lg:px-8 font-display font-extrabold text-2xl tracking-tight text-fg">
            X<span className="text-accent">DEVS</span>
          </Link>

          <p className="hidden lg:flex items-center text-[13px] font-body font-semibold tracking-widest uppercase text-fg">
            Products shipped: <span className="ml-2 font-display text-base">50+</span>
            <span className="mx-4 text-fg-3">·</span>
            Clients served: <span className="ml-2 font-display text-base">30+</span>
          </p>

          <div className="flex items-stretch">
            <Link href={accountHref} className="hidden md:flex items-center px-6 text-[12px] font-body font-bold tracking-widest uppercase text-fg hover:bg-[var(--bg-2)] transition-colors">
              {accountLabel}
            </Link>
            <button onClick={toggle} aria-label="Toggle theme" className="w-14 flex items-center justify-center border-l border-[var(--border-col)] text-fg-3 hover:text-fg hover:bg-[var(--bg-2)] transition-colors">
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>
            <Link href="/contact" className="hidden sm:flex items-center px-8 bg-fg text-[var(--bg)] text-[12px] font-body font-bold tracking-widest uppercase hover:opacity-85 transition-opacity">
              Get started →
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-14 flex flex-col items-center justify-center gap-1.5 border-l border-[var(--border-col)]" aria-label="Menu">
              <span className={`block w-5 h-px bg-[var(--fg)] transition-all ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`block w-5 h-px bg-[var(--fg)] transition-all ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Row 2 — section nav */}
        <div className="hidden md:flex items-center justify-between h-11 bg-[var(--bg)]">
          <Link href="/careers" className="px-6 lg:px-8 text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3 hover:text-fg transition-colors whitespace-nowrap">
            We&apos;re hiring ↗
          </Link>
          <nav>
            <ul className="flex items-center">
              {nav.map((n) =>
                n.children ? (
                  <Dropdown key={n.label} item={n} active={isActive(n)} />
                ) : (
                  <li key={n.label}>
                    <Link href={n.href} className={`h-11 px-4 flex items-center text-[12px] font-body font-semibold tracking-widest uppercase transition-colors ${isActive(n) ? 'text-fg' : 'text-fg-3 hover:text-fg'}`}>
                      {n.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <span className="px-6 lg:px-8 text-[12px] font-body font-semibold tracking-widest uppercase text-fg whitespace-nowrap">
            Lagos <span className="text-fg-3">· Remote</span>
          </span>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="absolute inset-x-0 top-16 h-[calc(100dvh-4rem)] z-40 border-t border-[var(--border-col)] bg-[var(--bg)] overflow-y-auto md:hidden"
            >
              {nav.map((n) => (
                <div key={n.label} className="border-b border-[var(--border-col)]">
                  <Link href={n.href} className="flex items-center justify-between px-6 py-4 text-sm font-semibold tracking-widest uppercase text-fg">
                    {n.label}<span className="text-accent">→</span>
                  </Link>
                  {n.children && (
                    <div className="pb-3">
                      {n.children.map((c) => (
                        <Link key={c.href} href={c.href} className="block px-10 py-2 text-xs font-semibold tracking-widest uppercase text-fg-3">{c.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href={accountHref} className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-col)] text-sm font-semibold tracking-widest uppercase text-fg">
                {accountLabel}<span className="text-accent">→</span>
              </Link>
              <Link href="/contact" className="flex items-center justify-center px-6 py-5 bg-fg text-[var(--bg)] text-sm font-bold tracking-widest uppercase">
                Get started →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

    </>
  )
}

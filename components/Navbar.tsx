'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/ThemeProvider'

const nav = [
  { label: 'SERVICES', href: '/#services' },
  { label: 'COMPANY', href: '/about' },
  { label: 'CONTACT', href: 'mailto:hello@xdevs.io' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* Top bar — like UNITED24 info strip */}
      <div className="w-full bg-accent text-white text-[11px] font-body font-semibold tracking-widest uppercase px-6 py-2 flex items-center justify-between">
        <span>✦ TECHNOLOGY PARTNER FOR FORWARD-THINKING COMPANIES</span>
        <span className="hidden sm:block">hello@xdevs.io</span>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? 'border-b border-[var(--border-col)]'
            : 'border-b border-[var(--border-col)]'
        } bg-[var(--bg)]`}
      >
        <div className="flex items-center justify-between px-6 h-14">
          {/* Logo */}
          <Link href="/" className="font-display font-extrabold text-xl tracking-tight text-fg">
            X<span className="text-accent">DEVS</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0 divide-x divide-[var(--border-col)] border-x border-[var(--border-col)]">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-6 h-14 flex items-center text-[11px] font-body font-semibold tracking-widest uppercase text-fg-3 hover:text-fg hover:bg-[var(--bg-2)] transition-all duration-150"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-0 divide-x divide-[var(--border-col)] border-l border-[var(--border-col)]">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="h-14 w-14 flex items-center justify-center text-fg-3 hover:text-fg hover:bg-[var(--bg-2)] transition-all duration-150"
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* CTA */}
            <Link
              href="mailto:hello@xdevs.io"
                        className="flex items-center gap-2 border-[var(--border-col)] text-fg font-body font-bold text-[11px] tracking-widest uppercase px-7 py-4 hover:bg-[var(--bg-2)] transition-all duration-150 ml-0"
              // className="hidden sm:flex h-14 items-center px-6 text-[11px] font-body font-bold tracking-widest uppercase bg-fg text-[var(--bg)] hover:bg-accent hover:text-white transition-all duration-150"
            >
              GET STARTED →
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden h-14 w-14 flex flex-col items-center justify-center gap-1.5 hover:bg-[var(--bg-2)] transition-all"
              aria-label="Menu"
            >
              <span className={`block w-5 h-px bg-[var(--fg)] transition-all duration-200 ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`}/>
              <span className={`block w-5 h-px bg-[var(--fg)] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}/>
              <span className={`block w-5 h-px bg-[var(--fg)] transition-all duration-200 ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[calc(2.25rem+3.5rem)] left-0 right-0 z-40 bg-[var(--bg)] border-b border-[var(--border-col)] overflow-hidden"
          >
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-col)] text-sm font-semibold tracking-widest uppercase text-fg-2 hover:bg-[var(--bg-2)] transition-all"
              >
                {n.label}
                <span className="text-accent">→</span>
              </Link>
            ))}
            <Link
              href="mailto:hello@xdevs.io"
              className="flex items-center justify-center px-6 py-5 bg-fg text-[var(--bg)] text-sm font-bold tracking-widest uppercase hover:bg-accent hover:text-white transition-all"
            >
              GET STARTED →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

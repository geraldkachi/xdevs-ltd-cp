'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="relative w-full border-b border-[var(--border-col)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] min-h-[calc(100vh-3.5rem-2.25rem)]">
        {/* Left — text */}
        <div className="flex flex-col justify-between px-6 lg:px-12 pt-12 pb-10 border-r border-[var(--border-col)]">
          {/* Label row */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[11px] font-body font-semibold tracking-widest uppercase text-fg-3">
              Technology partner for forward-thinking companies
            </span>
          </div>

          {/* Giant headline */}
          <div className="flex-1 flex flex-col justify-center">
            {mounted && (
              <h1 className="font-display font-extrabold leading-[0.88] tracking-[-0.04em] text-fg select-none" style={{ fontSize: 'clamp(4rem, 11vw, 10rem)' }}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                >
                  WE BUILD
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  DIGITAL
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-[var(--bg-3)] dark:text-[#1f1f1f] [-webkit-text-stroke:2px_var(--fg)]"
                  style={{ WebkitTextStroke: '2px var(--fg)', color: 'transparent' }}
                >
                  FUTURES
                </motion.div>
              </h1>
            )}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="font-body text-fg-3 mt-8 max-w-sm leading-relaxed"
              style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}
            >
              From AI pipelines to cloud infrastructure — XDEVS engineers bespoke solutions that scale, perform, and evolve with your ambitions.
            </motion.p>
          </div>

          {/* Bottom CTA row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap items-center gap-0 mt-10"
          >
            <Link
              href="mailto:hello@xdevs.io"
              className="flex items-center gap-2 bg-accent text-[var(--bg)] font-body font-bold text-[11px] tracking-widest uppercase px-7 py-4 hover:bg-accent hover:text-white transition-all duration-150"
            >
              START A PROJECT →
            </Link>
            <Link
              href="/case-studies"
              className="flex items-center gap-2 border border-[var(--border-col)] text-fg font-body font-bold text-[11px] tracking-widest uppercase px-7 py-4 hover:bg-[var(--bg-2)] transition-all duration-150 ml-0"
            >
              CASE STUDIES
            </Link>
          </motion.div>
        </div>

        {/* Right — mascot / visual panel */}
        <div className="hidden lg:flex flex-col items-center justify-end bg-[var(--bg-2)] w-[380px] xl:w-[460px] relative overflow-hidden">
          {/* Blue accent vertical stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border-col)]" />

          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'linear-gradient(var(--border-col) 1px, transparent 1px), linear-gradient(90deg, var(--border-col) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Mascot placeholder — stylised avatar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16,1,0.3,1] }}
            className="relative z-10 flex flex-col items-center pb-12"
          >
            {/* Dev mascot SVG */}
            <svg viewBox="0 0 200 320" width="220" className="drop-shadow-2xl">
              {/* Head */}
              <ellipse cx="100" cy="72" rx="44" ry="46" fill="#d4956a"/>
              {/* Hard hat */}
              <ellipse cx="100" cy="38" rx="52" ry="14" fill="#F59E0B"/>
              <rect x="48" y="30" width="104" height="16" rx="3" fill="#F59E0B"/>
              {/* Hat brim */}
              <ellipse cx="100" cy="46" rx="58" ry="8" fill="#D97706"/>
              {/* Eyes */}
              <circle cx="85" cy="70" r="6" fill="#1a1a1a"/>
              <circle cx="115" cy="70" r="6" fill="#1a1a1a"/>
              <circle cx="87" cy="68" r="2" fill="white"/>
              <circle cx="117" cy="68" r="2" fill="white"/>
              {/* Smile */}
              <path d="M88 88 Q100 100 112 88" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* Neck */}
              <rect x="90" y="114" width="20" height="16" fill="#d4956a"/>
              {/* Body - dark tshirt */}
              <rect x="52" y="128" width="96" height="110" rx="8" fill="#0f172a"/>
              {/* XDEVS text on shirt */}
              <text x="100" y="178" textAnchor="middle" fill="white" fontFamily="var(--font-space)" fontWeight="800" fontSize="16" letterSpacing="-1">XDEVS</text>
              {/* Laptop */}
              <rect x="68" y="192" width="64" height="40" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
              <rect x="70" y="194" width="60" height="36" rx="2" fill="#0f172a"/>
              {/* Screen content on laptop */}
              <rect x="74" y="198" width="30" height="3" rx="1" fill="#3B82FF" opacity="0.8"/>
              <rect x="74" y="204" width="20" height="2" rx="1" fill="#4ade80" opacity="0.7"/>
              <rect x="74" y="209" width="25" height="2" rx="1" fill="#f472b6" opacity="0.7"/>
              <rect x="74" y="214" width="18" height="2" rx="1" fill="#94a3b8" opacity="0.6"/>
              {/* Laptop base */}
              <rect x="60" y="232" width="80" height="5" rx="2" fill="#334155"/>
              {/* Legs */}
              <rect x="68" y="236" width="26" height="70" rx="6" fill="#1e40af"/>
              <rect x="106" y="236" width="26" height="70" rx="6" fill="#1e40af"/>
              {/* Shoes */}
              <ellipse cx="81" cy="308" rx="18" ry="9" fill="#0f172a"/>
              <ellipse cx="119" cy="308" rx="18" ry="9" fill="#0f172a"/>
            </svg>

            {/* Label badge */}
            <div className="mt-4 bg-fg text-[var(--bg)] font-body font-bold text-[10px] tracking-widest uppercase px-4 py-2">
              XDEVS ENGINEER
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom info strip — like UNITED24's total collected strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 border-t border-[var(--border-col)]"
      >
        {[
          { num: '50+', label: 'PRODUCTS SHIPPED' },
          { num: '8+', label: 'YEARS ENGINEERING' },
          { num: '30+', label: 'HAPPY CLIENTS' },
          { num: '6', label: 'CORE SERVICES' },
        ].map((s, i) => (
          <div
            key={s.label}
            className={`px-6 py-5 flex flex-col gap-1 ${i < 3 ? 'border-r border-[var(--border-col)]' : ''}`}
          >
            <span className="font-display font-extrabold text-3xl text-fg tracking-tight">{s.num}</span>
            <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-fg-3">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

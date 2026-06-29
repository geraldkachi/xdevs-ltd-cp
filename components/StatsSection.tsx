'use client'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

const areas = [
  { label: 'SOFTWARE ENGINEERING', href: '/services/software-engineering' },
  { label: 'DATA ENGINEERING', href: '/services/data-engineering' },
  { label: 'BUSINESS INTELLIGENCE', href: '/services/business-intelligence' },
  { label: 'AI & ML INTEGRATION', href: '/services/ai-ml' },
  { label: 'CLOUD & DEVOPS', href: '/services/cloud-devops' },
]

function AnimatedCounter({ to, duration = 1.8 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(count, to, { duration, ease: 'easeOut' })
    return ctrl.stop
  }, [inView, to, duration, count])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="border-b border-[var(--border-col)]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left */}
        <div className="px-6 lg:px-12 py-14 border-b lg:border-b-0 lg:border-r border-[var(--border-col)] flex flex-col justify-between gap-10">
          <div>
            <motion.p
              ref={ref}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-4"
            >
              EFFICIENCY AND EXPERTISE
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-fg leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              XDEVS DELIVERS ACROSS 6 CORE ENGINEERING DISCIPLINES.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-body text-sm text-fg-3 leading-relaxed max-w-md"
          >
            From early-stage startups to enterprise scale — we bring the same engineering rigour, transparency, and commitment to outcomes at every engagement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border border-[var(--fg)] text-fg font-body font-bold text-[11px] tracking-widest uppercase px-6 py-3.5 hover:bg-fg hover:text-[var(--bg)] transition-all duration-150"
            >
              MORE ABOUT XDEVS
            </Link>
          </motion.div>
        </div>

        {/* Right — giant counter + service list */}
        <div className="flex flex-col">
          {/* Big number */}
          <div className="px-8 py-10 border-b border-[var(--border-col)] flex flex-col items-start">
            <div
              className="font-display font-extrabold text-fg tracking-tight leading-none tabular-nums"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              <AnimatedCounter to={50} /> <span className="text-accent">+</span>
            </div>
            <p className="font-body text-[10px] font-semibold tracking-widest uppercase text-fg-3 mt-2">
              PRODUCTS SUCCESSFULLY SHIPPED
            </p>
          </div>

          {/* Service list with arrows — like UNITED24 donate areas */}
          <div>
            <div className="px-8 py-3 border-b border-[var(--border-col)]">
              <span className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3">ENGAGE DIRECTLY</span>
            </div>
            {areas.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="group flex items-center justify-between px-8 py-4 border-b border-[var(--border-col)] hover:bg-[var(--bg-2)] transition-colors"
              >
                <span className="font-body font-semibold text-sm tracking-widest uppercase text-fg group-hover:text-accent transition-colors">
                  {a.label}
                </span>
                <span className="text-fg-3 group-hover:text-accent group-hover:translate-x-1 transition-all duration-150 text-lg">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

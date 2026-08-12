'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="border-b border-[var(--border-col)]" ref={ref}>
      {/* Top split CTA bar — exactly like UNITED24 support strip */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]">
        <div className="bg-accent px-6 lg:px-12 py-6 flex items-center">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-white tracking-tight"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.6rem)' }}
          >
            READY TO BUILD SOMETHING EXCEPTIONAL?
          </motion.p>
        </div>
        <Link
          href="mailto:hello@xdevs.io"
          className="bg-accent text-[var(--bg)] px-10 py-6 font-body font-bold text-[11px] tracking-widest uppercase flex items-center gap-3 hover:bg-accent hover:text-white transition-all duration-150 whitespace-nowrap"
        >
          START NOW →
        </Link>
      </div>

      {/* Body — full width dark panel */}
      <div className="bg-[var(--bg-2)] px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2
              className="font-display font-extrabold text-fg tracking-tight leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              YOUR NEXT<br />PRODUCT<br />STARTS HERE.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <p className="font-body text-fg-3 leading-relaxed text-base">
              Tell us what you&apos;re building. We&apos;ll bring the engineering expertise, the transparent process, and the team that ships on time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[var(--border-col)]">
              {[
                { label: 'GENERAL', value: 'hello@xdevs.io' },
                { label: 'PARTNERSHIPS', value: 'partner@xdevs.io' },
                { label: 'CAREERS', value: 'jobs@xdevs.io' },
              ].map((c, i) => (
                <div key={c.label} className={`px-5 py-4 ${i < 2 ? 'border-b sm:border-b-0 sm:border-r border-[var(--border-col)]' : ''}`}>
                  <p className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-1">{c.label}</p>
                  <a href={`mailto:${c.value}`} className="text-xs font-body font-semibold text-fg hover:text-accent transition-colors">
                    {c.value}
                  </a>
                </div>
              ))}
            </div>

            <Link
              href="mailto:hello@xdevs.io"
              className="self-start flex items-center gap-3 bg-fg text-[var(--bg)] font-body font-bold text-[11px] tracking-widest uppercase px-8 py-4 hover:bg-accent hover:text-white transition-all duration-150"
            >
              GET IN TOUCH →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

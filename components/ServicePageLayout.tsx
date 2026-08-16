'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'

interface Cap { title: string; body: string }

interface Props {
  index: string
  tag: string
  title: string
  tagline: string
  description: string
  capabilities: Cap[]
  technologies: string[]
}

export default function ServicePageLayout({ index, tag, title, tagline, description, capabilities, technologies }: Props) {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-[var(--border-col)]">
          <div className="px-6 lg:px-12 pt-12 pb-0 border-b border-[var(--border-col)]">
            <Link href="/#services" className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 hover:text-accent transition-colors flex items-center gap-2 mb-8">
              ← ALL SERVICES
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 bg-[var(--bg-3)] px-2.5 py-1">{tag}</span>
              <span className="text-[10px] font-body font-semibold tracking-widest text-fg-3">{index}</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
              className="font-display font-extrabold text-fg tracking-tight leading-[0.88] pb-10"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
            >
              {title}
            </motion.h1>
          </div>

          {/* Info row */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] border-b border-[var(--border-col)]">
            <div className="px-6 lg:px-12 py-10 border-b lg:border-b-0 lg:border-r border-[var(--border-col)]">
              <p className="font-body text-sm italic text-accent font-medium mb-4">{tagline}</p>
              <p className="font-body text-base text-fg-3 leading-relaxed max-w-lg">{description}</p>
            </div>
            <div className="px-6 lg:px-12 py-10 flex flex-col gap-6">
              <p className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3">READY TO START?</p>
              <Link href="mailto:hello@xdevs.io" className="w-max inline-flex items-center gap-3 border border-[var(--fg)] text-fg font-body font-bold text-[11px] tracking-widest uppercase px-6 py-3.5 hover:bg-fg hover:text-[var(--bg transition-all duration-150"
              // className="self-start flex items-center gap-3 bg-fg text-[var(--bg)] font-body font-bold text-[11px] tracking-widest uppercase px-8 py-4 hover:bg-accent hover:text-white transition-all duration-150"
              >
                GET IN TOUCH →
              </Link>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="border-b border-[var(--border-col)]">
          <div className="flex items-center px-6 lg:px-10 py-5 border-b border-[var(--border-col)]">
            <h2 className="font-display font-extrabold text-xl tracking-tight text-fg">WHAT WE DELIVER</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => {
              const col = i % 3
              const row = Math.floor(i / 3)
              const totalRows = Math.ceil(capabilities.length / 3)
              return (
                <div
                  key={c.title}
                  className={`p-8 lg:p-10 ${col < 2 ? 'md:border-r border-[var(--border-col)]' : ''} ${row < totalRows - 1 ? 'border-b border-[var(--border-col)]' : ''}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: col * 0.08, duration: 0.5 }}
                  >
                    <p className="text-[10px] font-body font-semibold tracking-widest uppercase text-accent mb-3">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="font-display font-extrabold text-base text-fg tracking-tight mb-3">{c.title}</h3>
                    <p className="font-body text-sm text-fg-3 leading-relaxed">{c.body}</p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Technologies */}
        <section className="border-b border-[var(--border-col)] px-6 lg:px-10 py-10">
          <p className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-6">TECHNOLOGIES</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((t) => (
              <span key={t} className="text-[11px] font-body font-semibold tracking-widest uppercase text-fg-3 border border-[var(--border-col)] bg-[var(--bg-2)] px-4 py-2 hover:border-accent hover:text-accent transition-all cursor-default">
                {t}
              </span>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}

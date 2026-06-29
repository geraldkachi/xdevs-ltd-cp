'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const services = [
  { index: '01', title: 'SOFTWARE\nENGINEERING', tag: 'DEVELOPMENT', desc: 'Full-stack web and mobile applications built with modern frameworks, scalable architecture, and engineering excellence from day one.', href: '/services/software-engineering' },
  { index: '02', title: 'DATA\nENGINEERING', tag: 'DATA', desc: 'Robust data pipelines, warehouse design, and ETL systems that turn raw data into reliable infrastructure for decision-making.', href: '/services/data-engineering' },
  { index: '03', title: 'BUSINESS\nINTELLIGENCE', tag: 'ANALYTICS', desc: 'Interactive dashboards and reporting systems that give stakeholders real-time visibility into the metrics that matter.', href: '/services/business-intelligence' },
  { index: '04', title: 'AI & ML\nINTEGRATION', tag: 'ARTIFICIAL INTELLIGENCE', desc: 'Production-grade ML models, LLM-powered features, and intelligent automation that deliver measurable ROI.', href: '/services/ai-ml' },
  { index: '05', title: 'API &\nINTEGRATIONS', tag: 'INFRASTRUCTURE', desc: 'RESTful and GraphQL API design, third-party integrations, and microservice architectures that connect your ecosystem.', href: '/services/api-integrations' },
  { index: '06', title: 'CLOUD &\nDEVOPS', tag: 'CLOUD', desc: 'CI/CD pipelines, infrastructure as code, and cloud-native deployments that give your team speed without sacrificing reliability.', href: '/services/cloud-devops' },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="border-b border-[var(--border-col)]">
      {/* Header row */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-5 border-b border-[var(--border-col)]">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display font-extrabold text-2xl lg:text-3xl tracking-tight text-fg"
        >
          OUR SERVICES
        </motion.h2>
        <Link href="/services/software-engineering" className="text-[11px] font-body font-semibold tracking-widest uppercase text-fg-3 hover:text-fg transition-colors flex items-center gap-2">
          ALL SERVICES →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.index} s={s} i={i} />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ s, i }: { s: (typeof services)[0]; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const col = i % 3
  const row = Math.floor(i / 3)
  const borderRight = col < 2
  const borderBottom = row < 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: col * 0.08 }}
      className={`group relative ${borderRight ? 'md:border-r border-[var(--border-col)]' : ''} ${borderBottom ? 'border-b border-[var(--border-col)]' : ''}`}
    >
      <Link href={s.href} className="block p-8 lg:p-10 h-full hover:bg-[var(--bg-2)] transition-colors duration-150">
        {/* Tag */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 bg-[var(--bg-3)] px-2.5 py-1">
            {s.tag}
          </span>
          <span className="text-[10px] font-body font-semibold tracking-widest text-fg-3">{s.index}</span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-extrabold text-fg leading-[0.95] tracking-tight mb-6 whitespace-pre-line"
          style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}
        >
          {s.title}
        </h3>

        {/* Desc */}
        <p className="font-body text-sm text-fg-3 leading-relaxed mb-8">{s.desc}</p>

        {/* Arrow link */}
        <div className="flex items-center gap-2 text-[11px] font-body font-bold tracking-widest uppercase text-fg group-hover:text-accent transition-colors">
          EXPLORE
          <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
        </div>
      </Link>
    </motion.div>
  )
}

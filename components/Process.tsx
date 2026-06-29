'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  { num: '01', title: 'DISCOVERY & SCOPING', body: 'We map your goals, users, and constraints before writing a single line of code. No assumptions, only clarity.' },
  { num: '02', title: 'ARCHITECTURE & PLANNING', body: "Technical blueprint designed for today's speed and tomorrow's scale — agreed on before we start sprinting." },
  { num: '03', title: 'BUILD & ITERATE', body: 'Weekly demos, continuous deployments, real feedback loops. You see real progress every single week.' },
  { num: '04', title: 'LAUNCH & SUPPORT', body: 'Production-ready delivery with full documentation, monitoring setup, and ongoing engineering support.' },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="border-b border-[var(--border-col)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-5 border-b border-[var(--border-col)]">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display font-extrabold text-2xl lg:text-3xl tracking-tight text-fg"
        >
          OUR PROCESS
        </motion.h2>
        <span className="text-[11px] font-body font-semibold tracking-widest uppercase text-fg-3">
          HOW WE WORK
        </span>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1
          return (
            <StepCard key={step.num} step={step} i={i} isLast={isLast} />
          )
        })}
      </div>
    </section>
  )
}

function StepCard({ step, i, isLast }: { step: typeof steps[0]; i: number; isLast: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className={`p-8 lg:p-10 ${!isLast ? 'border-b md:border-b-0 md:border-r border-[var(--border-col)]' : ''} flex flex-col gap-6`}
    >
      {/* Number large */}
      <span className="font-display font-extrabold text-5xl text-[var(--bg-3)] dark:text-[#1f1f1f] tracking-tight">
        {step.num}
      </span>
      <div>
        <h3 className="font-display font-extrabold text-base tracking-tight text-fg mb-3 leading-tight">
          {step.title}
        </h3>
        <p className="font-body text-sm text-fg-3 leading-relaxed">{step.body}</p>
      </div>
      {/* Accent bar */}
      <div className="mt-auto h-px w-full bg-[var(--border-col)] relative">
        <motion.div
          className="absolute left-0 top-0 h-full bg-accent"
          initial={{ width: 0 }}
          animate={inView ? { width: '40%' } : {}}
          transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
        />
      </div>
    </motion.div>
  )
}

'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const tech = [
  'REACT', 'NEXT.JS', 'TYPESCRIPT', 'NODE.JS', 'PYTHON',
  'POSTGRESQL', 'REDIS', 'APACHE KAFKA', 'DBT', 'AIRFLOW',
  'KUBERNETES', 'TERRAFORM', 'AWS', 'GCP', 'DOCKER',
  'GRAPHQL', 'TENSORFLOW', 'PYTORCH', 'LANGCHAIN', 'FASTAPI',
]

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const doubled = [...tech, ...tech]

  return (
    <section className="border-b border-[var(--border-col)] overflow-hidden">
      <div className="flex items-center border-b border-[var(--border-col)]">
        <div className="flex-shrink-0 px-6 py-3 border-r border-[var(--border-col)]">
          <span className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 whitespace-nowrap">
            TECHNOLOGY STACK
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}/>
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}/>
          <div className="marquee-track flex w-max">
            {doubled.map((t, i) => (
              <span
                key={i}
                className="flex-shrink-0 px-8 py-3 text-[11px] font-body font-bold tracking-widest text-fg-3 hover:text-accent transition-colors cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

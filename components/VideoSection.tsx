'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { VIDEO } from '@/lib/site'

/** Full-width looping video with a "Watch video" button, like UNITED24. */
export default function VideoSection() {
  const [open, setOpen] = useState(false)
  const bg = useRef<HTMLVideoElement>(null)

  // Pause the background loop while the popup plays, and close on Escape
  useEffect(() => {
    if (open) bg.current?.pause(); else bg.current?.play().catch(() => {})
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [open])

  return (
    <section className="relative w-full h-[70vh] min-h-[460px] max-h-[860px] overflow-hidden border-b border-[var(--border-col)] bg-black">
      <video ref={bg} src={VIDEO.src} autoPlay muted loop playsInline preload="metadata" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />

      <button
        onClick={() => setOpen(true)}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 px-10 py-6 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-body text-lg lg:text-2xl uppercase tracking-wide transition-colors"
      >
        Watch video
        <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden><path d="M0 0l16 9-16 9z" /></svg>
      </button>

      <div className="absolute left-0 bottom-0 max-w-xl bg-[#1c1c1c]/90 backdrop-blur-sm text-white px-6 lg:px-8 py-6">
        <p className="text-[12px] font-body font-semibold tracking-widest uppercase text-white/60">Who we are</p>
        <p className="font-display font-extrabold uppercase tracking-tight text-xl lg:text-2xl leading-tight mt-2">
          Software, data &amp; AI — <br className="hidden sm:block" />engineered in Lagos for the world
        </p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 lg:p-12"
            onClick={() => setOpen(false)}
            role="dialog" aria-modal="true" aria-label={VIDEO.title}
          >
            <button onClick={() => setOpen(false)} aria-label="Close video" className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center text-white text-3xl hover:bg-white/10">×</button>
            <div className="w-full max-w-6xl aspect-video bg-black" onClick={(e) => e.stopPropagation()}>
              {VIDEO.embed ? (
                <iframe src={VIDEO.embed} title={VIDEO.title} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              ) : (
                <video src={VIDEO.src} controls autoPlay playsInline className="w-full h-full" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { SpaceStars, SpacePlanet } from '@/components/ContactScene'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with XDEVS. Tell us what you are building — we reply within 24 hours.',
  alternates: { canonical: 'https://xdevs.io/contact' },
}

const lines = [
  ['General questions', 'hello@xdevs.io'],
  ['Partnerships', 'partner@xdevs.io'],
  ['Careers', 'jobs@xdevs.io'],
  ['Press', 'press@xdevs.io'],
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Always-dark space scene: moving stars + rotating planet (from the 3D portfolio) */}
        <section className="dark relative overflow-hidden bg-[#050816] text-fg border-b border-[var(--border-col)]">
          <SpaceStars />
          <div className="relative grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 px-6 lg:px-12 py-14 lg:py-20">
            <div className="bg-[#100d25]/90 backdrop-blur-sm border border-white/10 p-6 sm:p-10">
              <p className="text-[13px] font-body font-semibold tracking-[0.25em] uppercase text-white/60 mb-3">Get in touch</p>
              <h1 className="font-display font-extrabold text-white tracking-tight leading-[1] mb-10" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                Contact.
              </h1>
              <ContactForm />
            </div>
            <div className="relative min-h-[360px] sm:min-h-[480px] xl:min-h-0">
              <div className="absolute inset-0">
                <SpacePlanet />
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 border-b border-[var(--border-col)]">
          {lines.map(([l, e], i) => (
            <a key={e} href={`mailto:${e}`} className={`px-6 lg:px-10 py-8 border-[var(--border-col)] hover:bg-[var(--bg-2)] transition-colors ${i % 2 === 0 ? 'border-r' : 'lg:border-r'} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i === 3 ? 'lg:border-r-0' : ''}`}>
              <p className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-2">{l}</p>
              <p className="font-body font-semibold text-fg break-all">{e}</p>
            </a>
          ))}
        </section>
        <section className="flex flex-wrap items-center justify-between gap-4 px-6 lg:px-10 py-6 border-b border-[var(--border-col)]">
          <p className="font-body text-fg"><span className="text-fg-3 uppercase text-[12px] tracking-widest font-semibold mr-3">Headquarters</span>Lagos, Nigeria · serving US, UK, EU &amp; Africa</p>
          <p className="text-[11px] font-body text-fg-3">
            Planet model: &ldquo;Stylized planet&rdquo; by <a className="underline" href="https://sketchfab.com/cmzw" target="_blank" rel="noopener noreferrer">cmzw</a>, CC-BY-4.0
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

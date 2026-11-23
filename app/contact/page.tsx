import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

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
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] border-b border-[var(--border-col)]">
          <div className="px-6 lg:px-12 py-12 lg:border-r border-b lg:border-b-0 border-[var(--border-col)] flex flex-col justify-between gap-12">
            <div>
              <p className="text-[12px] font-body font-semibold tracking-[0.25em] uppercase text-fg-3 mb-5">Contact us</p>
              <h1 className="font-display font-extrabold text-fg uppercase tracking-tight leading-[1]" style={{ fontSize: 'clamp(2.25rem, 4.6vw, 4.25rem)' }}>
                Let&apos;s build something great.
              </h1>
              <p className="font-body text-base lg:text-lg text-fg-2 leading-relaxed mt-6 max-w-md">
                Tell us what you&apos;re building. We reply within 24 hours with next steps — usually a short discovery call.
              </p>
            </div>
            <div className="border-t border-[var(--border-col)]">
              {lines.map(([l, e]) => (
                <a key={e} href={`mailto:${e}`} className="flex items-center justify-between py-4 border-b border-[var(--border-col)] group">
                  <span className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3">{l}</span>
                  <span className="font-body font-semibold text-fg group-hover:underline">{e}</span>
                </a>
              ))}
              <div className="grid grid-cols-2 pt-6 gap-6">
                <div><p className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-1">Headquarters</p><p className="font-body text-fg">Lagos, Nigeria</p></div>
                <div><p className="text-[12px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-1">Serving</p><p className="font-body text-fg">US · UK · EU · Africa</p></div>
              </div>
            </div>
          </div>
          <div className="px-6 lg:px-12 py-12 bg-[var(--bg-2)]">
            <h2 className="font-display font-extrabold text-fg uppercase tracking-tight text-2xl mb-8">Start a project</h2>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

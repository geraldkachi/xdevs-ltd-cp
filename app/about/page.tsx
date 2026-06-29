import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
export const metadata: Metadata = {
  title: 'About Us',
  description: 'XDEVS is a software, data, and AI engineering company helping ambitious businesses build and ship products that scale.',
  alternates: { canonical: 'https://xdevs.io/about' },
}
const values = [
  { title: 'ENGINEERING-FIRST', body: 'Code quality, system design, and technical excellence are not negotiable — they are the baseline.' },
  { title: 'HONEST PARTNERSHIP', body: 'We tell you what we think, even when it is not what you want to hear. Your success is our success.' },
  { title: 'OUTCOME-DRIVEN', body: 'We measure ourselves by business results our work produces, not by lines of code written or tickets closed.' },
  { title: 'TRANSPARENCY', body: 'Weekly updates, clear timelines, and no surprises. You always know where your project stands.' },
]
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-[var(--border-col)]">
          <div className="px-6 lg:px-12 pt-12 pb-12 border-b border-[var(--border-col)]">
            <p className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-6">ABOUT XDEVS</p>
            <h1 className="font-display font-extrabold text-fg tracking-tight leading-[0.88]" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
              WE BUILD SOFTWARE THAT HELPS BUSINESSES GROW.
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[var(--border-col)]">
            <div className="px-6 lg:px-12 py-10 lg:border-r border-[var(--border-col)]">
              <p className="font-body text-base text-fg-3 leading-relaxed">
                XDEVS is a specialized engineering team focused on software, data, and AI. We partner with companies from early-stage startups to scaling enterprises — wherever technical excellence can make the biggest difference.
              </p>
            </div>
            <div className="px-6 lg:px-12 py-10">
              <p className="font-body text-base text-fg-3 leading-relaxed">
                Our team brings together engineering, data science, and product thinking — shipped across 50+ products, 8+ years, and 30+ clients around the world.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--border-col)]">
          <div className="px-6 lg:px-10 py-5 border-b border-[var(--border-col)]">
            <h2 className="font-display font-extrabold text-2xl tracking-tight text-fg">OUR VALUES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {values.map((v, i) => (
              <div key={v.title} className={`px-8 lg:px-12 py-10 ${i % 2 === 0 ? 'md:border-r' : ''} ${i < 2 ? 'border-b' : ''} border-[var(--border-col)]`}>
                <p className="text-[10px] font-body font-semibold tracking-widest uppercase text-accent mb-3">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display font-extrabold text-lg text-fg tracking-tight mb-3">{v.title}</h3>
                <p className="font-body text-sm text-fg-3 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}

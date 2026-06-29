import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-[var(--border-col)] px-6 lg:px-12 pt-12 pb-20">
          <p className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-6">XDEVS</p>
          <h1 className="font-display font-extrabold text-fg tracking-tight leading-[0.88]" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
            COMING<br />SOON.
          </h1>
          <p className="font-body text-base text-fg-3 mt-8 max-w-md leading-relaxed">This page is on its way. Reach us at hello@xdevs.io in the meantime.</p>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}

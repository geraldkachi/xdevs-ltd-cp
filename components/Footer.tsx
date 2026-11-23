import Link from 'next/link'
import Newsletter from '@/components/Newsletter'
import { SOCIALS } from '@/lib/site'

// Footer modelled on UNITED24: giant wordmark, icon row + legal links,
// "Contact us." and newsletter halves, then link columns and copyright.

const icons: Record<string, JSX.Element> = {
  Instagram: (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z" /></svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.66 4.8 6.12V21h-4v-4.97c0-1.18-.02-2.71-1.65-2.71-1.66 0-1.91 1.29-1.91 2.62V21h-4V9.75Z" /></svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
  ),
}

const contacts = [
  { label: 'General questions:', email: 'hello@xdevs.io' },
  { label: 'For press:', email: 'press@xdevs.io' },
  { label: 'For partnership:', email: 'partner@xdevs.io' },
]

const columns: Record<string, [string, string][]> = {
  Services: [
    ['Software Engineering', '/services/software-engineering'],
    ['Data Engineering', '/services/data-engineering'],
    ['Business Intelligence', '/services/business-intelligence'],
    ['AI & ML Integration', '/services/ai-ml'],
    ['API & Integrations', '/services/api-integrations'],
    ['Cloud & DevOps', '/services/cloud-devops'],
  ],
  Company: [
    ['About Us', '/about'],
    ['Our Team', '/team'],
    ['Our Story', '/our-story'],
    ['Process', '/process'],
    ['Case Studies', '/case-studies'],
    ['Blog', '/blog'],
  ],
  'Academy & Careers': [
    ['XDEVS Academy', '/academy'],
    ['Courses & Pricing', '/academy#courses'],
    ['Pre-order Tracks', '/academy#preorder'],
    ['Open Roles', '/careers'],
    ['Sign in', '/login'],
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#000] text-white">
      {/* Giant wordmark */}
      <div className="px-6 lg:px-12 pt-14 pb-10 lg:pt-20 lg:pb-14 border-t border-white/10 overflow-hidden">
        <Link href="/" aria-label="XDEVS home" className="block select-none">
          <svg viewBox="0 0 1000 190" className="w-full h-auto" role="img" aria-label="XDEVS">
            <text x="50%" y="160" textAnchor="middle" textLength="990" lengthAdjust="spacingAndGlyphs"
              fontFamily="Syne, 'Arial Black', sans-serif" fontWeight="800" fontSize="200" fill="#fff" letterSpacing="-4">
              XDEVS
            </text>
          </svg>
        </Link>
      </div>

      {/* Icons + legal row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-white/15">
        <ul className="grid border-b lg:border-b-0 lg:border-r border-white/15" style={{ gridTemplateColumns: `repeat(${SOCIALS.length}, minmax(0, 1fr))` }}>
          {SOCIALS.map((s, i) => (
            <li key={s.name} className={i < SOCIALS.length - 1 ? 'border-r border-white/15' : ''}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                className="h-[88px] flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                {icons[s.name] ?? <span className="text-sm font-bold">{s.name}</span>}
              </a>
            </li>
          ))}
        </ul>
        <nav className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 lg:px-10 py-6">
          {[['Careers', '/careers'], ['Academy', '/academy'], ['Contact', '/contact'], ['FAQ', '/academy#enrol']].map(([l, h]) => (
            <Link key={l} href={h} className="text-[15px] lg:text-lg font-body font-medium uppercase tracking-wide text-white hover:text-white/60 transition-colors">{l}</Link>
          ))}
        </nav>
      </div>

      {/* Contact / Newsletter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-white/15">
        <div className="px-6 lg:px-10 py-10 lg:border-r border-b lg:border-b-0 border-white/15">
          <h2 className="uppercase leading-tight">
            <strong className="block font-display font-extrabold text-xl lg:text-2xl tracking-tight">Contact us.</strong>
            <span className="block font-body text-lg lg:text-xl text-white/90">If you have any further questions or inquiries</span>
          </h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {contacts.map((c) => (
              <div key={c.email}>
                <p className="font-body uppercase text-[15px] text-white/45">{c.label}</p>
                <a href={`mailto:${c.email}`} className="font-body uppercase text-[15px] text-white hover:underline underline-offset-4">{c.email}</a>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="px-6 lg:px-10 py-10 flex-1">
            <h2 className="uppercase leading-tight">
              <strong className="block font-display font-extrabold text-xl lg:text-2xl tracking-tight">Subscribe to XDEVS&apos;s newsletter</strong>
              <span className="block font-body text-lg lg:text-xl text-white/90">Keep updated on what we&apos;re building & teaching</span>
            </h2>
          </div>
          <div className="border-t border-white/15">
            <Newsletter variant="footer" />
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/15">
        {Object.entries(columns).map(([title, links], gi) => (
          <div key={title} className={`px-6 lg:px-10 py-8 border-white/15 ${gi % 2 === 0 ? 'border-r' : 'md:border-r'} ${gi < 2 ? 'border-b md:border-b-0' : ''}`}>
            <p className="text-[11px] font-body font-bold tracking-widest uppercase text-white/45 mb-5">{title}</p>
            <ul className="space-y-2.5">
              {links.map(([label, href]) => (
                <li key={label}><Link href={href} className="text-sm font-body text-white/80 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        <div className="px-6 lg:px-10 py-8">
          <p className="text-[11px] font-body font-bold tracking-widest uppercase text-white/45 mb-5">Headquarters</p>
          <p className="text-sm font-body text-white/80 leading-relaxed">Lagos, Nigeria<br />Remote-first · serving US, UK, EU &amp; Africa</p>
          <Link href="/contact" className="inline-flex mt-6 px-5 py-3 bg-white text-black text-[11px] font-body font-bold tracking-widest uppercase hover:bg-white/85">Start a project →</Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 lg:px-10 py-6 border-t border-white/15">
        <p className="text-[12px] font-body tracking-widest uppercase text-white/45">© {new Date().getFullYear()} XDEVS Ltd. All rights reserved.</p>
        <p className="text-[15px] font-body text-white/45">{new Date().getFullYear()}©</p>
      </div>
    </footer>
  )
}

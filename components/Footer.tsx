'use client'
import Link from 'next/link'

const cols = {
  SERVICES: [
    ['Software Engineering', '/services/software-engineering'],
    ['Data Engineering', '/services/data-engineering'],
    ['Business Intelligence', '/services/business-intelligence'],
    ['AI & ML Integration', '/services/ai-ml'],
    ['API & Integrations', '/services/api-integrations'],
    ['Cloud & DevOps', '/services/cloud-devops'],
  ],
  COMPANY: [
    ['About Us', '/about'],
    ['Our Story', '/our-story'],
    ['Process', '/process'],
    ['Case Studies', '/case-studies'],
    ['Careers', '/careers'],
    ['Blog', '/blog'],
  ],
  CONNECT: [
    ['Instagram', 'https://www.instagram.com/xdevs.ltd'],
    ['Twitter / X', 'https://twitter.com/xdevsio'],
    ['LinkedIn', 'https://linkedin.com/company/xdevsltd'],
    ['GitHub', 'https://github.com/xdevs'],
    ['hello@xdevs.io', 'mailto:hello@xdevs.io'],
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border-col)]">
      {/* Giant wordmark — UNITED24 style */}
      <div className="border-b border-[var(--border-col)] overflow-hidden px-4 py-6 lg:py-10">
        <div
          className="font-display font-extrabold text-fg leading-none tracking-tight select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(4rem, 14vw, 14rem)', WebkitTextStroke: '1px var(--border-col)' }}
          aria-hidden
        >
          XDEVS
        </div>
      </div>

      {/* Social icons row */}
      <div className="grid grid-cols-4 sm:grid-cols-8 border-b border-[var(--border-col)]">
        {[
          { icon: 'IG', href: 'https://www.instagram.com/xdevs.ltd', label: 'Instagram' },
          { icon: 'X', href: 'https://twitter.com/xdevsio', label: 'Twitter' },
          { icon: 'IN', href: 'https://linkedin.com/company/xdevsltd', label: 'LinkedIn' },
          { icon: 'GH', href: 'https://github.com/xdevs', label: 'GitHub' },
        ].map((s) => (
          <Link
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="flex items-center justify-center h-12 border-r border-[var(--border-col)] font-body font-bold text-xs text-fg-3 hover:text-fg hover:bg-[var(--bg-2)] transition-all"
          >
            {s.icon}
          </Link>
        ))}
        <div className="col-span-4 flex items-center justify-end gap-6 px-6">
          {['PRIVACY', 'TERMS', 'FAQ'].map((item) => (
            <Link key={item} href="#" className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 hover:text-fg transition-colors">
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Contact + newsletter split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[var(--border-col)]">
        <div className="px-6 lg:px-10 py-8 border-b lg:border-b-0 lg:border-r border-[var(--border-col)]">
          <p className="font-body font-bold text-[10px] tracking-widest uppercase text-fg mb-1">CONTACT US.</p>
          <p className="font-body text-xs tracking-widest uppercase text-fg-3 mb-6">IF YOU HAVE QUESTIONS OR INQUIRIES</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'GENERAL', email: 'hello@xdevs.io' },
              { label: 'PRESS', email: 'press@xdevs.io' },
              { label: 'PARTNERSHIPS', email: 'partner@xdevs.io' },
            ].map((c) => (
              <div key={c.label}>
                <p className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 mb-1">{c.label}</p>
                <a href={`mailto:${c.email}`} className="text-xs font-body text-fg hover:text-accent transition-colors">{c.email}</a>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 lg:px-10 py-8">
          <p className="font-body font-bold text-[10px] tracking-widest uppercase text-fg mb-1">STAY IN TOUCH</p>
          <p className="font-body text-xs tracking-widest uppercase text-fg-3 mb-6">KEEP UPDATED ON WHAT WE&apos;RE BUILDING</p>
          <div className="flex border border-[var(--border-col)]">
            <input
              type="email"
              placeholder="ENTER YOUR E-MAIL"
              className="flex-1 bg-transparent px-4 py-3 text-xs font-body tracking-widest text-fg placeholder-fg-3 focus:outline-none"
            />
            <button className="bg-fg-3 hover:bg-accent text-[var(--bg)] font-body font-bold text-[10px] tracking-widest uppercase px-5 transition-all duration-150">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 border-b border-[var(--border-col)]">
        {Object.entries(cols).map(([group, links], gi) => (
          <div
            key={group}
            className={`px-6 lg:px-10 py-8 ${gi < 2 ? 'border-b md:border-b-0 md:border-r border-[var(--border-col)]' : ''}`}
          >
            <p className="font-body font-bold text-[10px] tracking-widest uppercase text-fg mb-5">{group}</p>
            <ul className="flex flex-col gap-3">
              {links.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-xs font-body text-fg-3 hover:text-fg transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-4">
        <span className="text-[10px] font-body text-fg-3">© 2026 XDEVS. ALL RIGHTS RESERVED.</span>
        <span className="text-[10px] font-body text-fg-3">2026 ©</span>
      </div>
    </footer>
  )
}

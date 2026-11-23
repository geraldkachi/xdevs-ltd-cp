import Image from 'next/image'
import Link from 'next/link'
import type { Member } from '@/lib/team'

export const directionColor: Record<string, string> = {
  'Software Engineering': '#6d5bd0',
  'Cloud & DevOps': '#76803f',
  Product: '#2f7f78',
  Careers: '#1f5fbf',
}

export const initials = (name: string) => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

/** Shown when a team member has no photo yet. */
export function PhotoPlaceholder({ name, big = false }: { name: string; big?: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1c1c1c] text-white"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 35%, #333 0%, #1c1c1c 60%)' }}>
      <span className={`font-display font-extrabold tracking-tight ${big ? 'text-[9rem]' : 'text-[6rem]'} leading-none opacity-90`}>{initials(name)}</span>
      <span className="mt-4 text-[11px] font-body font-semibold tracking-[0.25em] uppercase text-white/50">Photo coming soon</span>
    </div>
  )
}

/** Photo card in the style of UNITED24's ambassador cards. */
export default function TeamCard({ m, priority = false }: { m: Member; priority?: boolean }) {
  return (
    <Link href={`/team/${m.slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-[var(--bg-3)]">
      {m.image ? <Image
        src={m.image}
        alt={`${m.name}, ${m.title}`}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{ objectPosition: m.imagePosition ?? '50% 30%' }}
      /> : <PhotoPlaceholder name={m.name} />}
      <div className="absolute inset-x-0 bottom-0">
        <span className="inline-block px-4 py-2 text-[12px] font-body font-semibold tracking-wider uppercase text-white" style={{ background: directionColor[m.direction] ?? '#444' }}>
          {m.direction}
        </span>
        <div className="px-5 py-4 bg-gradient-to-r from-black/80 via-black/55 to-black/30 backdrop-blur-[2px]">
          <p className="font-display font-bold text-white text-lg sm:text-xl uppercase leading-tight tracking-tight">{m.name}</p>
          <p className="font-body text-[12px] font-semibold tracking-widest uppercase text-white/75 mt-1">{m.roles.join(' · ')}</p>
        </div>
      </div>
      <span className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
        ↗
      </span>
    </Link>
  )
}

type PromoProps = { href: string; big: string[]; chip: string; chipColor: string; title: string; sub: string; wide?: boolean }

export function PromoCard({ href, big, chip, chipColor, title, sub, wide = false }: PromoProps) {
  return (
    <Link href={href} className={`group relative flex flex-col justify-between h-full overflow-hidden bg-[var(--bg-2)] p-8 ${wide ? 'min-h-[320px]' : 'min-h-[420px] aspect-[4/5] sm:aspect-auto lg:aspect-[4/5]'}`}>
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: 'linear-gradient(var(--border-col) 1px, transparent 1px), linear-gradient(90deg, var(--border-col) 1px, transparent 1px)', backgroundSize: '44px 44px' }}
      />
      <p className="relative font-display font-extrabold text-fg tracking-tight leading-[0.95] uppercase" style={{ fontSize: 'clamp(2rem, 3.4vw, 3.25rem)' }}>
        {big.map((b) => <span key={b} className="block">{b}</span>)}
      </p>
      <div className="relative">
        <span className="inline-block px-4 py-2 text-[12px] font-body font-semibold tracking-wider uppercase text-white" style={{ background: chipColor }}>
          {chip}
        </span>
        <div className="px-5 py-4 bg-fg text-[var(--bg)] flex items-center justify-between">
          <div>
            <p className="font-display font-bold text-lg uppercase leading-tight">{title}</p>
            <p className="font-body text-[12px] font-semibold tracking-widest uppercase opacity-70 mt-1">{sub}</p>
          </div>
          <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  )
}

export const JoinCard = ({ wide = false }: { wide?: boolean }) => (
  <PromoCard wide={wide} href="/careers" big={['Your', 'face', 'here?']} chip="Careers" chipColor={directionColor.Careers} title="Join XDEVS" sub="See open roles" />
)

export const AcademyCard = ({ wide = false }: { wide?: boolean }) => (
  <PromoCard wide={wide} href="/academy" big={['Learn', 'from', 'us.']} chip="Academy" chipColor="#b5651d" title="XDEVS Academy" sub="Courses & mentorship" />
)

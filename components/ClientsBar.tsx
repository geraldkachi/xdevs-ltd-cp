'use client'

const clients = [
  'MICROSOFT', 'STRIPE', 'VERCEL', 'NOTION', 'FIGMA',
  'SUPABASE', 'OPENAI', 'SHOPIFY', 'TWILIO', 'DATADOG',
]

export default function ClientsBar() { 
  const doubled = [...clients, ...clients]
  return (
    <section className="border-b border-[var(--border-col)] bg-[var(--bg-2)] overflow-hidden">
      <div className="flex items-center border-b border-[var(--border-col)]">
        <div className="flex-shrink-0 px-6 py-3 border-r border-[var(--border-col)]">
          <span className="text-[10px] font-body font-semibold tracking-widest uppercase text-fg-3 whitespace-nowrap">
            TRUSTED BY
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg-2), transparent)' }}/>
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg-2), transparent)' }}/>
          <div className="marquee-track flex w-max">
            {doubled.map((c, i) => (
              <span
                key={i}
                className="flex-shrink-0 px-10 py-4 text-[11px] font-body font-bold tracking-widest uppercase text-fg-3 hover:text-fg transition-colors cursor-default"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

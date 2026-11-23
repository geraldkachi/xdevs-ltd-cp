import RolesList from '@/components/RolesList'
import { SectionHead } from '@/components/ui'

export default function OpenRolesTeaser() {
  return (
    <section className="border-b border-[var(--border-col)]">
      <SectionHead title="Open roles" href="/careers" linkLabel="All careers" />
      <RolesList limit={4} />
    </section>
  )
}

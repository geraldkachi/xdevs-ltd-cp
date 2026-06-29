import type { Metadata } from 'next'
import ServicePageLayout from '@/components/ServicePageLayout'
export const metadata: Metadata = {
  title: 'Business Intelligence', description: 'BI dashboards and reporting systems from XDEVS.',
  alternates: { canonical: 'https://xdevs.io/services/business-intelligence' },
}
export default function Page() {
  return <ServicePageLayout index="03" tag="ANALYTICS" title="BUSINESS INTELLIGENCE"
    tagline="Turn your data into decisions."
    description="We build BI systems that give every stakeholder the visibility they need — from executive KPI dashboards to granular operational reports. No more spreadsheet chaos."
    capabilities={[
      { title: 'Dashboard Development', body: 'Interactive, real-time dashboards in Tableau, Power BI, Metabase, or Looker tailored to your users.' },
      { title: 'KPI Framework Design', body: 'Help defining the right metrics for your business and building the models that power them.' },
      { title: 'Self-Service Analytics', body: 'Empower non-technical stakeholders to explore data safely without relying on engineering.' },
      { title: 'Report Automation', body: 'Scheduled reports and alerts that deliver insights before the business needs to ask.' },
      { title: 'Data Modeling', body: 'Clean semantic layers that translate raw data into business-friendly dimensions and metrics.' },
      { title: 'BI Migration', body: 'Move from legacy tools or spreadsheets to modern BI platforms with zero data loss.' },
    ]}
    technologies={['Tableau', 'Power BI', 'Metabase', 'Looker', 'Apache Superset', 'dbt', 'BigQuery', 'Snowflake', 'SQL', 'Python']}
  />
}

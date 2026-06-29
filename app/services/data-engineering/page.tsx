import type { Metadata } from 'next'
import ServicePageLayout from '@/components/ServicePageLayout'
export const metadata: Metadata = {
  title: 'Data Engineering', description: 'Data pipelines, warehouse design, and ETL systems from XDEVS.',
  alternates: { canonical: 'https://xdevs.io/services/data-engineering' },
}
export default function Page() {
  return <ServicePageLayout index="02" tag="DATA" title="DATA ENGINEERING"
    tagline="Reliable data infrastructure for data-driven businesses."
    description="We design and build the data pipelines, warehouses, and ETL systems that make analytics and AI possible. Your data, where you need it, when you need it — trustworthy and on time."
    capabilities={[
      { title: 'Data Pipeline Design', body: 'End-to-end pipelines that ingest, transform, and load data reliably at any scale.' },
      { title: 'Data Warehouse Architecture', body: 'Cloud data warehouse design on BigQuery, Snowflake, or Redshift — structured for performance and cost.' },
      { title: 'ETL / ELT Development', body: 'Robust transformation logic using dbt, custom Python, or orchestrated workflows in Airflow.' },
      { title: 'Streaming Data', body: 'Real-time data processing with Apache Kafka, Flink, or Spark Streaming.' },
      { title: 'Data Quality', body: 'Automated data quality checks, anomaly detection, and alerting to keep your data trustworthy.' },
      { title: 'Data Governance', body: 'Cataloging, lineage tracking, and access controls that satisfy compliance and enable self-service analytics.' },
    ]}
    technologies={['Apache Spark', 'dbt', 'Airflow', 'BigQuery', 'Snowflake', 'Redshift', 'Kafka', 'Flink', 'Python', 'SQL', 'Great Expectations', 'Fivetran']}
  />
}

import type { Metadata } from 'next'
import ServicePageLayout from '@/components/ServicePageLayout'
export const metadata: Metadata = {
  title: 'API & Integrations', description: 'RESTful and GraphQL API design from XDEVS.',
  alternates: { canonical: 'https://xdevs.io/services/api-integrations' },
}
export default function Page() {
  return <ServicePageLayout index="05" tag="INFRASTRUCTURE" title="API & INTEGRATIONS"
    tagline="Connect everything. Break nothing."
    description="We design clean, well-documented APIs and build the integrations that connect your product to the tools, platforms, and partners your business depends on."
    capabilities={[
      { title: 'RESTful API Design', body: 'Well-structured, versioned REST APIs with clear contracts, comprehensive documentation, and consistent error handling.' },
      { title: 'GraphQL APIs', body: 'Flexible GraphQL schemas that let clients request exactly what they need — perfect for complex frontend requirements.' },
      { title: 'Third-Party Integrations', body: 'Connect to payment processors, CRMs, ERPs, analytics tools, and any external platform your workflow depends on.' },
      { title: 'Webhook Systems', body: 'Reliable, idempotent webhook delivery with retries, logging, and dead-letter queues.' },
      { title: 'API Gateway & Security', body: 'Rate limiting, authentication, authorization, and API gateway config that keeps your APIs safe.' },
      { title: 'SDK & Client Libraries', body: 'Developer-friendly SDKs that make your API easy to consume — accelerating partner adoption.' },
    ]}
    technologies={['REST', 'GraphQL', 'WebSockets', 'gRPC', 'Node.js', 'Python', 'Stripe', 'Twilio', 'Salesforce', 'Zapier', 'Kong', 'AWS API Gateway']}
  />
}

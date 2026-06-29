import type { Metadata } from 'next'
import ServicePageLayout from '@/components/ServicePageLayout'
export const metadata: Metadata = {
  title: 'Cloud & DevOps', description: 'Cloud infrastructure and CI/CD engineering from XDEVS.',
  alternates: { canonical: 'https://xdevs.io/services/cloud-devops' },
}
export default function Page() {
  return <ServicePageLayout index="06" tag="CLOUD" title="CLOUD & DEVOPS"
    tagline="Ship faster. Sleep soundly."
    description="We build the infrastructure, pipelines, and automation that let your engineering team deploy with confidence — multiple times a day if needed."
    capabilities={[
      { title: 'CI/CD Pipelines', body: 'Automated build, test, and deployment pipelines on GitHub Actions, GitLab CI, or CircleCI that make shipping a non-event.' },
      { title: 'Infrastructure as Code', body: 'Reproducible, version-controlled infrastructure with Terraform, Pulumi, or AWS CDK.' },
      { title: 'Kubernetes Orchestration', body: 'Container orchestration, autoscaling, and cluster management for production workloads.' },
      { title: 'Cloud Architecture', body: 'Cost-optimized, resilient architectures on AWS, GCP, or Azure tailored to your workload patterns.' },
      { title: 'Observability', body: 'Logging, tracing, and monitoring with Datadog, Grafana, or the ELK stack — find problems before users do.' },
      { title: 'Security & Compliance', body: 'Security hardening, IAM best practices, secrets management, and compliance tooling for SOC 2 and GDPR.' },
    ]}
    technologies={['AWS', 'GCP', 'Azure', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions', 'ArgoCD', 'Datadog', 'Prometheus', 'Grafana', 'Vault']}
  />
}

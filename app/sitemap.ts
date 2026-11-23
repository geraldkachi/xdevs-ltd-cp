import { MetadataRoute } from 'next'
import { team } from '@/lib/team'
import { posts } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://xdevs.io'
  const now = new Date()
  const pages = ['', '/about', '/our-story', '/process', '/case-studies', '/careers', '/blog', '/contact', '/team', '/academy']
  const services = ['software-engineering', 'data-engineering', 'business-intelligence', 'ai-ml', 'api-integrations', 'cloud-devops'].map((s) => `/services/${s}`)
  const dynamic = [
    ...team.map((m) => `/team/${m.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ]
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.8 })),
    ...services.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...dynamic.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}

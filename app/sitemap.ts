import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://xdevs.io'; const now = new Date()
  const pages = ['','/about','/our-story','/process','/case-studies','/careers','/blog']
  const services = ['/services/software-engineering','/services/data-engineering','/services/business-intelligence','/services/ai-ml','/services/api-integrations','/services/cloud-devops']
  return [
    ...pages.map(p => ({ url:`${base}${p}`, lastModified:now, changeFrequency:'monthly' as const, priority: p===''?1:0.8 })),
    ...services.map(p => ({ url:`${base}${p}`, lastModified:now, changeFrequency:'monthly' as const, priority:0.9 })),
  ]
}

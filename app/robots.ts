import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return { rules:[{userAgent:'*',allow:'/'}], sitemap:'https://xdevs.io/sitemap.xml', host:'https://xdevs.io' }
}

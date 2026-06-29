import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: {
    default: 'XDEVS — Software, Data & AI Engineering',
    template: '%s | XDEVS',
  },
  description:
    'XDEVS delivers world-class software engineering, data engineering, business intelligence, AI & ML integration, API integrations, and cloud & DevOps for ambitious companies.',
  keywords: ['software engineering','data engineering','business intelligence','AI integration','cloud devops','XDEVS','tech company','API integrations'],
  metadataBase: new URL('https://xdevs.io'),
  openGraph: {
    type: 'website', locale: 'en_US', url: 'https://xdevs.io',
    siteName: 'XDEVS',
    title: 'XDEVS — Software, Data & AI Engineering',
    description: 'XDEVS delivers world-class software, data, and AI engineering solutions.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'XDEVS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XDEVS — Software, Data & AI Engineering',
    description: 'XDEVS delivers world-class software, data, and AI engineering solutions.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

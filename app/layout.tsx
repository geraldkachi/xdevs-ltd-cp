import type { Metadata, Viewport } from 'next'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import AuthProvider from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: {
    default: 'XDEVS — Software, Data & AI Engineering',
    template: '%s | XDEVS',
  },
  description:
    'XDEVS delivers software engineering, data engineering, business intelligence, AI & ML integration, API integrations and cloud & DevOps — and trains the next generation of tech talent through XDEVS Academy.',
  keywords: ['software engineering', 'data engineering', 'business intelligence', 'AI integration', 'cloud devops', 'XDEVS', 'tech academy Lagos', 'learn UI/UX Nigeria', 'frontend course Lagos'],
  metadataBase: new URL('https://xdevs.io'),
  manifest: '/manifest.json',
  // Favicons come from app/favicon.ico, app/icon.png and app/apple-icon.png
  openGraph: {
    type: 'website', locale: 'en_US', url: 'https://xdevs.io',
    siteName: 'XDEVS',
    title: 'XDEVS — Software, Data & AI Engineering',
    description: 'XDEVS delivers world-class software, data, and AI engineering solutions.',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'XDEVS' }],
  },
  twitter: {
    card: 'summary',
    title: 'XDEVS — Software, Data & AI Engineering',
    description: 'XDEVS delivers world-class software, data, and AI engineering solutions.',
    images: ['/icon-512.png'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

// Applies the saved theme before paint so there is no light/dark flash
const themeScript = `(function(){try{var t=localStorage.getItem('xdevs-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

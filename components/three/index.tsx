'use client'
import dynamic from 'next/dynamic'
import { useTheme } from '@/components/ThemeProvider'

const Stars = dynamic(() => import('./Stars'), { ssr: false })
export const Earth = dynamic(() => import('./Earth'), { ssr: false })

/** Theme-aware moving star background. Place inside a `relative` container. */
export function StarsBackground({ count, light = '#3a3a3a', dark = '#ffffff' }: { count?: number; light?: string; dark?: string }) {
  const { theme } = useTheme()
  return <Stars color={theme === 'dark' ? dark : light} count={count} />
}

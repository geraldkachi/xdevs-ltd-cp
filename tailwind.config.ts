import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-space)', 'sans-serif'],
      },
      colors: {
        accent: '#3B82FF', 
      },
      fontSize: {
        'hero': ['clamp(4rem,10vw,9rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display': ['clamp(2.5rem,6vw,6rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'heading': ['clamp(1.5rem,3vw,2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
export default config

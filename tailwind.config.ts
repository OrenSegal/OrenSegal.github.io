import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        panel: {
          DEFAULT: '#0a0b0c',
          face: '#121315',
        },
        line: '#232527',
        ink: {
          DEFAULT: '#f2f1ea',
          dim: '#9a9d9f',
          faint: '#7a7d7f',
        },
        accent: {
          DEFAULT: '#8fd6a8',
          dim: '#4b7a5d',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'rise': 'rise 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

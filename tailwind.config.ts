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
          face: '#131417',
          raised: '#1b1d21',
        },
        bezel: '#2b2e33',
        ink: {
          DEFAULT: '#f2f1ea',
          dim: '#95989c',
          faint: '#5b5e63',
        },
        signal: {
          DEFAULT: '#7cfa9a',
          dim: '#3f7a52',
        },
        caution: '#f5a623',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'settle': 'settle 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'flag-drop': 'flagDrop 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        settle: {
          '0%': { transform: 'rotate(var(--needle-rest, -120deg))' },
          '100%': { transform: 'rotate(var(--needle-value, -120deg))' },
        },
        flagDrop: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

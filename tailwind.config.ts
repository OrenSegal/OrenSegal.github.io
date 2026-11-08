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
          DEFAULT: '#000000',
          face: '#141414',
        },
        line: '#1f1f1f',
        ink: {
          DEFAULT: '#ffffff',
          dim: 'rgba(255,255,255,0.72)',
          faint: 'rgba(255,255,255,0.48)', // lowest alpha that clears 4.5:1 on #000 and #141414
          ghost: 'rgba(255,255,255,0.5)',
        },
        accent: {
          DEFAULT: '#ff8c1a',
          dim: '#b35f12',
        },
        field: '#1b3ac4',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        rise: 'rise 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        glide: 'glide 900ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glide: {
          '0%': { transform: 'translateX(48px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

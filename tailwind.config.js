/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: {
          50: 'rgba(255, 255, 255, 0.02)',
          100: 'rgba(255, 255, 255, 0.05)',
          200: 'rgba(255, 255, 255, 0.08)',
          300: 'rgba(255, 255, 255, 0.12)',
        },
        brand: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          indigo: '#6366f1',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      boxShadow: {
        'glow-blue': '0 0 30px -5px rgba(59, 130, 246, 0.4)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.4)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.4)',
        'glow-rose': '0 0 30px -5px rgba(244, 63, 94, 0.4)',
        'glow-amber': '0 0 30px -5px rgba(245, 158, 11, 0.4)',
        'glow-indigo': '0 0 35px -5px rgba(99, 102, 241, 0.4)',
        'glass-active': '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 20px 0 rgba(59, 130, 246, 0.25)',
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '64px',
      }
    },
  },
  plugins: [],
}

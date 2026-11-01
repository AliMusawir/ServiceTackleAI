/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#040711',
          900: '#080C16',
          800: '#0D1322',
          700: '#131C30',
          600: '#1A2640'
        },
        azure: {
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF'
        },
        cyan: {
          400: '#38BDF8',
          500: '#06B6D4',
          600: '#0891B2'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

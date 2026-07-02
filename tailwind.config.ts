import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1E1B4B',
          graphite: '#2D2A6E',
          navy: '#16153A',
          indigo: '#4338CA',
          'indigo-light': '#6366F1',
          accent: '#E0FFFF',
          'accent-hover': '#B0E0E6',
          'accent-light': '#F0FFFF',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#4B5563',
          muted: '#9CA3AF',
          light: '#F0EFFF',
        },
        surface: {
          white: '#FFFFFF',
          gray: '#F5F5FF',
          'gray-medium': '#EBEBFF',
          border: '#E0DEFF',
          'dark-card': '#262364',
          'dark-border': '#3D3A8A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card-hover': '0 4px 16px 0 rgb(30 27 75 / 0.2)',
        cta: '0 4px 14px 0 rgb(224 255 255 / 0.4)',
        'indigo-glow': '0 0 40px 0 rgb(67 56 202 / 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-down': 'slideDown 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config

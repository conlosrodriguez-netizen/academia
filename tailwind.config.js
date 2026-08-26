/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f3f0ff',
          100: '#e9e3ff',
          200: '#d5ccff',
          300: '#b5a5ff',
          400: '#9170ff',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3b0f7a',
        },
        surface: {
          50: '#ffffff',
          100: '#f8f9fb',
          200: '#f0f1f5',
          300: '#e4e5ed',
          400: '#d1d3de',
        },
        accent: {
          pink: '#ec4899',
          blue: '#3b82f6',
          emerald: '#10b981',
          orange: '#f59e0b',
        }
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.04)',
        'modal': '0 8px 40px rgba(0,0,0,0.12)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: '#D4F933',
        'primary-hover': '#c1e820',
        secondary: '#F3F4F6',
        tertiary: '#D0EEFF',
        dark: '#0A0A0C',
        'dark-secondary': '#121216',
        'dark-surface': '#181920',
        'dark-card': '#121216',
        'dark-border': '#20222a',
      },
    },
  },
  plugins: [],
}

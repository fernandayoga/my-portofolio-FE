/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9333ea',
        dark: '#0f172a',
        'dark-secondary': '#1e293b',
      },
    },
  },
  plugins: [],
}

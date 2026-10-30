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
        dark: {
          bg: '#0b0c10',
          surface: '#12141d',
          card: '#161922',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        amber: {
          400: '#fbbf24',
          500: '#e5a93b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}

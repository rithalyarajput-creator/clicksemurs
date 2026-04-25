/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#111111',
          dark: '#0A0A0A',
          card: '#1E1E1E',
          light: '#F4F4F4',
          border: '#2E2E2E',
          muted: '#777777',
          gray: '#AAAAAA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

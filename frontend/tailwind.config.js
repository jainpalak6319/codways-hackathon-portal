/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1A2C5A',
        electric: '#2869D0',
        teal: '#1AA6A6',
        mint: '#DDF6F0',
        ice: '#EAF7F9',
        offwhite: '#FDFDFE',
        coolgray: '#B0C0CB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
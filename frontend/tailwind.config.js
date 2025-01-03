/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '130': '130deg',
        '50': '50deg',
      },
      fontFamily: {
        'prata': ['Prata', 'serif'],
      },
    },
  },
  plugins: [],
}
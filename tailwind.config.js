/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pickleball: {
          light: '#d9f99d',
          DEFAULT: '#84cc16',
          dark: '#4d7c0f',
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      zIndex:{
        "2000": 2000
      },
      flex: {
        '2': '2 2 0%'
      }
    },
  },
  plugins: [],
}

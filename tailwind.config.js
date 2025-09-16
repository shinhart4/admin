/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-violet': '#1a1a1a',
        'dark-indigo': '#2c2c3a',
        'deep-black': '#000000',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #1a1a1a, #2c2c3a, #000000)',
      },
    },
  },
  plugins: [],
}

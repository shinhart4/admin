/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
     "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
     darkMode: 'class',
    extend: {
      colors: {
        'custom-light-yellow': '#FFFACD',  // Jaune clair
        'custom-orange': '#FFA726',        // Orange
        'custom-dark-orange': '#FF7043',   // Orange foncé
        'custom-dark-brown': '#5C3A00',    // Marron foncé
        'custom-light-brown': '#A64600',   // Marron clair
      },
      backgroundImage: {
        // 'dark-gradient': 'linear-gradient(135deg, #1a1a1a, #2c2c3a, #000000)',
         'wilgo-gradient': 'linear-gradient(135deg, #FFDD55, #FF9900, #FF6600, #FF3C00)',
      },
    },
  },
  plugins: [],
}

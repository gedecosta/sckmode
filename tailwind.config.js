/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        athledia: {
          bg: '#E5E5E5',       // Fundo claro texturizado da imagem
          card: '#F4F4F4',     // Fundo levemente mais iluminado para cards
          dark: '#1F2328',     // A montanha, corredor e fonte principal
          slate: '#495057',    // Nuvens escuras
          lightSlate: '#868E96', // Nuvens claras / sombras fracas
          accent: '#FFFFFF',   // Destaques e topo da montanha
        }
      },
      fontFamily: {
        serif: ['RobotoSlab-Black', 'serif'],
        sans: ['System', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


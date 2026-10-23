/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mc: {
          dark: '#0b0e14',
          card: '#131926',
          border: '#222f42',
          emerald: '#10b981',
          gold: '#f59e0b',
          diamond: '#06b6d4',
          amethyst: '#8b5cf6',
          redstone: '#ef4444'
        }
      },
      fontFamily: {
        gaming: ['"Outfit"', 'sans-serif'],
        minecraft: ['"Press Start 2P"', 'monospace']
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-diamond': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'glow-amethyst': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
      }
    },
  },
  plugins: [],
}

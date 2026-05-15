
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0a0f',
          cyan: '#00f5ff',
          green: '#00ff41',
          amber: '#ffb300',
          red: '#ff003c',
          panel: 'rgba(0, 245, 255, 0.03)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(0, 245, 255, 0.3), inset 0 0 10px rgba(0, 245, 255, 0.1)',
        'glow-green': '0 0 15px rgba(0, 255, 65, 0.3), inset 0 0 10px rgba(0, 255, 65, 0.1)',
        'glow-amber': '0 0 15px rgba(255, 179, 0, 0.3), inset 0 0 10px rgba(255, 179, 0, 0.1)',
        'glow-red': '0 0 15px rgba(255, 0, 60, 0.4), inset 0 0 10px rgba(255, 0, 60, 0.2)',
        'glow-cyan-sm': '0 0 8px rgba(0, 245, 255, 0.4)',
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        }
      }
    },
  },
  plugins: [],
}

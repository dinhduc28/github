/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#040507',
          900: '#07080C',
          850: '#0C0E14',
          800: '#12151F',
          700: '#1A1E2B',
          600: '#252B3C',
        },
        quartz: {
          50: '#FAFCFF',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
        },
        electro: {
          cyan: '#00F0FF',
          violet: '#8B5CF6',
          amber: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E',
        },
        gold: {
          light: '#FDE68A',
          DEFAULT: '#D4AF37',
          dark: '#B45309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        luxury: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'aurora-dark': 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(0, 240, 255, 0.15), rgba(139, 92, 246, 0.12), rgba(7, 8, 12, 0))',
        'aurora-light': 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(56, 189, 248, 0.15), rgba(168, 85, 247, 0.1), rgba(250, 252, 255, 0))',
        'gold-gradient': 'linear-gradient(135deg, #FFE259 0%, #FFA751 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)',
        'glass-radial': 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'border-beam': 'border-beam 6s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'aurora-flow': 'aurora-flow 12s ease infinite alternate',
      },
      keyframes: {
        'border-beam': {
          '0%': { 'offset-distance': '0%' },
          '100%': { 'offset-distance': '100%' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'aurora-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
    },
  },
  plugins: [],
};

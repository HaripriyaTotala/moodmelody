/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'letter-burst': 'burst 0.6s cubic-bezier(0.4, 0, 0.6, 1) forwards',
        'typewriter': 'typing 2s steps(20) forwards',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { 
            opacity: 1,
            filter: 'brightness(1.5) drop-shadow(0 0 3px rgba(255,255,255,0.7))'
          },
          '50%': { 
            opacity: 0.3,
            filter: 'brightness(1) drop-shadow(0 0 1px rgba(255,255,255,0.3))'
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0)',
            textShadow: '0 5px 15px rgba(255,255,255,0.4)'
          },
          '50%': { 
            transform: 'translateY(-10px)',
            textShadow: '0 25px 15px rgba(255,255,255,0.2)'
          },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        glow: {
          '0%': { 
            textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe',
            color: '#fff'
          },
          '100%': {
            textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 42px #bc13fe, 0 0 82px #bc13fe',
            color: '#fff8f8'
          },
        },
        typing: {
          '0%': { 
            width: '100%',
          },
          '100%': { 
            width: '0%',
          }
        },
        blink: {
          from: { 'border-right-color': 'transparent' },
          '50%': { 'border-right-color': 'white' },
        },
        burst: {
          '0%': { 
            transform: 'scale(1) rotate(0deg)',
            opacity: '1'
          },
          '50%': { 
            transform: 'scale(1.4) rotate(10deg)',
            opacity: '0.8',
            color: '#a78bfa'
          },
          '100%': { 
            transform: 'scale(1) rotate(0deg)',
            opacity: '1'
          }
        }
      },
    },
  },
  plugins: [],
} 
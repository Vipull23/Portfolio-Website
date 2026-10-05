/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nf: {
          bg: '#141414',
          panel: '#1a1a1a',
          surface: '#1f1f1f',
          elevated: '#2a2a2a',
          red: '#E50914',
          'red-hover': '#f6121d',
          'red-soft': '#ff5a5f',
          text: '#cfcfcf',
          muted: '#9b9b9b',
          dim: '#6b6b6b',
        },
      },
      scale: {
        108: '1.08',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

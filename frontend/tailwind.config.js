/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf7f0',
          100: '#f9e9d5',
          200: '#f4d0aa',
          300: '#edb075',
          400: '#e48e41',
          500: '#cf6c1a',
          600: '#b05411',
          700: '#8e4011',
          800: '#6a3112',
          900: '#4f260f'
        },
        slate: {
          950: '#0b1220'
        }
      },
      boxShadow: {
        card: '0 15px 30px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};


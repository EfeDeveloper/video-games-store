/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#18181A',
        primary: '#E58D27',
        secondary: '#E3E2E7',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
    plugins: [],
  },
};

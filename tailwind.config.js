/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',
        dark2: '#121212',
        dark3: '#303030',
        dark4: '#424242',
        dark5: '#3c3c3c',
        darkTrans: '#424242b7',
        dark5Trans: '#3c3c3cb7',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light'],
  },
};

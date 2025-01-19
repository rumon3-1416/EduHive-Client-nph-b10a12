/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        skyBlue: '#3498db',
        blueTrans: '#3498db1e',
        darkBlue: '#2c3e50',
        lightBlue: '#9ec3dc',
        green: '#2ecc71',
        hoverGreen: '#1abc9c',
        lightGray: '#eeeef2ab',
        darkGray: '#34495e',
        mutedGray: '#7f8c8d',
        errorRed: '#e74c3c',
        successGreen: '#27ae60',
        infoBlue: '#3498db',
        warnYellow: '#e9d502',
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

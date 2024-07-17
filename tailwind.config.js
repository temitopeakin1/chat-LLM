/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        screens: {
          lg: '1080px',
        },
        width: {
          240: '240px',
        },
        fontSize: {
        '12px': '12px',
        '14px': '14px',
        
      },
        colors: {
          background: '#FFFFFF',
          primary: '#FFFFFF',
          secondary: '#808080',
          darkgray: '#4C4E53',
          green: '#086224',
          sidebackground: '#F3F5F4',
          logo: '#121519',
        },
      },
    },
    plugins: [],
  },
}

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    textIndent: (theme) => theme('spacing'),
    extend: {
      colors: {
        lightTheme: {
          
        },
        darkTheme: {
          600: '#262A34',
          700: '#181A20',
          800: '#1A1B20',
          900: "#fff"
        },
      },
      fill: theme => theme('colors')
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};

module.exports = {
  darkMode: 'media', // or 'media' or 'class'
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.500'),
      white: theme('colors.white'),
      dark600: '#262A34',
      dark700: '#181A20',
      dark800: '#1A1B20',
    }),
    stroke: (theme) => ({
      white: theme('colors.white'),
      red: theme('colors.red.500'),
    }),
    extend: {
      colors: {
        dark600: '#262A34',
        dark700: '#181A20',
        dark800: '#1A1B20',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

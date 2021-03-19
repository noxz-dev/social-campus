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
      indigo: theme('colors.indigo.500'),
      gray100: theme('colors.gray.100'),
    }),
    stroke: (theme) => ({
      white: theme('colors.white'),
      red: theme('colors.red.500'),
    }),
    extend: {
      colors: {
        dark400: '#48494d',
        dark500: '#3c3f48',
        dark600: '#262A34',
        dark700: '#181A20',
        dark800: '#1A1B20',
        highlight: {
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    options: {
      savelist: ['bg-dark-500', 'pl-2'],
    },
  },
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
      black: theme('colors.black'),
      red: theme('colors.red.500'),
      indigo: theme('colors.indigo.500'),
      grayLight: theme('colors.gray.300'),
      grayDark: theme('colors.gray.500'),
    }),
    extend: {
      colors: {
        dark400: '#48494d',
        dark500: '#3c3f48',
        dark600: '#262A34',
        dark700: '#181A20',
        dark800: '#1A1B20',
        dark: {
          400: '#48494d',
          500: '#3c3f48',
          600: '#262A34',
          700: '#181A20',
          800: '#1A1B20',
          900: '#0b0e11',
        },
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
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};

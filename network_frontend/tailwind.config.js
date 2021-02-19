const colors = require('windicss/colors');
const plugin = require('windicss/plugin');

module.exports = {
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark600: '#262A34',
        dark700: '#181A20',
        dark800: '#1A1B20',
      },
    },
  },
  plugins: [require('windicss/plugin/forms')],
};

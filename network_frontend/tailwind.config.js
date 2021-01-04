module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    textIndent: theme => theme('spacing'),
    extend: {
      colors: {
        gray: {
          750: '#1F2128',
          800: '#242731'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};

module.exports = {
  root: true,

  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    '@vue/prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    '@vue/typescript/recommended',
  ]
};

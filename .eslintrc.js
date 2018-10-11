const prettierOptions = require('./.prettierrc.json');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
  ],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2016,
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'class-methods-use-this': 0,
    'newline-per-chained-call': 0,
    'prefer-template': 2,
    'require-yield': 0,
    'no-confusing-arrow': 0,
    'no-console': 0,
    // Prettier changes return statement of
    // arrow functions declarative
    'no-return-assign': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: '.js',
      },
    },
  },
};

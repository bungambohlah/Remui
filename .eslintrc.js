/* eslint-disable no-undef */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
};

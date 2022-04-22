/* eslint-disable no-undef */
module.exports = {
  "overrides": [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      }
    }
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended'
  ],
};

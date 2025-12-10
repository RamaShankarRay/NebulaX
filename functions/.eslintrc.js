module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  root: true,
  ignorePatterns: ['lib/**/*'],
  rules: {
    quotes: ['error', 'single'],
  },
};

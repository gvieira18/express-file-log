const LEVEL = {
  OFF: 0,
  WARN: 1,
  ERROR: 2,
};

/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  overrides: [
    {
      env: { node: true },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: { sourceType: 'script' },
    },
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  ignorePatterns: ['node_modules', 'dist', 'coverage'],
  rules: {
    'no-unused-vars': [LEVEL.ERROR, { argsIgnorePattern: '_' }],
    'class-methods-use-this': LEVEL.OFF,
  },
};

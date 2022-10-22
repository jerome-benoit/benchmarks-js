// @ts-check
// eslint-disable-next-line n/no-unpublished-require
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['promise', 'jsdoc'],
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:jsdoc/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended'
  ],
  rules: {
    'sort-imports': [
      'warn',
      {
        ignoreMemberSort: true,
        ignoreDeclarationSort: true
      }
    ]
  }
})

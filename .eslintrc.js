// eslint-disable-next-line node/no-unpublished-require
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  env: {
    es2021: true,
    node: true
  },
  plugins: ['promise', 'prettierx', 'jsdoc'],
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:jsdoc/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:prettierx/standardx'
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

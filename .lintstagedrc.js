module.exports = {
  '*.{js,jsx,mjs,cjs}': [
    'prettier --write',
    'standard --fix',
    'eslint --cache --fix'
  ],
  '*.{json,md,yml,yaml}': ['prettier --write']
}

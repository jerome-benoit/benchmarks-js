module.exports = {
  '*.{js,jsx,mjs,cjs}': [
    'prettier --cache --write',
    'standard --fix',
    'eslint --cache --fix'
  ],
  '*.{json,md,yml,yaml}': ['prettier --cache --write']
}

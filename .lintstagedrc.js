module.exports = {
  '*.{js,jsx,cjs,mjs}': [
    'prettier --cache --write',
    'standard --fix',
    'eslint --cache --fix'
  ],
  '*.{json,md,yml,yaml}': ['prettier --cache --write']
}

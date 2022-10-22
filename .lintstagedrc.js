module.exports = {
  '*.{js,jsx}': ['prettier --write', 'standard --fix', 'eslint --cache --fix'],
  '*.{json,md,yml,yaml}': ['prettier --write']
}

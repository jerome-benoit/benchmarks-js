module.exports = {
  '*.{js,jsx,cjs,mjs}': [
    'rome format --write',
    'standard --fix',
    'eslint --cache --fix'
  ],
  '!(.vscode/**)*.json': ['rome format --write'],
  '*.{md,yml,yaml}': ['prettier --cache --write']
}

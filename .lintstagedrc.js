module.exports = {
  '*.{js,jsx,cjs,mjs}': [
    'rome format --write',
    'standard --fix',
    'eslint --cache --fix'
  ],
  '!(.vscode/**)*.{json,md,yml,yaml}': ['rome format --write']
}

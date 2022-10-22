const isCIEnvironment = process.env.CI !== undefined
if (isCIEnvironment === false) {
  // eslint-disable-next-line n/no-unpublished-require
  require('husky').install()
}

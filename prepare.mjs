import { env } from 'node:process'

const isCIEnvironment = env.CI != null
if (isCIEnvironment === false) {
  // eslint-disable-next-line n/no-unpublished-import
  import('husky')
    .then(husky => {
      return husky.default()
    })
    .catch(console.error)
}

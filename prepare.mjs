import { env } from 'node:process'

const isCIEnvironment = env.CI != null
if (isCIEnvironment === false) {
  // eslint-disable-next-line n/no-unpublished-import
  import('husky')
    .then(({ install }) => {
      return install()
    })
    .catch(err => {
      console.error(err)
    })
}

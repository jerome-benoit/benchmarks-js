import { bench, group, run } from 'mitata'

/**
 *
 */
async function asyncFunction () {
  await new Promise(resolve => {
    resolve()
  })
}

group('Promise handling', () => {
  bench('await promise', async () => {
    try {
      return await asyncFunction()
    } catch (e) {
      console.error(e)
    }
  })
  bench('promise with then().catch()', () => {
    asyncFunction()
      .then(r => {
        return r
      })
      .catch(console.error)
  })
  bench('voided promise', () => {
    // eslint-disable-next-line no-void
    void asyncFunction()
  })
  bench('mishandled promise', () => {
    asyncFunction()
  })
})

await run({
  units: true
})

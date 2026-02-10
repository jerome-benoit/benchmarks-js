import { Bench } from 'tinybench'

/**
 *
 */
async function asyncFunction () {
  await new Promise(resolve => {
    resolve()
  })
}

const bench = new Bench({
  name: 'Promise handling',
  time: 100,
})

bench
  .add('await promise', async () => {
    try {
      return await asyncFunction()
    } catch (e) {
      console.error(e)
    }
  })
  .add('promise with then().catch()', () => {
    asyncFunction()
      .then(r => {
        return r
      })
      .catch(console.error)
  })
  .add('voided promise', () => {
    // eslint-disable-next-line no-void
    void asyncFunction()
  })
  .add('mishandled promise', () => {
    asyncFunction()
  })

await bench.run()

console.table(bench.table())

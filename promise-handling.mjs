import Benchmark from 'benny'

/**
 *
 */
function promise () {
  return new Promise(resolve => {
    resolve()
  })
}

/**
 *
 */
async function asyncFunction () {
  return await promise()
}

Benchmark.suite(
  'Promise handling',
  Benchmark.add('await promise', async () => {
    try {
      return await asyncFunction()
    } catch (e) {
      console.error(e)
    }
  }),
  Benchmark.add('promise with then().catch()', () => {
    asyncFunction()
      .then(r => {
        return r
      })
      .catch(e => {
        console.error(e)
      })
  }),
  Benchmark.add('voided promise', () => {
    // eslint-disable-next-line no-void
    void asyncFunction()
  }),
  Benchmark.add('mishandled promise', () => {
    asyncFunction()
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'promise-handling',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'promise-handling',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'promise-handling',
    format: 'table.html',
    details: true
  })
).catch(err => {
  console.error(err)
})

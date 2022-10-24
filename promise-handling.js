const Benchmark = require('benny')

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
  await promise()
}

Benchmark.suite(
  'Promise handling',
  Benchmark.add('await promise', async () => {
    await asyncFunction()
  }),
  Benchmark.add('promise', () => {
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
)

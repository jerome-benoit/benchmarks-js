const Benchmark = require('benchmark')
const { LIST_FORMATTER } = require('./benchmark-utils')

const suite = new Benchmark.Suite()

/**
 *
 */
function promise () {
  return new Promise()
}

/**
 *
 */
async function asyncFunction () {
  await promise()
}

suite
  .add('await promise', async () => {
    await asyncFunction()
  })
  .add('promise', () => {
    asyncFunction()
  })
  .on('cycle', event => {
    console.log(event.target.toString())
  })
  .on('complete', function () {
    console.log(
      'Fastest is ' + LIST_FORMATTER.format(this.filter('fastest').map('name'))
    )
    // eslint-disable-next-line n/no-process-exit
    process.exit()
  })
  .run()

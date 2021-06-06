const Benchmark = require('benchmark')
const { LIST_FORMATTER } = require('./benchmark-utils')

const suite = new Benchmark.Suite()

function promise () {
  return new Promise()
}

async function asyncFunction () {
  await promise()
}

suite
  .add('await promise', async function () {
    await asyncFunction()
  })
  .add('promise', function () {
    asyncFunction()
  })
  .on('cycle', function (event) {
    console.log(event.target.toString())
  })
  .on('complete', function () {
    console.log(
      'Fastest is ' + LIST_FORMATTER.format(this.filter('fastest').map('name'))
    )
    // eslint-disable-next-line no-process-exit
    process.exit()
  })
  .run()

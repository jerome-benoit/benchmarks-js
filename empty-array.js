const Benchmark = require('benchmark')
const { LIST_FORMATTER } = require('./benchmark-utils')

const suite = new Benchmark.Suite()

let testArray = [
  83, 93, 27, 29, 2828, 234, 23, 56, 32, 56, 67, 77, 32, 45, 93, 17, 28, 83, 62,
  99, 36, 28, 93, 27, 29, 2828, 234, 23, 56, 32, 56, 67, 77, 32, 45, 93, 17, 28,
  83, 62, 99, 36, 28, 93, 27, 29, 2828, 234, 23, 56, 32, 56, 67, 77, 32, 45, 93,
  17, 28, 83, 62, 99, 36, 28, 93, 27, 29, 2828, 234, 23, 56, 32, 56, 67, 77, 32,
  45, 93, 17, 28, 83, 62, 99, 36, 28, 93, 27, 29, 2828, 234, 23, 56, 32, 56, 67,
  77, 32, 45, 93, 17, 28, 83, 62, 99, 36, 28, 93, 27, 29, 2828, 234, 23, 56, 32,
  56, 67, 77, 32, 45, 93, 17, 28, 83, 62, 99, 36, 28, 93, 27, 29, 2828, 234, 23,
  56, 32, 56, 67, 77, 32, 45, 93, 17, 28, 83, 62, 99, 36, 28, 93, 27, 29, 2828,
  234, 23, 56, 32, 56, 67, 77, 32, 45, 93, 17, 28, 83, 62, 99, 36, 28, 93, 27,
  29, 2828, 234, 23, 56, 32, 56, 67, 77, 32, 45, 93, 17, 28, 83, 62, 99, 36, 28,
  93, 27, 29, 2828, 234, 23, 56, 32, 56, 67, 77, 32, 45, 93, 17, 28, 83, 62, 99,
  36, 28
]

suite
  .add('length = 0', () => {
    testArray.length = 0
  })
  .add('pop loop', async () => {
    while (testArray.length > 0) {
      testArray.pop()
    }
  })
  .add('splice', async () => {
    testArray.splice(0, testArray.length)
  })
  .add('shift loop', () => {
    while (testArray.length > 0) {
      testArray.shift()
    }
  })
  .add('new init', () => {
    testArray = []
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

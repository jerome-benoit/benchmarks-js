const Benchmark = require('benny')

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

Benchmark.suite(
  'Empty array',
  Benchmark.add('length = 0', () => {
    testArray.length = 0
  }),
  Benchmark.add('pop loop', async () => {
    while (testArray.length > 0) {
      testArray.pop()
    }
  }),
  Benchmark.add('splice', async () => {
    testArray.splice(0, testArray.length)
  }),
  Benchmark.add('shift loop', () => {
    while (testArray.length > 0) {
      testArray.shift()
    }
  }),
  Benchmark.add('new init', () => {
    testArray = []
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({ file: 'empty-array', format: 'chart.html' }),
  Benchmark.save({ file: 'empty-array', format: 'table.html' })
)

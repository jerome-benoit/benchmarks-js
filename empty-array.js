const Benchmark = require('benny')
const { generateRandomIntegerArray } = require('./benchmark-utils')

let testArray = generateRandomIntegerArray(10000)

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

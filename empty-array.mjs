import Benchmark from 'benny'
import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
let testArray = generateRandomNumberArray(size)

Benchmark.suite(
  `Empty array with ${size} elements`,
  Benchmark.add('length = 0', () => {
    testArray.length = 0
  }),
  Benchmark.add('pop loop', () => {
    while (testArray.length > 0) {
      testArray.pop()
    }
  }),
  Benchmark.add('splice', () => {
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
  Benchmark.save({ file: 'empty-array', format: 'json', details: true }),
  Benchmark.save({ file: 'empty-array', format: 'chart.html', details: true }),
  Benchmark.save({ file: 'empty-array', format: 'table.html', details: true })
).catch(err => {
  console.error(err)
})

import { Bench } from 'tinybench'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
let testArray = generateRandomNumberArray(size)

const bench = new Bench({
  name: `Empty array with ${size} elements`,
  time: 100,
})

bench
  .add('length = 0', () => {
    testArray.length = 0
  })
  .add('pop loop', () => {
    while (testArray.length > 0) {
      testArray.pop()
    }
  })
  .add('splice', () => {
    testArray.splice(0, testArray.length)
  })
  .add('shift loop', () => {
    while (testArray.length > 0) {
      testArray.shift()
    }
  })
  .add('initialize', () => {
    testArray = []
  })

await bench.run()

console.table(bench.table())

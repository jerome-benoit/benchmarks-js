import { bench, group, run } from 'mitata'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
let testArray = generateRandomNumberArray(size)

group(`Empty array with ${size} elements`, () => {
  bench('length = 0', () => {
    testArray.length = 0
  })
  bench('pop loop', () => {
    while (testArray.length > 0) {
      testArray.pop()
    }
  })
  bench('splice', () => {
    testArray.splice(0, testArray.length)
  })
  bench('shift loop', () => {
    while (testArray.length > 0) {
      testArray.shift()
    }
  })
  bench('initialize', () => {
    testArray = []
  })
})

await run({
  units: true
})

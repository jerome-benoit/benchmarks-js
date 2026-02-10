import { Bench } from 'tinybench'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
const testArray = generateRandomNumberArray(size, 100000)
const testSet = new Set(testArray)
// Pick a target that exists
const existingTarget = testArray[Math.floor(size / 2)]
// Pick a target that doesn't exist
const missingTarget = -1

const bench = new Bench({
  name: `Lookup in ${size} elements (existing value)`,
  time: 100,
})

bench
  .add('Set.has()', () => {
    return testSet.has(existingTarget)
  })
  .add('Array.includes()', () => {
    return testArray.includes(existingTarget)
  })
  .add('Array.indexOf() !== -1', () => {
    return testArray.indexOf(existingTarget) !== -1
  })
  .add('for loop', () => {
    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i] === existingTarget) {
        return true
      }
    }
    return false
  })

await bench.run()

console.table(bench.table())

// Also benchmark missing value lookup
const benchMissing = new Bench({
  name: `Lookup in ${size} elements (missing value)`,
  time: 100,
})

benchMissing
  .add('Set.has()', () => {
    return testSet.has(missingTarget)
  })
  .add('Array.includes()', () => {
    return testArray.includes(missingTarget)
  })
  .add('Array.indexOf() !== -1', () => {
    return testArray.indexOf(missingTarget) !== -1
  })
  .add('for loop', () => {
    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i] === missingTarget) {
        return true
      }
    }
    return false
  })

await benchMissing.run()

console.table(benchMissing.table())

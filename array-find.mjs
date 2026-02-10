import { Bench } from 'tinybench'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
const testArray = generateRandomNumberArray(size, 100)
// Pick a target that exists somewhere in the middle
const target = testArray[Math.floor(size / 2)]

const bench = new Bench({
  name: `Array find in ${size} elements`,
  time: 100,
})

bench
  .add('find()', () => {
    return testArray.find(value => value === target)
  })
  .add('findIndex()', () => {
    const index = testArray.findIndex(value => value === target)
    return index !== -1 ? testArray[index] : undefined
  })
  .add('some()', () => {
    let result
    testArray.some(value => {
      if (value === target) {
        result = value
        return true
      }
      return false
    })
    return result
  })
  .add('for loop', () => {
    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i] === target) {
        return testArray[i]
      }
    }
    return undefined
  })
  .add('for...of', () => {
    for (const value of testArray) {
      if (value === target) {
        return value
      }
    }
    return undefined
  })

await bench.run()

console.table(bench.table())

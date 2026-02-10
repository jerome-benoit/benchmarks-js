import { Bench } from 'tinybench'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
const testArray = generateRandomNumberArray(size, 100)
const threshold = 50

const bench = new Bench({
  name: `Array filter with ${size} elements`,
  time: 100,
})

bench
  .add('filter()', () => {
    return testArray.filter(value => value > threshold)
  })
  .add('for loop + push', () => {
    const result = []
    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i] > threshold) {
        result.push(testArray[i])
      }
    }
    return result
  })
  .add('for...of + push', () => {
    const result = []
    for (const value of testArray) {
      if (value > threshold) {
        result.push(value)
      }
    }
    return result
  })
  .add('reduce', () => {
    return testArray.reduce((result, value) => {
      if (value > threshold) {
        result.push(value)
      }
      return result
    }, [])
  })

await bench.run()

console.table(bench.table())

import { Bench } from 'tinybench'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
const testArray = generateRandomNumberArray(size)

const bench = new Bench({
  name: `Array iteration with ${size} elements`,
  time: 100,
})

bench
  .add('for loop', () => {
    let sum = 0
    for (let i = 0; i < testArray.length; i++) {
      sum += testArray[i]
    }
    return sum
  })
  .add('for loop (cached length)', () => {
    let sum = 0
    const len = testArray.length
    for (let i = 0; i < len; i++) {
      sum += testArray[i]
    }
    return sum
  })
  .add('for...of', () => {
    let sum = 0
    for (const value of testArray) {
      sum += value
    }
    return sum
  })
  .add('forEach', () => {
    let sum = 0
    testArray.forEach(value => {
      sum += value
    })
    return sum
  })
  .add('reduce', () => {
    return testArray.reduce((sum, value) => sum + value, 0)
  })
  .add('while loop', () => {
    let sum = 0
    let i = 0
    while (i < testArray.length) {
      sum += testArray[i]
      i++
    }
    return sum
  })

await bench.run()

console.table(bench.table())

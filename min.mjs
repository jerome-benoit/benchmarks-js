import { Bench } from 'tinybench'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
const testArray = generateRandomNumberArray(size)

/**
 * Finds the minimum value in an array using a loop.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The minimum value in the array.
 */
function loopMin (values) {
  let minimum = Number.POSITIVE_INFINITY
  for (const value of values) {
    if (value < minimum) minimum = value
  }
  return minimum
}

/**
 * Finds the minimum value in an array using reduce with Math.min.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The minimum value in the array.
 */
function reduceMathMin (values) {
  return values.reduce(
    (minimum, num) => Math.min(minimum, num),
    Number.POSITIVE_INFINITY
  )
}

/**
 * Finds the minimum value in an array using reduce with ternary operator.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The minimum value in the array.
 */
function reduceTernaryMin (values) {
  return values.reduce(
    (minimum, num) => (minimum < num ? minimum : num),
    Number.POSITIVE_INFINITY
  )
}

/**
 * Finds the minimum value in an array by sorting.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The minimum value in the array.
 */
function sortMin (values) {
  return values.sort((a, b) => a - b)[0]
}

const bench = new Bench({
  name: `Min from ${size} numbers`,
  time: 100,
})

bench
  .add('Math.min', () => {
    Math.min(...testArray)
  })
  .add('loopMin', () => {
    loopMin(testArray)
  })
  .add('reduceTernaryMin', () => {
    reduceTernaryMin(testArray)
  })
  .add('reduceMathMin', () => {
    reduceMathMin(testArray)
  })
  .add('sortMin', () => {
    sortMin(testArray)
  })

await bench.run()

console.table(bench.table())
